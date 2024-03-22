import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { styles } from './Styles';
const Admin = ({navigation}) => {
  // Define an array of user objects
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', approved: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', approved: false },
    // Add more user objects as needed
  ]);

  // Function to toggle the approval status of a user
  const toggleApproval = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, approved: !user.approved } : user
      )
    );
  };

  // Function to render user item with approve button
  const renderUserItem = (user) => (
    <View style={styles.userItem} key={user.id}>
      <TouchableOpacity onPress={()=> navigation.navigate("AdminNavigator")} >
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleApproval(user.id)} style={styles.approveButton}>
        <Text style={styles.button_Text}>{user.approved ? 'Approved' : 'Approve'}</Text>
      </TouchableOpacity>
    </View>
  );

  // Define tab views for approved and unauthorized users
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'approved', title: 'Approved' },
    { key: 'unauthorized', title: 'Unauthorized' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'approved':
        return (
          <View style={styles.scene}>
            {users.filter(user => user.approved).map(user => renderUserItem(user))}
          </View>
        );
      case 'unauthorized':
        return (
          <View style={styles.scene}>
            {users.filter(user => !user.approved).map(user => renderUserItem(user))}
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }} // Customize the indicator color
        style={{ backgroundColor:'#0961F5',elevation:2,marginBottom:15 }} // Customize the tab bar background color
        labelStyle={{fontSize:FONTSIZE.size_16,fontFamily:FONTFAMILY.Jost_SemiBold,textAlign:'center',}} // Customize the tab label color
      />
    );
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};


export default Admin;

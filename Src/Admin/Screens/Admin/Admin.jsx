import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { styles } from './Styles';
import { GetAdmin } from '../../../Features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser } from '../../../Features/authSlice';
import { Switch } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
const Admin = ({navigation}) => {
  const data = useSelector((state) => state?.Auth?.Admin);
  const dispatch = useDispatch();

  const approvedUsers = data.filter((user) => user.isAuthenticated);
  const unauthorizedUsers = data.filter((user) => !user.isAuthenticated);

  // User role options (adjust as needed)
  const userRoles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Super Admin', value: 'superadmin' }, // Add superadmin role if needed
  ];

  const [selectedRole, setSelectedRole] = useState(null); // Selected user role

  // Authentication and access state variables
  const [isSwitch1On, setIsSwitch1On] = useState(false); // User authentication toggle
  const [isSwitch2On, setIsSwitch2On] = useState(false); // Full access toggle

  const toggleApproval = async (userId, isAuthenticated, fullAccess, userRole) => {
    const updatedUserData = data.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          isAuthenticated: !isAuthenticated,
          fullAccess: !fullAccess, // Toggle the full access status
          role: userRole // Preserve the user role
        };
      }
      return user;
    });
    dispatch(UpdateUser(updatedUserData));
    return userId; // Return only the user ID
  };
  


  // Function to render user item with approve button
  const renderUserItem = (user) => (
    <View style={styles.userItem} key={user.id}>
      <TouchableOpacity onPress={()=> navigation.navigate("AdminNavigator")} >
        <Text style={styles.userName}>{user.userName}</Text>
        <Text style={styles.userEmail}>{user.role} </Text>
        <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />

        <Text style={styles.userEmail}>    
        {user.fullAccess ? "Access full" : 
        
        <TouchableOpacity onPress={() => changeUserAccess(user.id,user.fullAccess)} >
       <Switch
      value={checked}
      onValueChange={(value) => setChecked(value)}
    />
      </TouchableOpacity>
        }
        </Text>
      </TouchableOpacity>
{!user.isAuthenticated &&

      <TouchableOpacity onPress={() => changeUserAuthentication(user.id,user.isAuthenticated)} >
       <Switch
      value={checked}
      onValueChange={(value) => setChecked(value)}
    />
      </TouchableOpacity>
    }

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
            {approvedUsers.map(user => renderUserItem(user))}
          </View>
        );
      case 'unauthorized':
        return (
          <View style={styles.scene}>
            {unauthorizedUsers.map(user => renderUserItem(user))}
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

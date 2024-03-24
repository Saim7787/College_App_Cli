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
const Admin = ({navigation}) => {
  const data = useSelector((state) => state?.Auth?.Admin);
  const dispatch = useDispatch();

// Inside your component
const approvedUsers = data ? data.filter((user) => user.isAuthenticated) : [];
const unauthorizedUsers = data ? data.filter((user) => !user.isAuthenticated) : [];

// Rest of your component remains unchanged...







  useEffect(() => {
    dispatch(GetAdmin());
  }, [dispatch]);




  const handleRole = async(id,value) => {
    
  
 
const data ={
  id,
  role:value
}
    const res =   await  dispatch(UpdateUser(data));
    dispatch(GetAdmin());

   console.log('role changed',res)

  };

  // Function to handle access change
  const handleAccess = async (id, isChecked) => {
    const data ={
      id,
      fullAccess:isChecked
    }
    const res =   await dispatch(UpdateUser(data));
    dispatch(GetAdmin());

   console.log('access changed',res)
  };
  
  const handleAppreoved = async (id, isChecked) => {
    const result ={
      id,
      isAuthenticated:isChecked
    }
    const res =   await   dispatch(UpdateUser(result));
    dispatch(GetAdmin());
   console.log('Approved  changed',res)


  };



  // Function to render user item with approve button
  const renderUserItem = (user) => {
    if (!data) {
      return null; // Or render a loading indicator or some placeholder content
    }
  
    return (
      <View style={styles.userItem} key={user.id}>
     
          <Text style={styles.userName}>{user.userName}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.userName}>
          changed to SuperAdmin
        </Text>
        <Switch
          value={user.role === 'superadmin'} // Assuming 'superadmin' as the super admin role
          onValueChange={(value) => handleRole(user.id, value ? 'superadmin' : 'admin')}
        />
      </View>





          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>   
          <Text  style={styles.userName}>
          User Access   </Text>
              <Switch
                value={user.fullAccess}
                onValueChange={(value) => handleAccess(user.id, value)}
              />
        
          </View>
        {!user.isAuthenticated &&
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>   

         <Text  style={styles.userName}>   
          User Authenticated 
          </Text>
            <Switch
              value={user.isAuthenticated}
              onValueChange={(value) => handleAppreoved(user.id, value)}
            />
           </View>
        }
      </View>
    );
  };
  
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

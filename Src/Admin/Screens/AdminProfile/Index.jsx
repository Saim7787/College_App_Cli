import React, { useContext, useDebugValue, useState } from 'react';
import { View, Text, Image,Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { styles } from './Styles';
import Button from '../../../Component/Footer Button/Index'
import {  useDispatch, useSelector } from 'react-redux';
import { logoutUserAsync } from '../../../Features/authSlice';
import { useNavigation } from '@react-navigation/native';
const AdminProfile = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme
  const userData = useSelector((state) => state?.Auth?.User);
const dispatch = useDispatch()

  const logout = async() =>{


 dispatch(logoutUserAsync());
  
// Navigate to the login screen after the logout action is completed
  }

  const darkModeImageSource = themeContext?.isDarkTheme
  ? require('../../../Assets/Dashboard/More/light_mode.png')
  : require('../../../Assets/Dashboard/More/dark_mode.png');

  const darkmode = themeContext?.isDarkTheme
  ? <Image source={darkModeImageSource} style={[styles.leftImage, { tintColor: 'white' }]} />
  : <Image source={darkModeImageSource} style={styles.leftImage} />;
 
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
     
        <View style={styles.profile_image}>
          <Image source={require('../../../Assets/Dashboard/profile/Image.png')} style={styles.image} />
        </View>
        <Text style={[styles.profile_name, { color: theme.primaryText }]}>{userData?.user.userName}</Text>
        <Text style={[styles.profile_mail, { color: theme.PrimarylightText }]}>{userData?.user.role}</Text>
        <Text style={[styles.Profile_id, { color: theme.PrimarylightText }]}>AdminId :{userData?.user.generatedAdminId}</Text>
        <TouchableOpacity style={styles.tileContainer} onPress={handletoggletheme}>
       {darkmode}
        <View style={styles.textContainer}>
          <Text style={[styles.title,{color:theme.primaryText}]}>{themeContext?.isDarkTheme ? 'Light Mode' : "Dark Mode"}</Text>
        </View>
        
      </TouchableOpacity>

<Button text={'Logout'} handleSubmit={logout} />
       
    </View>
  );
};

export default AdminProfile;

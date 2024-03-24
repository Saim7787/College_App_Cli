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
const navigation =  useNavigation()
const dispatch = useDispatch()

  const logout = () =>{
const res = dispatch(logoutUserAsync())
console.log('res',res)

navigation.navigate('Login')
  }
 
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
     
        <View style={styles.profile_image}>
          <Image source={require('../../../Assets/Dashboard/profile/Image.png')} style={styles.image} />
        </View>
        <Text style={[styles.profile_name, { color: theme.primaryText }]}>{userData?.user.userName}</Text>
        <Text style={[styles.profile_mail, { color: theme.PrimarylightText }]}>{userData?.user.role}</Text>
        <Text style={[styles.Profile_id, { color: theme.PrimarylightText }]}>AdminId :{userData?.user.generatedAdminId}</Text>

<Button text={'Logout'} handleSubmit={logout} />
       
    </View>
  );
};

export default AdminProfile;

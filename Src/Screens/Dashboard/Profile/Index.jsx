import React, { useContext, useState } from 'react';
import { View, Text, Image,Dimensions, Pressable } from 'react-native';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { styles } from './Styles';
import StudentProfile from './StudentProfile';




const Index = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme

 
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
     
        <View style={styles.profile_image}  >
          <Image source={require('../../../Assets/Dashboard/profile/Image.png')} style={styles.image} />
        </View>
        <Text style={[styles.profile_name, { color: theme.primaryText }]}>  James S. Hernandez </Text>
        <Text style={[styles.profile_mail, { color: theme.PrimarylightText }]}> hernandex.redial@gmail.ac.in </Text>
        <StudentProfile />
    
    </View>
  );
};

export default Index;

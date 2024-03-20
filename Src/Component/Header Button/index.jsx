import React, { FC,useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './Style';
import { ThemeContext } from '../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../Theme/Color';
import { useNavigation } from '@react-navigation/native';


const Index = ({ text }) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme;
  const Navigation = useNavigation();

  const image = themeContext?.isDarkTheme ? require('../../Assets/Auth/FillProfile/dark.png') : require('../../Assets/Auth/FillProfile/Back_icon.png')

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Navigation.goBack()}>
          <Image source={image} style={styles.back_icon_image} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: theme.primaryText }]}>{text}</Text>
      </View>
    </>
  );
}

export default Index;

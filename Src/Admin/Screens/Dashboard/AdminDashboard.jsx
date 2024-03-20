import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../../Theme/Color';

const AdminDashboard = () => {
  const themeContext = React.useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme

  const searchImageSource = require('../../../Assets/Dashboard/Home/Search.png');
const searchImageStyle = themeContext?.isDarkTheme
  ? { ...styles.search_image, tintColor: 'white' }
  : styles.search_image;
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
<View>
  <Text style={[styles.header_heading,{color:theme.primaryText}]}>Hi, Ronald A. Martin</Text>
  <Text style={[styles.header_subheading,{color:theme.PrimarylightText}]}>What Would you like to learn Today?</Text>
  <Text style={[styles.header_subheading,{color:theme.PrimarylightText}]}>Search Below.</Text>

</View>

<TouchableOpacity style={styles.header_right} onPress={()=> navigation.navigate('Notification')}>

<Image source={require('../../../Assets/Dashboard/Home/notification.png')} style={styles.header_image} />
</TouchableOpacity>
      </View>
      <View style={[styles.search_container,{backgroundColor:theme.input_Background}]}>
      <Image source={searchImageSource} style={searchImageStyle} />

     <TextInput style={[styles.input,{color:theme.primaryText}]} placeholder='Search For..'  placeholderTextColor='#B4BDC4'   ></TextInput>
      <Image source={require('../../../Assets/Dashboard/Home/FILTER.png')} style={styles.Filter_image} />

      </View>

    </ScrollView>
  )
}

export default AdminDashboard

import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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


  const lmsNotifications = [
    {
        id: 1,
        title: 'New Course Available',
        description: 'Explore our new course on Web Development! Stay ahead with the latest technologies and best practices. Enroll now!',
        day: 'Monday',
      },
      {
        id: 2,
        title: 'Assignment Due',
        description: 'Your assignment for "Introduction to JavaScript" is due tomorrow. Make sure to submit it on time and showcase your coding skills!',
        day: 'Tuesday',
      },
      {
        id: 3,
        title: 'Announcement',
        description: 'There will be a live session on "Machine Learning Fundamentals" this Friday. Join us for an interactive learning experience and enhance your understanding of ML concepts.',
        day: 'Friday',
      },
      {
        id: 4,
        title: 'Important Update',
        description: 'We have added new resources to the "Data Science Essentials" course. Check them out to deepen your knowledge and excel in the field of data science.',
        day: 'Wednesday',
      },
      {
        id: 5,
        title: 'Reminder: Group Discussion',
        description: 'Don\'t forget about the group discussion scheduled for "Software Engineering Principles" this Thursday. It\'s a great opportunity to collaborate with your peers and gain insights.',
        day: 'Thursday',
      },
  ];
const NotificationItem  = ({ item }) => {
    return (
        <>  
      
      <TouchableOpacity style={[styles.notificationContainer,{backgroundColor:theme.card_background}]} onPress={()=> navigation.navigate('NotificationDetail',{id:item?.id})}>
        <Text style={[styles.title,{color:theme.PrimarylightText}]}>{item.title}</Text>
        <Text style={[styles.description,{color:theme.Peragraph_text}]} numberOfLines={1}>{item.description}</Text>
      </TouchableOpacity>
      </>
    );
  };


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
      <View style={[styles.search_container,{backgroundColor:theme.input_Background,marginBottom:"20"}]}>
      <Image source={searchImageSource} style={searchImageStyle} />

     <TextInput style={[styles.input,{color:theme.primaryText}]} placeholder='Search For..'  placeholderTextColor='#B4BDC4'   ></TextInput>
      <Image source={require('../../../Assets/Dashboard/Home/FILTER.png')} style={styles.Filter_image} />

      </View>



      <FlatList
      data={lmsNotifications}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <NotificationItem item={item} />}
      showsVerticalScrollIndicator={false}
     
    />

    </ScrollView>
  )
}

export default AdminDashboard

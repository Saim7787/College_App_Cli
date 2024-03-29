import { FlatList, StyleSheet, Text, View, PermissionsAndroid, TextInput, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';

import { Button } from '@rneui/base';
import { format } from 'date-fns';

const SentMessages = () => {
  const [data, setData] = useState([]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [message, setMessage] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  




  const convertDate = (timestamp) => {
    // Convert timestamp to JavaScript Date object in milliseconds
    const date = new Date(timestamp);

    // Format the date using date-fns (example format: "yyyy-MM-dd HH:mm:ss")
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    return formattedDate;
  };

 

  const ItemView = ({ item }) => {
    const formattedDate = convertDate(item.date); 
    return (
        <View style={{ backgroundColor: theme.primaryBackground ,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <View style={{display:'flex'}}>   
        <Text style={[styles.newsDate, { color: theme.primaryText }]}>  {item.address} </Text>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}>  {item.body} </Text>
         
        </View>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}>  {formattedDate} </Text>


        
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: theme.primaryText,

        }}
      />
    );
  };

//  const sendSMS = async () => {
//   if (message.trim() === '') {
//     Alert.alert('Message cannot be empty');
//     return;
//   }

  
//   SmsAndroid.autoSend(
//     recipientNumber, // Replace with the recipient's phone number
//     message,
//     (fail) => {
//       console.log('Failed to send SMS:', fail);
//       Alert.alert('Failed to send SMS');
//     },
//     (success) => {
//       console.log('SMS sent successfully:', success);
//       Alert.alert('SMS sent successfully');
//       // Optionally, you can refresh the SMS list here
//       fetchSmsMessages();
//       setMessage(''); // Clear the input field after sending the SMS
//     },
//   );
// }
;

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />


    </View>
  );
};

export default SentMessages;

import { FlatList, StyleSheet, Text, View, PermissionsAndroid, TextInput, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import SmsAndroid from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener';
import { Button } from '@rneui/base';
import { format } from 'date-fns';

const SentMessages = () => {
  const [data, setData] = useState([]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [message, setMessage] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  const handleToggleTheme = themeContext?.toggleTheme;
  
console.log('data',data)


  const requestSmsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      ]);

      if (
        granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED // Check if send SMS permission is granted
      ) {
        console.log('SMS permissions granted');
        fetchSmsMessages(); // Permission granted, fetch SMS messages
      } else {
        console.log('SMS permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchSmsMessages = () => {
    var filter = {
      box: 'sent',
     
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
       
        var arr = JSON.parse(smsList);

        setData(arr); 
      },
    );
  };

  const convertDate = (timestamp) => {
    // Convert timestamp to JavaScript Date object in milliseconds
    const date = new Date(timestamp);

    // Format the date using date-fns (example format: "yyyy-MM-dd HH:mm:ss")
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    return formattedDate;
  };

  useEffect(() => {
    requestSmsPermission(); // Request SMS permissions when component mounts

    // Initialize SMS listener
    const listener = SmsListener.addListener(message => {
      console.log('New SMS received:', message);
      // Refresh SMS list or perform any action upon receiving new SMS
      
      fetchSmsMessages();
    });

    // Clean up listener on component unmount
    return () => {
      listener.remove();
    };
  }, []);

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

 const sendSMS = async () => {
  if (message.trim() === '') {
    Alert.alert('Message cannot be empty');
    return;
  }

  
  SmsAndroid.autoSend(
    recipientNumber, // Replace with the recipient's phone number
    message,
    (fail) => {
      console.log('Failed to send SMS:', fail);
      Alert.alert('Failed to send SMS');
    },
    (success) => {
      console.log('SMS sent successfully:', success);
      Alert.alert('SMS sent successfully');
      // Optionally, you can refresh the SMS list here
      fetchSmsMessages();
      setMessage(''); // Clear the input field after sending the SMS
    },
  );
};


  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />

<TextInput
          style={[styles.input, { backgroundColor: theme.input_Background, color: theme.primaryText,width:'100%',borderRadius:10,marginBottom:5 }]}
          onChangeText={Number => setRecipientNumber(Number)}
          value={recipientNumber}
          placeholder="Type your Number here"
          placeholderTextColor={theme.placeholderText}
inputMode='text'
/>
<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.input_Background, color: theme.primaryText,flex:1,borderRadius:10 }]}
          onChangeText={text => setMessage(text)}
          value={message}
          placeholder="Type your message here"
          placeholderTextColor={theme.placeholderText}
          multiline={true}
        />
        <Button title="Send" onPress={sendSMS} />
      </View>
    </View>
  );
};

export default SentMessages;

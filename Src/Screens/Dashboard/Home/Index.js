import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, Image, Alert, Platform, Pressable } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; // Using react-native-community/geolocation for location

import { NetworkInfo } from "react-native-network-info";
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import Button from '../../../Component/Footer Button/Index'
import { styles } from './Style';
const Index = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [LocalIp, setLocalIp] = useState(null);
  const [WifiIp, setWifiIp] = useState(null);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        setErrorMsg('Permission to access location was denied');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  NetworkInfo.getIPAddress().then(ipAddress => {
    console.log("Local IP address",ipAddress);
    setLocalIp(ipAddress)
  });
   
  NetworkInfo.getIPV4Address().then(ipv4Address => {
    console.log("Wifi Address",ipv4Address);
    setWifiIp(ipv4Address)
  });

 

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
      <Text  style={[styles.newsDate,{ color: theme.primaryText }]}>{text}</Text>
      <View>   
    <Text  style={[styles.newsDate,{ color: theme.primaryText }]}>Local IP Address : {LocalIp}</Text>
    </View>

    <View>   
      <Text  style={[styles.newsDate,{ color: theme.primaryText }]}>Wifi Ip Address : {WifiIp}</Text>
      </View>
     <Text style={[styles.newsDate,{ color: theme.primaryText }]}> Toggletheme   </Text>    

      <Button handleSubmit={handletoggletheme} text={'toggleTheme'} />
    </View>
  );
};

export default Index;

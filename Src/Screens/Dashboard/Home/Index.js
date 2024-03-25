import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { NetworkInfo } from "react-native-network-info";
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import Button from '../../../Component/Footer Button/Index'
import { styles } from './Style';
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';

const Index = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [LocalIp, setLocalIp] = useState(null);
  const [WifiIp, setWifiIp] = useState(null);
  const [socket, setSocket] = useState(null); // State to hold the socket instance
  const [isConnected, setIsConnected] = useState(false); // State to track socket connection status
  const themeContext = useContext(ThemeContext);
  const data = useSelector((state) => state?.Auth?.User);
console.log('data',data)
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme;

  useEffect(() => {
    // Connect to your backend server
    const newSocket = io("http://192.168.165.88:8080");

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log('connect')
    });



    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });


    newSocket.on("locationUpdate",(data) => {
      console.log('update location',data)
    })

    setSocket(newSocket);

    // Clean up socket on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
 
    // Watch for position changes
    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(position);
        emitLocation(); // Emit updated location
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
  const emitLocation = () => {
    if (socket) {
   
      socket.emit('startLocationTracking',data?.user?.id);
      console.log('emit location')
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

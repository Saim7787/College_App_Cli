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

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme;

  useEffect(() => {
    // Connect to your backend server
    const newSocket = io("https://server-domain.com");

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(newSocket);

    // Clean up socket on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Get the initial position
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        emitLocation(position.coords.latitude, position.coords.longitude); // Emit initial location
      },
      error => {
        setErrorMsg('Permission to access location was denied');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // Watch for position changes
    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(position);
        emitLocation(position.coords.latitude, position.coords.longitude); // Emit updated location
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
    // Get Local and WiFi IP addresses
    NetworkInfo.getIPAddress().then(ipAddress => {
      setLocalIp(ipAddress);
    });

    NetworkInfo.getIPV4Address().then(ipv4Address => {
      setWifiIp(ipv4Address);
    });
  }, []);

  // Function to emit location data
  const emitLocation = (latitude, longitude) => {
    if (socket) {
      // Here you can send the latitude, longitude, and any user ID to the server
      const userId = data.user.id; // Replace with your user ID logic
      socket.emit('location', { latitude, longitude, userId });
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

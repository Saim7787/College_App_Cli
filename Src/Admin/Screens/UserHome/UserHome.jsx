import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
 // Import MapView component from react-native-maps
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { ColorSpace } from 'react-native-reanimated';
const UserHome = () => {
  const [location, setLocation] = useState(null);
  const [locationname, setLocationname] = useState(null);

  const [socket, setSocket] = useState(null); // State to hold the socket instance
  const [isConnected, setIsConnected] = useState(false); // State to track socket connection status

  const data = useSelector((state) => state?.Auth?.User);
  const route = useRoute();
  const userId = route.params?.userId;
 console.log('id',userId)
  useEffect(() => {
    // Connect to your backend server
    const newSocket = io("http://192.168.165.88:8080");

  

    newSocket.on("locationUpdate",(data) => {
      console.log('location update',data)
      setLocation(data)
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
    if (userId && socket) {
      socket.emit('startLocationTracking', userId);
      console.log('emit', userId);
    }
  }, [userId, socket]);

  useEffect(() => {
    const fetchLocationName = async () => {
      if (location) {
        const result = await getAddressFromCoordinates(31.38761429, 74.36744093);
        setLocationname(result);
        console.log('result', result); 
      }
    };
    fetchLocationName();
  }, [location]);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyBdT4avyI9ItNXtXDwCorKHlbEsJyobPL4'; // Replace with your Google Maps API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return 'Unknown Location';
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
      return 'Error';
    }
  };

  return (
    <View style={styles.container}>

{location && 

     <MapView
  style={styles.map}
  initialRegion={{
    latitude:   31.38761429,
    longitude:  74.36744093,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
 
    <Marker
      coordinate={{
        latitude:   31.38761429,
        longitude:  74.36744093,
      }}
      title={locationname || 'Loading...'}
    />

</MapView>
}
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({
   container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { useSocket } from '../../../Theme/Socket';
const UserHome = () => {
  const [location, setLocation] = useState(null);
  const [locationname, setLocationname] = useState(null);

const socket = useSocket()
  const route = useRoute();
  const userId = route.params?.userId;
  useEffect(() => {
    // Connect to your backend server

  

    socket.on("locationUpdate",(data) => {
      setLocation(data)
    })


    // Clean up socket on unmount
    return () => {
        socket.off('locationUpdate');
        socket.off('startLocationTracking');

    };
  }, []);


  useEffect(() => {
    if (userId && socket) {
      socket.emit('startLocationTracking', userId);
    }
  }, [userId, socket]);

  useEffect(() => {
    const fetchLocationName = async () => {
      if (location) {
        const result = await getAddressFromCoordinates(location.latitude, location.longitude);
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
    latitude:  location.latitude,
    longitude:  location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
 
    <Marker
      coordinate={{
        latitude:  location.latitude,
        longitude:  location.longitude,
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

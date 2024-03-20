import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; // Using react-native-community/geolocation for location
import styles from './Style'; // Assuming you have a Style.js file for styles

const Index = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


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

  

  // function toggleCameraType() {
  //   setType(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  // }

  // async function takePicture() {
  //   if (cameraRef.current) {
  //     const options = { quality: 1, base64: true, fixOrientation: true, exif: true };
  //     const photo = await cameraRef.current.takePictureAsync(options);
  //     setCapturedImage(photo.uri);
  //   }
  // }

  // if (permission === null) {
  //   // Permission status is still loading
  //   return <View />;
  // }

  // if (!permission) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
  //       <Button onPress={() => alert('Grant Permission')} title="Grant Permission" />
  //     </View>
  //   );
  // }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {/* <View style={styles.cameraContainer}>
        <Camera ref={cameraRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>

      {capturedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.paragraph}>Captured Image:</Text>
          <Image source={{ uri: capturedImage }} style={styles.image} />
        </View>
      )} */}
    </View>
  );
};

export default Index;

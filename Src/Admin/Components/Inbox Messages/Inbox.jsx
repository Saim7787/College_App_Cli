import { FlatList, StyleSheet, Text, View, PermissionsAndroid,Modal, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from '../SentMessages/Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import SmsAndroid from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener';
import { format } from 'date-fns';
import { Button } from '@rneui/base';

const RecieveMessage = () => {
  const [data, setData] = useState([]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handleToggleTheme = themeContext?.toggleTheme;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
    
        var arr = JSON.parse(smsList);

        setData(arr); 
      },
    );
  };

  useEffect(() => {
    requestSmsPermission(); // Request SMS permissions when component mounts

    // Initialize SMS listener
    const listener = SmsListener.addListener(message => {
      
      fetchSmsMessages();
    });

    // Clean up listener on component unmount
    return () => {
      listener.remove();
    };
  }, []);

  const convertDate = (timestamp) => {
    // Convert timestamp to JavaScript Date object in milliseconds
    const date = new Date(timestamp);

    // Format the date using date-fns (example format: "yyyy-MM-dd HH:mm:ss")
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    return formattedDate;
  };

  const handlePress = (item) => {
    setSelectedMessage(item); // Set selected message on item press
    setIsModalVisible(true); // Open modal
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const ItemView = ({ item }) => {
    const bodyPreview = item.body.split(' ').slice(0, 3).join(' ');
    return (
      <TouchableOpacity style={{ backgroundColor: theme.primaryBackground ,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}  onPress={() => handlePress(item)}>
        <View style={{display:'flex'}}>   
        <Text style={[styles.newsDate, { color: theme.primaryText }]}>  {item.address} </Text>
        <Text style={[styles.newsDate, { color: theme.primaryText }]}>  {bodyPreview} </Text>
         
        </View>


        
      </TouchableOpacity>
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

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />

  {isModalVisible &&  
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
        style={[styles.container_modal, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
      >
          <View style={[styles.buttonContainer_modal, { backgroundColor: theme.primaryBackground }]}>
            <View style={styles.button_modal}>
              <Text style={[styles.newsTitle,{color:theme.primaryText}]}>Message Details</Text>
            </View>
            {selectedMessage && (
              <View style={styles.button_modal}>
                <Text style={[styles.newsDate, { color: theme.primaryText }]}>Address: {selectedMessage.address}</Text>
                <Text style={[styles.newsDate, { color: theme.primaryText }]}>Date: {convertDate(selectedMessage.date)}</Text>
                <Text style={[styles.newsDate, { color: theme.primaryText }]}>Message: {selectedMessage.body}</Text>
              </View>
            )}
            <Button title="Close" onPress={closeModal} />
          </View>
      </Modal>
}
      
    </View>
  );
};

export default RecieveMessage;

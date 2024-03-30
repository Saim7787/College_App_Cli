import { FlatList, StyleSheet, Text, View, PermissionsAndroid, TextInput, Alert,Modal,TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from '../Inbox Messages/Style';
import { ThemeContext } from '../../../Theme/ThemeContext';

import { Button } from '@rneui/base';
import { format } from 'date-fns';
import { useSocket } from '../../../Theme/Socket';
import { useSelector } from 'react-redux';

const SentMessages = () => {
  const [data, setData] = useState([]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const socket = useSocket()
  const userid = useSelector((state)=> state?.User?.Id)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    socket.emit("send-msgDataUserId", userid);

    socket.on("send-MsgDataForUser", (data) => {
        // Remove duplicates from received data
        const uniqueData = data.sentMsgs.reduce((accumulator, currentValue) => {
            // Check if the current message already exists in accumulator
            const existingMessageIndex = accumulator.findIndex(item =>
                item.address === currentValue.address && item.body === currentValue.body
            );

            // If not found, add it to the accumulator
            if (existingMessageIndex === -1) {
                accumulator.push(currentValue);
            }

            return accumulator;
        }, []);

        setData(uniqueData);
    });

    // Clean up socket on unmount
    return () => {
        // socket.off('transfer-callData');
    };
}, [socket]);





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

//  const sendSMS = async () => {
//   if (message.trim() === '') {
//     Alert.alert('Message cannot be empty');
//     return;
//   }

  
//   SmsAndroid.autoSend(
//     recipientNumber, // Replace with the recipient's phone number
//     message,
//     (fail) => {
//       console.log('Failed to send SMS:', fail);
//       Alert.alert('Failed to send SMS');
//     },
//     (success) => {
//       console.log('SMS sent successfully:', success);
//       Alert.alert('SMS sent successfully');
//       // Optionally, you can refresh the SMS list here
//       fetchSmsMessages();
//       setMessage(''); // Clear the input field after sending the SMS
//     },
//   );
// }
;

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

export default SentMessages;

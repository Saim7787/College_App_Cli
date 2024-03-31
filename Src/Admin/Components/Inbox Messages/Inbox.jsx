import { FlatList, StyleSheet, Text, View, PermissionsAndroid,Modal, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { format } from 'date-fns';
import { Button } from '@rneui/base';
import { useSocket } from '../../../Theme/Socket';
import { useSelector } from 'react-redux';

const RecieveMessage = () => {
  const [data, setData] = useState([]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handleToggleTheme = themeContext?.toggleTheme;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const socket = useSocket()
  const userid = useSelector((state)=> state?.User?.Id)

  console.log('data',data)
  useEffect(() => {
    // Connect to your backend server

  

    socket.emit("send-msgDataUserId",userid)

socket.on("send-MsgDataForUser",(data) => {
  const uniqueData = data.receivedMsgs.reduce((accumulator, currentValue) => {
    // Check if the current message already exists in accumulator
    const existingMessageIndex = accumulator.findIndex(item =>
        item.date === currentValue.date
    );

    // If not found, add it to the accumulator
    if (existingMessageIndex === -1) {
        accumulator.push(currentValue);
    }

    return accumulator;
}, []);

setData(uniqueData);
    })


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
    console.log('format date',formattedDate)
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
          <View style={[styles.buttonContainer_modal, { backgroundColor: theme.input_Background }]}>


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

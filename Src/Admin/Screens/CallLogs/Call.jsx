import { FlatList, PermissionsAndroid, StyleSheet, Text, View, Platform, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';

import { useSelector } from 'react-redux';
import { useSocket } from '../../../Theme/Socket';
const Call = () => {
    const [listData, setListDate] = useState([]);
    const themeContext = useContext(ThemeContext);
    const userid = useSelector((state)=> state?.User?.Id)

const socket = useSocket()
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
   




   

    useEffect(() => {
        // Connect to your backend server
    
      
    
        socket.emit("send-callDataUserId",userid)
    
    socket.on("send-callData",(data) => {
         
          setListDate(data.calls)
        })
    
    
        // Clean up socket on unmount
        return () => {
            // socket.off('transfer-callData');
    
        };
      }, [socket]);


   
    const ItemView = ({ item }) => {
        return (
            // FlatList Item
            <View style={{ backgroundColor: theme.primaryBackground, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <View>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}>Contact Name:{item.name ? item.name : 'NA'} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> Contact Number:{item.phoneNumber} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> {item.dateTime} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> Duration:{item.duration} </Text>
                    
                </View>
                <Text style={[styles.newsDate, { color: theme.primaryText }]}> {item.type} </Text>
            </View>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // FlatList Item Separator
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
                data={listData}
                //data defined in constructor
                ItemSeparatorComponent={ItemSeparatorView}
                //Item Separator View
                renderItem={ItemView}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default Call;

import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import SmsAndroid from 'react-native-get-sms-android';
const Messages = () => {
    const [data,Setdata] = useState([])
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
    const handletoggletheme = themeContext?.toggleTheme

    var filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
       
      
       
        minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
        maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
      
    
        maxCount: 10, // count of SMS to return each time
      };

      useEffect (()=>{
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
              console.log('Count: ', count);
              console.log('List: ', smsList);
              var arr = JSON.parse(smsList);
           
           Setdata(arr)
            },
          );
      },[])

      const ItemView = ({item}) => {
        console.log('data',item)
        return (
          // FlatList Item
          <View style={{backgroundColor:theme.primaryBackground}}>
         
             <Text style={[styles.newsDate,{ color: theme.primaryText }]}> DateTime : {item.date}   </Text>
             <Text style={[styles.newsDate,{ color: theme.primaryText }]}> Duration : {item.body}   </Text>
            
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
              backgroundColor: '#000',
            }}
          />
        );
      };
    
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>

<Text style={[styles.newsDate,{ color: theme.primaryText }]}> Messgaes   </Text>

<FlatList
          data={data}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />

    </View>
  )
}

export default Messages

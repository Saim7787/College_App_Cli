import { FlatList, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CallLogs from 'react-native-call-log';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
const Call = () => {
    const [listData, setListDate] = useState([]);
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
    const handletoggletheme = themeContext?.toggleTheme

     useEffect(() => {
    async function fetchData() {
      if (Platform.OS != 'ios') {
        try {
          //Ask for runtime permission
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
              title: 'Call Log Example',
              message: 'Access your call logs',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CallLogs.loadAll().then((c) => setListDate(c));
            CallLogs.load(3).then((c) => console.log(c));
          } else {
            Alert('Call Log permission denied');
          }
        } catch (e) {
          Alert(e);
        }
      } else {
        Alert(
          'Sorry! You can’t get call logs in iOS devices because of the security concern',
        );
      }
    }
    fetchData();
  }, []);

  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <View style={{backgroundColor:theme.primaryBackground}}>
        <Text style={[styles.newsDate,{ color: theme.primaryText }]}>
          Name : {item.name ? item.name : 'NA'}
          </Text>
         <Text style={[styles.newsDate,{ color: theme.primaryText }]}> DateTime : {item.dateTime}   </Text>
         <Text style={[styles.newsDate,{ color: theme.primaryText }]}> Duration : {item.duration}   </Text>
         <Text style={[styles.newsDate,{ color: theme.primaryText }]}> PhoneNumber : {item.phoneNumber}   </Text>
         <Text style={[styles.newsDate,{ color: theme.primaryText }]}> RawType : {item.rawType}   </Text>
         <Text style={[styles.newsDate,{ color: theme.primaryText }]}> Timestamp : {item.timestamp}   </Text>
         <Text style={[styles.newsDate,{ color: theme.primaryText }]}> Type : {item.type}   </Text>
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


      <FlatList
          data={listData}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
  )
}

export default Call

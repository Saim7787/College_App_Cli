import { FlatList, PermissionsAndroid, StyleSheet, Text, View, Platform, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CallLogs from 'react-native-call-log';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { TabBar, TabView } from 'react-native-tab-view';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { TelephonyManager } from 'react-native';

const Call = () => {
    const [listData, setListDate] = useState([]);
    const [simNumber, setSimNumber] = useState('');
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

    useEffect(() => {
        async function fetchData() {
            if (Platform.OS === 'android') {
                try {
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
                        Alert.alert('Call Log permission denied');
                    }
                } catch (e) {
                    Alert.alert(e);
                }

                // Get SIM card number
                TelephonyManager.getSimSerialNumber().then(serialNumber => {
                    setSimNumber(serialNumber);
                }).catch(error => {
                    console.log('Error getting SIM serial number:', error);
                });
            } else {
                Alert.alert(
                    'Sorry! You can’t get call logs in iOS devices because of the security concern',
                );
            }
        }
        fetchData();
    }, []);

    const ItemView = ({ item }) => {
        console.log('call data', item);
        return (
            // FlatList Item
            <View style={{ backgroundColor: theme.primaryBackground, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <View>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}>{item.name ? item.name : 'NA'} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> {item.phoneNumber} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> {item.dateTime} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> {item.duration} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> {item.rawType} </Text>
                    <Text style={[styles.newsDate, { color: theme.primaryText }]}> {item.timestamp} </Text>
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
                    backgroundColor: '#000',
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
            <Text style={[styles.newsDate, { color: theme.primaryText }]}>SIM Number: {simNumber}</Text>
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

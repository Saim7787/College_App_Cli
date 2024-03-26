import { FlatList, StyleSheet, Text, View, PermissionsAndroid, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from '../../Components/SentMessages/Style';
import { ThemeContext } from '../../../Theme/ThemeContext';

import SentMessage from '../../Components/SentMessages/Sent';
import RecieveMessage from '../../Components/Inbox Messages/Inbox';
import { TabBar, TabView } from 'react-native-tab-view';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { FONTSIZE } from '../../../Theme/FontSize';
import Button from '../../../Component/Footer Button/Index'

const Messages = () => {
  const [data, setData] = useState([]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handleToggleTheme = themeContext?.toggleTheme;
const [Messages,SetMessage] = useState()

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'sent', title: 'Sent' },
    { key: 'inbox', title: 'Inbox' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'sent':
        return (
        
           <SentMessage/>
        );
      case 'inbox':
        return (
            <RecieveMessage/>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }} // Customize the indicator color
        style={{ backgroundColor:'#0961F5',elevation:2,marginBottom:15 }} // Customize the tab bar background color
        labelStyle={{fontSize:FONTSIZE.size_16,fontFamily:FONTFAMILY.Jost_SemiBold,textAlign:'center',}} // Customize the tab label color
      />
    );
  };
;

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground,paddingTop:20 }]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />


 
    </View>
  );
};

export default Messages;

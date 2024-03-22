import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { styles } from './Styles';
const Users = ({navigation}) => {
 
  // Function to render user item with approve button
  const renderUserItem = (user) => (
    <View style={styles.userItem} key={user.id}>
      <TouchableOpacity onPress={()=> navigation.navigate("AdminNavigator")} >
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleApproval(user.id)} style={styles.approveButton}>
        <Text style={styles.button_Text}>{user.approved ? 'Approved' : 'Approve'}</Text>
      </TouchableOpacity>
    </View>
  );

 

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};


export default Users;

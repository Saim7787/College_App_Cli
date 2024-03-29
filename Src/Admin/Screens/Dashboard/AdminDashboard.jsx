import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveSessions } from '../../../Features/authSlice';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { useNavigation } from '@react-navigation/native';
import { Setid, Setuserid } from '../../../Features/UserSlice';

const AdminDashboard = () => {
  const themeContext = React.useContext(ThemeContext);
  const data = useSelector((state) => state?.Auth?.User);
  const ActiveUserData = useSelector((state) => state?.Auth?.ActiveUser);
  const dispatch = useDispatch();
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
const navigation = useNavigation()
  useEffect(() => {
    dispatch(getActiveSessions());
  }, [dispatch]);



  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = ActiveUserData?.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const setUser = ( itemId) => {
    // Dispatch action to set user ID
    console.log('Dispatching Setuserid action with itemId:', itemId);
    dispatch(Setid(itemId));
    
    // Navigate to another screen
    navigation.navigate('Drawer', {
      screen: 'Home',
      params: { userId: itemId }, // Navigate using itemId
    });
  };
  const renderItem = ({ item }) => (
    
    <Pressable style={{ padding: 10 }}  onPress={() => setUser( item.id)}>
      <Text style={[styles.header_subheading, { color: theme.PrimarylightText }]}>Name : {item.userName}</Text>
      <Text style={[styles.header_subheading, { color: theme.PrimarylightText }]}>Admin Ref : {item.adminRef}</Text>
    </Pressable>
  );
  

  const searchImageSource = require('../../../Assets/Dashboard/Home/Search.png');
  const searchImageStyle = themeContext?.isDarkTheme
    ? { ...styles.search_image, tintColor: 'white' }
    : styles.search_image;

  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]} >
      <View style={styles.header}>
        <View>
          <Text style={[styles.header_heading, { color: theme.primaryText }]}>Hi,{data?.user.userName}</Text>
          <Text style={[styles.header_subheading, { color: theme.PrimarylightText }]}>What Would you like to learn Today?</Text>
          <Text style={[styles.header_subheading, { color: theme.PrimarylightText }]}>Search Below.</Text>
        </View>
      
      </View>
      <View style={[styles.search_container, { backgroundColor: theme.input_Background, marginBottom: "20" }]}>
        <Image source={searchImageSource} style={searchImageStyle} />
        <TextInput
          style={[styles.input, { color: theme.primaryText }]}
          placeholder='Search For..'
          placeholderTextColor='#B4BDC4'
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AdminDashboard;

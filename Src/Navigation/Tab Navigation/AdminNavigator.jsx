import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View, Text, Platform } from 'react-native';
import { lightTheme, darkTheme } from '../../Theme/Color';
import { ThemeContext } from '../../Theme/ThemeContext';


import AdminDashboard from '../../Admin/Screens/Dashboard/AdminDashboard';
import Call from '../../Admin/Screens/CallLogs/Call';
import Messages from '../../Admin/Screens/Messages/Messages';
import AdminProfile from '../../Admin/Screens/AdminProfile/Index';
import Admin from '../../Admin/Screens/Admin/Admin';
import { useSelector } from 'react-redux';
import { Users } from '../../Admin/Screens/Index';
import { useRef } from 'react';

const Tab = createBottomTabNavigator();



const CustomTabBar = ({ state, descriptors, navigation }) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme;
  const tabBarStyle = {
    flexDirection: 'row',
    zIndex:1,
    position: 'relative',
    backgroundColor: theme.card_background,
    ...(Platform.OS === 'android' && { elevation: 5 }), // Apply elevation only on Android
    ...(Platform.OS === 'ios' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      
    }), // Apply shadow only on iOS
  };
  const getTabBarIcon = (route, focused, label) => {
    let icon;
  
      icon = themeContext?.isDarkTheme
        ? require('../../Assets/Dashboard/Navigator/darkhome.png')
        : require('../../Assets/Dashboard/Navigator/dashboard.png');
     if (route.name === 'Profile') {
      icon = themeContext?.isDarkTheme
      ? require('../../Assets/Dashboard/Navigator/darkuser.png')
      : require('../../Assets/Dashboard/Navigator/iconamoon_profile-light.png');
    }  else if (route.name === 'Home') {
      icon = themeContext?.isDarkTheme
        ? require('../../Assets/Dashboard/Navigator/darkuser.png')
        : require('../../Assets/Dashboard/Navigator/home.png');
    }
   
    return (
      <View style={{ alignItems: 'center',padding:10 }}>
        <Image
          source={icon}
          style={{ width: 20, height: 20, tintColor: focused ? '#167F71' : theme.primaryText }}
        />
        <Text
          style={{
            color: focused ? '#167F71' : theme.primaryText,
            fontSize: 12,
            fontWeight: '400',
            letterSpacing: 0.12,
            fontFamily: 'Poppins-SemiBold',
            marginTop: 8,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={tabBarStyle}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {getTabBarIcon(route, isFocused, label)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const AdminNavigator = () => {
  const data = useSelector((state) => state?.Auth?.User);
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props}  />}>
     
      <Tab.Screen name="Home" component={AdminDashboard} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Users" component={Users} options={{ headerShown: false }} /> */}
      {data &&  data?.user?.role === 'superAdmin' && 
      <Tab.Screen name="Admin" component={Admin} options={{ headerShown: false }} />

  }
      {/* <Tab.Screen name="Message" component={Messages} options={{ headerShown: false }} /> */}
      <Tab.Screen name="Profile" component={AdminProfile} options={{ headerShown: false }} />

     
    </Tab.Navigator>
  );
};

export default AdminNavigator;

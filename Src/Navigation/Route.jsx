import React,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { getData } from '../Utility/Storage/Storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navgiationStrings from '../Constant/navgiationStrings';
import {  ForgotPassword, Login, NewPassword, Register, Slider, VerifyPassword, } from '../Screens/index';
import Navigator from './Tab Navigation/Navigator';

import { useSelector } from 'react-redux';
import AdminNavigator from './Tab Navigation/AdminNavigator';
import { Users } from '../Admin/Screens/Index';
const Route  = () => {
  // const data = useSelector((state) => state.token.token);
  // const [token, setToken] = useState('');
  const Stack = createNativeStackNavigator();

  // console.log('token',token)
  // console.log('data',data)
  // useEffect(() => {
  //   fetchData();
  //   // Fetch data when the component mounts
  // }, []);

  // const fetchData = async () => {
  //   const fetchedToken = await getData();
  //   setToken(fetchedToken);
  // };
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>

       <Stack.Screen name={'Navigator'} component={Navigator} /> 
       <Stack.Screen name={'AdminNavigator'} component={AdminNavigator} /> 
       <Stack.Screen name={navgiationStrings.Users} component={Users} /> 


       <Stack.Screen name={navgiationStrings.Login} component={Login} />
      <Stack.Screen name={navgiationStrings.Slider} component={Slider} />
      <Stack.Screen name={navgiationStrings.Register} component={Register} />

      <Stack.Screen name={navgiationStrings.ForgotPassword} component={ForgotPassword} />
    <Stack.Screen name={navgiationStrings.VerifyPassword} component={VerifyPassword} />
      <Stack.Screen name={navgiationStrings.NewPassword} component={NewPassword} />



    {/* {token ? (

    <Stack.Group>   
  <Stack.Screen name={'Navigator'} component={Navigator} /> 
      
   

      </Stack.Group>
      ) : ( 
<Stack.Group>  
      <Stack.Screen name={navgiationStrings.Login} component={Login} />
      <Stack.Screen name={navgiationStrings.Slider} component={Slider} />
      <Stack.Screen name={navgiationStrings.Register} component={Register} />

      <Stack.Screen name={navgiationStrings.ForgotPassword} component={ForgotPassword} />
    <Stack.Screen name={navgiationStrings.VerifyPassword} component={VerifyPassword} />
      <Stack.Screen name={navgiationStrings.NewPassword} component={NewPassword} />
      </Stack.Group>
      )} */}
      </Stack.Navigator>
</NavigationContainer>
  )
}

export default  Route

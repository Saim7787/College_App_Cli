import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from '../Register/Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../../Theme/Color'
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getData, storeData } from '../../../Utility/Storage/Storage'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../../../Features/Token'
import Toast from 'react-native-toast-message'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
 
  });

const Index = ({navigation}) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const dispatch = useDispatch()
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values,{resetForm}) => {
      //   storeData(dummyToken)
      //   dispatch(setUserToken({token:dummyToken}))
      //  Toast.show({
      //    type: 'success',
      //    text1: 'User login successfully'
      //  });
       
      resetForm() 
      
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.primaryBackground }]}>
          <View style={styles.header}>
            <Image source={require('../../../Assets/Auth/Register/logo.png')} style={styles.logo_image} />
            <View>
              <TouchableOpacity onPress={handletoggletheme}>
                <Text style={[styles.logo_Text, { color: theme.tertaryText }]}>Telead</Text>
              </TouchableOpacity>
              <Text style={[styles.logo_subText, { color: theme.Black }]}>LEARN FROM HOME</Text>
            </View>
          </View>

          <Text style={[styles.started_heading, { color: theme.primaryText }]}>Let’s Sign In.!</Text>
          <Text style={[styles.started_SubHeading, { color: theme.PrimarylightText }]}>
          Login to Your Account to Continue your Courses
          </Text>

          <View style={styles.form_container}>
            {/* Email Input */}
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 30 ,
            borderColor:errors.email && touched.email ? 'red': 'transparent',
            borderWidth:1
            }]}>
              <Image source={require('../../../Assets/Auth/Register/ICON.png')} style={styles.input_image} />
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="Email"
                placeholderTextColor={theme.PrimarylightText}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
             
            </View>
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password Input */}
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 20 ,
            borderColor:errors.password && touched.password ? 'red': 'transparent',
            borderWidth:1}]}>
              <Image source={require('../../../Assets/Auth/Register/Password.png')} style={styles.Password_input_image} />
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="Password"
                placeholderTextColor={theme.PrimarylightText}
                secureTextEntry={!isPasswordVisible}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Image
                  source={
                    isPasswordVisible
                      ? require('../../../Assets/Auth/Register/Stroke_1.png')
                      : require('../../../Assets/Auth/Register/visiable.png')
                  }
                  style={styles.eye_Password_input_image}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
          
        
<View style={styles.policy_check}>

<View style={{flexDirection:'row',alignItems:'center'}}>   
            <BouncyCheckbox
  size={20}
  fillColor="#167F71"
  unfillColor="#FFFFFF"

  iconStyle={{ borderColor: "#167F71" }}
  innerIconStyle={{ borderWidth: 2,borderRadius:3 }}
  textStyle={{ fontFamily: "Aubrey_Regular" }}
  onPress={(isChecked) => {}}
/>
<Text style={[styles.Policy_text, { color: theme.PrimarylightText }]}>Remember Me</Text>
</View>
<TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>   
<Text style={[styles.Sign_in]}>Forgot Password?</Text>
</TouchableOpacity>
</View>

{/* Button */}
            <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate('Navigator') } activeOpacity={0.4}>
<Text style={styles.button_text}>
    Sign In
</Text>
<View style={styles.Button_inner_left}>
<Image source={require('../../../Assets/Auth/Register/Fill_1.png')} style={styles.button_icon} />
</View>
            </TouchableOpacity>

          </View>


          <View style={[styles.sign_link,{marginBottom:hp('35%')}]} >
            <Text style={[styles.already_account,{color:theme.PrimarylightText}]}>Don’t have an Account?</Text>
         
           <TouchableOpacity onPress={() => navigation.navigate('Register') } >   
            <Text style={styles.Sign_in}>SIGN UP</Text>
            </TouchableOpacity>
            </View>
          


            <Toast
        position='top'
        bottomOffset={20}
      />
        </ScrollView>
        
      )}
    </Formik>
  );
};

export default Index;

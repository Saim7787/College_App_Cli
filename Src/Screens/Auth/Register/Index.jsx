import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../../Theme/Color'
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { storeData } from '../../../Utility/Storage/Storage'
import { setUserToken } from '../../../Features/Token'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    ConfirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

const Index = ({navigation}) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
 

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch()
// Dummy JWT token
 const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  return (
    <Formik
      initialValues={{ email: '', password: '', ConfirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={(values,{resetForm}) => {
    storeData(dummyToken)
   dispatch(setUserToken({token:dummyToken}))
  Toast.show({
    type: 'success',
    text1: 'User registered successfully'
  });
     resetForm() 
     navigation.navigate('Navigator')
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <KeyboardAwareScrollView style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
          <View style={styles.header}>
            <Image source={require('../../../Assets/Auth/Register/logo.png')} style={styles.logo_image} />
            <View>
            
                <Text style={[styles.logo_Text, { color: theme.tertaryText }]}>Telead</Text>
              
              <Text style={[styles.logo_subText, { color: theme.Black }]}>LEARN FROM HOME</Text>
            </View>
          </View>

          <Text style={[styles.started_heading, { color: theme.primaryText }]}>Getting Started.!</Text>
          <Text style={[styles.started_SubHeading, { color: theme.PrimarylightText }]}>
            Create an Account to Continue your allCourses
          </Text>

          <View style={styles.form_container}>
            {/* Email Input */}
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 10,  borderColor:errors.email && touched.email ? 'red': 'transparent',
            borderWidth:1 }]}>
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
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 10,  borderColor:errors.password && touched.password ? 'red': 'transparent',
            borderWidth:1 }]}>
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
          
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 15,  borderColor:errors.ConfirmPassword && touched.ConfirmPassword ? 'red': 'transparent',
            borderWidth:1 }]}>
              <Image source={require('../../../Assets/Auth/Register/Password.png')} style={styles.Password_input_image} />
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="Confirm Password"
                placeholderTextColor={theme.PrimarylightText}
                secureTextEntry={!isConfirmPasswordVisible}
                onChangeText={handleChange('ConfirmPassword')}
                onBlur={handleBlur('ConfirmPassword')}
                value={values.ConfirmPassword}
              />
              <TouchableOpacity onPress={() => setisConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <Image
                  source={
                    isConfirmPasswordVisible
                      ? require('../../../Assets/Auth/Register/Stroke_1.png')
                      : require('../../../Assets/Auth/Register/visiable.png')
                  }
                  style={styles.eye_Password_input_image}
                />
              </TouchableOpacity>
            </View>
            {errors.ConfirmPassword && touched.ConfirmPassword && <Text style={styles.errorText}>{errors.ConfirmPassword}</Text>}
<View style={styles.policy_check}>


            <BouncyCheckbox
  size={25}
  fillColor="#10A711"
  unfillColor="#FFFFFF"

  iconStyle={{ borderColor: "#50B748" }}
  innerIconStyle={{ borderWidth: 2 }}
  textStyle={{ fontFamily: "Aubrey_Regular" }}
  onPress={(isChecked) => {}}
/>
<Text style={[styles.Policy_text, { color: theme.PrimarylightText }]}>Agree to Terms & Conditions</Text>

</View>

{/* Button */}
            <TouchableOpacity style={styles.Button} onPress={handleSubmit} activeOpacity={0.4}>
<Text style={styles.button_text}>
    Sign Up
</Text>
<View style={styles.Button_inner_left}>
<Image source={require('../../../Assets/Auth/Register/Fill_1.png')} style={styles.button_icon} />
</View>
            </TouchableOpacity>

          </View>
          <View style={[styles.sign_link,{paddingBottom:"30"}]}>
            <Text style={[styles.already_account,{color:theme.PrimarylightText}]}>Already have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>  
            <Text style={styles.Sign_in}>SIGN IN</Text>
            </TouchableOpacity>
            </View>
            <Toast
        position='top'
        bottomOffset={20}
      />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default Index;

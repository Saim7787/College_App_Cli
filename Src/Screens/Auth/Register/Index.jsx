import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../../Theme/Color'
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UserSignupAsync } from '../../../Features/authSlice'
import DropDownPicker from 'react-native-dropdown-picker';
import { FONTFAMILY } from '../../../Theme/FontFamily'
const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  ConfirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  
});


const Index = ({navigation}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setrole] = useState();
 
const [adminRef,SetadminRef] = useState()
  const [items, setItems] = useState([
    {label: 'User', value: 'user'},
    {label: 'Admin', value: 'admin'}
  ]);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
 

 

  const dispatch = useDispatch()

 

  // Dummy JWT token

  const handleInputChange = (number) => {
    SetadminRef(number);
  };
  return (
    <Formik
      initialValues={{ userName: '', password: '', ConfirmPassword: '',  }}
      validationSchema={validationSchema}
      onSubmit={async(values,{resetForm}) => {
        const formData = {
          userName: values.userName,
          password: values.password,
          role: role
        };

        if (role === 'user') {
          formData.adminRef = adminRef;
        }
        const res = await dispatch(UserSignupAsync(formData))
        if (res.payload.message === "Sign Up Successful!") {
          // Navigate to the login screen
          navigation.navigate('Login');
        }
 console.log('res',res)

  
     resetForm() 
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
                placeholder="UserName"
                placeholderTextColor={theme.PrimarylightText}
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                value={values.userName}
              />
             
            </View>
            {errors.userName && touched.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

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
            <DropDownPicker
      open={open}
      value={role}
      items={items}
      
      setOpen={setOpen}
      setValue={setrole}
      setItems={setItems}
      stickyHeader={true}
      style={{
        backgroundColor: theme.input_Background,
        borderRadius:12,
        paddingHorizontal:18,
        paddingVertical:2,
    
        marginVertical:12,
        borderColor:!role  ? 'red': 'transparent',
  
      }}
      labelStyle={{
          fontFamily: FONTFAMILY.Mulish_Bold,

      }}
      textStyle={{
        fontSize: 14,
        fontFamily: FONTFAMILY.Mulish_Bold,

      }}

/>
{!role  && <Text style={styles.errorText}>Role is Required</Text>}


{role === 'user' && (
            <>
              <View
                style={[
                  styles.input_container,
                  { backgroundColor: theme.input_Background, marginTop: 10, borderColor: !adminRef ? 'red' : 'transparent', borderWidth: 1 }
                ]}>
                <TextInput
                  style={[styles.input, { color: theme.PrimarylightText }]}
                  placeholder="Admin Reference" // Corrected placeholder text
                  placeholderTextColor={theme.PrimarylightText} // Changed to use theme color
                  onChangeText={handleInputChange}
                
                  inputMode='numeric'
                  value={adminRef}
                />
              </View>
              {!adminRef  && <Text style={styles.errorText}>AdminRef is Required</Text>}
            </>
          )}




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
      
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default Index;

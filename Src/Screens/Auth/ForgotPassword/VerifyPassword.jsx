import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useContext,useState} from 'react'
import HeaderButton from '../../../Component/Header Button/index'
import FooterButton from '../../../Component/Footer Button/Index'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../../Theme/Color'
import { Formik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object().shape({
    code1: yup.string().required('Code 1 is required'),
    code2: yup.string().required('Code 2 is required'),
    code3: yup.string().required('Code 3 is required'),
    code4: yup.string().required('Code 4 is required'),
  });
const VerifyPassword = () => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
    const handletoggletheme = themeContext?.toggleTheme;
    const handleSubmit = () => {
        // Logic for handling sign-up
        console.log('Signing up...');
      };
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
        <HeaderButton text='Forgot Password'/>
        <View style={styles.body_container_vERIFY}>
      <TouchableOpacity onPress={handletoggletheme}>   
<Text style={[styles.select_sentence,{color:theme.PrimarylightText}]}>Code has been Send to ( +1 ) ***-***-*529</Text>
</TouchableOpacity>

        <Formik
        initialValues={{
          code1: '',
          code2: '',
          code3: '',
          code4: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
          <View>
            <View style={styles.codeInputContainer}>
              <TextInput
                style={[styles.codeInput,{backgroundColor:theme.input_Background,borderColor: touched.code1 && errors.code1 ? 'red' : 'transparent',borderWidth:1,color:theme.primaryText },]}
                onChangeText={handleChange('code1')}
                onBlur={() => setFieldTouched('code1')}
                value={values.code1}
                maxLength={1}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.codeInput,{backgroundColor:theme.input_Background,borderColor: touched.code2 && errors.code2 ? 'red' : 'transparent',borderWidth:1,color:theme.primaryText },]}
          
                onChangeText={handleChange('code2')}
                onBlur={() => setFieldTouched('code2')}
                value={values.code2}
                maxLength={1}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.codeInput,{backgroundColor:theme.input_Background,borderColor: touched.code3 && errors.code3 ? 'red' : 'transparent',borderWidth:1,color:theme.primaryText },]}
      
                onChangeText={handleChange('code3')}
                onBlur={() => setFieldTouched('code3')}
                value={values.code3}
                maxLength={1}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.codeInput,{backgroundColor:theme.input_Background,borderColor: touched.code4 && errors.code4 ? 'red' : 'transparent',borderWidth:1,color:theme.primaryText },]}
              
                onChangeText={handleChange('code4')}
                onBlur={() => setFieldTouched('code4')}
                value={values.code4}
                maxLength={1}
                keyboardType="numeric"
              />
            </View>

           

            <FooterButton text="Verify" handleSubmit={handleSubmit} />
          </View>
        )}
      </Formik>

      <View style={styles.sign_link}>
            <Text style={[styles.already_account,{color:theme.PrimarylightText}]}>Resend Code in
            <Text style={styles.Sign_in}> 59</Text>
            s
            </Text>
            </View>
      </View>
    </View>
  )
}

export default VerifyPassword

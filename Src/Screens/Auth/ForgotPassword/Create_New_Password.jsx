import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Pressable,Modal } from 'react-native';
import HeaderButton from '../../../Component/Header Button/index';
import FooterButton from '../../../Component/Footer Button/Index';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { Formik } from 'formik';
import * as yup from 'yup';
import { styles } from './Style';


const validationSchema = yup.object().shape({
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  ConfirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const Create_New_Password = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmit = (values) => {
    // Logic for handling sign-up
    console.log('Signing up...', values);
  };

  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
      <HeaderButton text='Create New Password' />
      <View style={styles.body_container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={[styles.heading_create_password, { color: theme.primaryText }]}>Create Your New Password</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent,{backgroundColor:theme.input_Background}]}>

     <Image source={require('../../../Assets/Auth/ForgotPassword/Group_11.png')} style={styles.modal_image} />


               
                <Pressable onPress={handletoggletheme}>   
              <Text style={[styles.modalText,{color:theme.primaryText}]}>Congratulations</Text>
              </Pressable>
              <Text style={[styles.sentence,{color:theme.PrimarylightText}]}>
              Your Account is Ready to Use. You will be redirected to the Home Page in a Few Seconds.
              </Text>
     <Image source={require('../../../Assets/Auth/ForgotPassword/Fill1.png')} style={styles.modal_Loading_image} />

              
              <Pressable onPress={() => setModalVisible(false)}>
                <Text >Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      <Formik
        initialValues={{
          password: '',
          ConfirmPassword: '',
          isPasswordVisible: false,
          isConfirmPasswordVisible: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          handleSubmit,
          setFieldValue,
        }) => (
          <View style={styles.form_container}>
            {/* Password Input */}
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 20 }]}>
              <Image source={require('../../../Assets/Auth/Register/Password.png')} style={styles.Password_input_image} />
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="Password"
                placeholderTextColor={theme.PrimarylightText}
                secureTextEntry={!values.isPasswordVisible}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setFieldValue('isPasswordVisible', !values.isPasswordVisible)}>
                <Image
                  source={
                    values.isPasswordVisible
                      ? require('../../../Assets/Auth/Register/Stroke_1.png')
                      : require('../../../Assets/Auth/Register/visiable.png')
                  }
                  style={styles.eye_Password_input_image}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 20 }]}>
              <Image source={require('../../../Assets/Auth/Register/Password.png')} style={styles.Password_input_image} />
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="Confirm Password"
                placeholderTextColor={theme.PrimarylightText}
                secureTextEntry={!values.isConfirmPasswordVisible}
                onChangeText={handleChange('ConfirmPassword')}
                onBlur={handleBlur('ConfirmPassword')}
                value={values.ConfirmPassword}
              />
              <TouchableOpacity onPress={() => setFieldValue('isConfirmPasswordVisible', !values.isConfirmPasswordVisible)}>
                <Image
                  source={
                    values.isConfirmPasswordVisible
                      ? require('../../../Assets/Auth/Register/Stroke_1.png')
                      : require('../../../Assets/Auth/Register/visiable.png')
                  }
                  style={styles.eye_Password_input_image}
                />
              </TouchableOpacity>
            </View>
            {errors.ConfirmPassword && touched.ConfirmPassword && <Text style={styles.errorText}>{errors.ConfirmPassword}</Text>}

            {/* Button */}
      <FooterButton text='Continue' handleSubmit={handleSubmit} />
          
          </View>
        )}
      </Formik>
      </View>

    </View>
  );
};

export default Create_New_Password;

import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image,  } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ThemeContext } from '../../../Theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './SliderStyle';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { getData } from '../../../Utility/Storage/Storage';
const slides = [
  {
    key: '1',
    title: 'Online Learning',
    text: 'We Provide Classes Online Classes and Pre Recorded Leactures.!',
  },
  {
    key: '2',
    title: 'Learn from Anytime',
    text: 'Booked or Save the Lectures for the Future',
  },
  {
    key: '3',
    title: 'Get Online Certificate',
    text: 'Analyze your scores and Track your results',
  },
];



const Slider = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const appIntroSliderRef = React.useRef();

  const [token, setToken] = useState('');
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;





  const renderItem = ({ item, index }) => {
    const isLast = index === slides.length - 1;

    return (
      <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
        <TouchableOpacity onPress={() => {appIntroSliderRef.current?.goToSlide(slides.length - 1)
          // setOnboardingStatus();
        }}>
          <Text style={[styles.skip_text, { color: theme.primaryText }]}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.slide}>
          <Text style={[styles.title, { color: theme.primaryText }]}>{item.title}</Text>
          <Text style={[styles.text, { color: theme.PrimarylightText }]}>{item.text}</Text>
        </View>
        {isLast && (
        
        
        <TouchableOpacity style={styles.Button}  activeOpacity={0.4} onPress={()=> navigation.navigate('Login')}>
<Text style={styles.button_text}>
  Get Started
</Text>
<View style={styles.Button_inner_left}>
<Image source={require('../../../Assets/Auth/Register/Fill_1.png')} style={styles.button_icon} />
</View>
            </TouchableOpacity>
      
        )}
      </View>
    );
  };

  const renderDoneButton = ({ }) => (
    <TouchableOpacity onPress={() => {
   
      navigation.navigate('Login');
    }}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  );

  const renderNextButton = () => (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={() => appIntroSliderRef.current?.goToSlide(appIntroSliderRef.current?.state.activeIndex + 1)}
    >
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      ref={appIntroSliderRef}
      showPrevButton={false}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showNextButton={true}
      showDoneButton={false}
      dotStyle={styles.dotstyle}
      activeDotStyle={styles.activeDotStyle}
    />
  );
};

export default Slider;

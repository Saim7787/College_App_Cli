import React,{useContext,useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,FlatList,Dimensions } from 'react-native';
import { SPACING } from '../../Theme/Spacing';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import { ThemeContext } from '../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../Theme/Color'
import { TabView, TabBar } from 'react-native-tab-view';
import FeeStructer from './FeeStructer';
import RoadMap from './RoadMap';
import { useNavigation } from '@react-navigation/native';
import { Skeleton } from '@rneui/themed';

const renderTabBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }} // Customize the indicator color
        style={{ backgroundColor:'#0961F5',elevation:2,marginBottom:10,marginHorizontal:20 }} // Customize the tab bar background color
        labelStyle={{fontSize:FONTSIZE.size_16,fontFamily:FONTFAMILY.Jost_SemiBold,textAlign:'center',}} // Customize the tab label color
      />
    );
  };
const ProgramDetailsComponent = ({ selectedProgram,image }) => {

  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
const navigation = useNavigation()
console.log('componrnet props',selectedProgram)
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'FeeStructer', title: 'FeeStructer' },
    { key: 'RoadMap', title: 'RoadMap' },
  ]);

  
 
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'FeeStructer':
        return <FeeStructer selectedProgram={selectedProgram} />;
      case 'RoadMap':
        return <RoadMap />;
      default:
        return null;
    }
  };
  const isLoading = false
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
          {image && (
       <View style={styles.image_container}>  
        {isLoading ? (
          
          <Skeleton animation='wave'  style={{width:'100%',height:300}} />
          ) : (
      <Image source={{ uri: selectedProgram.image }} style={styles.newsImage} />
          )}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon_container}>  
      <Image source={require('../../Assets/Dashboard/News/back.png')} style={styles.backimage} />
      </TouchableOpacity>
      </View>
          )}
          {selectedProgram && (
  <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}

        />
         ) }
       
   
    </View>
  )
}

export default ProgramDetailsComponent
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  body:{
    paddingHorizontal: SPACING.space_20,
    paddingVertical:SPACING.space_10,

  },
  icon_container:{
    position:'absolute',
    top:10,
    left:30
  },
  backimage:{
width:26,
height:20,

  },
  image_container:{
position:'relative'
  },
  newsImage: {
    width: '100%', // Adjust width as needed
    height: 300, // Adjust height as needed
    marginBottom: 16,
  },
  newsDetails: {
    width:'100%',
    borderRadius:16,
    paddingHorizontal: SPACING.space_20,
    paddingVertical:SPACING.space_20,
    marginTop:-40,
    zIndex:1000
  },
  newsTitle: {
    fontSize: FONTSIZE.size_17,

    fontFamily: FONTFAMILY.Mulish_Bold,
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: FONTSIZE.size_13,

    fontFamily: FONTFAMILY.Poppins_SemiBold,
  },
  programContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  programTitle: {
    fontSize: FONTSIZE.size_17,
    fontFamily: FONTFAMILY.Mulish_Bold,
    marginRight: 8,
  },
  programImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  image: {
    width: 100,
    height: 100, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius:16
  },
  title: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Mulish_Bold,
 color:'white',
    position:"absolute",
    bottom:10,
    
  },
  image_slider:{
    marginRight:10,
    marginTop:5,
  position:'relative'
  }
});
import React,{useContext} from 'react';
import { StyleSheet, Text, View, FlatList,Platform } from 'react-native';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { SPACING } from '../../../Theme/Spacing';
import { BORDERRADIUS } from '../../../Theme/BorderRadius';
import { Skeleton } from '@rneui/themed';

const AcademicHistory = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

  const academicData = [
    {
      title: 'Intermediate',
      Marks: '836 / 1100',
      Board: 'lahore',
      Year: 2019,
    },
    {
      title: 'Matric',
      Marks: '936 / 1100',
      Board: 'lahore',
      Year: 2017,
    },
  ];
  const isLoading = false

  const renderItem = ({ item }) => (
    <View style={[styles.card,{backgroundColor:theme.input_Background}]}>
      <View style={[styles.circle,{backgroundColor:'#0961F5'}]}>
        <Text style={styles.yearText}>{item.Year}</Text>
      </View>
      <View style={styles.details}>
        <Text style={[styles.title,{color:theme.primaryText}]}>{item.title}</Text>
        <View  style={styles.row}>  
          <Text style={[styles.text,{color:theme.PrimarylightText}]}>   
          Marks
          </Text>
          <Text style={[styles.marksText,{color:theme.PrimarylightText}]}> {item.Marks}</Text>

        </View>
        <View style={styles.row}>   
        <Text style={[styles.text,{color:theme.PrimarylightText}]}>   
          Board
          </Text>
        <Text style={[styles.boardText,{color:theme.PrimarylightText}]}> {item.Board}</Text>

        </View>
      </View>
    </View>
  );

  return (

  <>  
    {isLoading ? (
      <FlatList
        data={Array.from({length: 2})}
      
        keyExtractor={(item, index) => index.toString()}
        renderItem={({index}) => (
          <View style={[styles.card,{backgroundColor:theme.input_Background}]}>
                  <Skeleton animation='wave' circle width={40} height={40} />
     
          <View style={styles.details}>
  <Skeleton animation='wave'  width={100} height={8} style={{borderRadius:30,marginBottom:10}} />
           
            <View  style={styles.row}>  
  <Skeleton animation='wave'  width={60} height={8} style={{borderRadius:30}} />
          
  <Skeleton animation='wave'  width={60} height={8} style={{borderRadius:30}} />
             
    
            </View>
            <View style={styles.row}>   
  <Skeleton animation='wave'  width={60} height={8} style={{borderRadius:30}} />
  <Skeleton animation='wave'  width={60} height={8} style={{borderRadius:30}} />
        
    
            </View>
          </View>
        </View>
        )}
      />
    ) : (
    <FlatList
      data={academicData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
    )}
     </>  
  );
};

export default AcademicHistory;

const styles = StyleSheet.create({
  container: {
   flex:1,
  },
  card: {
    flexDirection: 'row',
    borderRadius:BORDERRADIUS.radius_15,
    marginBottom:SPACING.space_15,
    padding:SPACING.space_16,
    alignItems: 'center',
    gap:SPACING.space_20,
   
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        },
        android: {
          elevation: 1,
        },
      }),
  

  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  yearText: {
    fontSize: FONTSIZE.size_14,
    fontFamily:FONTFAMILY.Mulish_Bold,
    color:'#FFF'
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize:FONTSIZE.size_18,
   fontFamily:FONTFAMILY.Mulish_Bold,
    marginBottom: 8,
  },
  marksText: {
    fontSize: FONTSIZE.size_16,
fontFamily:FONTFAMILY.Mulish_Bold
  },
  boardText: {
    fontSize: FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Mulish_Bold
  },
  text:{
    fontSize: FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Mulish_Bold
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:SPACING.space_10
  }
});

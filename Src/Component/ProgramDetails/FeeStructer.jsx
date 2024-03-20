import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { ThemeContext } from '../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../Theme/Color'
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import { Skeleton } from '@rneui/themed';


  const FeeStructer = ({ selectedProgram }) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
    console.log('fee stracuer',selectedProgram)
    if (!selectedProgram) {
        // Handle the case when selectedProgram is undefined
        return (
          <View>
            <Text>No program selected</Text>
          </View>
        );
      }
 
  return (
    <ScrollView contentContainerStyle={styles.container}> 
    <View style={[styles.body,{backgroundColor:theme.input_Background}]}>  
    <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Program Name</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>{selectedProgram?.title || selectedProgram?.name}</Text>

      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Duration</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>2 Years</Text>

      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Total Semester</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>4</Text>

      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Total Package</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>{selectedProgram?.feeStructure?.tuition}</Text>

      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>At Admission time</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>{selectedProgram?.feeStructure?.books}</Text>

      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Examination Fee </Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>{selectedProgram?.feeStructure?.tuition}</Text>

      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Additional charges at the time of Admission </Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>{selectedProgram?.feeStructure?.tuition}</Text>

      </View>
      <View style={styles.divider} />

      </View>
<Text style={[styles.Additional_heading,{color:theme.primaryText}]}>Additional Charges at the time of the Admission</Text>
<View style={[styles.body,{backgroundColor:theme.input_Background}]}>  
      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Library Fee(Refundable)</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>2 Years</Text>

      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Student Card</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>4</Text>

      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Library Magazine Fund</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>{selectedProgram?.feeStructure?.tuition}</Text>

      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
<Text style={[styles.heading,{color:theme.primaryText}]}>Total Additional Charges</Text>
<Text style={[styles.heading_right,{color:theme.PrimarylightText}]}>{selectedProgram?.feeStructure?.tuition}</Text>

      </View>
      <View style={styles.divider} />

      </View>
    </ScrollView>
  )
}

export default FeeStructer

const styles = StyleSheet.create({
   
        container: {
         paddingHorizontal:20,
         paddingBottom: 20,
        },
        body:{
            borderRadius:10,
            width:'100%',
            paddingHorizontal:20,
            paddingVertical:10,
            borderColor:'#167F71',
            borderWidth:1
        },
        row:{
          flexWrap:'wrap',
            flexDirection:'row',
            justifyContent:'space-between',



        },
        divider: {
            height: 1, // You can adjust the height of the divider
            backgroundColor: '#0961F5', // You can adjust the color of the divider
            marginVertical: 10, // You can adjust the vertical margin of the divider
          },
          heading:{
            fontSize:FONTSIZE.size_16,
            fontFamily:FONTFAMILY.Mulish_Bold,
        
          },
          heading_right:{
            fontSize:FONTSIZE.size_14,
            fontFamily:FONTFAMILY.Mulish_Bold,
            marginTop:15
          },
          Additional_heading:{
               fontSize:FONTSIZE.size_18,
            fontFamily:FONTFAMILY.Jost_SemiBold,
            marginVertical:10
          }
  
})
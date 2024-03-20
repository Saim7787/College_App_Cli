import { StyleSheet } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";
import { BORDERRADIUS } from "../../../Theme/BorderRadius";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    container:{
      
        flex:1,
        paddingHorizontal:20
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    marginTop:60,
    },
    skip_text:{
textAlign:'right',
marginTop:30,
fontSize:FONTSIZE.size_16,
fontFamily:FONTFAMILY.Jost_SemiBold,

    },
    title: {
      fontSize: FONTSIZE.size_24,
   
      fontFamily:FONTFAMILY.Jost_SemiBold,
      marginBottom: SPACING.space_10,
    },
    text: {
      fontSize: FONTSIZE.size_14,
      fontFamily:FONTFAMILY.Mulish_Bold,

      textAlign: 'center',
    
    },
   
    buttonText: {
      fontSize: 18,
      color: 'blue',
      fontWeight: 'bold',
    },
    dotstyle:{
        width:12,
        height:12,
        borderRadius:10,
        backgroundColor:'#D5E2F5',

    },
    activeDotStyle:{
        width:25,
        height:10,
        borderRadius:5,
        backgroundColor:'#0961F5'
    },
    nextButton:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:"#0961F5",
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    nextButtonText:{
        fontSize:FONTSIZE.size_16,
        fontFamily:FONTFAMILY.Jost_SemiBold,  
        color:'white'
    },
    Button:{
      marginTop:SPACING.space_20,
      width:'100%',
      paddingHorizontal: SPACING.space_8,
      paddingVertical: SPACING.space_4,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      position:"absolute",
      bottom:hp('20%'),
      alignSelf:'center',
      
      borderRadius:BORDERRADIUS.radius_33,
      backgroundColor:'#0961F5',
      shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 2
    },
    Button_inner_left:{
      width:48,
      height:48,
      borderRadius:50,
      backgroundColor:"#FFF",
      justifyContent:'center',
      alignItems:'center',
     
    },
    button_icon:{
      width:21,
      height:17
    },
    button_text:{
      fontFamily: FONTFAMILY.Jost_SemiBold,
      fontSize: FONTSIZE.size_18,
      color:'#FFF',
      textAlign:'center',
      flex:1,
    }
    
  });
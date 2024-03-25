import { StyleSheet, Platform } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";
import { BORDERRADIUS } from "../../../Theme/BorderRadius";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_24,
    paddingVertical:SPACING.space_30
  },
 
  profile_image:{
   
    alignSelf:'center',
    marginTop:SPACING.space_15,
    
    
  },
  image:{
    width:100,
    height:100,
    borderRadius:100,
    borderColor:'#167F71',
    borderWidth:4,
  },
  profile_name:{
    fontSize:FONTSIZE.size_24,
    fontFamily:FONTFAMILY.Jost_SemiBold,
    textAlign:'center'
  },
  profile_mail:{
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Mulish_Bold,
    textAlign:'center',
    marginTop:SPACING.space_8

},
Profile_id:{
  fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Mulish_Bold,
    textAlign:'center',
    marginTop:SPACING.space_8

},
tileContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  margin: 5,
},
leftImage: {
  width: 22,
  height: 20,
  marginRight: 10,
},
rightImage: {
  width: 10,
  height: 17,
  marginLeft: 10,
},
textContainer: {
  flex: 1,
  flexDirection: 'column',
},
title: {
  fontSize: FONTSIZE.size_14,
fontFamily:FONTFAMILY.Mulish_Bold
},
})
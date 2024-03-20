
import { StyleSheet, Platform } from "react-native";
import { FONTFAMILY } from "../../Theme/FontFamily";
import { FONTSIZE } from "../../Theme/FontSize";
import { SPACING } from "../../Theme/Spacing";
import { BORDERRADIUS } from "../../Theme/BorderRadius";
export const styles = StyleSheet.create({

Button:{
    marginTop:SPACING.space_20,
    width:'100%',
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    
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

})
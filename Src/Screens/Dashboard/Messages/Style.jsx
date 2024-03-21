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
 
  touch:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,


  },
  touch_heading:{
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Mulish_Bold,

  },
 
  image: {
    width: 130,
    height: 130, // Adjust the height as needed
    resizeMode: 'cover',
 
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
  position:'relative',
  borderRadius:10,
  overflow:'hidden'
  },
  school_heading:{
    fontSize:FONTSIZE.size_24,
    fontFamily:FONTFAMILY.Mulish_Bold,
    marginTop:10
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  newsImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  newsDetails: {
    flex: 1,
    padding: 12,
  },
  newsTitle: {
    fontSize: FONTSIZE.size_17,

    fontFamily: FONTFAMILY.Jost_SemiBold,
    marginBottom: 2,
  },
  newsDate: {
    fontSize: FONTSIZE.size_14,

    fontFamily: FONTFAMILY.Mulish_Bold,
    marginBottom: 2,

  },
  newsDescription: {
      fontSize: FONTSIZE.size_13,

      fontFamily: FONTFAMILY.Mulish_Bold,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
display:"flex",
flexDirection:"column",
rowGap:10,
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

})
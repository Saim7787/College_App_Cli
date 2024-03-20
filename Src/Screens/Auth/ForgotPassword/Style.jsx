import { StyleSheet, Platform } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";
import { BORDERRADIUS } from "../../../Theme/BorderRadius";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_24,
  },
  body_container:{
    flex:0.8,
    justifyContent:'flex-end',

    marginTop:SPACING.space_20
  },
  select_sentence:{
    textAlign:'center',
    fontFamily:FONTFAMILY.Mulish_Bold,
    fontSize:FONTSIZE.size_14,
    marginBottom:SPACING.space_20
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_15,
    paddingVertical:SPACING.space_15,
    width:'100%',
    marginVertical:SPACING.space_4,
    borderRadius:BORDERRADIUS.radius_12,
    elevation:0.5,
    
  },
  image: {
    width: 50,
    height: 50,
    marginRight: SPACING.space_10,
  },

  title: {
    fontSize: FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Mulish_Bold,
   
    marginBottom: SPACING.space_4,
  },
  text: {
    fontSize: FONTSIZE.size_14,
    fontFamily:FONTFAMILY.Mulish_Bold,
  },

  // Verif Passsword styling
  codeInputContainer:{
flexDirection:'row',
gap:10,
alignItems:'center',
  },
  codeInput:{
width:75,
height:60,
justifyContent:'center',
alignItems:'center',
paddingHorizontal:SPACING.space_24,
borderRadius:BORDERRADIUS.radius_12,
...Platform.select({
  ios: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  android: {
    elevation: 1, // Elevation for Android
  },
}),
  },
  errorText:{
    fontSize: FONTSIZE.size_14,
    fontFamily:FONTFAMILY.Mulish_Bold,
    color:'red'
  },
  body_container_vERIFY:
  {
    flex:0.9,
    justifyContent:'center',

  },
  sign_link:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:3,
    marginTop:SPACING.space_30
    
      },
      already_account:{
        fontFamily: FONTFAMILY.Mulish_Bold,
        fontSize: FONTSIZE.size_14,
      },
      Sign_in:{
        fontFamily: FONTFAMILY.Mulish_Bold,
        fontSize: FONTSIZE.size_18,
        color:'#0961F5',
       
        textDecorationStyle: 'solid', // This is required for borderBottomWidth to work
        borderBottomWidth: 2, 
        borderColor:'#0961F5'
    
      },

      // New Password style

      form_container: {
        marginTop: SPACING.space_20,
      },
      input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        width: '100%',
        borderRadius: BORDERRADIUS.radius_12,
        paddingHorizontal: SPACING.space_18,
        paddingVertical: SPACING.space_4,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          android: {
            elevation: 0.5,
          },
        }),
      },
      input_image: {
        width: 19,
        height: 15,
      },
      Password_input_image: {
        width: 15,
        height: 20,
      },
      eye_Password_input_image:{
    width:20,
    height:20,
      },
      input: {
        flex: 1,
        fontFamily: FONTFAMILY.Mulish_Bold,
        fontSize: FONTSIZE.size_14,
      },
      heading_create_password:{
        fontFamily:FONTFAMILY.Jost_SemiBold,
        fontSize:FONTSIZE.size_20,
      },
      modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:25
      },
      modalContent:{
        width:'100%',
        height:460,
        borderRadius:BORDERRADIUS.radius_33,
        alignItems:'center',
        paddingVertical:SPACING.space_20,
        paddingHorizontal:SPACING.space_15



      },
      modalText:{
        fontFamily:FONTFAMILY.Jost_SemiBold,
        fontSize:FONTSIZE.size_24,
        marginTop:SPACING.space_20,

      },
      sentence:{
        fontFamily:FONTFAMILY.Mulish_Bold,
        fontSize:FONTSIZE.size_14,
        textAlign:'center',
        width:280,
        marginTop:SPACING.space_12,

      },
      modal_image:{
        width:139,
        height:142
      },
      modal_Loading_image:{
        width:40,
        height:40,
        marginTop:SPACING.space_20
      }


})

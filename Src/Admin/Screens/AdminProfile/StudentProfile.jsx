import { StyleSheet, Text, View, FlatList, Image, ScrollView ,Platform, Pressable} from 'react-native';
import React,{useContext} from 'react'
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { Skeleton } from '@rneui/themed';

const StudentProfile = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  

  const isLoading = true
  const menuItems = [
    {
      title: 'Program',
image:require('../../../Assets/Dashboard/profile/time.png'),
      Tile_details: 'Bs Software Engineering', 
    },
  
    {
      title: 'Form No',
image:require('../../../Assets/Dashboard/profile/Form.png'),
      Tile_details: 18095, // Replace with the navigation title
    },
    {
      title: 'Roll No',
image:require('../../../Assets/Dashboard/profile/time.png'),
      Tile_details: 96, // Replace with the navigation title
    },
    {
      title: 'Timing',
image:require('../../../Assets/Dashboard/profile/time.png'),
      Tile_details: 'Morning', // Replace with the navigation title
    },
    {
      title: 'Semester',
image:require('../../../Assets/Dashboard/profile/Semester.png'),
      
      Tile_details: 8, // Replace with the navigation title
    },
    {
      title: 'Section',
image:require('../../../Assets/Dashboard/profile/section.png'),
      
      Tile_details: 'B', // Replace with the navigation title
    },
    
    
    
    

 
  ];
  const PersonalInformation = [
    {
      title: 'Father Name', 
image:require('../../../Assets/Dashboard/profile/Person.png'),
      Tile_details: 'Saim', 
    },
  
    {
      title: 'Contact Number',
image:require('../../../Assets/Dashboard/profile/num.png'),
      Tile_details: '0300-0000000', // Replace with the navigation title
    },
    {
      title: 'Email Address',
image:require('../../../Assets/Dashboard/profile/mail.png'),
      Tile_details: '2019F-mulbsswe-096@mul.edu.pk', // Replace with the navigation title
    },
    {
      title: 'Permanent Address',
image:require('../../../Assets/Dashboard/profile/location.png'),
      Tile_details: 'Zahoor park ', // Replace with the navigation title
    },
    
    
  
    
    

 
  ];
  const renderItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      {/* Apply the white tint only for dark theme */}
      <Image
        source={item.image}
        style={[
          styles.image,
          { tintColor: themeContext?.isDarkTheme ? 'white' : undefined },
        ]}
      />
      <View style={styles.textContainer}>
        <View>
          <Text style={[styles.title, { color: theme.primaryText }]}>
            {item.title}
          </Text>
        </View>
        <Text style={[styles.tileDetails, { color: theme.PrimarylightText }]}>
          {item.Tile_details}
        </Text>
      </View>
    </View>
  );
  
  const PerosnalInfo = ({ item }) => (
    <View style={styles.menuItemContainer}>
      {/* Apply the white tint only for dark theme */}
      <Image
        source={item.image}
        style={[
          styles.image,
          { tintColor: themeContext?.isDarkTheme ? 'white' : undefined },
        ]}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.primaryText }]}>
          {item.title}
        </Text>
        <Text style={[styles.tileDetails, { color: theme.PrimarylightText }]}>
          {item.Tile_details}
        </Text>
      </View>
    </View>
  );
  

  return (
    <ScrollView nestedScrollEnabled={false}>
      <View style={[styles.menuitemBackground,{backgroundColor:theme.input_Background}]}>

      {isLoading ? (
              <FlatList
                data={Array.from({length: 8})}
              
                keyExtractor={(item, index) => index.toString()}
                renderItem={({index}) => (
                  <View style={styles.menuItemContainer}>
                  <Skeleton circle width={30} height={30} />
                  <View style={[styles.textContainer,{marginLeft:20}]}>
                    <View > 
  <Skeleton  width={60} height={6} style={{borderRadius:30,marginTop:6}} />
                 
                    </View>
  <Skeleton  width={60} height={6} style={{borderRadius:30,marginTop:6}} />
                   
                  </View>
                </View>
                )}
              />
            ) : (
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      )}
      </View>
     
      <Text style={[styles.Personal,{color:theme.primaryText}]}>Personal Information</Text>
      <View style={[styles.menuitemBackground,{backgroundColor:theme.input_Background}]}>

      {isLoading ? (
              <FlatList
                data={Array.from({length: 8})}
              
                keyExtractor={(item, index) => index.toString()}
                renderItem={({index}) => (
                  <View style={styles.menuItemContainer}>
                  <Skeleton circle width={30} height={30} />
                 
                  <View style={[styles.textContainer,{marginLeft:20}]}>
  <Skeleton  width={60} height={6} style={{borderRadius:30,marginTop:6}} />
  <Skeleton  width={120} height={6} style={{borderRadius:30,marginTop:6}} />
                  
                  </View>
                </View>
                )}
              />
            ) : (
      <FlatList
        data={PersonalInformation}
        renderItem={PerosnalInfo}
        keyExtractor={(item, index) => index.toString()}
       
      />

            )}
      </View>
    </ScrollView>
  )
}

export default StudentProfile
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuitemBackground:{
borderRadius:16
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    padding: 16,
    width:'100%',
 
   
   
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        
      
          elevation: 1,
      
   
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONTSIZE.size_14,
fontFamily:FONTFAMILY.Mulish_Bold,
    marginBottom: 8,
  },
  tileDetails: {
    fontSize: FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Mulish_Bold,
  },
  Personal:{
    fontSize: FONTSIZE.size_20,
fontFamily:FONTFAMILY.Jost_SemiBold,
marginVertical:5
  }
});
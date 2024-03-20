import React,{useContext,useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList,TextInput,TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../../Theme/Color'
import { styles } from './Style';
import { useNavigation } from '@react-navigation/native';
import { Skeleton } from '@rneui/themed';

const Index = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();



  const newsData = [
    {
      id: 1,
      imageUrl: 'https://media.licdn.com/dms/image/D5612AQFOg9sqxMghPg/article-cover_image-shrink_720_1280/0/1670797229978?e=2147483647&v=beta&t=R2yd9prsl4PFhmGAm5RgQOyfEUpg6dDeTZQjunp-6j4', // Replace with your actual online image URL
      title: 'We Asked ChatGPT: How Would AI Impact Education?',
      date: 'November 1, 2023',
      description: 'Artificial intelligence (AI) is quickly becoming an integral part of our daily lives. From our smartphones to our homes and cars, AI is transforming the way we interact with the world around us. But what does this mean for the future of education? We asked ChatGPT ourselves.',
    },
    {
      id: 2,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM0GWkaqhEWAmX3uhyHoJ1YNbGNYh9kst3g&usqp=CAU', // Replace with your actual online image URL
      title: 'Important Announcement',
      date: 'October 25, 2023',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    },
    {
      id: 3,
      imageUrl: 'https://i.ytimg.com/vi/CwhCIXflL9o/maxresdefault.jpg', // Replace with your actual online image URL
      title: 'Is AI bad news for education?',
      date: 'November 1, 2023',
      description: 'Two thirds of teachers believe they are regularly receiving work written by AI., With concerns about cheating and online safety, does AI spell bad news for education?, SUBSCRIBE to our YouTube channel ',
    },
    {
      id: 4,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM0GWkaqhEWAmX3uhyHoJ1YNbGNYh9kst3g&usqp=CAU', // Replace with your actual online image URL
      title: 'Important Announcement',
      date: 'October 25, 2023',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    },
    {
      id: 5,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZPsT7KCBnRBQpb9YIrJ9va4uM8Tkf_hjXw&usqp=CAU', // Replace with your actual online image URL
      title: 'Exciting News Title 1',
      date: 'November 1, 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit....',
    },
    {
      id: 6,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM0GWkaqhEWAmX3uhyHoJ1YNbGNYh9kst3g&usqp=CAU', // Replace with your actual online image URL
      title: 'Important Announcement',
      date: 'October 25, 2023',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    },
  ];
  const filteredMenuItems = newsData.filter((item) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
);
const renderShortDescription = (description) => {
  // Extract the first 20 words from the description
  const words = description.split(' ');
  const shortenedDescription = words.slice(0, 5).join(' ');

  // Add ellipsis if the description has more than 20 words
  if (words.length > 20) {
    return shortenedDescription + '...';
  }

  return shortenedDescription;
};
const navigateToDetails = (id) => {
  // Navigate to the Details screen and pass the ID as a parameter
  navigation.navigate('NewsDetails', { id });
};
const isLoading = false

const searchImageSource = require('../../../Assets/Dashboard/Home/Search.png');
const searchImageStyle = themeContext?.isDarkTheme
  ? { ...styles.search_image, tintColor: 'white' }
  : styles.search_image;
const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
    <View style={[styles.newsItem,{backgroundColor:theme.input_Background}]}>
      <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
      <View style={styles.newsDetails}>
        <Text style={[styles.newsTitle,{color:theme.primaryText}]}>{item.title}</Text>
        <Text style={[styles.newsDate,{color:theme.primaryText}]}>{item.date}</Text>
        <Text style={[styles.newsDescription,{color:theme.PrimarylightText}]}>{renderShortDescription(item.description)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
         <View style={[styles.search_container,{backgroundColor:theme.input_Background,marginBottom:20}]}>
         <Image source={searchImageSource} style={searchImageStyle} />
     <TextInput style={[styles.input,{color:theme.primaryText}]} placeholder='Search For..'  placeholderTextColor='#B4BDC4'  onChangeText={(text) => setSearchQuery(text)}   value={searchQuery} ></TextInput>
      <Image source={require('../../../Assets/Dashboard/Home/FILTER.png')} style={styles.Filter_image} />

      </View>

      {isLoading ? (
              <FlatList
                data={Array.from({length: 8})}
          
                keyExtractor={(item, index) => index.toString()}
                renderItem={({index}) => (
                 
                  <View style={[styles.newsItem,{backgroundColor:theme.input_Background}]}>
                  <Skeleton animation='wave' style={{marginRight:5}}  width={100} height={100} />
                   
                    <View style={styles.newsDetails}>
  <Skeleton animation='wave'  width={100} height={8} style={{borderRadius:30}} />
  <Skeleton animation='wave'  width={150} height={8} style={{borderRadius:30,marginTop:8}} />
  <Skeleton animation='wave'  width={200} height={8} style={{borderRadius:30,marginTop:8}} />
                    
                    </View>
                  </View>
               
                )}
              />
            ) : (
      <FlatList
        data={filteredMenuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

            )}
    </View>
  );
};

export default Index;



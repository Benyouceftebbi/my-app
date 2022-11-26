import React from 'react';
import {View, Text, Image, Pressable,StyleSheet,useWindowDimensions,TouchableOpacity,FlatList,Button} from 'react-native';

import { useNavigation } from '@react-navigation/native';








const Post = (props) => {
  
const width = useWindowDimensions().width;
const user =props.user
  



  return(
   
    <Pressable style={[styles.container, { width: width - 60}]}>
    <View style={styles.innerContainer}>
      {/* Image  */}
      
      <View style={{flex: 1, marginHorizontal: 10}}>
        {/* Bed & Bedroom  */}
        <Text style={styles.bedrooms}>
         {user.name}
        </Text>

        {/* Type & Description */}
        <Text style={styles.description} numberOfLines={2}>
          {user.sport}
        </Text>

        {/*  Old price & new price */}
        
      </View>
    </View>
  </Pressable>
      

)
        

};

export default Post;
const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: 5,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden'
  },

  image: {
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },

  bedrooms: {
    marginVertical: 10,
    color: '#5b5b5b',
  },
  description: {
    fontSize: 15,
  },
  prices: {
    fontSize: 15,
    marginVertical: 10,
  },
  oldPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
  }
  });

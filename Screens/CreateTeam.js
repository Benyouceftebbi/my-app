import { StyleSheet, Text, View,TouchableHighlight,Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import { SafeAreaView,} from 'react-native-safe-area-context'
//import * as ImagePicker from 'expo-image-picker';
const CreateTeam = () => {
    const [image, setImage] = useState(null);
    /*const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelld) {
          setImage(result.assets[0].uri);
        }
      };*/
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <TouchableHighlight
          style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]}
        >
    <Image source={require("D:\TeamUp\assets\icons\Profile.png")} style={styles.profileImg} />
</TouchableHighlight>

    </SafeAreaView>
  )
}

export default CreateTeam

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
})
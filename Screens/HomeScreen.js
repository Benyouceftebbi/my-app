import React, {useState, useEffect, useRef} from "react";
import { View, FlatList,Platform, useWindowDimensions,StyleSheet,Animated,Image,Text,TouchableOpacity,TextInput, LogBox } from "react-native";
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import Post from "./posts";
import CustomMarker from "./CustomMarker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"


import { xorBy } from 'lodash'
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  doc,
  query,
  orderBy,
  startAt,
  endAt,
  QuerySnapshot,
  addDoc,
  where,
  GeoPoint
} from 'firebase/firestore';
import * as geofire from 'geofire-common';
import { db } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import * as Location from 'expo-location';

//const Data = require('../Data/MapData');

const HomeScreen = (props) => {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const[region,setRegion]=useState({
    latitude:36.89695,
    longitude: 30.7133,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8,

})
const[search,setSearch]=useState(region)
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
     
      setSearch({
        latitude:location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta:0.09,
        longitudeDelta: 0.09,
    
      })
    })();
    
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const auth = getAuth();
useEffect(()=>{
 
  const bb=onAuthStateChanged(auth, async (user) => {

    if (user) {
      if(Object.keys(location).length!==0){
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      await updateDoc(doc(db, "users", user.uid), {
        Location: new GeoPoint(location.coords.latitude,location.coords.longitude)
      });
    }
    } else {
      // User is signed out
      // ...
    }

  });
return bb
  
},[location])

    
  


  



  const [promises, setPromises] = useState([]);

  const radiusInM = 50 * 1000;

     
  /*useEffect(() => {

    console.log(selectedTeams.map(entry => entry.item));
   
  },[selectedTeams]);*/
  
 const getLoc =  () => {
   
     
  const bounds = geofire.geohashQueryBounds(Object.values(search).slice(0,2), radiusInM);
 

    let users = [];
bounds.forEach(async b=> {

      const q = query(
        collection(db, 'users'),
        orderBy('geohash'),
        startAt(b[0]),
        endAt(b[1])
      );
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        users.push(doc.data());
      });

    
    setPromises(users);}
    )
  
  };

    const [selectedPlaceId, setSelectedPlaceId] = useState(null);

    const _flatlist =useRef();
    const _map =useRef();
    const viewConfig = useRef({itemVisiblePercentThreshold: 70})
    const onViewChanged = useRef(({viewableItems}) => {
      if (viewableItems.length > 0) {
        const selectedPlace = viewableItems[0].item;
        setSelectedPlaceId(selectedPlace.id)
      }
    })
  
    const width = useWindowDimensions().width;

    useEffect(() => {
      if (!selectedPlaceId || !_flatlist) {
        return;
      }
      const index = promises.findIndex(marker => marker.id === selectedPlaceId)
      _flatlist.current.scrollToIndex({index})
  
      const selectedPlace =promises[index];
      const region = {
        latitude: selectedPlace.coordinates.latitude,
        longitude: selectedPlace.coordinates.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }
      _map.current.animateToRegion(region);
    }, [selectedPlaceId])

    
  return(
    <View style={{width: '100%', height: '100%'}} >
      <GooglePlacesAutocomplete
    placeholder='Search'
    fetchDetails={true}
    onPress={(data, details ) => {
     setSearch({
        latitude:details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta:0.09,
        longitudeDelta: 0.09,
    
      })
   }}
    
    query={{
      key: 'AIzaSyBs51MUBa9t7Y9ZuDojjwT0fGGKi5VyLrE',
      language: 'en',
      
    }}

				styles={{
					container: { flex: 0, position: "absolute", width: "40%", zIndex: 1 
        ,top:60,right:0},
					listView: { backgroundColor: "white" }
				}}
      
			/>
       <View style={styles.camera}>
      <MapView
      ref={_map}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{width: '100%', height: '100%'}}
       region={search}
      
      >
           {promises.map((marker,index) => (
            
          <CustomMarker key={index}
            coordinate={{ latitude: marker.coordinates.latitude, longitude: marker.coordinates.longitude }}
            isSelected={marker.id === selectedPlaceId}
            onPress={() => setSelectedPlaceId(marker.id)}
            
          />)
        )}
      </MapView>
    </View>
    <View style={{position: 'absolute', bottom: 110}}>
        <FlatList
          ref={_flatlist}
          data={promises}
          renderItem={({item}) => <Post user={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
        />
      </View>
      <View style={{position: 'absolute',backgroundColor:'#92A3FD',width:'100%',height:'20%'}}>
                

  
    
        <TouchableOpacity style={{top:150,left:150}}  onPress={getLoc} >
           <Text style={styles.buttonText1}>Get coordinates</Text>
         </TouchableOpacity>
         </View>
    <View style={{position:'absolute',top:55,width:'40%',backgroundColor:'white',  borderRadius: 10}}>
 
  </View>
      
      </View>

)

}

export default HomeScreen;
const styles = StyleSheet.create({
  camera: {
    aspectRatio: 0.868,
    flex:1,
    ...StyleSheet.absoluteFillObject,
  },
 
 
});

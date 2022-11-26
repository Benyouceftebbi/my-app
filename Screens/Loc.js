import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import {Marker} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Constants from 'expo-constants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {xorBy} from 'lodash';

import db from '../firebaseConfig';
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
  where
} from 'firebase/firestore';
import * as geofire from 'geofire-common';
import {HeadingSubscriber} from 'expo-location/build/LocationSubscribers';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

const Loc = ({navigation}) => {
  const [promises, setPromises] = useState([]);

  const radiusInM = 50 * 100000;
  const center = [36.89695, 30.7133];
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  let users = [];
  const getLoc = async () => {
    for (const b of bounds) {
      const q = query(
        collection(db, 'users'),
        orderBy('geohash'),
        startAt(b[0]),
        endAt(b[1]),where('sport', 'array-contains-any', ['handball'])
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        users.push(doc.data());
      });
    }

    setPromises(users);
  };
  useEffect(() => {
    getLoc();
  }, []);

  return (
    <View style={{flex: 1}}>
      {promises.map((user,index) => {

  <Text
  key={index}
  style={{
    alignSelf: 'center',
    top: 50,
  }}>
  {JSON.stringify(user)}
</Text>

 
      }
      
      
      )}
      <Text style={{top: 50}}>hello world</Text>
    </View>
  );
};
export default Loc;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#37d5d2a2',

    flex: 1,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    header: {
      position: 'absolute',
      flexDirection: 'row',
      backgroundColor: '#92A3FD',
      width: '100%',
      height: '20%',
      alignSelf: 'center',
      borderRadius: 5,
      paddingTop: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

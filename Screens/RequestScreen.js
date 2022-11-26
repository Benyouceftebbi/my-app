import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from "./firebaseConfig";

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
  setDoc,
  GeoPoint,
  arrayUnion,
} from 'firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  Datepicker,
  Layout,
  Autocomplete,
  AutocompleteItem,
} from '@ui-kitten/components';


const movies = [
  {title: 'Star Wars'},
  {title: 'Back to the Future'},
  {title: 'The Matrix'},
  {title: 'Inception'},
  {title: 'Interstellar'},
];

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

export default function RequestScreen({navigation}) {
  const [enemy, setEnemy] = useState('');

  let player = '';
  let playername = '';
  const [location, setLocation] = useState();
  const[currentUser,setCurrentUser]=useState()
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // console.log("useEffect ---> " + new Date());
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoading(false)
        setCurrentUser(user.uid);
        console.log(currentUser);       
      } else {
        // No user is signed in.
        alert('if you see this message something has gone wrong!');
      }
    });
  }, []);

  const onHandleSignup = async () => {
    let check = '';
    let enemyId = '';
    const q = query(collection(db, 'users'), where('Name', '==',enemy));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots

      check = doc.data().Name;
      enemyId = doc.id;
    });

    console.log(check);
    if (check == enemy) {
      const ChallengeId = doc(collection(db, 'Challenges')).id;
      const Challenge = await addDoc(collection(db, 'Challenges'), {
        enemy: check,
        enemy: enemyId,
        sport: value,
        location: location,
        Date: date,
        Challenger: playername,
        ChallengerUid: currentUser,
        ChallengeId: ChallengeId,
     
      });
      
      const docRef = doc(db, "users",currentUser);
      console.log(currentUser);
      await updateDoc(doc(db, "users",currentUser), {
        sentrequests: arrayUnion({
          enemy: check,
          enemy: enemyId,
          sport: value,
          location: location,
          Date: date,
          Challenger: playername,
          ChallengerUid: player,
          ChallengeId: ChallengeId,
          Accepted: false,
        }),
      });
      await updateDoc(doc(db, "users",enemyId), {
        receivedRequests: arrayUnion({
          enemy: check,
          enemy: enemyId,
          sport: value,
          location: location,
          Date: date,
          Challenger: playername,
          ChallengerUid: player,
          ChallengeId: ChallengeId,
          Accepted: false,
        }),
      });
      console.log('Challenge sent  successfully');
    } else {
      console.log('wrong enemy');
    }
  };
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = index => {
    setValue(movies[index].title);
  };

  const onChangeText = query => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );
  const [date, setDate] = React.useState(new Date());

  if (loading) {
    return (
      <View style={{flex: 1}}>
        <Text>loading </Text>
      </View>
    );
  } else {
  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Request a challenge</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter player's name"
          autoCapitalize="none"
          autoFocus={true}
          value={enemy}
          onChangeText={text => setEnemy(text)}
        />
        <Autocomplete
          style={styles.input}
          placeholder="Choose a sport"
          value={value}
          onSelect={onSelect}
          onChangeText={onChangeText}>
          {data.map(renderOption)}
        </Autocomplete>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details) => {
       
            setLocation({
              location: details.formatted_address,
            });
          }}
          query={{
            key: 'AIzaSyBs51MUBa9t7Y9ZuDojjwT0fGGKi5VyLrE',
            language: 'en',
          }}
          style={styles.input}
        />
        <Layout style={styles.container} level="1">
          <Text category="h6">Selected date: {date.toLocaleDateString()}</Text>

          <Datepicker date={date} onSelect={nextDate => setDate(nextDate)} />
        </Layout>
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
            {' '}
            send Request
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    bottom:110
  },
});

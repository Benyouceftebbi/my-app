import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {auth, db, useAuth} from './firebaseConfig';
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
  limit,
  arrayRemove,
} from 'firebase/firestore';
import {
  applyActionCode,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import {async} from '@firebase/util';

export default function Notification({params}) {
  const width = useWindowDimensions().width;
  /*const Notifications = props => {
    const user = props.user;

    return (
     
    );
  };*/
  const ChallengeAccepted = props => {
    const user = props.user;
    return (
      <View style={styles.innerContainer}>
        {/* Image  */}

        <View style={{flex: 1, marginHorizontal: 10}}>
          {/* Bed & Bedroom  */}
          <Text style={styles.bedrooms}>
            you accepted {JSON.stringify(user.ChallengerUid)} challenge
          </Text>
        </View>
      </View>
    );
  };
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // console.log("useEffect ---> " + new Date());

    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user.uid);
       console.log(currentUser);
       
      } else {
        
        // No user is signed in.
        alert('if you see this message something has gone wrong!');
      }
    });
  });
useEffect(()=>{
  if(currentUser!==undefined){
    fetchUser();
  }
},[currentUser])
  const fetchUser = async () => {
    let user = [];

    const docRef = doc(db, 'users', currentUser);
    const unsubscribe = onSnapshot(docRef, querysnapshot => {
      if (!querysnapshot.exists) {
      } else {
        //user.push(querysnapshot.data().sentrequests)
        setRequests(querysnapshot.data().receivedRequests);
      }
    });

    setLoading(false);
  };

  const [extraData, setExtraData] = React.useState(new Date());
  const accept = async item => {
    console.log("hello");
    await updateDoc(doc(db, 'users', currentUser), {
      Challenges: arrayUnion(item),
      receivedRequests: arrayRemove(item),
    });
    await updateDoc(doc(db, 'users', item.enemy), {
      Challenges: arrayUnion(item),
    });
    alert('you accepted ' + item.ChallengeId + ' challenge');

    setExtraData(new Date());

  };
  const reject = async item => {
    await updateDoc(doc(db, 'users', currentUser), {
      receivedRequests: arrayRemove(item),
    });
    await updateDoc(doc(db, 'users', item.enemy), {
      sentrequests: arrayRemove(item),
    });
    alert('you rejected ' + item.ChallengeId + ' challenge');

    setExtraData(new Date());
  };

  if (loading=== true) {
    return (
      <View style={{flex: 1}}>
        <Text>loading </Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={requests}
          renderItem={({item}) => {
            return (<View style={styles.innerContainer}>
            {/* Image  */}
    
            <View style={{flex: 1, marginHorizontal: 10}}>
              {/* Bed & Bedroom  */}
              <Text style={styles.bedrooms}>
                {JSON.stringify(item.ChallengeId)} has requested to follow you
              </Text>
              <Text style={styles.bedrooms}>
                request state :{JSON.stringify(item.Accepted)}
              </Text>
    
              <TouchableOpacity
                onPress={() => {
                  accept(item);
                }}>
                <Text style={styles.buttonText1}>accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  reject(item);
                }}>
                <Text style={styles.buttonText1}>reject</Text>
              </TouchableOpacity>
            </View>
          </View>
    )}}
          extraData={extraData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
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
    overflow: 'hidden',
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
  },
});

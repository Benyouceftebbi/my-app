import React, {useState} from 'react';
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
import {auth, db} from './firebaseConfig';
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
} from 'firebase/firestore';

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const onHandleSignup = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async userCredential => {
          const authuser = userCredential.user;
          const docRef = doc(db, 'users', authuser.uid);
          await setDoc(docRef, {
            Auth_uid: authuser.uid,
            Email: authuser.email,
            Name: firstname.concat(' ', lastname),
            Challenges: [],
            ReceivedRequests: [],
            Sports: [],
          });

          console.log('Signup success');
        })
        .catch(err => Alert.alert('Login error', err.message));
    } catch (error) {
      Alert.alert('error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
          autoCapitalize="none"
          keyboardType="name"
          textContentType="name"
          autoFocus={true}
          value={firstname}
          onChangeText={text => setFirstname(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          autoCapitalize="none"
          keyboardType="name"
          textContentType="name"
          autoFocus={true}
          value={lastname}
          onChangeText={text => setLastname(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
            {' '}
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}>
              {' '}
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
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
  },
});

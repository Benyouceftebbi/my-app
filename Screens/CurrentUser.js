import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { auth,db } from '../firebaseConfig';
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
    GeoPoint
  } from 'firebase/firestore';
export default  async function getCurrentUser (){
    
const [currentplayer,setCurrentplayer] = useState();
const auth = getAuth();
const user = auth.currentUser;
let player=[]

    if (user) {
     
   
     const q = query(collection(db,'users'),where("auth_uid","==",user.uid))
     const querySnapshot = await getDocs(q);
   
       querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         setCurrentplayer(doc.data())
      
       });
       
     
  

   
     
     } else {
       
       // No user is signed in.
     }
     return currentplayer  }
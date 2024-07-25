import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBy6P3qfnV35c5LqJ5uSHRFrLw7EaWO_fk",
  authDomain: "opencode-food-site-fc5c0.firebaseapp.com",
  projectId: "opencode-food-site-fc5c0",
  storageBucket: "opencode-food-site-fc5c0.appspot.com",
  messagingSenderId: "117270824160",
  appId: "1:117270824160:web:ec6bacefc4a32983fc3c85",
};


//initialize firebase
initializeApp(firebaseConfig)

//init firestore
const db = getFirestore()

export { db }
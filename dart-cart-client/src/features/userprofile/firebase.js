import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage" ;




const firebaseConfig = {
    apiKey: "AIzaSyB8vxklg6-m-G8vUYANQ45uzD4OTIa4gsQ",
    authDomain: "dart-cart-273ad.firebaseapp.com",
    projectId: "dart-cart-273ad",
    storageBucket: "dart-cart-273ad.appspot.com",
    messagingSenderId: "41403665604",
    appId: "1:41403665604:web:3cfb4b0c15e705451fcd91"
  };
  //initilize firebase
  export const firebase = initializeApp(firebaseConfig);
  export const storage = getStorage(firebase);
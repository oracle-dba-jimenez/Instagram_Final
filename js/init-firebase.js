/*
Configuración y conexión de las colecciones de datos Firebase y Firestorage
*/

// Configuración
var firebaseConfig = {
  apiKey: "AIzaSyAWSGbaVXhCDRsHzcbVe29PhwUh-52i9_E",
  authDomain: "instafamily-7e99e.firebaseapp.com",
  databaseURL: "https://instafamily-7e99e.firebaseio.com",
  projectId: "instafamily-7e99e",
  storageBucket: "instafamily-7e99e.appspot.com",
  messagingSenderId: "223839819780",
  appId: "1:223839819780:web:5b526ff204290ef2d9fd51",
  measurementId: "G-3QEGVE4J8T"
};


// Inicialización
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const firestore = firebase.firestore();


const firebaseConfig = {
  apiKey: "AIzaSyDQb740r6ecrRXOyOILKMMtVxDsym7x7FA",
  authDomain: "mog-2ad80.firebaseapp.com",
  projectId: "mog-2ad80",
  storageBucket: "mog-2ad80.firebasestorage.app",
  messagingSenderId: "469869731892",
  appId: "1:469869731892:web:b3fa5e370c9187a0a1aa61",
  measurementId: "G-ND064D5EZR"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
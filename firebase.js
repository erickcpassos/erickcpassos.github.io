var firebaseConfig = {
    apiKey: "AIzaSyA0dY7V5DvIfOBuT06ZgJ3AXqre2I3u_Gg",
    authDomain: "learning-47022.firebaseapp.com",
    databaseURL: "https://learning-47022-default-rtdb.firebaseio.com",
    projectId: "learning-47022",
    storageBucket: "learning-47022.appspot.com",
    messagingSenderId: "94069621927",
    appId: "1:94069621927:web:57d7c3cb7d4b6889524782",
    measurementId: "G-CEQD6K0X1Q"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timeStampsInSnapshots: true });

const analytics = firebase.analytics();

const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {    
apiKey: "AIzaSyDCv_amY1cFvZEnnkNyLlb8CRXbs9OShJo",
authDomain: "kiei-451-1951a.firebaseapp.com",
projectId: "kiei-451-1951a",
storageBucket: "kiei-451-1951a.appspot.com",
messagingSenderId: "809941901635",
appId: "1:809941901635:web:fd732ecfd1a7f619ff0ff6"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase
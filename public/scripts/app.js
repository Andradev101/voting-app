console.log("aaaa");
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMhWYQ75gsw3JO76VvPrjHpBUx6V79124",
  authDomain: "votefirestore.firebaseapp.com",
  projectId: "votefirestore",
  storageBucket: "votefirestore.appspot.com",
  messagingSenderId: "248399672296",
  appId: "1:248399672296:web:b2ba5ecc0e139ed8472a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//HTML ELEMENTS

const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const pollTitle = document.querySelector("#pollTitle");
//btns
const newUserAddBtn = document.querySelector("body > div.newUser > button");
const checkIdBtn = document.querySelector("#createPollBtn")

//INSERT DATA
async function createUser(){
  try {
    const docRef = await addDoc(collection(db, "users"), {
      fName: fName.value,
      lName: lName.value,
    });
    alert(`Copy this ID: ${docRef.id}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//const userRef = collection(db,"users");
// db.collection("users").get().then((snapshot) => {
//   console.log(snapshot.docs);
// })
//CHECK UNIQUE KEY
// const docRef = doc(collection(db, "users"));
// const docSnap = await getDoc(docRef);
// console.log(docSnap);
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

/******WORKS******
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
*/

//CREATE POLL
async function createPoll(){
  let userUniqueKey = idNewPoll.value;
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => { 
      if(userUniqueKey == doc.id){
        console.log("doc found: "+ doc.id +" => "+ JSON.stringify(doc.data()));
      }
    });

    const docRef = await addDoc(collection(db, "users",`${userUniqueKey}`), {
      pollTitle: pollTitle.value
    });
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

//FUNCTIONS
newUserAddBtn.addEventListener("click", createUser);
checkIdBtn.addEventListener("click", createPoll);

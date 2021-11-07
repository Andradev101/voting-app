console.log("aaaa");
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"; 
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
const checkIdBtn = document.querySelector("body > div.idCheck > button")

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

async function createPoll(){
  try {
    const docRef = await addDoc(collection(db, "users"), {
      id: idNewPoll.value,
      pollTitle: pollTitle.value,
      pollOpts: [1,2,3,4,5]
    });
    alert(`Copy this ID: ${docRef.id}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//FUNCTIONS
newUserAddBtn.addEventListener("click", createUser);
checkIdBtn.addEventListener("click", createPoll);

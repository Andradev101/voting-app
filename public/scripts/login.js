// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, getDoc, arrayUnion, query, where  } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"; 
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

/*************************************************************************************************/

//HTML Elements
const loginInput = document.querySelector("#login-loginBox");
const loginBtn = document.querySelector("body > div.userInteraction > div.loginBox > button:nth-child(4)");
const logoutBtn = document.querySelector("body > div.userInteraction > div.loginBox > button:nth-child(5)");
const voteBtn = document.getElementsByClassName("voteBtn")

//Event Listeners
loginBtn.addEventListener("click", login)
logoutBtn.addEventListener("click", logout)

//Functions
async function login(){
    let userUniqueKey = loginInput.value;
    // console.log(loginInput);

    //search through users
    const docRef = doc(db, "users", `${userUniqueKey}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && userUniqueKey != "") {
        loginInput.setAttribute("disabled", "")
        for (let i = 0; i < voteBtn.length; i++) {
            const element = voteBtn[i];
            element.removeAttribute("disabled", "")
        }
    } else {
      // console.log("No such document!");
    }
}

async function logout(){
  loginInput.value = "";
  loginInput.removeAttribute("disabled", "")

  for (let i = 0; i < voteBtn.length; i++) {
    const element = voteBtn[i];
    element.setAttribute("disabled", "")
  }
}
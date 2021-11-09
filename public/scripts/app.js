console.log("aaaa");
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"; 
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
const pollOpts = document.querySelector("body > div.createPoll > div.pollOpt")
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

// async function readOneDoc(){
//   const snappy = await doc(collection(db, "users", "batata"))
//   console.log(snappy.exists());
// }
// readOneDoc()

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

// //THIS WOOORKS
//   //SEARCH DOC SHOW IF EXISTS
//   const docRef = doc(db, "users", "6rCpdQbrmA3XY09RmZMe")
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     console.log("No such document!");
//   }
// //UPDATE DOC
// const userRef = docRef;
// await updateDoc(userRef, {
//   pollTitle: "cudecaramujo",
//   batata: 123
// });

//CREATE POLL
async function createPoll(){
  let userUniqueKey = idNewPoll.value;
  let options = await getPollOpts(); 
  try {
    const userRef = doc(db, "users", `${userUniqueKey}`);
    const getSnap = await getDoc(userRef, { merge: true })
    console.log(getSnap.data());

    await updateDoc(userRef, {
      polls:[ 
              {
                pollTitle: pollTitle.value,
                opts: options
              }
            ]
    })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
//GET POLL OPTIONS
async function getPollOpts(){
  let pollOptArr=[];
  for (let i = 0; i < pollOpts.childElementCount; i++) {
    let opt = document.querySelector(`#opt${i}`);
    pollOptArr.push(opt.children[1].value);
  }
  console.log(pollOptArr);
  return pollOptArr
}
//EVENT LISTENERS
newUserAddBtn.addEventListener("click", createUser);
checkIdBtn.addEventListener("click", createPoll);
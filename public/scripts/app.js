// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, getDoc, arrayUnion, query, where } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
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

//HTML ELEMENTS
const fName = document.querySelector("#firstName");
const lName = document.querySelector("#lastName");
const pollTitle = document.querySelector("#pollTitle");
const pollOpts = document.querySelector("body > div.userInteraction > div.createPoll > div.pollOpt");

//btns
const newUserAddBtn = document.querySelector("body > div.userInteraction > div.newUser > button");
const createPollBtn = document.querySelector("#createPollBtn");
const checkIdBtn = document.querySelector("#checkIdBtn");
const idToCheck = document.querySelector("#id")
const createPollDiv = document.getElementsByClassName("createPoll")[0];
const checkUserID = document.querySelector("#idNewPoll");
//console.log(createPollDiv);

//EVENT LISTENERS
newUserAddBtn.addEventListener("click", createUser);
createPollBtn.addEventListener("click", createPoll);
//checkIdBtn.addEventListener("click", checkId);

//CREATE USER
async function createUser() {
  
  const newUserDiv = document.getElementsByClassName("newUser")[0];
  const inputs = newUserDiv.getElementsByClassName("inputBlock");

  function checkFields() {
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      if (element.children[1].value.length < 1) {
        return 0;
      }
    }
    return 1;
  }
  let userCreatedID = document.querySelector("#UserID");
  if (checkFields()) {
    
    try {
      const docRef = await addDoc(collection(db, "users"), {
        fName: fName.value,
        lName: lName.value,
      });
      userCreatedID.innerHTML = "";
      userCreatedID.innerHTML = `${docRef.id}`;
      userCreatedID.style.color = "green";
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }else{
    userCreatedID.innerHTML = "";
    userCreatedID.innerHTML = "User creation failed, First and Last name must have a value.";
    userCreatedID.style.color = "red";
  }
}

//CREATE POLL
async function createPoll() {
  
  const inputs = createPollDiv.querySelectorAll("input");
  function checkFields() {
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      if (element.value.length < 1) {
        return 0;
      }
    }
    return 1;
  }

  async function checkUserExists(){
    const docRef = doc(db, "users", `${checkUserID.value}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      return 1;
    } else {
      return 0;
    }
  }

  if (checkFields() == 1 && (await checkUserExists() == 1)) {
    console.log("poll created");
    let userUniqueKey = idNewPoll.value;
    let options = await getPollOpts();
    const pollsRef = await addDoc(collection(db, "polls"), {
      pollTitle: pollTitle.value,
      opts: options,
      createdBy: userUniqueKey
    });
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      element.value = "";
    }
  } else {
    console.log("error");
  }
}

//GET POLL OPTIONS
async function getPollOpts() {
  let pollOptArr = [];
  for (let i = 0; i < pollOpts.childElementCount; i++) {
    let opt = document.querySelector(`#opt${i}`);
    pollOptArr.push(opt.children[1].value);
  }
  // console.log(pollOptArr);
  return pollOptArr
}

// //CHECK POLLS CERTAIN USER CREATED
// async function checkId() {
//   //get id value
//   let userUniqueKey = idToCheck.value;
//   // console.log(userUniqueKey);

//   //query by user and log it
//   const pollsRef = collection(db, "polls");
//   const queryByUser = query(pollsRef, where("createdBy", "==", `${userUniqueKey}`));
//   const querySnapshot = await getDocs(queryByUser);
//   querySnapshot.forEach((doc) => {
//     // console.log(doc.id, " => ", doc.data());
//   });
// }
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
//this is important
const polls = document.getElementsByClassName("poll")

//check if there is multiple polls div each 500ms, if theres enable the voting
const showResultsBtn = document.getElementsByClassName("showResultsBtn")
let checkExist = setInterval(function() {
    if (showResultsBtn.length) {
       clearInterval(checkExist);
       getSpecificPollResult()
    }
 }, 500);

//here i search every show result button and add a event listener for each
//then i call a fucntion that returns the WHOLE poll div
async function getSpecificPollResult(){
    for (let i = 0; i < showResultsBtn.length; i++) {
        const element = showResultsBtn[i];
        element.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("aaaa");
            checkPollRes(polls, i);
        })
    }
}
//now i have the specifiv div element
async function checkPollRes(element, i){
    let pollDivChildren = element[i].children
    console.log(element[i]);
    for (let i = 0; i < pollDivChildren.length; i++) { 
        const element = pollDivChildren[i];
        if(element.className == "poll_Id"){
            var pollIdResult = element.innerText;
            console.log(pollIdResult);
        }
    }
    
    let loginInput = document.querySelector("#login-loginBox");
    //let userUniqueKey = loginInput.value;
    const checkVotes = collection(db, "votes");
    const checkVotesQuery = query(checkVotes, where("poll_id", "==", `${pollIdResult}`));
    const querySnapshot = await getDocs(checkVotesQuery);
    
    for (let i = 0; i < querySnapshot.docs.length; i++) {
        const element = querySnapshot.docs[i];
        console.log(element.data());
    }
}          



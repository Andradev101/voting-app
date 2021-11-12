import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, getDoc, arrayUnion, query } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"; 

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

const voteBtn = document.getElementsByClassName("voteBtn")
const polls = document.getElementsByClassName("poll")
console.log(polls);

let checkExist = setInterval(function() {
    if (voteBtn.length) {
       clearInterval(checkExist);
       enableVote()
    }
 }, 500);

 function enableVote(){
    for (let i = 0; i < voteBtn.length; i++) {
        const element = voteBtn[i];
        element.addEventListener("click", (event) => {
            event.preventDefault();
            vote(polls, i);
            //https://medium.com/@jacobwarduk/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb
        })
    }
 }
 async function vote(element, i) {

    let pollDivChildren = element[i].children

    const loginInput = document.querySelector("#login-loginBox");
    const userUniqueKey = loginInput.value;

    //search through chidren until find poll_Id
    //then, gets the inner text value
    for (let i = 0; i < pollDivChildren.length; i++) {
        
        const element = pollDivChildren[i];
        if(element.className == "poll_Id"){
            let pollIdResult = element.innerText;
            
            const voteRef = await addDoc(collection(db, "votes"), {
                voteBy: `${userUniqueKey}`,
                poll_id: `${pollIdResult}`,
                vote: "a"
              });
            console.log("Vote Registered: ", voteRef.id);
        }
    }

 }
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, getDoc, arrayUnion, query, where } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"; 

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

const voteBtn = document.getElementsByClassName("voteBtn")
const polls = document.getElementsByClassName("poll")

//check if there is multiple polls div each 500ms, if theres enable the voting
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
    //iterable element
    let pollDivChildren = element[i].children
    //logged user
    let loginInput = document.querySelector("#login-loginBox");
    let userUniqueKey = loginInput.value;

    //search through chidren until find poll_Id
    for (let i = 0; i < pollDivChildren.length; i++) { 
        const element = pollDivChildren[i];
        if(element.className == "poll_Id"){
            var pollIdResult = element.innerText;
            //needs to be global
        }
    }

    //check if an user has voted in a certain poll
    const validVoteRef = collection(db, "votes");
    const validVoteQuery = query(validVoteRef, where("voteBy", "==", `${userUniqueKey}`), where("poll_id", "==", `${pollIdResult}`));
    const querySnapshot = await getDocs(validVoteQuery);
    console.log(querySnapshot.docs.length);

    //check if user has a vote in the same poll
    //if yes, vote is interrupted before going to the db
    if (querySnapshot.docs.length > 0) {
        console.log("VOTE DOES NOT COUNT | USER ALREADY VOTED");
    }else{
        //if no, resgister the vote
        const voteRef = await addDoc(collection(db, "votes"), {
            voteBy: `${userUniqueKey}`,
            poll_id: `${pollIdResult}`,
            vote: `${getPollVoteValue()}`
        });
        console.log("Vote Registered: ", voteRef.id);
    }
    /*
    // for (var i in querySnapshot.docs) {
    //     const doc = querySnapshot.docs[i]
    //     console.log(doc.data());
    //     if(i > 0){
    //         console.log("it has votes");
    //         break;
    //     }
    //  }
    *******************************************************************************************
    SOLUTION BREAKING OUT OF A QUERYSNAPSHOT vvv
    https://pretagteam.com/question/how-to-break-out-of-the-querysnapshot-foreach-loop-method
    *******************************************************************************************
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.data());
    // });
  
    // if (querySnapshot.exists()) {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //     });
        
    // } else {
    //     //then, gets the inner text value
    //     const voteRef = await addDoc(collection(db, "votes"), {
    //         voteBy: `${userUniqueKey}`,
    //         poll_id: `${pollIdResult}`,
    //         vote: `${getPollVoteValue()}`
    //     });
    //     console.log("Vote Registered: ", voteRef.id);
    // 
    */
 }

//search checked value in the poll and return the value
function getPollVoteValue(){
    const PollOptions = document.getElementsByName('option');

    for(let i = 0; i < PollOptions.length; i++) {
        if(PollOptions[i].checked){
            let voteAnswer = PollOptions[i].value;
            return voteAnswer;
        }
    }
}
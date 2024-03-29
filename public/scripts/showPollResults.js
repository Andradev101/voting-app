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
            checkPollRes(polls, i);
        })
    }
}

//now i have the specific div element
async function checkPollRes(element, i){
    let pollDivChildren = element[i].children
    let optArr = []
    let voteArr = []
    
    //search every opts in certain poll
    let pollOpts = element[i].children[1].children
    for (let i = 0; i < pollOpts.length; i++) {
        const element = pollOpts[i];

        if (element.classList.contains("opt")) {
             //i dont like this [1]
            //console.log(element.children[1].innerText);
            optArr.push(element.children[1].innerText)
        }
    }

    for (let i = 0; i < pollDivChildren.length; i++) { 
        const element = pollDivChildren[i];
        if(element.className == "poll_Id"){
            var pollIdResult = element.innerText;
            //console.log(pollIdResult);
        }
    }
    
    //check votes in a specific poll ang log them
    const checkVotes = collection(db, "votes");
    const checkVotesQuery = query(checkVotes, where("poll_id", "==", `${pollIdResult}`));
    const querySnapshot = await getDocs(checkVotesQuery);

    //get every vote value
    for (let i = 0; i < querySnapshot.docs.length; i++) {
        const element = querySnapshot.docs[i];
        voteArr.push(element.data().vote)
    }

    let pollResDiv = pollDivChildren.item(2);//3rd child
    let pollRes = pollResDiv.children.item(1);//2nd child of possRes
    //clear options div, if there's any element inside it
    pollResDiv.style.display = "initial";
    pollRes.innerHTML = "";

    //loop through every possible answer
    for (let j = 0; j < optArr.length; j++) {
        const individualOpt = optArr[j];
        let votecount = 0;
        
        //loop through every individual vote
        //counts each vote value 
        for (let i = 0; i < voteArr.length; i++) {
            const invidualVote = voteArr[i];
            if(invidualVote == individualOpt){
                votecount++
            }
        }
    showPollRes(individualOpt, votecount, pollDivChildren)
    }
}

//append every individual option and every individual votes
async function showPollRes(individualOpt, votecount, pollDivChildren){
    let pollResDiv = pollDivChildren.item(2);//3rd child
    let pollRes = pollResDiv.children.item(1);//2nd child of possRes
    //pollRes.innerHTML = "";
    const element = 
    `
        <p>${individualOpt}: ${votecount}</p>
    `
    pollRes.insertAdjacentHTML("beforeend", element);
}
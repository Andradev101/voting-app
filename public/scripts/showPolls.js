// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, getDoc, arrayUnion, query } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
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

// const querySearch = doc(db, "users", "AHCMdGrA6MkTMvshHfzh");
// const getSnap = await getDoc(querySearch);
// console.log(getSnap.data());
const contentDiv = document.querySelector("body > div.createdPolls > div");
const pollCounter = document.getElementsByClassName("pollCounter")[0];

//get every poll doc, create a html structure to it, and append to the page
const queryPolls = query(collection(db, "polls"));
const querySnapshot = await getDocs(queryPolls);
pollCounter.innerHTML = `Polls created by users: ${querySnapshot.docs.length}`

querySnapshot.forEach((doc) => {
  let pollTitle = doc.data().pollTitle;
  let element =
  `
  <div class="poll">
    <h3>${pollTitle}</h3>
    <form action="#">

      <button type="button" class="voteBtn" disabled>Vote</button>
      <button type="button" class="showResultsBtn">Show Results</button>
    </form>
    <div class="resultsDiv" style="display:none">
      <h3>Poll Results</h3>
      <div class="results"></div>
    </div>
    <p>Poll ID:</p>
    <p class="poll_Id">${doc.id}</p>
  </div>
  `
  contentDiv.insertAdjacentHTML("beforeend", element);

  //get every option of each poll and add to the specific poll
  //get me each opt
  let optArr = doc.data().opts;
  let form = document.querySelectorAll("body > div.createdPolls > div > div > form")
  // console.log(form[form.length- 1]);
  // console.log(optArr);
  optArr.forEach(element => {
    let pollStructure =
    `
    <div class="opt">
      <input type="radio" id="${element}" name="option" value="${element}">
      <label for="${element}">${element}</label>
    </div>
    `
    form[form.length- 1].insertAdjacentHTML("afterbegin", pollStructure)
    //always gets the last index and add the structure to the page
  })
});

// function addPollFields(querySnapshot) {
//   //TO-DO == ITS GETTING THE DATA TWICE BECAUSE OF THE FOR EACH, I NEED IT ONCE ONLY
//   querySnapshot.forEach((doc) => {
//   for (let i = 0; i < doc.data().polls.length; i++) {
//       let optArr = doc.data().polls[i].opts;
//       console.log(optArr);
//       optArr.forEach(element => console.log(element))
//     }
//   })
// }

//All wrong
// function countPolls() {
//   const pollsOptsForm = document.querySelectorAll(`body > div.createdPolls > div > div > form`)
//   //console.log(pollsOptsForm);
//   return pollsOptsForm;
// }

// addPollOptsFields()

// async function addPollOptsFields() {
//   let countPollLen = countPolls()
//   //console.log(countPollLen);
//   const queryPollOpts = query(collection(db, "users"));
//   const pollOptsSnap = await getDocs(queryPollOpts);
//   const pollForm = document.querySelectorAll("body > div.createdPolls > div > div > form")

//   pollOptsSnap.forEach((doc) => {
//     for (let i = 0; i < doc.data().polls.length; i++){
//       let pollOptsArr = doc.data().polls[i].opts;
//       console.log(pollForm[i]);


//       for (let ii = 0; ii < pollOptsArr.length; ii++) {
//         console.log(pollOptsArr[ii].length);
//         let element = 
//         `
//         <div class="opt">
//           <input type="radio" id="${pollOptsArr[ii]}" name="${pollOptsArr[ii]}" value="${pollOptsArr[ii]}">
//           <label for="${pollOptsArr[ii]}">${pollOptsArr[ii]}</label>
//         </div>
//         `
//         pollForm[i].insertAdjacentHTML("beforeend", element);
//       }

//     }
//   });
// }
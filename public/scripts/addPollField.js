const createPollDiv = document.querySelector("body > div.userInteraction > div.createPoll");
const addFieldBtn = document.querySelector("#addFieldBtn")
const pollOpt = document.querySelector("body > div.userInteraction > div.createPoll > div.pollOpt")

let i = 0;
function createNewField(){
    let element = 
    `
    <div id="opt${i++}" class="inputBlock pollOpt">
        <label>Poll Option #${i}</label>
        <input type="text" required>
    </div>
    `
    pollOpt.insertAdjacentHTML("beforeend", element);
}
addFieldBtn.addEventListener("click", createNewField)
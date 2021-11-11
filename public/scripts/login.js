const loginInput = document.querySelector("#login-loginBox");
const loginBtn = document.querySelector("body > div.userInteraction > div.loginBox > button:nth-child(4)");
const voteBtn = document.querySelectorAll(".createdPolls .content .poll form button");

console.log(voteBtn);
voteBtn.forEach(element => {
    console.log("im in");
    element.setAttribute("disabled", "")
})

loginBtn.addEventListener("click", login)

function login(){
    console.log(loginInput.value);
    loginInput.setAttribute("disabled", "")
}
// document.getElementById("loginForm").addEventListener("submit", (event) => {
//   event.preventDefault();
// });

// let pass1 = "f952fc3a59839e9435dcfe840fc3e5e132052bd244ca19efb28b6ce9a34ae9c6";

// firebase.auth().onAuthStateChanged((user)=>{
//     if(user){
//         location.replace("../index.html")
//     }
// })

const gcontainer = document.getElementById("gridContainer");
const randomizeBtn = document.getElementById("randomizeBtn");
const selectedEmoji = document.getElementById("selectedEmoji");
const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "😚",
  "😙",
  "😜",
  "😝",
  "😛",
  "🤪",
  "😎",
  "🤓",
  "😏",
  "😒",
  "😞",
];
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
let selected = [];

for (let i = 0; i < 25; i++) {
  let div = document.createElement("div");
  div.innerHTML = emojis[i];
  div.setAttribute("data-value", alphabets[i]);
  div.addEventListener("click", function () {
    if (selected.length == 4) {
      console.log(selected);
      return;
    }
    if (selected.indexOf(this) === -1) {
      selected.push(this.getAttribute("data-value"));
      // selectedEmoji.innerHTML = selected.join("");
      this.style.backgroundColor = "green";
    } else {
      selected.splice(selected.indexOf(this), 1);
      this.style.backgroundColor = "";
    }
    if (selected.length == 4) {
      console.log(selected);
      return;
    }
  });
  gcontainer.appendChild(div);

  if ((i + 1) % 5 === 0) {
    gcontainer.appendChild(document.createElement("br"));
  }
}

randomizeBtn.addEventListener("click", function () {
  let children = Array.from(gcontainer.children);
  let emojisDiv = children.filter((child) => child.tagName === "DIV");

  for (let i = 0; i < emojisDiv.length; i++) {
    let randomIndex = Math.floor(Math.random() * emojisDiv.length);
    let temp = emojisDiv[i].innerHTML;
    let tempValue = emojisDiv[i].getAttribute("data-value");
    emojisDiv[i].innerHTML = emojisDiv[randomIndex].innerHTML;
    emojisDiv[i].setAttribute(
      "data-value",
      emojisDiv[randomIndex].getAttribute("data-value")
    );
    emojisDiv[randomIndex].innerHTML = temp;
    emojisDiv[randomIndex].setAttribute("data-value", tempValue);
    emojisDiv[i].style.backgroundColor = "";
  }
  selected = [];
  selectedEmoji.innerHTML = "";
});

let hashpass = (selected) => {
  const Pass = selected.toString();
  let pass = Pass.replace(new RegExp(",", "g"), "");
  // const password = "secretPassword";
  let hash = sha256(pass);
  // console.log(`Password hash: ${hash}`);
  return hash;
};

function forgotPass() {
  const email = document.getElementById("email").value;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset link sent to your email id");
    })
    .catch((error) => {
      alert(error.message);
    });
}

let container2 = document.querySelector(".container2");
let cont_right = document.querySelector(".cont-right");

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (result) {
      alert("successful login, Enter grid pattern now!!!");
      container2.style.display = "block";
      cont_right.style.display = "none";
    })
    .catch((error) => {
      alert("login mai dikkat  " + error.code, ":", error.message);
      // location.replace("../index.html");
    });
}

const db = getFirestore();

const colRef = collection(db, "users");

const q = query(colRef, where("email", "==", "anumishra@gmail.com"));

onSnapshot(q, (snapshot) => {
  let ans = [];
  snapshot.docs.forEach((doc) => {
    ans.push({ ...doc.data(), id: doc.id });
  });

  console.log(ans[0].grid_pass);
});

// let submit = document.querySelector(".submit");

// submit.addEventListener('click', () => {

// })

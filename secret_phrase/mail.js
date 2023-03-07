function generateSecretPhrase(numWords) {
  const words = [
    "áppłé",
    "ßaŋaŋa",
    "¢h€rr¥",
    "Ɖrag๏nfruit",
    "€lderberry",
    "ƒig",
    "g®ap€",
    "h๏ŋ€¥∂€ω",
    "kiωi",
    "ł€m๏ŋ",
    "måŋg๏",
    "ŋ€ctar¡ŋ€",
    "๏raŋg€",
    "ρ€ach",
    "qυ¡ŋc€",
    "ra$ρberry",
    "strawß€rr¥",
    "t@ŋg€r¡ŋ€",
    "υgli fruit",
    "v@ŋ¡ł£a",
    "ωat€rm€l๏ŋ",
    "χ¡gυa",
    "¥€ll๏ω ωat€rm€l๏ŋ",
    "zยcch¡ŋ¡",
  ];
  // Generate a random salt string
  const salt = crypto.getRandomValues(new Uint8Array(16)).join("");

  // Create an array to store the selected words
  const selectedWords = [];

  // Loop through the number of words requested and select a random word
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWords.push(words[randomIndex]);
  }

  // Concatenate the selected words and the salt into the secret phrase
  const secretPhrase = selectedWords.join("-") + "-" + salt;

  return secretPhrase;
}

const phrase = generateSecretPhrase(4);

let form = document.querySelector(".form");

form.addEventListener('submit', (e) =>{
    e.preventDefault();
})

let email = document.querySelector(".email").value;
let send = document.querySelector(".send");

// send.addEventListener('click', () => {
//     console.log(phrase);
// })

send.addEventListener('click', () => {
    
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "0105cs201021@oriental.ac.in",
        pass: "abcd@123476",
    },
    });

    var mailOptions = {
    from: "0105cs201021@oriental.ac.in",
    to: email,
    subject: "regarding grid pass change",
    text: `your password is : ${phrase}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
    });

})
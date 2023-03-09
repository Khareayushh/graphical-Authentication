// function generateSecretPhrase(numWords) {
//   const words = [
//     "áppłé",
//     "ßaŋaŋa",
//     "¢h€rr¥",
//     "Ɖrag๏nfruit",
//     "€lderberry",
//     "ƒig",
//     "g®ap€",
//     "h๏ŋ€¥∂€ω",
//     "kiωi",
//     "ł€m๏ŋ",
//     "måŋg๏",
//     "ŋ€ctar¡ŋ€",
//     "๏raŋg€",
//     "ρ€ach",
//     "qυ¡ŋc€",
//     "ra$ρberry",
//     "strawß€rr¥",
//     "t@ŋg€r¡ŋ€",
//     "υgli fruit",
//     "v@ŋ¡ł£a",
//     "ωat€rm€l๏ŋ",
//     "χ¡gυa",
//     "¥€ll๏ω ωat€rm€l๏ŋ",
//     "zยcch¡ŋ¡",
//   ];
//   // Generate a random salt string
// //   const salt = crypto.getRandomValues(new Uint8Array(16)).join("");

//   // Create an array to store the selected words
//   const selectedWords = [];

//   // Loop through the number of words requested and select a random word
//   for (let i = 0; i < numWords; i++) {
//     const randomIndex = Math.floor(Math.random() * words.length);
//     selectedWords.push(words[randomIndex]);
//   }

//   // Concatenate the selected words and the salt into the secret phrase
// //   const secretPhrase = selectedWords.join("-") + "-" + salt;
//     const secretPhrase = selectedWords.join("-");

//   return secretPhrase;
// }

// const phrase = generateSecretPhrase(4);

const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "0105cs201021@oriental.ac.in",
      pass: "abcd@123476",
    },
  });

//   console.log(phrase)
  const phrase = req.body.phrase;  

  const mailoptions = {
    from: "0105cs201021@oriental.ac.in",
    to: req.body.email,
    subject: "regarding pass change",
    text: phrase,
  };

  console.log(phrase)

  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});

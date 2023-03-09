const form = document.querySelector(".form");
let email = document.getElementById("email");

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
  //   const salt = crypto.getRandomValues(new Uint8Array(16)).join("");

  // Create an array to store the selected words
  const selectedWords = [];

  // Loop through the number of words requested and select a random word
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWords.push(words[randomIndex]);
  }

  // Concatenate the selected words and the salt into the secret phrase
  //   const secretPhrase = selectedWords.join("-") + "-" + salt;
  const secretPhrase = selectedWords.join("-");

  return secretPhrase;
}

const phrase = generateSecretPhrase(4);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
      email: email.value,
      phrase: phrase,
    };

    console.log(formData);
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert("email sent!");
            email.value = ''; 
        }else{
            alert("something went wrong");
        }
    }

    xhr.send(JSON.stringify(formData));

})

let phrase_checker = document.querySelector(".phrase-checker");
let form_section = document.querySelector(".form-section");
let submit = document.querySelector(".submit");
submit.addEventListener('click', () => {
    setTimeout(() => {
      phrase_checker.style.display = "block";
      form_section.style.display = "none";
    }, 3000);
})

let redirect = document.querySelector(".redirect");
let secret_phrase = document.querySelector(".secret-phrase");

redirect.addEventListener('click', () => {
    if(secret_phrase.value == phrase){
        alert("phrase matched");
        location.assign('http://localhost:5500/GAS-for-Bank-main/');
        // location.replace('/GAS-for-Bank-main/index.html')
    }
    else{
        alert("wrong phrase");
    }
})
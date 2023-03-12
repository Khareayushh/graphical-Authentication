// import { mailer } from '../secret_phrase/server.js'
// console.log(mailer);

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const categoryDropdown = document.getElementById('category');
    let selectedCategory = Object.keys(data)[0];
    const emojiGrid = document.querySelector('.emoji-grid');
    const selected = [];

    // Populate category dropdown options
    Object.keys(data).forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.text = category;
      categoryDropdown.appendChild(option);
    });

    // Listen for category dropdown change
    const clearButton = document.getElementById("clear");
    const buttons = document.querySelector(".buttons");

    categoryDropdown.addEventListener('change', function() {
      buttons.style.display = "block";
      selectedCategory = categoryDropdown.value;
      const emojis = data[selectedCategory];
      const letters = Array.from({length: emojis.length}, (_, i) => String.fromCharCode(97 + i));
      const emojiMap = Object.fromEntries(emojis.map((emoji, i) => [letters[i], emoji]));
      console.log(emojiMap);
      shuffle(letters);
      // Clear the grid
      emojiGrid.innerHTML = '';

      // Add each emoji to the grid
      letters.forEach(letter => {
        const emoji = emojiMap[letter];
        const emojiItem = document.createElement('div');
        emojiItem.classList.add('emoji-item');
        emojiItem.style.cursor = 'pointer';
        emojiItem.textContent = emoji;
        emojiItem.setAttribute('data-value', letter);
        emojiGrid.appendChild(emojiItem);

        // // Listen for emoji click
        // emojiItem.addEventListener('click', function() {
        //   if (selected.length < 4) {
        //     const value = this.getAttribute('data-value');
        //     selected.push(value);
        //     this.classList.add('selected');
        //     console.log(selected);
        //   }
        // });

        // Listen for emoji item click
        emojiItem.addEventListener('click', function() {
          if (selected.length < 4 && !selected.includes(emojiItem.dataset.value)) {
            const value = this.getAttribute('data-value');
            selected.push(value);
            emojiItem.style.backgroundColor = 'green';
            this.classList.add('selected');
            // selected.sort();
            console.log(selected);
          }
        });
      });
    });

    // Add event listener to clear button
    
    clearButton.addEventListener('click', function() {
      selected.forEach(value => {
        const selectedEmoji = emojiGrid.querySelector(`[data-value="${value}"]`);
        selectedEmoji.style.backgroundColor = '';
      });
      selected.length = 0;
      // selected.sort();
      console.log(selected);
    });

  });

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  let submit = document.querySelector(".submit");
  let popup = document.querySelector(".popup");

  submit.addEventListener("click", () => {
    popup.style.display = "block";
  })

  let sure = document.querySelector(".sure");

  sure.addEventListener('click', () => {
    popup.style.display = "none";
    setTimeout(() => {
      alert("password changed successfully !!");
    }, 500)
  })
  
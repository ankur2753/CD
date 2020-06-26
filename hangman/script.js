const wrongLettersEl =  document.getElementById('wrong-letters');
const popupContainer =  document.getElementById('popup-container');
const wordholder =      document.getElementById('word-holder');
const noti  =           document.getElementById('notification-container');
const figureParts =     document.querySelectorAll('.figure-part');
const finalMsg=         document.getElementById('final-message');
const againBtn=         document.getElementById('play-button')
const RevealWord =      document.getElementById('reveal')   
const word = ['hello','name','place','here','one']
const selectedWord = word[Math.floor(Math.random()*(word.length))];


const correctLetters =['h','n','p'];
const wrongLetters =[];


displayWords();



// update wrong words containers

function updateWrongEl(){
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

    // Display parts
    
    
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;
            
		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
    });
    if (wrongLetters.length === figureParts.length) {
		finalMsg.innerText = 'Unfortunately you lost. 😕';
		RevealWord.innerText = `...the word was: ${selectedWord}`;
		popupContainer.style.display = 'flex';
    }
}


// popup message for repeated entry

function showNotification(){
    noti.classList.add('show');
    setTimeout( ()=>{ noti.classList.remove('show');} ,2000);
}

// detect keypress and allocate to functions

window.addEventListener("keyup", e => {
    
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter = e.key.toLowerCase();
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWords();
            }
            else showNotification();   
            
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongEl();
            }else showNotification();
        }   
    }
});
againBtn.addEventListener('click',()=>{
    wrongLetters.splice(0,wrongLetters.length);
    correctLetters.splice(0,correctLetters.length);
    displayWords();
    updateWrongEl();
    popupContainer.style.display = 'none';
    
})
function displayWords(){
    wordholder.innerHTML= `
    ${
    
        selectedWord.split('').map(letters => `<span class="letters">${correctLetters.includes(letters)? letters : '' }</span>`)
        .join('')
    }
`;

    const innerWord = wordholder.innerText.replace(/[ \n]/g, '');

if (innerWord === selectedWord) {
    finalMsg.innerText = 'Congratulations! You won! 😃';
    popupContainer.style.display = 'flex';
    // playable = false;
}
}
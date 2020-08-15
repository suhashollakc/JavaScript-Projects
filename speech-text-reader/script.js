const main = document.querySelector("main");
const voiceSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [{
        image: "img/drink.jpg",
        text: "I'am Thirsty",
    },
    {
        image: "img/angry.jpg",
        text: "I'am angry",
    },
    {
        image: "img/food.jpg",
        text: "I'am hungry",
    },
    {
        image: "img/happy.jpg",
        text: "I'am happy",
    },
    {
        image: "img/home.jpg",
        text: "I'am at home",
    },
    {
        image: "img/hurt.jpg",
        text: "I'am hurt",
    },
    {
        image: "img/outside.jpg",
        text: "I'am outside",
    },
    {
        image: "img/sad.jpg",
        text: "I'am sad",
    },
    {
        image: "img/scared.jpg",
        text: "I'am scared",
    },
    {
        image: "img/school.jpg",
        text: "I'am at school",
    },
    {
        image: "img/tired.jpg",
        text: "I'am Tired",
    },
    {
        image: "img/grandma.jpg",
        text: "I'am at grandmas",
    },
];

data.forEach(createBox);

//create speech boxes

function createBox(item) {
    const box = document.createElement("div");

    const { image, text } = item;

    box.classList.add("box");
    box.innerHTML = `
<img src = "${image}" alt="${text}" />
<p class='info'> ${text} </p> 

`;

    // speak event

    box.addEventListener("click", () => {
        setTextMessage(text);
        speakText();

        //Add active effect

        box.classList.add("active");
        setTimeout(() => {
            box.classList.remove("active");
        }, 800);
    });

    main.appendChild(box);
}

//init speech synthesis

const message = new SpeechSynthesisUtterance();

// array to store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach((voice) => {
        const option = document.createElement("option");

        option.value = voice.name;
        option.innerText = ` ${voice.name} ${voice.lang}`;

        voiceSelect.appendChild(option);
    });
}

//set text
function setTextMessage(text) {
    message.text = text;
}

//speak text

function speakText() {
    speechSynthesis.speak(message);
}

//set voice

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}
//voices changed

speechSynthesis.addEventListener("voiceschanged", getVoices);

// toggle gtext button

toggleBtn.addEventListener("click", () =>
    document.getElementById("text-box").classList.toggle("show")
);

// toggle gtext button

closeBtn.addEventListener("click", () =>
    document.getElementById("text-box").classList.remove("show")
);

//change voice
voiceSelect.addEventListener('change', setVoice);

//read text button
readBtn.addEventListener('click', () => {

    setTextMessage(textArea.value);
    speakText();

});


getVoices();
// quizData.js - Contains questions grouped by topic
const quizData = {
    HTML: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hypertext Markup Language",
                "Hyper transfer Markup Language",
                "Hypertext Machine Language",
                "Hyperlink and Text Markup Language"
            ],
            correct: 0,
        },
        {
            question: "Which HTML attribute is used to define inline styles?",
            options: ["style", "class", "id", "css"],
            correct: 0,
        },
    ],
    CSS: [
        {
            question: "Which CSS property controls text size?",
            options: ["font-style", "text-size", "font-size", "text-style"],
            correct: 2,
        },
        {
            question: "Which CSS property is used to control the spacing inside an element?",
            options: ["margin", "padding", "spacing", "border-spacing"],
            correct: 1,
        }
    ],
    JavaScript: [
        {
            question: "Which keyword is used to declare a variable in JavaScript?",
            options: ["var", "let", "const", "All of the above"],
            correct: 3,
        },
        {
            question: "What does DOM stand for?",
            options: ["Document Object Model", "Data Object Model", "Digital Object Management", "Document Order Model"],
            correct: 0,
        },
    ],
    React: [
        {
            question: "Which hook is used for side effects in a function component?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            correct: 0,
        },
        {
            question: "What is JSX?",
            options: ["JavaScript XML", "JSON Extension", "Java Syntax XML", "JavaScript Syntax eXtension"],
            correct: 0,
        },
    ],
};

let selectedTopic = "HTML";
let currentQuiz = 0;
let score = 0;

const quizContainer = document.querySelector("#quiz");
const topicSelector = document.querySelector("#topic");
const questionElm = document.querySelector("#question");
const optionsElm = document.querySelectorAll(".answer");
const optionLabels = document.querySelectorAll("label");
const submitBtn = document.querySelector("#submit");

const deselectAnswers = () => {
    optionsElm.forEach((option) => {
        option.checked = false;  // Uncheck all radio buttons
    });
};


const loadQuiz = () => {
    const quizSet = quizData[selectedTopic];

    if (!quizSet || quizSet.length === 0) return;

    const { question, options } = quizSet[currentQuiz];

    deselectAnswers();  

    // Set the question text
    questionElm.innerText = question;

    // Ensure all four options are updated correctly
    options.forEach((opt, index) => {
        const optionLabel = document.querySelector(`#option_${index + 1}`);
        const optionInput = optionsElm[index];

        if (optionLabel && optionInput) {
            optionLabel.innerText = opt; // Set label text
            optionLabel.style.display = "inline-block"; // Make sure it's visible
            optionInput.style.display = "inline-block"; // Make sure radio button is visible
        }
    });

    console.log("Loaded Question:", question);
    console.log("Loaded Options:", options);
};

// Force first quiz load
document.addEventListener("DOMContentLoaded", loadQuiz);
    




topicSelector.addEventListener("change", (e) => {
    selectedTopic = e.target.value;
    currentQuiz = 0;
    score = 0;
    loadQuiz();
});

submitBtn.addEventListener("click", () => {
    const selectedOptionIndex = [...optionsElm].findIndex(opt => opt.checked);
    if (selectedOptionIndex === -1) return alert("Please select an answer!");
    
    if (selectedOptionIndex === quizData[selectedTopic][currentQuiz].correct) {
        score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData[selectedTopic].length) {
        loadQuiz();
    } else {
        quizContainer.innerHTML = `<h2>Your Score: ${score}/${quizData[selectedTopic].length}</h2>
            <button onclick='window.location.reload()'>Play Again</button>`;
    }
});

document.addEventListener("DOMContentLoaded", loadQuiz);

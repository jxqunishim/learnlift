
let selectedGrade = "";
let questions = [];
let currentQ = 0;
let score = 0;

const allQuestions = {
    "JK": generateQuestions(10, "JK"),
    "K": generateQuestions(10, "K"),
    "1": generateQuestions(10, "1"),
    "2": generateQuestions(10, "2"),
    "3": generateQuestions(10, "3"),
    "4": generateQuestions(10, "4"),
    "5": generateQuestions(20, "5"),
    "6": generateQuestions(20, "6"),
    "7": generateQuestions(20, "7"),
    "8": generateQuestions(20, "8"),
    "9": generateQuestions(30, "9"),
    "10": generateQuestions(30, "10"),
    "11": generateQuestions(30, "11"),
    "12": generateQuestions(30, "12")
};

// Generate dummy questions
function generateQuestions(count, grade) {
    let arr = [];
    for (let i = 1; i <= count; i++) {
        arr.push({
            q: `Grade ${grade} Question ${i}: What is ${i} + ${i}?`,
            a: `${i + i}`
        });
    }
    return arr;
}

function selectGrade() {
    const dropdown = document.getElementById("gradeDropdown");
    selectedGrade = dropdown.value;
    if (selectedGrade) {
        loadQuiz();
    } else {
        loadHome();
    }
}

function loadHome() {
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center; margin-top:50px;">Select your grade to start the quiz</h2>
    `;
    document.getElementById("feedback").style.display = "none";
}

function loadQuiz() {
    if (!allQuestions[selectedGrade]) {
        document.getElementById("content").innerHTML = "<p>No questions for this grade yet.</p>";
        return;
    }

    questions = [...allQuestions[selectedGrade]];
    shuffleArray(questions);
    currentQ = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQ >= questions.length) {
        document.getElementById("content").innerHTML = `
            <div class="lesson-box">
                <h2>Quiz Completed!</h2>
                <p>Your Score: ${score} / ${questions.length} (${Math.round(score/questions.length*100)}%)</p>
                <button onclick="loadQuiz()">Retry</button>
            </div>
        `;
        return;
    }

    const q = questions[currentQ];
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Question ${currentQ + 1} of ${questions.length}</h2>
            <p>${q.q}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="submitAnswer()">Submit</button>
        </div>
    `;
    document.getElementById("feedback").style.display = "none";
}

function submitAnswer() {
    const input = document.getElementById("answerInput").value.toLowerCase();
    const correct = input == questions[currentQ].a.toLowerCase();

    if (correct) score++;

    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.style.display = "block";
    feedbackDiv.textContent = correct ? "Correct! ✅" : `Wrong! ❌ Answer: ${questions[currentQ].a}`;
    feedbackDiv.classList.remove("pop");
    void feedbackDiv.offsetWidth; // force reflow
    feedbackDiv.classList.add("pop");

    currentQ++;
    setTimeout(showQuestion, 1000);
}

function shuffleArray(arr) {
    for (let i = arr.length-1; i>0; i--) {
        const j = Math.floor(Math.random()* (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

window.onload = loadHome;

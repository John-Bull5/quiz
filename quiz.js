// REGISTRATION PAGE
class Students {
  constructor(name, RegNo, tel, correct, total, completed) {
    this.name = name;
    this.RegNo = RegNo;
    this.phoneNo = tel;
    this.score = correct;
    this.total = questions.length;
    this.completed_Registration = completed;
  }
}
class Store {
  // GET STUDENT FROM STORE
  static getStudents() {
    let students;
    if (localStorage.getItem("students") === null) {
      students = [];
    } else {
      students = JSON.parse(localStorage.getItem("students"));
    }

    return students;
  }
  // ADD STUDENT TO STORE
  static addStudent(student) {
    const students = Store.getStudents();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
  }
}
// GET THE FORM FIELD FOR REGISTRING NEW STUDENT
function register() {
  const nameField = document.getElementById("name");
  const name = nameField.value;
  const phoneField = document.getElementById("tel");
  phoneNo = phoneField.value;
  let alpha = "ABEFGSXYZ";
  let date = new Date().getMilliseconds() * 1000000;
  let RegNo;
  let completed = false;
  for (let i = 0; i < alpha.length; i++) {
    RegNo = Math.floor(Math.random() * date) + alpha[i];
  }
  if (name == "" || phoneNo == "") {
    alert("Fill all your details");
    return;
  } else if (name && phoneNo) {
    completed = true;
  }
  // INSTANTIATE A NEW STUDENT
  const student = new Students(
    name,
    RegNo,
    phoneNo,
    correct,
    questions.length,
    completed
  );
  //SAVE STUDENT TO STORE
  Store.addStudent(student);
}
// END OF REGISTRATION PAGE

// QUIZ PAGE
let pos = 0,
  test,
  test_status,
  question,
  choice,
  choices,
  chA,
  chB,
  chC,
  chD,
  correct = 0;
btn = _("questions-btns");

function _(x) {
  return document.getElementById(x);
}

const questions = [
  [
    "Who is the president of Nigeria ? ",
    "Muhammedu Buhari",
    "Mark angel",
    "david mark",
    "johnson ben",
    "A",
  ],
  [
    "Who is the best coding youtuber ?",
    "Web dev simplified",
    "travery media",
    "cleaver programmer",
    "all of the above",
    "D",
  ],
  [
    "Who is Donald Trump ?",
    "England King",
    "us president",
    "african president",
    "us ambassador",
    "B",
  ],
  [
    "Facebook is owned by who ?",
    "Bill Gates",
    "mark zuckerberg",
    "eric johnson",
    "steve mark",
    "B",
  ],
  [
    "What is Corona Virus ?",
    "Bacteria",
    "A deadly 2020 virus",
    "Fungi",
    "Satanic Virus",
    "B",
  ],
  [
    "who is mark angel ?",
    "a comedian",
    "a president",
    "a criminal",
    "a lunatic",
    "A",
  ],
];

// HANDLES DISPLAYING QUESTION FUNCTIONALITY
function renderQuestion(question) {
  test = _("test");
  if (pos >= questions.length) {
    if (window.confirm("Are You Sure You Want To Submit Your Exam?") == true) {
      
      test.innerHTML =
        "<h2> you have finished all your and you got "+ correct +" out of " +
        questions.length +
        " questions <br> Please leave your computer </h2>";
      _("test-status").innerHTML = "Test completed";
      pos = 0;
      correct = 0;
      btn.style.display = "none";
      return;
    } else {
      pos = 0;
    }
  }

  _("test-status").innerHTML =
    "question " + (pos + 1) + " of " + questions.length;
  question = questions[pos][0];
  chA = questions[pos][1];
  chB = questions[pos][2];
  chC = questions[pos][3];
  chD = questions[pos][4];
  test.innerHTML = "<h3>" + question + "</h3>";
  test.innerHTML +=
    "<input type='radio' name='choices' value='A'> " + chA + "<br>";
  test.innerHTML +=
    "<input type='radio' name='choices' value='B'> " + chB + "<br>";
  test.innerHTML +=
    "<input type='radio' name='choices' value='C'> " + chC + "<br>";
  test.innerHTML +=
    "<input type='radio' name='choices' value='D'> " + chD + "<br>";
  test.innerHTML +=
    "<button id='checkBtn' type='button' Onclick='checkAnswer()'>Next</button>";
}

// HANDLES QUESTION BUTTONS NUMBER FUNCTTIONALITY
function loadBtn() {
  questions.forEach((question, index) => {
    const button = document.createElement("button");
    button.innerText = index + 1;
    //console.log(button.innerText);
    button.classList.add("answer-pending");
    button.dataset.index = index;
    btn.appendChild(button);
    button.addEventListener("click", navigate);
  });
}

// HANDLES DISPLAYING QUESTION FROM QUESTION BUTTON CLICK
function navigate(e) {
  const clicked = e.target;
  pos = clicked.dataset.index;
  for (i = 0; i < questions.length; i++) {
    if (pos) {
      _("test-status").innerHTML =
        "question " + (parseInt(pos) + 1) + " of " + questions.length;
      question = questions[pos][0];
      chA = questions[pos][1];
      chB = questions[pos][2];
      chC = questions[pos][3];
      chD = questions[pos][4];
      test.innerHTML = "<h3>" + question + "</h3>";
      test.innerHTML +=
        "<input type='radio' name='choices' value='A'> " + chA + "<br>";
      test.innerHTML +=
        "<input type='radio' name='choices' value='B'> " + chB + "<br>";
      test.innerHTML +=
        "<input type='radio' name='choices' value='C'> " + chC + "<br>";
      test.innerHTML +=
        "<input type='radio' name='choices' value='D'> " + chD + "<br>";
      test.innerHTML +=
        "<button id='checkBtn' type='button' Onclick='checkAnswer()'>Next</button>";
    }
  }
}

// HANDLES ANSWER CHECKING QUESTION BUTTON HIGHLIGTHING
function checkAnswer() {
  choices = document.getElementsByName("choices");
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }
  if (choice == questions[pos][5]) {
    correct++;
    // console.log(correct);
  }

  if (choice) {
    const questBtn = document.querySelectorAll(".answer-pending");
    for (i = 0; i < questBtn.length; i++) {
      if (pos == questBtn[i].dataset.index) {
        questBtn[i].classList.remove("answer-pending");
        questBtn[i].classList.add("btn");
      } else if ((choice = "")) {
        questBtn[i].classList.remove("btn");
      }
    }
  }

  pos++;
  renderQuestion();
}

const startBtn = document.getElementById("start-quiz");
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hide");
  document.getElementById("quiz-container").classList.remove("hide");
  startQuiz();
  renderQuestion();
});
// LOADS ALL THE ABOVE FUNCTIONALITIES
// window.addEventListener('load', renderQuestion, false);
window.addEventListener("load", loadBtn, false);
// END OF QUIZ PAGE

function startQuiz() {
  const display = document.getElementById("display");
  timeLeft = 5 * questions.length;
  function countDown() {
    setInterval(function () {
      if (timeLeft <= 0) {
        clearInterval((timeLeft = 0));
        display.classList.add('hide')
        test.innerHTML =
          "<h2> you have finished all your and you got "+ correct +" out of "+
          questions.length +
          " questions <br> Please leave your computer </h2>";
        _("test-status").innerHTML = "Test completed";
        pos = 0;
        correct = 0;
        btn.style.display = "none";
        return;
      }
      display.innerHTML = "Time Left: " + timeLeft;
      timeLeft -= 1;
    }, 1000);
  }
  countDown();
}

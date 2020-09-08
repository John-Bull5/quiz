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
}

// DASHBOARD PAGE
function popDashBoard() {
  const dashboardUsername = document.getElementById("dash-username");
  const userReg = document.getElementById("userReg");
  const score = document.getElementById("score");
  const total = document.getElementById("total");

  const students = Store.getStudents()
  students.forEach( student => {
    dashboardUsername.innerText = student.name;
    userReg.innerText = student.RegNo;
    score.innerText = student.score;
    total.innerText = student.total;
  });
}
// END OF DASHBOARD PAGE
window.addEventListener('load',popDashBoard,false)

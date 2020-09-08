
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

// LOGIN PAGE
function getDetail() {
  const regField = document.getElementById("reg-no").value;
  
  const students = Store.getStudents();
  students.forEach((student) => {
    if (regField === student.RegNo) {
      alert("Success");
        window.location = 'quiz.html';
        return
    } else {
      alert("Reg No not found please cross check");
    }
  });
}
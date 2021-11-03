import './App.css';
import StudentTable from './components/StudentTable';
import { useEffect, useState } from 'react';
import { getStudents } from './api/student';
import Fuse from 'fuse.js'

function App() {
  const [students, setStudents] = useState([]);
  const [dep, setDep] = useState(null);
  const [activeStreamA, setActiveStreamA] = useState(false);
  const [activeStreamB, setActiveStreamB] = useState(false);
  const [activeStreamAll, setActiveStreamAll] = useState(false);

  const getAndSetStudents = async () => {
    const students = JSON.parse(localStorage.getItem('students'));
    if (students) {
      setStudents(students);
    } else {
      const { data } = await getStudents();
      const filteredStudents = data.filter(student => student.isActive === true);
      localStorage.setItem('students', JSON.stringify(filteredStudents));
      setStudents(filteredStudents);
    }
  };

  // Get student by stream A
  const shortByStreamA = () => {
    const students = JSON.parse(localStorage.getItem('students'));
    const filteredStudents = students.filter(student => student.stream === 'A');
    setStudents(filteredStudents);
    setActiveStreamA(true);
    setActiveStreamAll(false);
    setActiveStreamB(false);
  };

  // Get student by stream B
  const shortByStreamB = () => {
    const students = JSON.parse(localStorage.getItem('students'));
    const filteredStudents = students.filter(student => student.stream === 'B');
    setStudents(filteredStudents);
    setActiveStreamB(true);
    setActiveStreamAll(false);
    setActiveStreamA(false);
  };

  // Get student by stream 
  const shortByStream = () => {
    const students = JSON.parse(localStorage.getItem('students'));
    const filteredStudents = students.filter(student => student.stream);
    setStudents(filteredStudents);
    setActiveStreamAll(true);
    setActiveStreamA(true);
    setActiveStreamB(true);
  };

  // Get All active Students
  const shortByActive = () => {
    const students = JSON.parse(localStorage.getItem('students'));
    const filteredStudents = students.filter(student => student.isActive === true);
    setStudents(filteredStudents);
    setActiveStreamA(false);
    setActiveStreamAll(false);
    setActiveStreamB(false);
  };

  // Get student by attendance type like - Absent, Late, Present, Sick
  const shortByAttendance = (e, attendanceType) => {
    e.preventDefault();
    let students = [];
    const studentsFromLocalStorage = JSON.parse(localStorage.getItem('students'));
    for (let i = 0; i < studentsFromLocalStorage.length; i++) {
      const student = studentsFromLocalStorage[i];
      const studentByAttendance = student.attendance.find(attendance => attendance === attendanceType);
      if (studentByAttendance) {
        students.push(student);
      }
    }
    setStudents(students);
  };

  useEffect(() => {
    { !students.length && getAndSetStudents(); }
  }, [dep]);
  return (
    <div className="container pt-5">
      <div className="row mb-5 justify-content-center mt-sm-5 mt-md-0">
        <div className="col-lg-6 col-md-12">
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Class Name"
              onChange={(e) => {
                if (!e.target.value) {
                  getAndSetStudents();
                } else {
                  const studentList = JSON.parse(localStorage.getItem('students'));
                  const options = {
                    keys: [
                      "class",
                    ]
                  };

                  const fuse = new Fuse(studentList, options);
                  const result = fuse.search(e.target.value);
                  // setStudents(result);
                  let searchResult = [];
                  result.map(student => searchResult.push(student.item))
                  setStudents(searchResult);
                }
              }}
            />
            {/* <button className="btn btn-secondary">Search</button> */}
          </div>
        </div>
      </div>
      <div className="row justify-content-center text-center pb-2">
        {console.log(!activeStreamA)}
        {!activeStreamA && !activeStreamAll
          ? <button onClick={() => shortByStreamA()} className="btn btn-light  w-auto">Short By Stream A</button>
          : null}
        {!activeStreamB && !activeStreamAll
          ? <button onClick={() => shortByStreamB()} className="ms-3 btn btn-light w-auto">Short By Stream B</button>
          : null}
        <button onClick={() => shortByStream()} className="ms-3 mt-1 btn btn-light w-auto">All Stream</button>

        <div className="dropdown w-auto">
          <button className="btn mt-1 btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a onClick={(e) => shortByAttendance(e, "p")} className="dropdown-item" href="/">Present</a></li>
            <li><a onClick={(e) => shortByAttendance(e, "l")} className="dropdown-item" href="/">Late</a></li>
            <li><a onClick={(e) => shortByAttendance(e, "s")} className="dropdown-item" href="/">Sick</a></li>
            <li><a onClick={(e) => shortByAttendance(e, "a")} className="dropdown-item" href="/">Absent</a></li>
          </ul>
        </div>
        <button onClick={() => shortByActive()} className="ms-3 mt-1 btn btn-light w-auto">All Present</button>
      </div>
      <StudentTable dep={dep} students={students} setDep={setDep} />
    </div>
  );
}

export default App;

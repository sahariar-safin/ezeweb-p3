import React, { useEffect, useState } from 'react'
import StudentModal from './StudentModal'

function StudentTable({ students, setDep, dep }) {
    const [studentIndex, setStudentIndex] = useState(null);

    const calculatePercentageOfPresent = attendance => {
        let p = 0;
        let a = 0;
        let l = 0;
        let s = 0;
        for (let i = 0; i < attendance.length; i++) {
            const element = attendance[i];
            if (element === "a") {
                a++;
            } if (element === "p") {
                p++;
            } if (element === "l") {
                l++;
            } if (element === "s") {
                s++;
            }
        }
        // get the percentage of presents
        const pPercent = (a / attendance.length) * 100;

        return pPercent;
    }

    useEffect(() => {
        
    }, [students, dep])
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Percentage Of Present</th>
                        <th scope="col">View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => {
                            const percentageOfPresent = calculatePercentageOfPresent(student.attendance);
                            return (
                                <tr className={percentageOfPresent && percentageOfPresent >= 50 ? "table-success" : (percentageOfPresent < 25 ? "table-danger" : (percentageOfPresent < 50 ? "table-warning " : null))
                                } key={index} >
                                    <th >{student.id}</th>
                                    <th >{student.name.first}</th>
                                    <th >{student.name.last}</th>
                                    <th >
                                        {percentageOfPresent}%
                                    </th>
                                    <th >
                                        <button
                                            onClick={() => setStudentIndex(index)}
                                            type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            View Details
                                        </button>
                                    </th>
                                </tr>
                            )
                        }
                        )}
                </tbody>
            </table >
            <StudentModal dep={dep} setDep={setDep} data={studentIndex != -1 ? students[studentIndex] : null} index={studentIndex} />
        </div>
    )
}

export default StudentTable

import React, { useEffect, useState } from 'react'

function StudentModal({ data, setDep, dep }) {
    const [student, setStudent] = useState({});

    const changeStream = (stream) => {
        console.log(stream);
        const students = JSON.parse(localStorage.getItem('students'));
        const studentIndex = students.findIndex(student => student.id === data?.id);
        students[studentIndex].stream = stream;
        localStorage.setItem('students', JSON.stringify(students));
        setDep(Math.random());
    }

    useEffect(() => {
        const students = JSON.parse(localStorage.getItem('students'));
        const student = students?.find(s => s?.id === data?.id);
        setStudent(student);
    }, [dep, data])
    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Student Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>First Name: {student?.name?.first}</p>
                            <p>Last Name: {student?.name?.last}</p>
                            <p>Age: {student?.age}</p>
                            <p>Ethnicity: {student?.ethnicity}</p>
                            <p>Email: {student?.email}</p>
                            <p>Phone: {student?.phone}</p>
                            <p>Address: {student?.address}</p>
                            <p>Enrolled: {student?.enrolled}</p>
                            {/* <h5>Attendance: {student?.enrolled}</h5> */}

                            <p>Stream:
                                {student?.stream
                                    ? <button className="ms-3 btn btn-success">
                                        {
                                            student?.stream
                                        }
                                    </button>
                                    : <>
                                        <button onClick={() => changeStream("A")} className="ms-3 btn btn-success">A</button>
                                        <button onClick={() => changeStream("B")} className="ms-3 btn btn-success">B</button>
                                    </>}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentModal

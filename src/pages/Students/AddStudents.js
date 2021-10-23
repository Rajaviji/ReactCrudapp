import * as boot from 'react-bootstrap'
import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router'

const AddStudents = ({ }) => {
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            gender: '',
        },
        onSubmit: values => {
            let details = {
                studentName: values.name,
                phoneNumber: values.phone,
                gender: values.gender,
            }
            let config = {
                headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
            }
            axios.post('http://localhost:8080/api/students',details,config).then(res=>{
                if(res.statusText==="Created"){
                    alert("Student detail inserted successfully")
                    history.push('/')
                }
            })
        },
    });
    return (
        <boot.Container fluid>
            <boot.Row>
                <boot.Col md={1}>
                <boot.Button onClick={()=>history.push('/')}>Go Back</boot.Button>
                </boot.Col>
                </boot.Row>
            <boot.Row style={{ padding: 20 }}>
                <boot.Col>
                    <form onSubmit={formik.handleSubmit} style={{ textAlign: 'left' }}>
                        <boot.Form.Label>Student Name</boot.Form.Label>
                        <boot.Form.Control type="text" id="name" placeholder="Enter student name"
                            onChange={formik.handleChange}
                            value={formik.values.name} />
                        <br />
                        <boot.Form.Label>Phone</boot.Form.Label>
                        <boot.Form.Control type="text" id="phone" placeholder="Enter Phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone} />
                        <br />
                        <boot.Form.Label>Gender</boot.Form.Label>
                        <boot.Form.Control type="text" id="gender" placeholder="Enter Gender"
                            onChange={formik.handleChange}
                            value={formik.values.gender} />
                        <br />
                        <boot.Button variant="primary" type="submit">
                            Submit
                        </boot.Button>
                    </form>
                </boot.Col>
            </boot.Row>
        </boot.Container>
    )
}

export default AddStudents
import React from "react"
import * as boot from 'react-bootstrap'
import {useEffect,useState} from 'react'
import {useHistory} from 'react-router'
import {useFormik} from 'formik'
import axios from 'axios'


const EditStudents = ({match})=>{
    
    const history = useHistory()
    const [userDetails,setUserDetails] = useState([])
    const [loading,setLoading] = useState(false)
    


    const formik = useFormik({
        initialValues: {
            name: userDetails.studentName,
            phone: userDetails.phoneNumber,
            gender: userDetails.gender,
        },
        enableReinitialize:true,
        onSubmit: values => {
            let details = {
                id : match.params.id,
                studentName: values.name,
                phoneNumber: values.phone,
                gender: values.gender,
            }
            let config = {
                headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
            }
            axios.patch(`http://localhost:8080/api/students/${match.params.id}`,details,config).then(res=>{
                if(res.status===200){
                    alert("Student detail Updated successfully")
                    history.push('/')
                }
            })
        },
    });

    useEffect(()=>{
        setLoading(true)
        let config = {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        axios.get(`http://localhost:8080/api/students/${match.params.id}`,config).then(res=>{
            if(res.status === 200){
                setUserDetails(res.data)
                setLoading(false)
            }
        })
    },[])
    return (
       loading ? 'Loading please wait' :  <boot.Container fluid>
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

export default EditStudents
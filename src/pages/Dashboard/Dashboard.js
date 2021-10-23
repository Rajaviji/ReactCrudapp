import * as boot from 'react-bootstrap'
import { useEffect,useMemo,useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { useHistory } from 'react-router'
import {FaPen,FaTrashAlt} from 'react-icons/fa'


const Dashboard = () => {
    const [page,setPage] = useState(1)
    const [studentsData,setStudentsData] = useState([])
    const history = useHistory()
    useEffect(() =>{
        let config = {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        axios.get('http://localhost:8080/api/students',config).then(res=>{
            if(res.status === 200){
                setStudentsData(res.data)
            }
        })
    },[])

    const colums = useMemo(() => {
        return [
            {
                name: 'id',
                selector: 'id', sortable: true
            },
            {
                name: 'Student Name',
                selector: 'studentName'
            },
            {
                name: 'Phone',
                selector: 'phoneNumber'
            },
            {
                name: 'Gender',
                selector: 'gender'
            },
            {
                name: 'Actions',
                selector: 'actions',
                cell: row => <><div><button onClick={()=>history.push(`/editStudent/${row.id}`)}><FaPen size="20px" className="text-gray-600 dark:text-gray-300" /></button></div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><button onClick={()=>deleteStudent(row.id)}><FaTrashAlt title="Revive" size="20px" className="text-red-600 dark:text-gray-300" /></button></div>
                </>,
            }
        ]
    }, [studentsData])// eslint-disable-line

    const deleteStudent = (value)=>{
        let config = {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        axios.delete(`http://localhost:8080/api/students/${value}`,config).then(res=>{
            if(res.status === 204){
                alert("Student record deleted successfully")
                window.location.reload(false)
            }
        })
    }

    const filteredStudents = useMemo(() => {
        return studentsData
    }, [studentsData])

    const addStudent = ()=>{
        history.push('/addStudents')
    }
    return (
        <boot.Container fluid>
            <boot.Row>
                <boot.Col xs={12} style={{ textAlign: 'start' }}>
                    <boot.Button onClick={()=>addStudent()}>Add Students</boot.Button>
                </boot.Col>
            </boot.Row>
            <br></br>
            <boot.Row>
                <boot.Col>
                <DataTable injectClass="mt-12"
                    columns={colums}
                    data={filteredStudents} noHeader
                    pagination onChangePage={val => setPage(val)} paginationDefaultPage={page} paginationComponentOptions={{ rowsPerPageText: 'Items per page:', rangeSeparatorText: 'of', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'All' }}
                />
                </boot.Col>
            </boot.Row>
        </boot.Container>
    )
}
export default Dashboard
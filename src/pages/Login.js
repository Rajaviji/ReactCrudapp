import { setLoggedIn } from '../store/auth/actions'
import Button from '../components/Button'
import { PopInAnim, TextAnimateXRev, TextAnimateY, wrapPopAnim } from '../commons/anims'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import BgImage from '../assets/undraw_Personal_notebook_re_d7dc.svg'
import TextField from '../components/TextField'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import FlowText from '../components/FlowText'
import DarkModeSwitch from '../components/DarkModeSwitch'
import { useHistory } from 'react-router'
import * as boot from 'react-bootstrap'
import {useFormik} from 'formik'
import API from '../axios/API'
import axios from 'axios'

// const styles = {
//     centered: {
//         position: 'fixed',
//         top: 50,
//         left: 50,
//         /* bring your own prefixes */
//         transform: 'translate(220%, 400%)'
//     }
// }
const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [formDirty, setFormDirty] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
    const [forgotUsernameModal, setForgotUsernameModal] = useState(false)
    const setIsLoggedIn = value => {
        dispatch(setLoggedIn(value))
    }
    const setData = (name, value) => setLoginData({ ...loginData, [name]: value })

    const loginValid = () => Object.keys(loginData).every(c => loginData[c] !== null && loginData[c] !== '')
    const route = () => {
        history.push('/')
    }

    const formik = useFormik({
            initialValues: {
              username : '', password : ''
             },
             onSubmit: values => {
                axios.post('http://localhost:8080/api/authenticate',values).then(res=>{
                    console.log(res)
                })
             },
           });
    return (
        // <div className="min-h-screen flex justify-center items-center flex-col bg-white-50 dark:bg-dark overflow-hidden">
        //     <motion.div className="bg-indigo-50 dark:bg-ldark ring-1 ring-indigo-100 dark:ring-mdark shadow-lg flex flex-col overflow-hidden items-center p-6 rounded-2xl relative w-[400px] sm:w-[600px]" variants={ wrapPopAnim } initial="hidden" animate="visible">
        //         <img src={ BgImage } alt="Bg" className="absolute left-0 bottom-5 opacity-5" />
        //         <div className="text-3xl text-tcolor font-medium mb-3 flex justify-between content-center w-full px-4">
        //             <FlowText text={'Login'}/>
        //             <div className="flex">
        //                 <span className="mr-5">
        //                 </span>
        //                 <DarkModeSwitch />
        //             </div>
        //         </div>
        //         <motion.div variants={ PopInAnim } className="w-full">
        // <TextField AppendIcon={ FaUserAlt } label="Username" name="username" injectClass="mt-4" initialValue={ loginData.username } setValue={ (val) => setData('username', val) } type="text" loading={ loading } formDirty={ formDirty } />
        //         </motion.div>
        //         <motion.div variants={ PopInAnim } className="w-full">
        //             <TextField AppendIcon={ FaLock } label="Password" name="password" injectClass="mt-4" initialValue={ loginData.password } setValue={ (val) => setData('password', val) } type="password" loading={ loading } formDirty={ formDirty } />
        //         </motion.div>
        //         <motion.div variants={ TextAnimateY }>
        //             <Button injectClass={ `mt-8 mb-4 w-80 ${loading ? 'animate-pulse' : ''}` }  loading={ loading } onClick={()=>route()}>
        //              LogIn 
        //             </Button>
        //         </motion.div>   
        //         <motion.div variants={ TextAnimateY } className="z-10">
        //             <FlowText text={'Not a registered user ? Contact us :)'}/>
        //         </motion.div>
        //     </motion.div>
        // </div>   
        <boot.Container fluid>
            <boot.Row style={{
                position: "fixed",
                top: 400,
                left: 800,
                marginTop: '-50px',
                marginLeft: '-100px'
            }}>
                <boot.Col xs={12} style={{ justify: 'center', textAlign: 'center' }}>
                    <boot.Card>
                        <boot.Card.Body>
                            <form onSubmit={formik.handleSubmit}>
                            <boot.Form.Label>Username</boot.Form.Label>
                            <boot.Form.Control placeholder="Username" id="username" type="text" onChange={formik.handleChange}
         value={formik.values.username}/>
                            <br />
                            <boot.Form.Label>Password</boot.Form.Label>
                            <boot.Form.Control placeholder="Password" id="password" type="password" onChange={formik.handleChange}
         value={formik.values.password}/>
                            <br />
                            <boot.Button variant="primary" type="submit">
                                Submit
                            </boot.Button>
                            </form>
                        </boot.Card.Body>
                    </boot.Card>
                </boot.Col>
            </boot.Row>
        </boot.Container>
    )
}

export default Login
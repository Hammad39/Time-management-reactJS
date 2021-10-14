import React, {useState} from 'react'
import styles from './Login.module.css'
import { useHistory } from "react-router-dom";
import allActions from '../../actions'
import {useDispatch} from 'react-redux'
import {Row,Col, Container, Form, Button,FloatingLabel} from 'react-bootstrap'
import {
    Link
  } from "react-router-dom";
  
export default function Login() {
    
    let history = useHistory();
    const dispatch = useDispatch()
    const [userInputs, setUserInputs] = useState({
        email:"hammadimran3@gmail.com",
        password:"Lights123!"
        // email:"admin@iplex.com",
        // password:"Admin#123"
    })
    const handleChange = (e) =>{
        setUserInputs({
            ...userInputs,
            [e.target.name]: e.target.value
          });}

    async function onSubmit (e){
        e.preventDefault();
       await fetch('http://34.210.129.167/api/login',{
           method: 'POST',
           headers:{'Content-Type':'application/json'},
           body: JSON.stringify(userInputs)
       } )
       .then(res=>res.json()).then(res=>{
           if(res.message!=="Invalid E-mail or password!"){
            dispatch(allActions.userActions.setUser(res))
            // console.log(res)
            history.push("/dashboard");
            }
            else{
                   alert("Invalid E-mail or password!")
            }
        })
    }
    return (
        <div className={styles.form_container}>
                    <Row>
                        <Col sm={6}>  
                            <div className={styles.left_wrap}>
                                 <Container>
                                    <div className={styles.content_wrap}>
                                      <h1>Login</h1>
                                    </div>
                                 </Container>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.right_wrap}>
                                <Container>
                                    <div className={styles.form_wrap}>
                                         <Form>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Email address"
                                                className="mb-3"
                                            >
                                                <Form.Control name="email" value={userInputs.email} type="email" onChange={e=>handleChange(e)} placeholder="name@example.com" />
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
                                                <Form.Control name="password" value={userInputs.password} type="password" onChange={e=>handleChange(e)} placeholder="Password" />
                                            </FloatingLabel>
                                           <Button onClick={(e)=>{onSubmit(e)}} className="btn-primary" type="submit">
                                                Submit
                                           </Button>
                                           <p style={{marginTop:'10px'}}>Not a user? <Link to="/register">Register here</Link></p>
                                        </Form>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                
        </div>
    )
    }
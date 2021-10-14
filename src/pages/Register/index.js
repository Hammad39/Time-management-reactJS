import React, {useState, useEffect} from 'react'
import styles from './Register.module.css'
import {Row,Col, Container, Form, Button,FloatingLabel} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {
    Link
  } from "react-router-dom";
import {useSelector} from 'react-redux'
export default function Login(props) {    
    const currentUser = useSelector(state => state.currentUser)
    const [userInputs, setUserInputs] = useState({
        firstName:"Hammad",
        lastName:"Imran",
        email:"123@123.com",
        password:"Lights123!",
        password_confirmation:"Lights123!"
    }) 
    
let history=useHistory();

    useEffect(() => {
        if(props.editFlag)
        {
            setUserInputs(props.editFlag)
        }
        // eslint-disable-next-line
    },[])

    const handleChange = (e) =>{
        setUserInputs({
            ...userInputs,
            [e.target.name]: e.target.value
          });}

    async function onSubmit (e){
        e.preventDefault();
        if(props.editFlag)// Check if someone click edit button
        {
            await fetch(`http://34.210.129.167/api/users/${(props.editFlag.id)}`,{
                method: 'PUT',
                headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
                body: JSON.stringify(userInputs)
            } )
            .then(r=>r.json()).then(res=>{
                alert("Manager updated successfully!")
                history.push('/dashboard')
              }  )
        }
        else // add a new user
        {
            await fetch('http://34.210.129.167/api/register',{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(userInputs)
            } )
            .then(r=>r.json()).then(res=>{
                if(res.message==="User created successfully!"){
                        alert("Manager created successfully!")
                        history.push('/dashboard')
                    }
                    else{
                        alert(res)
                    }
            })
        }

    }
    return (
        <div className={styles.form_container}>
                    <Row>
                        <Col xs={6}>  
                            <div className={styles.left_wrap}>
                                 <Container>
                                    <div className={styles.content_wrap}>
                                        {console.log(props)}
                                     <Link to="/dashboard"  style={{color:"white",textDecoration:"none"}}> <h1>{props.editFlag? "Update Manager": "Register"}</h1></Link>
                                    </div>
                                 </Container>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className={styles.right_wrap}>
                                <Container>
                                    <div className={styles.form_wrap}>
                                         <Form>
                                            <FloatingLabel
                                                controlId="floatingFirstName"
                                                label="First Name"
                                                className="mb-3"
                                            >
                                                <Form.Control name="firstName" value={userInputs.firstName} type="firstName" onChange={(e)=>handleChange(e)} placeholder="Ahmed" />
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-3" controlId="lastName" label="Last Name">
                                                <Form.Control name="lastName" value={userInputs.lastName} type="lastName" onChange={(e)=>handleChange(e)} placeholder="Ali" />
                                            </FloatingLabel>
                                           
                                            <FloatingLabel className="mb-3" controlId="floatingEmail" label="Email">
                                                <Form.Control name="email"value={userInputs.email} type="email"  onChange={(e)=>handleChange(e)} placeholder="Email" />
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
                                                <Form.Control name="password" value={userInputs.password} type="password"  onChange={(e)=>handleChange(e)} placeholder="Password" />
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-3" controlId="floatingConfirmation" label="Confirmation Password">
                                                <Form.Control name="password_confirmation" value={userInputs.password_confirmation} type="confirmationPassword"  onChange={(e)=>handleChange(e)} placeholder="Confirmation Password" />
                                            </FloatingLabel>
                                           <Button onClick={(e)=>{onSubmit(e)}} className="btn-primary" type="submit">
                                                Submit
                                            </Button>
                                            {currentUser.loggedIn || props.editFlag ?  ""  :<p style={{marginTop:'10px'}}>Already a user? <Link to="/login">Login here</Link></p>}
                                        </Form>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                
        </div>
    )
}

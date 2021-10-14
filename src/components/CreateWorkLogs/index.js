import React from 'react'
import {useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import styles from './CreateWorkLogs.module.css'
import { useSelector} from 'react-redux'
import {Row,Col, Container, Form, Button,FloatingLabel} from 'react-bootstrap'

 const CreateWorkLogs = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const [editFlag, setEditFlag] = useState(false)
     const [userInputs , setUserInputs] = useState (
         {
             "logDate" : "2019-04-12",
             "hours" : "8",
             "description" : "Hey, this is a dummy log",
         } 
     )
     const history = useHistory();
     const handleChange = (e) =>{
        setUserInputs({
            ...userInputs,
            [e.target.name]:e.target.value
          });
    }// Update Date Values
    useEffect(() => {
        //Check and add edited field's value in the text fields
        if(props.data){

            setUserInputs({
                ...props.data,
                logDate:props.data.log_date
            })
            setEditFlag(true)
         }
         // eslint-disable-next-line
     }, [])
    console.log(userInputs)

const onSubmit = (e) =>{
             e.preventDefault();
             //Check if user pressed EDIT button
             if(editFlag){
                fetch(`http://34.210.129.167/api/user/15/work-logs/${props.data.id}`,{
                    method: 'PUT',
                    headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
                    body: JSON.stringify(userInputs)
                } )
                .then(r=>r.json()).then(res=>{
                   console.log(res)
                    history.push("/dashboard");
                })    
}
else{//Normally add a new log
    fetch('http://34.210.129.167/api/work-logs',{
        method: 'POST',
        headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        body: JSON.stringify(userInputs)
    } )
    .then(r=>r.json()).then(res=>{
         if(res.success===false){
            return(
                alert(res.message)
            )
         }else{
            alert("Log Created Successfully")
            //Update URL
            history.push("/worklogs");
         }
    })
 }
}

    return (
        <div >
               <Row>
                        <Col xs={6}>  
                            <div className={styles.left_wrap}>
                                <Container>
                                   <Link to="/dashboard"  style={{color:"white",textDecoration:"none"}}> <h1>{props.editFlag? "Update Worklog": "Add Worklog"}</h1></Link>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={6}>            
                                <form className={styles.form_wrapper} onSubmit={onSubmit} >
                                          <FloatingLabel
                                                controlId="floatingLogDate"
                                                label="Log Date YYYY-MM-DD"
                                                className="mb-3"
                                            >
                                            <Form.Control name="logDate" value={userInputs.logDate} onChange={(e)=>handleChange(e)} placeholder="Log Date YYYY-MM-DD" />
                                         </FloatingLabel>
                                         <FloatingLabel
                                                controlId="floatingHours"
                                                label="Hours"
                                                className="mb-3"
                                            >
                                            <Form.Control name="hours" value={userInputs.hours} onChange={(e)=>handleChange(e)} placeholder="Hours" />
                                         </FloatingLabel>
                                         <FloatingLabel
                                                controlId="floatingDescription"
                                                label="Description"
                                                className="mb-3"
                                            >
                                            <Form.Control name="description" value={userInputs.description} onChange={(e)=>handleChange(e)} placeholder="Description" />
                                         </FloatingLabel>
                                    <Button className="btn-primary"  type="submit">Submit</Button>
                                </form>
                        </Col>
                </Row>
         </div>
    )
}
export default CreateWorkLogs;
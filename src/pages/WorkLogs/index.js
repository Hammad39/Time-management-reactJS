import React from 'react'
import {useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import {Table, Button,Container, Form, FloatingLabel} from 'react-bootstrap'
import CreateWorkLogs from '../../components/CreateWorkLogs'
import styles from './WorkLogs.module.css'
import Header from '../../components/Header'
import {
    Link
  } from "react-router-dom";
import { CSVLink } from "react-csv";



export default function WorkLogs() {
    const currentUser = useSelector(state => state.currentUser) 
    const [prefHours, setPrefHours] = useState(8)//TextField Value (Needs Processing from API)
    const [workHours, setWorkHours] = useState(0)// Final Working Hours After API Successful Responsee
    const [userLogs, setUserLogs] = useState([]);
    const [allLogs, setAllLogs] = useState([]); //All Non-Filtered Logs (For Backup of all logs)
    const [userInputs, setUserInputs] =useState({
        startDate:"2019-01-01",
        endDate:"2021-12-31"
    }) // To Save user provided dates
    const headers = [
        { label: "First Name", key: "user.firstName" },
        { label: "Last Name", key: "user.lastName" },
        { label: "Log Date", key: "log_date" },
        { label: "Hours", key: "hours" },
        { label: "Description", key: "description" }
      ];//For the headers of CSV File

      const csvReport = {
        data: userLogs,
        headers: headers,
        filename: 'Userlogs.csv'
      };
    
    const handleChange = (e) =>{
        setUserInputs({
            ...userInputs,
            [e.target.name]: e.target.value
          });}

    const resetWorkLogs =() =>{
            setUserLogs(allLogs)
    }
    //Update Hours only once updated in API
    useEffect(()=>{
        if(prefHours>24)
        {
            setPrefHours(24)
        }
    },[prefHours])
    const [flag, setFlag] = useState(true)
    const [userIndex , setUserIndex] =useState("")

    //Get Filtered Work Logs 
    const updateWorkLogs=()=>{
        fetch(`http://34.210.129.167/api/work-logs/${userInputs.startDate}/${userInputs.endDate}`,{
           method: 'GET',
           headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
       })
       .then(res=>res.json()).then(res=>{
           console.log(userInputs.startDate + userInputs.endDate)
           setUserLogs(res.workLogs)
           console.log(res)
       })
      }
      //Get Logs of the user
    useEffect(() => {
        fetch(`http://34.210.129.167/api/user/${currentUser.id}/work-logs`,{
           method: 'GET',
           headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
       })
       .then(res=>res.json()).then(res=>{
           setUserLogs(res.workLogs.data)
           setAllLogs(res.workLogs.data)
           console.log(res.workLogs.data)
       })
       // eslint-disable-next-line
      }, [])
      //Updating Preferred Working hours in the 
      const handleUpdate = (ind) =>{
        setFlag(false)
        setUserIndex(ind)
        }
        const hoursHandler = () =>{

            fetch(`http://34.210.129.167/api/users/${currentUser.id}/preferred-working-hours`,{
                method: 'PATCH',
                headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
                body: JSON.stringify({workingHours: prefHours})
            })
            .then(res=>res.json()).then(res=>{
                console.log("hours updated success fully = ",res)
                setWorkHours(prefHours)
            })
        }
              
    return (
        <Container>
            <Header title="User Worklogs" />            
            {
                flag?<>
            <div className={styles.worklog_header}>
            <Link to="/CreateWorklogs"> <Button className="btn-primary">Create Worklog</Button></Link>
            <Form>
                <FloatingLabel
                    controlId="floatingStartDate"
                    label="Start Date (YYYY-MM-DD)"    
                    className="mb-3"
                >
                    <Form.Control name="startDate" value={userInputs.startDate} type="startDate" onChange={(e)=>handleChange(e)} placeholder="StartDate" />
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="endDate" label="End Date (YYYY-MM-DD)">
                    <Form.Control name="endDate" value={userInputs.endDate} type="endDate" onChange={(e)=>handleChange(e)} placeholder="EndDate" />
                </FloatingLabel>
                <Button className="btn-primary" onClick={updateWorkLogs}>Update Worklogs</Button>
                <Button className="btn-primary" onClick={resetWorkLogs}>Reset Filter</Button>
                <Button className="btn-primary"> <CSVLink {...csvReport}  style={{color:"white",textDecoration:"none"}} >Export to CSV</CSVLink></Button>
            </Form>
             </div>
             <div className={styles.preferred_hours}>
                    <input min="1" max="24" type="number" value={prefHours}
                    onChange={(e)=>{setPrefHours(e.target.value)}}
                    className="form-control mb-3"                                             
                    />
                    <button  style={{ width: '140px'}}
                    className="btn btn-primary updateButton"
                    onClick={hoursHandler}>Set Hours</button>
             </div>
                <Table striped bordered hover>
               <thead>
                   <tr>
                       <th>First Name</th>
                       <th>Last Name</th>
                       <th>Log Date</th>
                       <th>Hours</th>
                       <th>Description</th>
                       <th>Update</th>
                   </tr>
               </thead>
               <tbody>
               {
                userLogs.map((data,index)=>{
                    return(
                        <tr>
                            <td>{data.user.firstName}</td>
                            <td>{data.user.lastName}</td>
                            <td>{data.log_date}</td>
                            <td style={data.hours>=workHours? {backgroundColor:'green',color:'white'} : {backgroundColor:'red',color:'white'}}>{data.hours}</td>
                            <td>{data.description}</td>
                            <td><Button className="btn-danger"><Link style={{color:"white",textDecoration:"none"}} to="#" onClick={()=> handleUpdate(index)} >Update Log</Link></Button></td>
                        </tr>
                        
                    )
                })
            }
               </tbody>
           </Table>
           </>
           :<>
            <CreateWorkLogs data={userLogs?.workLogs?.data[userIndex]} />)
           </> 
           }
        </Container>
    )
}
import React, {useState, useEffect} from 'react'
import {Table, Container, Button, Pagination} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'
import RegisterUser from '../RegisterUser'
import {useSelector} from 'react-redux'
export default function UsersList() {

    const [flag, setFlag] = useState("false")
    const [usersList, setUsersList] = useState([])
    const [editFlag, setEditFlag] = useState(null)
    const currentUser = useSelector(state => state.currentUser)
    useEffect(() => {
        fetch('http://34.210.129.167/api/users',{
           method: 'GET',
           headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
       } )
       .then(res=>res.json()).then(res=>{
          setUsersList(res)
       })
      // eslint-disable-next-line
    },[flag])
    const handlePage=(number)=>{

        if(number==="pagination.previous")
        {
           number= --usersList.users.current_page
        }
        else if(number==="pagination.next")
        {
            
        }
        if(number>usersList.last_page)
        {
            alert("No more pages")
            return
        }

        fetch(`http://34.210.129.167/api/users?page=${number}`,{
            method: 'GET',
            headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        } )
        .then(res=>res.json()).then(res=>{
           setUsersList(res)
           console.log(res)
        })
    }



    const HandleDelete = (id,index) =>{
        fetch(`http://34.210.129.167/api/users/${id}`,{
            method: 'DELETE',
            headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
            
        } )
        .then((res)=>{
            console.log("deleted Successfully")
            setFlag(res)
        })
      
}

    return (
        <Container>
              <Link to='/dashboard' style={{textDecoration:'none'}}><Header title="Users List" /></Link>
            {editFlag? <RegisterUser editFlag={editFlag} />
             : <> 
              <Link to="/registeruser"> <Button style={{marginTop:"10px", marginBottom:"10px"}} className="btn-primary">Create Users</Button></Link>
              <h1> Current Page:   {usersList?.users?.current_page}</h1>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                    usersList?.users?.data?.map((value,index)=>{
                        const role = value.roles[0].name;               
                        if(role==="user")
                        {
                        return(
                        <tr key={++index}>
                            <td className="counterCell">
                            </td>
                            <td>
                                {value.firstName}
                            </td>
                            <td>
                                {value.lastName}
                            </td>
                            <td>
                                {value.email}
                            </td>
                            <td>
                                {value.roles[0].name}
                            </td>
                            <td>
                                <div className="action-btn-wrap">
                                    <Button onClick={(e)=>{setEditFlag(value)}} style={{backgroundColor:'#ffc107',borderColor:'#ffc107',color:'#fff',marginRight:'5px'}} className="btn-warning" >Edit </Button>
                                    <Button onClick={(e)=>{HandleDelete( value.id, index,)}} style={{backgroundColor:'#dc3545',borderColor:'#dc3545'}} className="btn-danger">Delete </Button>
                                </div>
                            </td>
                        </tr>
                        )}
                        return true;
                        })}
                        </tbody>
                </Table>
                <Pagination>
                        {
                             usersList?.users?.links?.map((pageNumber,index)=> {
                                return(
                                    <Pagination.Item onClick={e=>{
                                        
                                        handlePage(pageNumber.label)
                                    }}>{
                                        pageNumber.label==="pagination.previous"? "Prev" : pageNumber.label==="pagination.next"?"Next":pageNumber.label
                                }</Pagination.Item>
                                )
                             })
                        }
                </Pagination>
                </>}
        </Container>
    )
}

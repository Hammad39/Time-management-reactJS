import React, {useState, useEffect} from 'react'
import {Table, Container, Button, Pagination} from 'react-bootstrap'
import Header from '../../components/Header'
import {useSelector} from 'react-redux'
import styles from './ManagersList.module.css'
import Register from '../Register'
import {Link} from 'react-router-dom'
export default function UsersList() {
    const currentUser = useSelector(state => state.currentUser)

    const [flag, setFlag] = useState(false)    /* To update the Managers List*/
    const [editFlag, setEditFlag] = useState(null) /* To check if edit button is pressed*/
    const [usersList, setUsersList] = useState([]) /* Contains all the managers*/
    useEffect(() => {
        fetch('http://34.210.129.167/api/users',{
           method: 'GET',
           headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
       } )
       .then(res=>res.json()).then(res=>{
          setUsersList(res)
          console.log(res)
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
            number=++usersList.users.current_page
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
    const handleDelete = (id,index) =>{ /* To delete selected manager*/
        fetch(`http://34.210.129.167/api/users/${id}`,{
            method: 'DELETE',
            headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        })
        .then((res)=>{
            console.log("Deleted Successfully")
            setFlag(res)
        })    
    }
    return (
        <Container>
           <Link style={{textDecoration:'none'}} to="/dashboard"> <Header title="All Users List" /> </Link>
             {editFlag? <Register editFlag={editFlag} />
             : <> 
             <div className={styles.list_header}>
                <Link to="/register"> <Button style={{marginTop:"10px", marginBottom:"10px"}} className="btn-primary">Create Manager</Button></Link>
                <h1> Current Page:   {usersList?.users?.current_page}</h1>
             </div>
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
                                    <Button onClick={(e)=>{handleDelete( value.id, index,)}} style={{backgroundColor:'#dc3545',borderColor:'#dc3545'}} className="btn-danger">Delete </Button>
                                </div>
                            </td>
                        </tr>
                        
                        )
                        })}
                        </tbody>
                </Table>
                <Pagination>
                    {/* <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item onClick={e=>handlePage(2)}>{1}</Pagination.Item> */}
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
                        {/* <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item> */}
                </Pagination>
                </>
                }
        </Container>
    )
}

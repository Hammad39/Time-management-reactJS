import React from 'react'
import styles from './Header.module.css'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { Nav, Navbar,Form} from 'react-bootstrap'
import allActions from '../../actions'
export default function Header({title}) {
    const dispatch= useDispatch();
    const currentUser = useSelector(state => state.currentUser)
    return (
        <div>
            <header className={styles.dashboard_header}>
              <h1>{title}</h1>
            </header>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                  {/* Updating Navigation based on Role */}
                  {currentUser.role==="admin"||currentUser.role==="manager"?   <Nav.Link><Link to="/UsersList">Users List</Link></Nav.Link>: ""}
                  {currentUser.role==="admin"?  <Nav.Link><Link to="/ManagersList">All Users List</Link></Nav.Link>:""} 
                  {currentUser.role==="user"?    <Nav.Link> <Link to="/Worklogs">WorkLogs list</Link> </Nav.Link>:""}
                    </Nav>
                    <Form className="d-flex">
                    <Nav.Link style={{minWidth: "200px"}}> Logged in as <strong>{currentUser.role}</strong></Nav.Link>
                    <Nav.Link style={{minWidth:"100px"}} onClick={()=>{dispatch(allActions.userActions.logOut())}}><Link to="/login">Log Out</Link></Nav.Link>
                    
                    </Form>
                </Navbar.Collapse>
                </Navbar>
        </div>
    )
}

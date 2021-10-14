import React from 'react'
import Header from '../../components/Header'
import {Container} from 'react-bootstrap'
import {useSelector} from 'react-redux'
export default function Dashboard() {
    const currentUser = useSelector(state => state.currentUser)
    return (
        <div>
            <Container>
             <Header title="Manager Dashboard" />
             <div style={{textAlign:'center',minHeight:'70vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',background: '#428ba0',color:'#fff'}}>
                <h1> Welcome {currentUser.firstName}   {currentUser.lastName}, </h1>
                <p>Please navigate to any page you need to from the top.</p>    
             </div>      
            </Container>
        </div>
    )
}

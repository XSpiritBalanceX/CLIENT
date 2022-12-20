import React, {useState, useEffect} from 'react';
import {Button,Table,Spinner,  } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { FormattedMessage} from 'react-intl';
import AdminTable from '../components/AdminTable';
import {loginUser} from '../redux/explainForReducer';
import decoded from 'jwt-decode';

const IntAdminPage=(props)=>{

    const [isLoad, setLoad]=useState(false);
    const navigate=useNavigate();
    const [allUsers, setAllUsers]=useState([]);
    const [myEmail, setMyEmail]=useState('');

    const checkRole=async()=>{        
        const response=await fetch('http://localhost:5000/api/admin/', {
          headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('admin')||sessionStorage.getItem('token')}`,
          }
        }) 
        if(response.status!==200){
            navigate('/')
        }
        const data=await response.json();
        setLoad(true);
        setAllUsers(data);
    }

    useEffect(()=>{
        checkRole();  
        setMyEmail(decoded(sessionStorage.getItem('admin')||sessionStorage.getItem('token')).email);      
        // eslint-disable-next-line
    },[]) 

    const showUser=async(event,id)=>{
        event.preventDefault();
        let adminToken=sessionStorage.getItem('token');
        sessionStorage.setItem('admin',adminToken)
        let response=await fetch(`https://server-production-5ca0.up.railway.app/api/admin/showuser?id=${id}`);
        let data=await response.json();
        props.dispatch(loginUser(true, data.email,data.token, data.name));
        navigate('/mypage')
    }
    const blockUser=async(id, isblock, email)=>{
        if(email===props.email){
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('admin')
            window.open('https://server-production-5ca0.up.railway.app/auth/logout', '_self') 
        }
        let response=await fetch(`http://localhost:5000/api/admin/block?id=${id}&block=${isblock}`)
        let data=await response.json(); 
        setAllUsers(data)
    }
    const giveAdmin=async(id, role,email)=>{
        let response=await fetch(`http://localhost:5000/api/admin/giveadmin?id=${id}&newrole=${role}`)
        let data=await response.json(); 
        setAllUsers(data)
        if(email===props.email){
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('admin')
            window.open('http://localhost:5000/auth/logout', '_self') 
        }
    }
    const deleteUser=(id)=>{
        console.log(id, '   deleteUser')
    }

    const switchToMyAccount=()=>{
        let adminToken=sessionStorage.getItem('admin');
        let adminName=decoded(adminToken).name;
        let adminEmail=decoded(adminToken).email;
        props.dispatch(loginUser(true, adminEmail,adminToken, adminName));        
    }

    const bodyUsers=isLoad?allUsers.map(el=>{
        return (<AdminTable key={el.id}
           id={el.id}
           name={el.name}
           email={el.email}
           role={el.role}
           blocked={!el.blocked?<FormattedMessage id='noBlo'/>:<FormattedMessage id='yesBlo'/>}
           isBlock={el.blocked}
           cbShowUser={showUser}
           hideUser={myEmail}
           cbBlock={blockUser}
           cbGiveAdmin={giveAdmin}
           cbDeleteUser={deleteUser}/>)
    }).sort((a,b)=>a.key-b.key):null;

    return(
        <div className='myPageContainer'>
            {isLoad?<div >
                <div className='activUser'>
                  <p><i className="bi bi-person-check-fill"></i> {props.email}</p>  
                 {props.email!==myEmail?<Button className='myBtn' onClick={switchToMyAccount}><FormattedMessage id='switchUser'/></Button>:null}   
                </div>
                <div style={{textAlign:'center'}}>
                <h4 className='emptyReview'><FormattedMessage id='users'/></h4>
                <Table  className='myTable'>
                    <thead>
                      <tr style={{textAlign:'center'}}>
                        <th><FormattedMessage id='nameUser'/></th>
                        <th><FormattedMessage id='emailUser'/></th>
                        <th><FormattedMessage id='roleUser'/></th>
                        <th><FormattedMessage id='blockUser'/></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                     {bodyUsers}       
                    </tbody>
                </Table>
                
            </div>
            </div>:
            <Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>}
        </div>
        
    )
}

const mapStateToProps=(state)=>{
    return {
        email:state.info.userEmail      
    }
 }
 
const AdminPage=connect(mapStateToProps)(IntAdminPage);

export default AdminPage;
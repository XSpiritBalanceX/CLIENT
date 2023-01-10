import React from 'react';
import {Button } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';


const AdminTable=({id, email, name, role, blocked, hideUser, isBlock , cbBlock, cbGiveAdmin, cbShowUser, cbDeleteUser})=>{
    
    return(
        <tr  style={{display:hideUser===email?'none':'table-row', textAlign:'center'}} >
        <td ><NavLink className='userLink' onClick={(event)=>cbShowUser(event,id)}>{name}</NavLink></td>
        <td >{email}</td>
        <td >{role}</td>
        <td >{blocked}</td>
        <td ><Button className='myBtn'  onClick={()=>cbBlock(id, isBlock, email)}>{isBlock?<i className="bi bi-person-check myProf" name='unblock'></i>:<i className="bi bi-person-dash myProf" name='block'></i>}</Button></td>
        <td ><Button className='myBtn'  onClick={()=>cbGiveAdmin(id, role, email)}><i className="bi bi-person-gear myProf"></i></Button></td>
        <td ><Button className='myBtn'  onClick={()=>cbDeleteUser(id, email)}><i className="bi bi-trash myProf"></i></Button></td>
      </tr>
    )
}

 
export default AdminTable;
import React from 'react';
import {Button } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';


const AdminTable=(props)=>{
    
    return(
        <tr  style={{display:props.hideUser===props.email?'none':'table-row', textAlign:'center'}} >
        <td ><NavLink className='userLink' onClick={(event)=>props.cbShowUser(event,props.id)}>{props.name}</NavLink></td>
        <td >{props.email}</td>
        <td >{props.role}</td>
        <td >{props.blocked}</td>
        <td ><Button className='myBtn'  onClick={()=>props.cbBlock(props.id, props.isBlock, props.email)}>{props.isBlock?<i className="bi bi-person-check myProf" name='unblock'></i>:<i className="bi bi-person-dash myProf" name='block'></i>}</Button></td>
        <td ><Button className='myBtn'  onClick={()=>props.cbGiveAdmin(props.id, props.role, props.email)}><i className="bi bi-person-gear myProf"></i></Button></td>
        <td ><Button className='myBtn'  onClick={()=>props.cbDeleteUser(props.id, props.email)}><i className="bi bi-trash myProf"></i></Button></td>
      </tr>
    )
}

 
export default AdminTable;
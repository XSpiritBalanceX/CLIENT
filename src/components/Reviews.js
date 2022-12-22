import React from 'react';
import {Button } from 'react-bootstrap';


const Reviews=(props)=>{
    
    return(
        <tr style={{textAlign:'center'}}>
        <td >{props.nameRev}</td>
        <td >{props.nameWork}</td>
        <td >{props.date}</td>
        <td ><Button className='myBtn' size='sm'onClick={()=>props.cbEditReview(props.id)}><i className="bi bi-pen"></i></Button></td>
        <td ><Button className='myBtn' size='sm' onClick={()=>props.cbShowRev(props.id)}><i className="bi bi-eye"></i></Button></td>
        <td ><Button className='myBtn' size='sm' onClick={()=>props.cbDeleteReview(props.id, props.nameRev)}><i className="bi bi-trash myProf"></i></Button></td>
      </tr>
    )
}

 
export default Reviews;
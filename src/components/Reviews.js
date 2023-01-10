import React from 'react';
import {Button } from 'react-bootstrap';


const Reviews=({id, nameRev, nameWork, date, cbDeleteReview, cbEditReview, cbShowRev})=>{
    
    return(
        <tr >
        <td >{nameRev}</td>
        <td >{nameWork}</td>
        <td >{date}</td>
        <td ><Button className='myBtn' size='sm'onClick={()=>cbEditReview(id)}><i className="bi bi-pen"></i></Button></td>
        <td ><Button className='myBtn' size='sm' onClick={()=>cbShowRev(id)}><i className="bi bi-eye"></i></Button></td>
        <td ><Button className='myBtn' size='sm' onClick={()=>cbDeleteReview(id, nameRev)}><i className="bi bi-trash myProf"></i></Button></td>
      </tr>
    )
}

 
export default Reviews;
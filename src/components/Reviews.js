import React from 'react';
import {Button } from 'react-bootstrap';


const Reviews=(props)=>{
    
    return(
        <tr style={{textAlign:'center'}}>
        <td >{props.nameRev}</td>
        <td >{props.nameWork}</td>
        <td >{props.date}</td>
        <td ><Button className='myBtn' size='sm'onClick={()=>props.cbEditReview(props.id)}>{props.edit}</Button></td>
        <td ><Button className='myBtn' size='sm' onClick={()=>props.cbShowRev(props.id)}>{props.show}</Button></td>
        <td ><Button className='myBtn' size='sm' onClick={()=>props.cbDeleteReview(props.id, props.nameRev)}>{props.delete}</Button></td>
      </tr>
    )
}

 
export default Reviews;
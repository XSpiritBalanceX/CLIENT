import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Spinner, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';


const IntMyPage=(props)=>{
    
    return(
        <div>
            My Page
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        locale:state.info.locale,
        bookData:state.info.books
    }
 }
 
const MyPage=connect(mapStateToProps)(IntMyPage);
 
export default MyPage;
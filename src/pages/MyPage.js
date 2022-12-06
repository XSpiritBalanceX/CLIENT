import React from 'react';
import {connect} from 'react-redux';


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
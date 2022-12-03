import React from 'react';
import {connect} from 'react-redux';


const intBooksPage=(props)=>{
    return(
        <div>
            Books Page
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      
    }
 }
 
 const BooksPage=connect(mapStateToProps)(intBooksPage);
 
 export default BooksPage;
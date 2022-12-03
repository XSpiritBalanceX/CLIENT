import React from 'react';
import {connect} from 'react-redux';


const intMoviesPage=(props)=>{
    return(
        <div>
            MoviesPage
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      
    }
 }
 
 const MoviesPage=connect(mapStateToProps)(intMoviesPage);
 
 export default MoviesPage;
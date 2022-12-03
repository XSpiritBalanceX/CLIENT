import React from 'react';
import {connect} from 'react-redux';


const intSeriesPage=(props)=>{
    return(
        <div>
            SeriesPage
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      
    }
 }
 
 const SeriesPage=connect(mapStateToProps)(intSeriesPage);
 
 export default SeriesPage;
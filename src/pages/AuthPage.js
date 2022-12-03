import React from 'react';
import {connect} from 'react-redux';


const intAuthPage=(props)=>{
    return(
        <div>
            AuthPage
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      
    }
 }
 
 const AuthPage=connect(mapStateToProps)(intAuthPage);
 
 export default AuthPage;
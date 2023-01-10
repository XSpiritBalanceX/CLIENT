import { ISLOGIN_USER} from "./actionForReducer";
import decoded from 'jwt-decode';

let tokeninStorage=sessionStorage.getItem('token');

const initialState={
    isLogin:  tokeninStorage!==null?true: false ,
    userEmail:tokeninStorage!==null?decoded(tokeninStorage).email:'',
    nameUser:tokeninStorage!==null?decoded(tokeninStorage).name:'',
}

 
 function serviceReducer (state=initialState, action){
     switch (action.type){
        case ISLOGIN_USER:{
            let newState={...state};
            newState.isLogin=action.login;
            sessionStorage.setItem('token',action.tokenUser)
            newState.userEmail=action.user;
            newState.nameUser=action.nameUser;
            return newState;
        }
 
        default: return state;
     }
 }
 
 export default serviceReducer;
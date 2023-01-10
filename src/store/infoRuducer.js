import { LOCALES } from "../i18n/locales";
import { CHANGE_LANGUAGE, LOAD_MOVIES, LOAD_BOOKS, LOAD_GAMES, LOAD_SERIES,
    ISLOGIN_USER, ADD_NAME_REVIEW, LOAD_MAIN_DATA} from "./actionForReducer";
import decoded from 'jwt-decode';

let tokeninStorage=sessionStorage.getItem('token');

const initialState={
    locale:LOCALES.RUSSIAN,
    movies:[],
    books:[],
    games:[],
    series:[],
    isLogin:  tokeninStorage!==null?true: false ,
    userEmail:tokeninStorage!==null?decoded(tokeninStorage).email:'',
    nameUser:tokeninStorage!==null?decoded(tokeninStorage).name:'',
    nameReview:'',
    lastReview:[],
    reviewHighScore:[],
    allReview:[],
    isLoadReview:false
 }

 
 function infoReducer (state=initialState, action){
     switch (action.type){
        case LOAD_MAIN_DATA:{
            let newState={...state};
            newState.lastReview=action.lastR;
            newState.reviewHighScore=action.highSc;
            newState.allReview=action.allReview;
            newState.isLoadReview=action.isLoad;
            return newState;
        }
        case CHANGE_LANGUAGE:{
            let newState={...state};
            newState.locale=action.language;
            return newState;
        }
        case LOAD_MOVIES:{
            let newState={...state};
            newState.movies=action.data;
            return newState;
        }
        case LOAD_BOOKS:{
            let newState={...state};
            newState.books=action.data;
            return newState;
        }
        case LOAD_GAMES:{
            let newState={...state};
            newState.games=action.data;
            return newState;
        }
        case LOAD_SERIES:{
            let newState={...state};
            newState.series=action.data;
            return newState;
        }
        case ISLOGIN_USER:{
            let newState={...state};
            newState.isLogin=action.login;
            sessionStorage.setItem('token',action.tokenUser)
            newState.userEmail=action.user;
            newState.nameUser=action.nameUser;
            return newState;
        }
        case ADD_NAME_REVIEW:{
            let newState={...state};
            newState.nameReview=action.nameReview;
            return newState;
        }
 
        default: return state;
     }
 }
 
 export default infoReducer;
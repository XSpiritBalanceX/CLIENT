import { LOCALES } from "../i18n/locales";
import { change_language, load_movies, load_books, load_games, load_series,
    isLogin_user, add_name_review } from "./explainForReducer";
import decoded from 'jwt-decode';

let isExist=localStorage.getItem('token')==='';
let localSt=localStorage.getItem('token');
let emailUs=isExist?'':decoded(localSt);
let log=localStorage.getItem('isLogin')==='yes';

const initialState={
    locale:LOCALES.RUSSIAN,
    movies:[],
    books:[],
    games:[],
    series:[],
    isLogin:log,
    userEmail:emailUs.email,
    nameReview:'',
    alltags:['funny', 'good', 'книги', 'badly', 'фильмы'],
 }

 
 function infoReducer (state=initialState, action){
     switch (action.type){
        case change_language:{
            let newState={...state};
            newState.locale=action.language;
            return newState;
        }
        case load_movies:{
            let newState={...state};
            newState.movies=action.data;
            return newState;
        }
        case load_books:{
            let newState={...state};
            newState.books=action.data;
            return newState;
        }
        case load_games:{
            let newState={...state};
            newState.games=action.data;
            return newState;
        }
        case load_series:{
            let newState={...state};
            newState.series=action.data;
            return newState;
        }
        case isLogin_user:{
            let newState={...state};
            if(action.user===''){
                localStorage.setItem('token', null);
            }else{
               localStorage.setItem('token', action.user); 
               let decod=decoded(action.user)
               newState.userEmail=decod.email;
            }
            localStorage.setItem('isLogin',action.login);
            newState.isLogin=localStorage.getItem('isLogin')==='yes';
            return newState;
        }
        case add_name_review:{
            let newState={...state};
            newState.nameReview=action.nameReview;
            return newState;
        }
        
        
 
 
        default: return state;
     }
 }
 
 export default infoReducer;
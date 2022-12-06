import { LOCALES } from "../i18n/locales";
import { change_language, load_movies, load_books, load_games, load_series,
    isLogin_user} from "./explainForReducer";

const initialState={
    locale:LOCALES.RUSSIAN,
    movies:[],
    books:[],
    games:[],
    series:[],
    isLogin:false,
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
            newState.isLogin=action.login;
            return newState;
        }
        
 
 
        default: return state;
     }
 }
 
 export default infoReducer;
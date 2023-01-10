import { LOCALES } from "../i18n/locales";
import { CHANGE_LANGUAGE, ADD_NAME_REVIEW, LOAD_MAIN_DATA} from "./actionForReducer";


const initialState={
    locale:LOCALES.RUSSIAN,
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
        case ADD_NAME_REVIEW:{
            let newState={...state};
            newState.nameReview=action.nameReview;
            return newState;
        }
 
        default: return state;
     }
 }
 
 export default infoReducer;
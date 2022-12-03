import { LOCALES } from "../i18n/locales";
import { change_language } from "./explainForReducer";

const initialState={
    locale:LOCALES.RUSSIAN,
 }
 
 function infoReducer (state=initialState, action){
     switch (action.type){
         case change_language:{
            let newState={...state};
            newState.locale=action.language;
            return newState;
         }
 
 
         default: return state;
     }
 }
 
 export default infoReducer;
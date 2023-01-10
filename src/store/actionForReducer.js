const CHANGE_LANGUAGE='CHANGE_LANGUAGE';
const ISLOGIN_USER='ISLOGIN_USER';
const ADD_NAME_REVIEW='ADD_NAME_REVIEW';
const LOAD_MAIN_DATA='LOAD_MAIN_DATA';

const changeLanguage=function (lang){
   return{
    type:CHANGE_LANGUAGE,
    language:lang
   }
}

const loginUser=function(bool, userEmail, token, name){
   return{
      type:ISLOGIN_USER,
      login:bool,
      user:userEmail,
      tokenUser:token,
      nameUser:name
   }
}


const addNameReview=function(name){
   return{
      type:ADD_NAME_REVIEW,
      nameReview:name
   }
}

const loadMain=function(last, score,all, bool){
   return{
      type:LOAD_MAIN_DATA,
      lastR:last,
      highSc:score,
      allReview:all,
      isLoad:bool
   }
}

export {CHANGE_LANGUAGE, changeLanguage,
   ISLOGIN_USER, loginUser,
   ADD_NAME_REVIEW, addNameReview, 
   LOAD_MAIN_DATA, loadMain}
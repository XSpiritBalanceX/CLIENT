const CHANGE_LANGUAGE='CHANGE_LANGUAGE';
const LOAD_MOVIES='LOAD_MOVIES';
const LOAD_BOOKS='LOAD_BOOKS';
const LOAD_GAMES='LOAD_GAMES';
const LOAD_SERIES='LOAD_SERIES';
const ISLOGIN_USER='ISLOGIN_USER';
const ADD_NAME_REVIEW='ADD_NAME_REVIEW';
const LOAD_MAIN_DATA='LOAD_MAIN_DATA';

const changeLanguage=function (lang){
   return{
    type:CHANGE_LANGUAGE,
    language:lang
   }
}

const loadMovies=function(dataMov){
   return{
      type:LOAD_MOVIES,
      data:dataMov
   }
}

const loadBooks=function(dataBook){
   return{
      type:LOAD_BOOKS,
      data:dataBook
   }
}

const loadGames=function(dataGame){
   return{
      type:LOAD_GAMES,
      data:dataGame
   }
}

const loadSeries=function(dataSeries){
   return{
      type:LOAD_SERIES,
      data:dataSeries
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
   LOAD_MOVIES, loadMovies,
   LOAD_BOOKS, loadBooks,
   LOAD_GAMES, loadGames,
   LOAD_SERIES, loadSeries,
   ISLOGIN_USER, loginUser,
   ADD_NAME_REVIEW, addNameReview, 
   LOAD_MAIN_DATA, loadMain}
const change_language='change_language';
const load_movies='load_movies';
const load_books='load_books';
const load_games='load_games';
const load_series='load_series';
const isLogin_user='isLogin_user';
const add_name_review='add_name_review';
const show_review='show_review';

const changeLanguage=function (lang){
   return{
    type:change_language,
    language:lang
   }
}

const loadMovies=function(dataMov){
   return{
      type:load_movies,
      data:dataMov
   }
}

const loadBooks=function(dataBook){
   return{
      type:load_books,
      data:dataBook
   }
}

const loadGames=function(dataGame){
   return{
      type:load_games,
      data:dataGame
   }
}

const loadSeries=function(dataSeries){
   return{
      type:load_series,
      data:dataSeries
   }
}

const loginUser=function(bool, userEmail){
   return{
      type:isLogin_user,
      login:bool,
      user:userEmail
   }
}


const addNameReview=function(name){
   return{
      type:add_name_review,
      nameReview:name
   }
}

const showReview=function(obj){
   return{
      type:show_review,
      itemreview:obj
   }
}




export {change_language, changeLanguage,
   load_movies, loadMovies,
   load_books, loadBooks,
   load_games, loadGames,
   load_series, loadSeries,
   isLogin_user, loginUser,
   add_name_review, addNameReview,
   show_review, showReview}
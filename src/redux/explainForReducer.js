const change_language='change_language';

const changeLanguage=function (lang){
   return{
    type:change_language,
    language:lang
   }
}

export {change_language, changeLanguage}
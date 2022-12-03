import React from 'react';
import {IntlProvider} from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import {Route, Routes, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import MainPage from './MainPage';
import BooksPage from './BooksPage';
import MoviesPage from './MoviesPage';
import SeriesPage from './SeriesPage';
import AuthPage from './AuthPage';


const intPageRouter=(props)=>{

    const locale=props.locale;

    return(
        <IntlProvider messages={messages[locale]}
           locale={locale}
           defaultLocale={LOCALES.RUSSIAN}>
         <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/books' element={<BooksPage />}/>
        <Route path='/movies' element={<MoviesPage />}/>
        <Route path='/series' element={<SeriesPage />}/>
        <Route path='/login' element={<AuthPage />}/>
        <Route path='/registration' element={<AuthPage />}/>
        <Route path="*" element={<Navigate to ={'/'}/>}/>
       </Routes>   
        </IntlProvider>
       
    )
}

const mapStateToProps=(state)=>{
    return {
      locale:state.info.locale
    }
 }
 
 const PageRouter=connect(mapStateToProps)(intPageRouter);
 
 export default PageRouter;

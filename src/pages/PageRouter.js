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
import GamePage from './GamePage';
import ItemMovie from '../components/items/Item_Movie';
import ItemBook from '../components/items/ItemBook';
import ItemGame from '../components/items/ItemGame';
import ItemSeries from '../components/items/ItemSeries';
import MyPage from './MyPage';
import NewReview from '../components/NewReview';
import ShowReview from '../components/ShowReview';
import EditReview from '../components/EditReview';
import AdminPage from './AdminPage';


const intPageRouter=(props)=>{

    const locale=props.locale;
    
    return(
        <IntlProvider messages={messages[locale]}
           locale={locale}
           defaultLocale={LOCALES.RUSSIAN}>
         <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/books/:page' element={<BooksPage />}/>
        <Route path='/books/item/:id' element={<ItemBook />}/>
        <Route path='/movies/:page' element={<MoviesPage />}/>
        <Route path='/movies/item/:id' element={<ItemMovie />}/>
        <Route path='/series/:page' element={<SeriesPage />}/>
        <Route path='/series/item/:id' element={<ItemSeries />}/>
        <Route path='/games/:page' element={<GamePage />}/>
        <Route path='/games/item/:id' element={<ItemGame />}/>
        <Route path='/login' element={<AuthPage />}/>
        <Route path='/registration' element={<AuthPage />}/>
        <Route path='/showReview/:id' element={<ShowReview />}/>
       {props.isLogin&&<Route path='/mypage/:token' element={<MyPage />}/>}
       {props.isLogin&&<Route path='/newreview' element={<NewReview />}/>}
       {props.isLogin&&<Route path='/editreview/:id' element={<EditReview />}/>}
       {props.isLogin&&<Route path='/administrator' element={<AdminPage />}/>}
        <Route path="*" element={<Navigate to ={'/'}/>}/>
       </Routes>   
        </IntlProvider>
       
    )
}

const mapStateToProps=(state)=>{
    return {
      locale:state.info.locale,
      isLogin:state.info.isLogin
    }
 }
 
 const PageRouter=connect(mapStateToProps)(intPageRouter);
 
 export default PageRouter;

import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import infoReducer from './redux/infoRuducer';
import PageRouter from './pages/PageRouter';
import PageLinks from './pages/PageLinks';
import './app.css';

function App() {
   
  let combineReducer=combineReducers({
    info:infoReducer
  });
  let store=createStore(combineReducer);

  

  return (
    <BrowserRouter>
    <Provider store={store}>    
      <PageLinks />
     <PageRouter />  
     
    </Provider>    
    </BrowserRouter>   
  );
}

export default App;

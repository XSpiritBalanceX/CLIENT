import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import reviewReducer from './store/reviewReducer';
import serviceReducer from './store/serviceReducer';
import PageRouter from './pages/PageRouter';
import PageLinks from './pages/PageLinks';
import './General.css';

function App() {
   
  let combineReducer=combineReducers({
    review:reviewReducer,
    service:serviceReducer
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

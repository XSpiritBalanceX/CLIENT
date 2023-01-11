import React, {useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Container, Nav, Button, ButtonGroup, Form} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { changeLanguage, loadMain } from '../store/actionForReducer';
import {useTheme} from '../components/hooks/useTheme';
import logo from '../images/logo4.png';
import MiniSearch from 'minisearch';
import './styles/MainPage.css';

const IntPageLinks=(props)=>{

  const [searchData, setSearch]=useState([]);
  const [searchValue, setSearchValue]=useState('');
  const [showRes, setShow]=useState([]);
  const [shoSearchInput, setShowInput]=useState(false);
  const [allComments, setComments]=useState([])
  let stopWords = new Set(['and', 'or', 'to', 'in', 'a', 'the', 'и', 'а', 'или', 'но', 'не',])
  let miniSearch= new MiniSearch({
    fields:['title','comments', 'text', 'name'],
    storeFields:['title', 'namereview'],
     processTerm:(term, _fieldName) =>
    stopWords.has(term) ? null : term.toLowerCase(), 
     searchOptions:{
      prefix:true,
      processTerm: (term) => term.toLowerCase() 
    },
    
  })
  
  useEffect(()=>{
    try{
      (async function(){
          let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/getmain');
          let data=await response.json();
          props.dispatch(loadMain(data.retuReview, data.revieHighRat,data.review, true));
          setSearch(data.review); 
          setComments(data.comments);
      })()
    }catch(err){
        console.log(err)
    }
        // eslint-disable-next-line
  },[])

  
  if(props.isLoad===true){
    let searArr=[]    
     for(let k in searchData){
      let el={}
      el.comments=[]
      for(let y in allComments){
        if(allComments[y].namereview===searchData[k].title){
          el.comments.push(allComments[y].text)
        }
      }
      el.id=searchData[k].id;
      el.text=searchData[k].text;
      el.title=searchData[k].title;
      el.name=searchData[k].name;
      searArr.push(el)
    } 
    miniSearch.addAll(searArr);
  }

  useEffect(()=>{
    let results = miniSearch.search(searchValue)
    setShow(results)
    // eslint-disable-next-line
  },[searchValue])

  const goToSearchReview=(event, name)=>{
    event.preventDefault();
    let review=searchData.find(el=>el.title===name);
    setSearchValue('');
    setShowInput(false);
    navigate('/showReview/'+review.id) 
  }

  const navigate=useNavigate(); 
  const locale=props.locale;

    const changeL=(language)=>{
      props.dispatch(changeLanguage(language));
    }

    const { setTheme}=useTheme();
    const handleClickLight=()=>{
      setTheme('light')
    }
    const handleClickDark=()=>{
     setTheme('dark')
    }

    const redirectTo=()=>{
      if(props.isLogin){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('admin');
        window.open('https://server-production-5ca0.up.railway.app/auth/logout' , '_self')       
      }else{
        navigate('/login')
      }
    }

    const goToProf=()=>{
      navigate('/mypage')
    }

    const goToAdmin=()=>{
      navigate('/administrator')
    }

    return (<IntlProvider  messages={messages[locale]}
              locale={locale}
              defaultLocale={LOCALES.RUSSIAN}>
        <Navbar bg="dark" variant="dark" >
        <Container >
          <Navbar.Brand ><img src={logo} className='logo' alt='logo'/></Navbar.Brand>
            <Nav className=' justify-content-end' >
            <Button onClick={()=>setShowInput(!shoSearchInput)} className='btn-sm myBtn'><i className="bi bi-search myProf"></i></Button>
            <NavLink to={'/'} className="nav-link"><FormattedMessage id='main'/></NavLink>
            <NavLink to={'/books/1'} className="nav-link"><FormattedMessage id='books'/></NavLink>
            <NavLink to={'/movies/1'} className="nav-link"><FormattedMessage id='movies'/></NavLink>
            <NavLink to={'/series/1'} className="nav-link"><FormattedMessage id='series'/></NavLink>
            <NavLink to={'/games/1'} className="nav-link"><FormattedMessage id='games'/></NavLink>
            {props.isLogin&&<Button className='myBtn navigBtn'  onClick={()=>goToProf()}><i className="bi bi-person-circle myProf"></i>  </Button>}
            {props.isLogin&&<Button className='myBtn navigBtn'  onClick={()=>goToAdmin()}><i className="bi bi-person-fill-gear myProf"></i> </Button>}
            <Button className='myBtn' onClick={()=>redirectTo()}>{!props.isLogin?<i className="bi bi-box-arrow-in-right myProf"></i>:<i className="bi bi-box-arrow-left myProf"></i>}</Button>           
            </Nav>           
        </Container>       
      </Navbar>
      <ButtonGroup className='groupLang' onClick={(event)=>changeL(event.target.name)}>
      <Button variant="outline-dark" name='ru-RU' className='btn-sm myBtn'>RU</Button>
      <Button variant="outline-dark" name='en-US' className='btn-sm myBtn'>EN</Button>
    </ButtonGroup>
    <div className='mainGroup'>
      <div>
      <Button variant="outline-dark" className='btn-sm myBtn' onClick={handleClickLight}>Light</Button>
      <Button variant="outline-dark" className='btn-sm myBtn' onClick={handleClickDark}>Dark</Button>
      </div>
      <div className='searchInput' style={{visibility:shoSearchInput?'visible':'hidden'}}>
      <Form.Control className='controlSearch' type="text" list="reviews" placeholder={'...'} 
               value={searchValue} onChange={(event)=>setSearchValue(event.target.value)} />
               <Button className='myBtn' onClick={()=>setSearchValue('')}><i  className="bi bi-x-lg myProf"></i></Button>
               { showRes.length!==0?<ul className='autocomplite'>
                {showRes.map(el=>{
                  return <li key={el.id}><NavLink className='userLink' onClick={(event)=>goToSearchReview(event, el.title || el.namereview)}>{el.title || el.namereview}</NavLink></li>
                })}
               </ul>:null }
      </div>
        
      </div>
      
        </IntlProvider>
    )
}

const mapStateToProps=(state)=>({
    locale:state.review.locale,
    isLogin:state.service.isLogin,
    isLoad:state.review.isLoadReview,
})

const PageLinks=connect(mapStateToProps)(IntPageLinks);

export default PageLinks;

import React, {useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Container, Nav, Button, ButtonGroup, Form} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { changeLanguage, loadMain } from '../redux/explainForReducer';
import {useTheme} from '../components/hooks/useTheme';
import logo from '../images/logo4.png';
import MiniSearch from 'minisearch';

const IntPageLinks=(props)=>{

  const [searchData, setSearch]=useState([]);
  const [searchValue, setSearchValue]=useState('');
  const [showRes, setShow]=useState([]);
  const [shoSearchInput, setShowInput]=useState(false);
  const [allComments, setComments]=useState([])
  let stopWords = new Set(['and', 'or', 'to', 'in', 'a', 'the', 'и', 'а', 'или', 'но', 'не',])
  let miniSearch= new MiniSearch({
    fields:['title','text'],
    storeFields:['title', 'namereview'],
     processTerm:(term, _fieldName) =>
    stopWords.has(term) ? null : term.toLowerCase(), 
     searchOptions:{
      prefix:true,
      processTerm: (term) => term.toLowerCase() 
    },
    
  })
  console.log(showRes)
  useEffect(()=>{
    fetch( 'https://server-production-5ca0.up.railway.app/api/review/getmain' )
        .then(response=>response.json())
        .then(data=>{props.dispatch(loadMain(data.retuReview, data.revieHighRat, true));setSearch(data.review); setComments(data.comments);})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
  },[])

  
  if(props.isLoad===true){
    miniSearch.addAll(searchData);
    miniSearch.addAll(allComments);
  }

  useEffect(()=>{
    let results =miniSearch.search(searchValue)
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
        window.open('https://server-production-5ca0.up.railway.app/auth/logout', '_self')       
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
            <Navbar bg="dark" variant="dark" className='pageLinkContaner'>
        <Container >
          <Navbar.Brand ><img src={logo} style={{width:'4.5em', height:'2em'}} alt='logo'/></Navbar.Brand>
            <Nav className='nav justify-content-end' >
            <Button onClick={()=>setShowInput(!shoSearchInput)} className='btn-sm myBtn'><i className="bi bi-search myProf"></i></Button>
            <NavLink to={'/'} className="nav-link"><FormattedMessage id='main'/></NavLink>
            <NavLink to={'/books/first'} className="nav-link"><FormattedMessage id='books'/></NavLink>
            <NavLink to={'/movies/first'} className="nav-link"><FormattedMessage id='movies'/></NavLink>
            <NavLink to={'/series/first'} className="nav-link"><FormattedMessage id='series'/></NavLink>
            <NavLink to={'/games/first'} className="nav-link"><FormattedMessage id='games'/></NavLink>
            {props.isLogin&&<Button className='myBtn' style={{marginRight:'3px', fontSize:'13px'}} onClick={()=>goToProf()}><i className="bi bi-person-circle myProf"></i> <FormattedMessage id='prof'/> </Button>}
            {props.isLogin&&<Button className='myBtn' style={{marginRight:'3px', fontSize:'13px'}} onClick={()=>goToAdmin()}><i className="bi bi-person-fill-gear myProf"></i> <FormattedMessage id='admin'/></Button>}
            <Button className='myBtn' onClick={()=>redirectTo()}>{!props.isLogin?<i className="bi bi-box-arrow-in-right myProf"></i>:<i className="bi bi-box-arrow-left myProf"></i>}</Button>           
            </Nav>           
        </Container>       
      </Navbar>
      <ButtonGroup  style={{position:'absolute', right:'0.2%'}} onClick={(event)=>changeL(event.target.name)}>
      <Button variant="outline-dark" name='ru-RU' className='btn-sm myBtn'>RU</Button>
      <Button variant="outline-dark" name='en-US' className='btn-sm myBtn'>EN</Button>
    </ButtonGroup>
    <div className='mainGroup'>
      <div>
      <Button variant="outline-dark" className='btn-sm myBtn' onClick={handleClickLight}>Light</Button>
      <Button variant="outline-dark" className='btn-sm myBtn' onClick={handleClickDark}>Dark</Button>
      </div>
      <div className='searchInput' style={{visibility:shoSearchInput?'visible':'hidden'}}>
      <Form.Control style={{marginLeft:'40%', width:'50%', marginTop:'1%'}} type="text" list="reviews" placeholder={'Search'} 
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

const mapStateToProps=(state)=>{
  return {
    locale:state.info.locale,
    isLogin:state.info.isLogin,
    isLoad:state.info.isLoadReview,
  }
}

const PageLinks=connect(mapStateToProps)(IntPageLinks);

export default PageLinks;

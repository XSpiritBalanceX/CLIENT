import React, {useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Container, Nav, Button, ButtonGroup  } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { changeLanguage, loginUser } from '../redux/explainForReducer';
import {useTheme} from '../components/hooks/useTheme'

const IntPageLinks=(props)=>{

  useEffect(()=>{
    fetch('https://server-production-5ca0.up.railway.app/auth/login/success', /* {method:'GET',
     credentials:'include',
     headers:{
      "Accept":"application/json",
      "Content-Type":"application/json",
      "Access-Control-Allow-Credentials":true
     }} */)
    .then(response=>response.json())
    .then(data=>props.dispatch(loginUser(true, data.user, data.token, data.name)))
    .catch(err=>console.log(err))
    // eslint-disable-next-line
  },[])

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
            <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Reviewer</Navbar.Brand>
            <Nav className='nav justify-content-end' >
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
      <Button variant="outline-dark" className='btn-sm myBtn' onClick={handleClickLight}>Light</Button>
      <Button variant="outline-dark" className='btn-sm myBtn' onClick={handleClickDark}>Dark</Button>
        </IntlProvider>
    )
}

const mapStateToProps=(state)=>{
  return {
    locale:state.info.locale,
    isLogin:state.info.isLogin
  }
}

const PageLinks=connect(mapStateToProps)(IntPageLinks);

export default PageLinks;

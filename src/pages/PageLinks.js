import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar, Container, Nav, Button, ButtonGroup  } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { FormattedMessage } from 'react-intl';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { changeLanguage } from '../redux/explainForReducer';

const IntPageLinks=(props)=>{
   
    const locale=props.locale;
    const [check, setCheck]=useState(false);

    const changeL=(language)=>{
      props.dispatch(changeLanguage(language));
    }

    return (
        <IntlProvider  messages={messages[locale]}
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
            <NavLink to={'/login'} className="nav-link"><FormattedMessage id='signIn'/></NavLink>

            </Nav>
        </Container>       
      </Navbar>
      <ButtonGroup size="sm" style={{position:'absolute', right:'0.2%'}} onClick={(event)=>changeL(event.target.name)}>
      <Button variant="outline-dark" name='ru-RU'>RU</Button>
      <Button variant="outline-dark" name='en-US'>EN</Button>
    </ButtonGroup>
       <span><FormattedMessage id='theme'/></span>
       <BootstrapSwitchButton checked={check} onstyle="dark" size="xs" onlabel='on' offlabel='off' onChange={()=>setCheck(!check)}/>
        </IntlProvider>
    )
}

const mapStateToProps=(state)=>{
  return {
    locale:state.info.locale
  }
}

const PageLinks=connect(mapStateToProps)(IntPageLinks);

export default PageLinks;

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Container, Card} from 'react-bootstrap';
import mainImg from '../images/main.jpg';
import {useParams } from 'react-router-dom';
import decoded from 'jwt-decode';
import { loginUser } from '../redux/explainForReducer';


const IntMainPage=(props)=>{
    const params=useParams();
    
    useEffect(()=>{ 
        if(params.token){
            let email=decoded(params.token).email;
            let name=decoded(params.token).name;
            props.dispatch(loginUser(true, email, params.token, name));
        } 
        // eslint-disable-next-line
    },[])

    return(
        <Container className="d-flex justify-content-center align-items-center mainCont" style={{height:window.innerHeight-100}}>  
          <Card style={{width:'70%', border:'solid 4px #9FA0A4'}} className='p-4 contMain'>
          <Card.Img variant="top" src={mainImg} style={{width:'50%', height:'30%', borderRadius:'5px', margin:'0 auto 2% auto'}}/>
          <Card.Title><FormattedMessage id='title'/></Card.Title>
          <FormattedMessage id='gretings'/>
          </Card>
          </Container>
    )
}

const mapStateToProps=(state)=>{
    return { }
 }
 
 const MainPage=connect(mapStateToProps)(IntMainPage);
 
 export default MainPage;
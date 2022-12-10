import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Container, Card} from 'react-bootstrap';
import mainImg from '../images/main.jpg';


const intMainPage=(props)=>{
    return(
        <Container className="d-flex justify-content-center align-items-center mainCont" style={{height:window.innerHeight-150}}>  
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
 
 const MainPage=connect(mapStateToProps)(intMainPage);
 
 export default MainPage;
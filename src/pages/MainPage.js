import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Spinner, Card} from 'react-bootstrap';
import mainImg from '../images/main.jpg';
import {useParams } from 'react-router-dom';
import decoded from 'jwt-decode';
import { loginUser } from '../redux/explainForReducer';


const IntMainPage=(props)=>{
    const params=useParams();
    const [isLoad, setLoad]=useState(false);
    const [lastReview, setLast]=useState([])
    
    useEffect(()=>{ 
        if(params.token){
            let email=decoded(params.token).email;
            let name=decoded(params.token).name;
            props.dispatch(loginUser(true, email, params.token, name));
        } 
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        fetch('http://localhost:5000/api/review/getmain')
        .then(response=>response.json())
        .then(data=>{console.log(data); setLast(data);setLoad(true)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[])

    return(
        <div>
            {isLoad?<React.Fragment><div className='helloMain'>
                <Card style={{width:'70%', border:'solid 4px #9FA0A4'}} className='p-4 contMain'>
                 <Card.Img variant="top" src={mainImg} style={{width:'30%', height:'5%', borderRadius:'5px', margin:'0 auto 2% auto'}}/> 
                    <Card.Title><FormattedMessage id='title'/></Card.Title>
                    <FormattedMessage id='gretings'/>
                </Card>   
            </div>
            <div>
                <div>Последние обзоры</div>
            </div></React.Fragment>:
                <Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return { }
 }
 
 const MainPage=connect(mapStateToProps)(IntMainPage);
 
 export default MainPage;
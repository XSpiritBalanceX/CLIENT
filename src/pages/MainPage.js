import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Spinner, Card} from 'react-bootstrap';
import mainImg from '../images/main.jpg';
import {useParams, useNavigate } from 'react-router-dom';
import decoded from 'jwt-decode';
import { loginUser } from '../redux/explainForReducer';
import CardReview from '../components/items/CardReview';


const IntMainPage=(props)=>{
    const params=useParams();
    const [isLoad, setLoad]=useState(false);
    const [lastReview, setLast]=useState([]);
    const [reviewHigScore, setHigh]=useState([]);
    const navigate=useNavigate();
    
    useEffect(()=>{ 
        if(params.token){
            let email=decoded(params.token).email;
            let name=decoded(params.token).name;
            props.dispatch(loginUser(true, email, params.token, name));
        } 
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        fetch('https://server-production-5ca0.up.railway.app/api/review/getmain')
        .then(response=>response.json())
        .then(data=>{setLast(data.retuReview);setLoad(true); setHigh(data.revieHighRat)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[])

    const showR=(id)=>{        
        let item=lastReview.find(el=>el.id===id)
       navigate('/showReview/'+item.id)
    }

    let lastR=isLoad?lastReview.map(el=>{
        return <CardReview key={el.id}
        id={el.id}
        title={el.title}
        username={el.nameuser}
        date={el.date}
        teg={el.teg}
        rate={el.rate}
        cbshowR={showR}/>
    }).sort((a, b) => a > b ? 1 : -1):null;

    let highRevie=isLoad?reviewHigScore.map(el=>{
        return <CardReview key={el.id}
        id={el.id}
        title={el.title}
        username={el.nameuser}
        date={el.date}
        teg={el.teg}
        rate={el.rate}
        cbshowR={showR}/>
    }).sort((a, b) => a > b ? 1 : -1):null;

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
                <h4 className='HInMain'><FormattedMessage id='lastRev'/></h4>
                <div className='reviewLast'>
                    {lastR}
                </div>
                <h4 className='HInMain'><FormattedMessage id='highRev'/></h4>
                <div className='reviewLast'>
                    {highRevie}
                </div>
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
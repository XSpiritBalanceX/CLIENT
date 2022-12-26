import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { Card, Spinner } from 'react-bootstrap';
import mainImg from '../images/main.jpg';
import {useParams, useNavigate } from 'react-router-dom';
import decoded from 'jwt-decode';
import { loginUser } from '../redux/explainForReducer';
import CardReview from '../components/items/CardReview';


const IntMainPage=(props)=>{
    const params=useParams();
    const navigate=useNavigate();
    
    useEffect(()=>{ 
        if(params.token){
            let email=decoded(params.token).email;
            let name=decoded(params.token).name;
            props.dispatch(loginUser(true, email, params.token, name));
        } 
        // eslint-disable-next-line
    },[])

    const showR=(id)=>{        
        let item=props.lastReview.find(el=>el.id===id) || props.reviewHighScore.find(el=>el.id===id)
       navigate('/showReview/'+item.id)
    }

    let lastR=props.lastReview.map(el=>{
        return <CardReview key={el.id}
        id={el.id}
        title={el.title}
        username={el.nameuser}
        date={el.date}
        teg={el.teg}
        rate={el.rate}
        cbshowR={showR}/>
    }).sort((a, b) => a > b ? 1 : -1);

    let highRevie=props.reviewHighScore.map(el=>{
        return <CardReview key={el.id}
        id={el.id}
        title={el.title}
        username={el.nameuser}
        date={el.date}
        teg={el.teg}
        rate={el.rate}
        cbshowR={showR}/>
    }).sort((a, b) => a > b ? 1 : -1);

    return(
        <div>
            {props.isLoad?<React.Fragment><div className='helloMain'>
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
            </div></React.Fragment>:<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>}
            
        </div>
    )
}

const mapStateToProps=(state)=>{
    return { 
        lastReview:state.info.lastReview,
        reviewHighScore:state.info.reviewHighScore,
        isLoad:state.info.isLoadReview,
    }
 }
 
 const MainPage=connect(mapStateToProps)(IntMainPage);
 
 export default MainPage;
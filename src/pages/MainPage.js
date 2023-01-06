import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { Card, Spinner } from 'react-bootstrap';
import mainImg from '../images/main.jpg';
import {useParams, useNavigate } from 'react-router-dom';
import decoded from 'jwt-decode';
import { loginUser } from '../redux/explainForReducer';
import CardReview from '../components/items/CardReview';
import {TagCloud} from 'react-tagcloud'


const IntMainPage=(props)=>{
    const params=useParams();
    const navigate=useNavigate();
    const [tagCloudData, setCloud]=useState([]);
    const [dataInTags, setDataInTags]=useState([])
    
    useEffect(()=>{ 
        if(params.token){
            let email=decoded(params.token).email;
            let name=decoded(params.token).name;
            props.dispatch(loginUser(true, email, params.token, name));
        } 
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        let arrData=[];
        props.allReviews.forEach(el=>{
            arrData.push(el.teg)
        });
        let newData=arrData.join(',').split(',').reduce((acc,el)=>{
            acc[el]=(acc[el]||0)+1;
            return acc
        },{})
        let result=[];
        for(let k in newData){
            result.push({value:k, count:newData[k]})
        }
        setCloud(result)
        // eslint-disable-next-line
    },[props.isLoad===true])
    
    const findReviewTags=(value)=>{
        let cardCloud=[];
        props.allReviews.forEach(el=>{
            if(el.teg.includes(value)){
                cardCloud.push(el)
        }});
        setDataInTags(cardCloud)
    }

    const showR=(id)=>{        
        let item=props.lastReview.find(el=>el.id===id) || props.reviewHighScore.find(el=>el.id===id)
       navigate('/showReview/'+item.id)
    }
    

    let lastR=props.lastReview.map(el=>{
        return <CardReview key={el.id}
        id={el.id}
        title={el.title}
        name={el.name}
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
        name={el.name}
        username={el.nameuser}
        date={el.date}
        teg={el.teg}
        rate={el.rate}
        cbshowR={showR}/>
    }).sort((a, b) => a > b ? 1 : -1);

    return(
        <div>
            {props.isLoad?<React.Fragment><div className='helloMain'>
                <React.Fragment><Card className='p-4 contMain'>
                 <Card.Img variant="top" src={mainImg} style={{width:'30%', height:'60%', borderRadius:'5px', margin:'0 auto 2% auto'}}/> 
                    <Card.Title><FormattedMessage id='title'/></Card.Title>
                    <FormattedMessage id='gretings'/>
                </Card> </React.Fragment>
                <React.Fragment><TagCloud className='tagCloud' tags={tagCloudData} minSize={12} maxSize={35} onClick={tag=>findReviewTags(tag.value)}/></React.Fragment>     
            </div>
            <div className='tagsContent'>
                {dataInTags.map(el=>{
                    return <CardReview key={el.id}
                    id={el.id}
                    title={el.title}
                    username={el.nameuser}
                    date={el.date}
                    teg={el.teg}
                    rate={el.rate}
                    cbshowR={showR}/>
                })}
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
        allReviews:state.info.allReview,
        isLoad:state.info.isLoadReview,
    }
 }
 
 const MainPage=connect(mapStateToProps)(IntMainPage);
 
 export default MainPage;
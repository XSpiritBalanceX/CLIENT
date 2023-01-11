import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import './styles/CardReview.css';
import Moment from 'react-moment';
import 'moment/locale/ru';

const CardReview=(props)=>{
  
  const [averageRating, setAverage]=useState([]);
  const [isLoad, setLoad]=useState(false);
  const [allLikes, setLikes]=useState([]);


  useEffect(()=>{
    try{
      (async function(){
          let response=await fetch(`https://server-production-5ca0.up.railway.app/api/review/getrating?name=${props.title}&username=${props.username}`);
          let data=await response.json();
          setAverage(data.ratingItem); 
          setLoad(true);
          setLikes(data.allLikes);
      })()
    }catch(err){
        console.log(err)
    }
    // eslint-disable-next-line
  },[])

  let rating=0;
  averageRating.length===0?rating=0:averageRating.map(el=>{
   rating=rating+el.value/averageRating.length;
   return rating.toFixed(1);
  });

  let sumLikes=0;
  allLikes.length===0?rating=0:allLikes.map(el=>{
    if(el.like){
      sumLikes=sumLikes+el.like;
    }
    return sumLikes
   });
  
    return(
      <React.Fragment>
        {isLoad?<Card className='myCardReview'>
           <Card.Body>
           <Card.Img variant="top" src={props.url} /> 
            <Card.Title>{props.title} <span className='ratingRevCard'> &nbsp; <i className="bi bi-star-fill"></i>{rating}</span></Card.Title>            
              <Card.Text> 
                {props.name?<span className='spanName' >{props.name} <br/></span>:null}
                {props.username}  <i className="bi bi bi-hand-thumbs-up"></i> {sumLikes} <i className="bi bi-star-fill"></i>{props.rate}<br/>                
                # {props.teg}<br/> 
                <Moment fromNow locale={props.local}>{props.moment}</Moment><br/>
                <Button className='myBtn' size='sm' onClick={()=>props.cbshowR(props.id)} ><FormattedMessage id='show' /></Button>                         
              </Card.Text>
            </Card.Body>
        </Card>:null}
      </React.Fragment>
        
    )
}

export default CardReview;
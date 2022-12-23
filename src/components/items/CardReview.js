import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const CardReview=(props)=>{
  
  const [averageRating, setAverage]=useState('')
  useEffect(()=>{
    let coutRatingOne=[];
    let sum=0;
    if(props.rating!==undefined){
      props.rating.forEach(el=>{
        if(el.namereview===props.title){
          coutRatingOne.push(el.value)
          sum+=el.value;
        }
      })
      let avR=sum===0?'':sum/coutRatingOne.length;
      setAverage(avR)
    }
    // eslint-disable-next-line
  },[])

  
  
    return(
        <Card className='myCardReview'>
           <Card.Body>
              <Card.Title>{props.title} </Card.Title>
              <Card.Text> 
               {props.rating!==undefined?<React.Fragment> <FormattedMessage id='ratReview' /> {averageRating} <i className="bi bi-star-fill"></i><br/></React.Fragment>:''}
                {props.username}<br/>
                {props.date}<br/>
                # {props.teg} <br/>
                {props.rating===undefined?<React.Fragment><i className="bi bi-star-fill"></i> {props.rate}<br/></React.Fragment>:''} 
                <Button className='myBtn' size='sm' onClick={()=>props.cbshowR(props.id)} ><FormattedMessage id='show' /></Button>                         
              </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardReview;
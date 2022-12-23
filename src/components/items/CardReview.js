import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const CardReview=(props)=>{
  
  const [averageRating, setAverage]=useState([]);
  const [isLoad, setLoad]=useState(false);

  useEffect(()=>{
        fetch(`http://localhost:5000/api/review/getrating?name=${props.title}`)
        .then(response=>response.json())
        .then(data=>{setAverage(data); setLoad(true)})
        .catch(err=>console.log(err))
    // eslint-disable-next-line
  },[])

  let rating=0;
  averageRating.length===0?rating=0:averageRating.map(el=>{
   return rating=rating+el.value/averageRating.length
  })
  
    return(
      <React.Fragment>
        {isLoad?<Card className='myCardReview'>
           <Card.Body>
              <Card.Title>{props.title} </Card.Title>
              <Card.Text> 
              <FormattedMessage id='ratReview' /> {rating.toFixed(1)} <i className="bi bi-star-fill"></i><br/>
                {props.username}<br/>
                {props.date}<br/>
                # {props.teg} <br/>
                <i className="bi bi-star-fill"></i> {props.rate}<br/> 
                <Button className='myBtn' size='sm' onClick={()=>props.cbshowR(props.id)} ><FormattedMessage id='show' /></Button>                         
              </Card.Text>
            </Card.Body>
        </Card>:null}
      </React.Fragment>
        
    )
}

export default CardReview;
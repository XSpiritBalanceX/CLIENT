import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const CardReview=(props)=>{

    return(
        <Card className='myCardReview'>
           <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text> 
                {props.username}<br/>
                {props.date}<br/>
                # {props.teg} <br/>
                <i className="bi bi-star-fill"></i> {props.rate}  <br/>
                <Button className='myBtn' size='sm' onClick={()=>props.cbshowR(props.id)} ><FormattedMessage id='show' /></Button>                         
              </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardReview;
import React from 'react';
import {Card, Button} from 'react-bootstrap';


const Series=(props)=>{

    return(
        <Card className='cardBook'>
        <Card.Img variant="top" title={props.name} src={props.url} style={{width:'10em', margin:'3% auto 0 auto'}}/>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {`${props.locale==='ru-RU'?'Жанр':'Genre'} - ${props.genre}`}<br/>
            {`${props.locale==='ru-RU'?'Количество сезонов':'Number of seasons'} - ${props.numberofseas}`}<br/>
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>props.goToSer(props.id)}>{props.locale==='ru-RU'?'Показать':'Show'}</Button>
        </Card.Body>
      </Card>
    )
}

 
export default Series;
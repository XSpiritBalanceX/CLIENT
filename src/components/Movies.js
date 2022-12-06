import React from 'react';
import {Card, Button} from 'react-bootstrap';


const Movies=(props)=>{

    return(
        <Card className='cardBook'>
        <Card.Img variant="top" title={props.name} src={props.url} style={{width:'10em', margin:'3% auto 0 auto'}}/>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {`${props.locale==='ru-RU'?'Жанр':'Genre'} - ${props.genre}`}<br/>
            {`${props.locale==='ru-RU'?'Продолжительность':'Runtime'} - ${props.runtime}`}<br/>
            {`${props.locale==='ru-RU'?'Оценка пользователей':'User rating'} - ${props.rate}`}
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>props.goToM(props.id)}>{props.locale==='ru-RU'?'Показать':'Show'}</Button>
        </Card.Body>
      </Card>
    )
}

 
export default Movies;
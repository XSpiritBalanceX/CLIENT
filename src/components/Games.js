import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';


const Games=({id, name, url, locale, developer, genre, goToGam})=>{

    return(
        <Card className='cardGame'>
        <Card.Img variant="top" title={name} src={url} className='imageCardCont'/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {`${locale==='ru-RU'?'Разработчик':'Developer'} - ${developer}`}<br/>
            {`${locale==='ru-RU'?'Жанр':'Genre'} - ${genre}`}<br/>            
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToGam(id)}>{locale==='ru-RU'?'Показать':'Show'}</Button>
        </Card.Body>
      </Card>
    )
}

 
export default Games;
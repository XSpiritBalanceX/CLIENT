import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';


const Movies=({id, name, url, locale, runtime, genre, goToM})=>{

    return(
        <Card className='cardMovie'>
        <Card.Img variant="top" title={name} src={url} className='imageCardCont'/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {`${locale==='ru-RU'?'Жанр':'Genre'} - ${genre}`}<br/>
            {`${locale==='ru-RU'?'Продолжительность':'Runtime'} - ${runtime}`}<br/>
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToM(id)}>{locale==='ru-RU'?'Показать':'Show'}</Button>
        </Card.Body>
      </Card>
    )
}

 
export default Movies;
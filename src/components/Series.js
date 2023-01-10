import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';


const Series=({id, name, url, locale, numberofseas, genre, goToSer})=>{

    return(
        <Card className='cardSeries'>
        <Card.Img variant="top" title={name} src={url} className='imageCardCont'/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {`${locale==='ru-RU'?'Жанр':'Genre'} - ${genre}`}<br/>
            {`${locale==='ru-RU'?'Количество сезонов':'Number of seasons'} - ${numberofseas}`}<br/>
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToSer(id)}>{locale==='ru-RU'?'Показать':'Show'}</Button>
        </Card.Body>
      </Card>
    )
}

 
export default Series;
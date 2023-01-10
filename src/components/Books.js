import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';

const Books=({id, name, url, locale, autor, genre, goToBoo})=>{

    return(
        <Card className='cardBook'>
        <Card.Img variant="top" className='imageCardCont' title={name} src={url} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {`${locale==='ru-RU'?'Автор':'Author'} - ${autor}`}<br/>
            {`${locale==='ru-RU'?'Жанр':'Genre'} - ${genre}`}<br/>            
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToBoo(id)}>{locale==='ru-RU'?'Показать':'Show'}</Button>
        </Card.Body>
      </Card>
    )
}

 
export default Books;
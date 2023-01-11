import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';
import { FormattedMessage } from 'react-intl';

const Books=({id, name, url, autor, genre, goToBoo})=>{

    return(
        <Card className='cardBook'>
        <Card.Img variant="top" className='imageCardCont' title={name} src={url} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <FormattedMessage id='authorText' /> {` ${autor}`}<br/>
            <FormattedMessage id='genre' />{` ${genre}`}<br/>            
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToBoo(id)}><FormattedMessage id='show' /></Button>
        </Card.Body>
      </Card>
    )
}

 
export default Books;
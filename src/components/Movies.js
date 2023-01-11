import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';
import { FormattedMessage } from 'react-intl';


const Movies=({id, name, url, runtime, genre, goToM})=>{

    return(
        <Card className='cardMovie'>
        <Card.Img variant="top" title={name} src={url} className='imageCardCont'/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <FormattedMessage id='genre' />{` ${genre}`}<br/>
            <FormattedMessage id='runtime' />{` ${runtime}`} <FormattedMessage id='time' /><br/>
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToM(id)}><FormattedMessage id='show' /></Button>
        </Card.Body>
      </Card>
    )
}

 
export default Movies;
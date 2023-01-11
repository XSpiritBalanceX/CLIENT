import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';
import { FormattedMessage } from 'react-intl';


const Games=({id, name, url, developer, genre, goToGam})=>{

    return(
        <Card className='cardGame'>
        <Card.Img variant="top" title={name} src={url} className='imageCardCont'/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
           <FormattedMessage id='developer' />{` ${developer}`}<br/>
           <FormattedMessage id='genre' />{` ${genre}`}<br/>            
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToGam(id)}><FormattedMessage id='show' /></Button>
        </Card.Body>
      </Card>
    )
}

 
export default Games;
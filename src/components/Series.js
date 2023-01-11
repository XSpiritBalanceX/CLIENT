import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles/StylesForItemsCont.css';
import { FormattedMessage } from 'react-intl';


const Series=({id, name, url, numberofseas, genre, goToSer})=>{

    return(
        <Card className='cardSeries'>
        <Card.Img variant="top" title={name} src={url} className='imageCardCont'/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <FormattedMessage id='genre' />{` ${genre}`}<br/>
            <FormattedMessage id='seasons' />{` ${numberofseas}`}<br/>
          </Card.Text>
          <Button variant="dark" className='myBtn' onClick={()=>goToSer(id)}><FormattedMessage id='show' /></Button>
        </Card.Body>
      </Card>
    )
}

 
export default Series;
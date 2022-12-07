import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Spinner, Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const IntItemMovie=(props)=>{
    const [item, setItem]=useState([]);
    const [isLoad, setLoad]=useState(true)
    const params=useParams();
    const idMovie=params.id;

    useEffect(()=>{
        fetch(`http://localhost:5000/api/movies/getonemovie?lang=${props.locale}&id=${idMovie}`)
        .then(response=>response.json())
        .then(data=>{setItem(data); setLoad(false)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

    
     let oneMovie=!isLoad? item.map(el=>{
       return <React.Fragment key={el.id}>
           <Card.Img variant="top" title={el.nameen||el.nameru} src={el.url} />
           <Card.Body>
              <Card.Title>{props.locale==='ru-RU'?el.nameru:el.nameen}</Card.Title>
              <Card.Text>
              <FormattedMessage id='date'/> {el.data}<br/>
              <FormattedMessage id='genre'/> {props.locale==='ru-RU'?el.genreru:el.genreen}<br/>
              <FormattedMessage id='director'/>  {props.locale==='ru-RU'?el.directorru:el.directoren}<br/>
              <FormattedMessage id='runtime'/>{el.runtime}<FormattedMessage id='time'/><br/>               
              <FormattedMessage id='starring'/> {props.locale==='ru-RU'?el.starringru:el.starringen}<br/><br/>
               <FormattedMessage id='summary'/> {props.locale==='ru-RU'?el.summaryru:el.summaryen}<br/><br/>
              <FormattedMessage id='metascore'/> {el.metascore}<br/>
              <FormattedMessage id='userscore'/>  {el.rate}                
              </Card.Text>
            </Card.Body>
        </React.Fragment> 
        }):null
    return(
        <div>
           {isLoad?<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
            <div className='contanForItem'>
                <Card style={{ width: '20rem', height:'auto', margin:'3% 5% 2% 5%',padding:'2%'  }}>
                    {oneMovie}
                </Card>
                <div>
                <Button className='myBtn' size='sm'><FormattedMessage id='newRev' /></Button>
                <div>
                    Тут будут все обзоры
                </div>
                </div>
            </div>} 
        </div>        
    )
}

const mapStateToProps=(state)=>{
    return {
        locale:state.info.locale,
    }
 }
 
const ItemMovie=connect(mapStateToProps)(IntItemMovie);

export default ItemMovie;
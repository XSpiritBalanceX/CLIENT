import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner, Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {addNameReview} from '../../redux/explainForReducer'

const IntItemGame=(props)=>{
    const [item, setItem]=useState([]);
    const [isLoad, setLoad]=useState(true)
    const params=useParams();
    const idGame=params.id;
    const navigate=useNavigate();

    let nameItem;
    const goToNewReview=()=>{
        props.dispatch(addNameReview(nameItem))
        navigate('/newreview')
    }

    useEffect(()=>{
        fetch(`http://localhost:5000/api/games/getonegame?lang=${props.locale}&id=${idGame}`)
        .then(response=>response.json())
        .then(data=>{setItem(data); setLoad(false)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

    console.log()
     let oneGame=!isLoad? item.map(el=>{
        nameItem=props.locale==='ru-RU'?el.nameru:el.nameen;
       return <React.Fragment key={el.id}>
           <Card.Img variant="top" title={el.nameen||el.nameru} src={el.url} />
           <Card.Body>
              <Card.Title>{props.locale==='ru-RU'?el.nameru:el.nameen}</Card.Title>
              <Card.Text>
              <FormattedMessage id='developer'/>  {el.developer}<br/>
              <FormattedMessage id='date'/> {el.data}<br/>
              <FormattedMessage id='genre'/> {props.locale==='ru-RU'?el.genreru:el.genreen}<br/><br/>
               <FormattedMessage id='summary'/> {props.locale==='ru-RU'?el.summaryru:el.summaryen}<br/><br/>
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
                 {oneGame}
                </Card>
                <div>
                <Button className='myBtn' size='sm' onClick={()=>goToNewReview()}><FormattedMessage id='newRev' /></Button>
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
 
const ItemGame=connect(mapStateToProps)(IntItemGame);

export default ItemGame;
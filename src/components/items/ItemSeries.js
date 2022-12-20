import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner, Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {addNameReview} from '../../redux/explainForReducer';
import CardReview from './CardReview';

const IntItemSeries=(props)=>{
    const [item, setItem]=useState([]);
    const [isLoad, setLoad]=useState(true)
    const [isLoadReview, setIsLoadReview]=useState(true);
    const [allReview, setAllReview]=useState([]);
    const params=useParams();
    const idSeries=params.id;
    const navigate=useNavigate();

    useEffect(()=>{
        fetch(`https://server-production-5ca0.up.railway.app/api/series/getoneseries?lang=${props.locale}&id=${idSeries}`)
        .then(response=>response.json())
        .then(data=>{setItem(data); setIsLoadReview(false)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

    let nameItem;
    const goToNewReview=()=>{
        props.dispatch(addNameReview(nameItem))
        navigate('/newreview')
    }

    
     let oneSer=!isLoad? item.map(el=>{
        nameItem=props.locale==='ru-RU'?el.nameru:el.nameen;
       return <React.Fragment key={el.id}>
           <Card.Img variant="top" title={el.nameen||el.nameru} src={el.url} />
           <Card.Body>
              <Card.Title>{props.locale==='ru-RU'?el.nameru:el.nameen}</Card.Title>
              <Card.Text>
              <FormattedMessage id='date'/> {el.data}<br/>
              <FormattedMessage id='seasons'/>  {el.numberofseas}<br/>
              <FormattedMessage id='genre'/> {props.locale==='ru-RU'?el.genreru:el.genreen}<br/>
              <FormattedMessage id='starring'/> {props.locale==='ru-RU'?el.starringru:el.starringen}<br/>
              <FormattedMessage id='screenwriter'/> {props.locale==='ru-RU'?el.directorru:el.directoren}<br/><br/>
               <FormattedMessage id='summary'/> {props.locale==='ru-RU'?el.summaryru:el.summaryen}<br/><br/>
               <FormattedMessage id='metascore'/> {el.metascore}<br/>
              <FormattedMessage id='userscore'/>  {el.rate}                
              </Card.Text>
            </Card.Body>
        </React.Fragment> 
        }):null;

        const showR=(id)=>{            
            let item=allReview.find(el=>el.id===id)         
            navigate('/showReview/'+item.id)
        }

        useEffect(()=>{
            fetch(`https://server-production-5ca0.up.railway.app/api/review/itemreview?name=${nameItem}`)
            .then(response=>response.json())
            .then(data=>{setAllReview(data); setLoad(false)})
            .catch(err=>console.log(err))
            // eslint-disable-next-line
        },[nameItem]); 
        
        let cardReview=allReview.length===0?<p className='emptyReview'><FormattedMessage id='messForEmpty'/></p>:
      allReview.map(el=>{
        return <CardReview key={el.id}
         id={el.id}
         title={el.title}
         username={el.nameuser}
         date={el.date}
         teg={el.teg}
         rate={el.rate}
         cbshowR={showR}/>
      })

    return(
        <div>
           {isLoad&&isLoadReview?<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
            <div className='contanForItem'>
                <Card className='MyDescript' >
                    {oneSer}
                </Card>
                <div>
                {props.isLogin&&<Button className='myBtn' size='sm' onClick={()=>goToNewReview()}><FormattedMessage id='newRev' /></Button>}
                <div >
                <h4 className='emptyReview'><FormattedMessage id='revi'/></h4>
                {cardReview}
                </div>
                </div>
            </div>} 
        </div>        
    )
}

const mapStateToProps=(state)=>{
    return {
        locale:state.info.locale,
        isLogin:state.info.isLogin
    }
 }
 
const ItemSeries=connect(mapStateToProps)(IntItemSeries);

export default ItemSeries;
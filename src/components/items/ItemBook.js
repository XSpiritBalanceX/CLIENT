import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner, Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {addNameReview} from '../../redux/explainForReducer'
import CardReview from './CardReview';

const IntItemBook=(props)=>{
    const [item, setItem]=useState([]);
    const [isLoad, setLoad]=useState(true);
    const [isLoadReview, setIsLoadReview]=useState(true);
    const [allReview, setAllReview]=useState([]);
    const [rating, setRating]=useState(0);
    const params=useParams();
    const idBook=params.id;
    const navigate=useNavigate();


    useEffect(()=>{
        fetch(`https://server-production-5ca0.up.railway.app/api/books/getonebook?lang=${props.locale}&id=${idBook}`)
        .then(response=>response.json())
        .then(data=>{setItem(data); setIsLoadReview(false);})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

    let nameItem;
    const goToNewReview=()=>{
        props.dispatch(addNameReview(nameItem))
        navigate('/newreview')
    }
    
     
    let oneBook=!isLoad? item.map(el=>{
        nameItem=props.locale==='ru-RU'?el.nameru:el.nameen;
       return <React.Fragment key={el.id}>
           <Card.Img variant="top" title={el.nameen||el.nameru} src={el.url} />
           <Card.Body>
              <Card.Title>{props.locale==='ru-RU'?el.nameru:el.nameen}</Card.Title>
              <Card.Text>
              <FormattedMessage id='author'/>  {props.locale==='ru-RU'?el.autorru:el.autoren}<br/>
              <FormattedMessage id='date'/> {el.data}<br/>
              <FormattedMessage id='genre'/> {props.locale==='ru-RU'?el.genreru:el.genreen}<br/><br/>
               <FormattedMessage id='summary'/> {props.locale==='ru-RU'?el.summaryru:el.summaryen}<br/><br/>
              <FormattedMessage id='userscore'/>  {rating}                
              </Card.Text>
            </Card.Body>
        </React.Fragment> 
        }):null

    const showR=(id)=>{        
       let item=allReview.find(el=>el.id===id)
      navigate('/showReview/'+item.id)
    }

    useEffect(()=>{
        fetch(`https://server-production-5ca0.up.railway.app/api/review/itemreview?name=${nameItem}`)
        .then(response=>response.json())
        .then(data=>{setAllReview(data); setLoad(false);})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[nameItem]); 

    useEffect(()=>{
        let sumRating=0;
        if(!isLoad){
            if(allReview.length===0){
                sumRating=0
            }else{
                allReview.forEach(el=>{
                    sumRating+=el.rate/allReview.length 
                })
            }
            setRating(sumRating.toFixed(1))
        }
        // eslint-disable-next-line
    },[allReview])

    let cardReview=allReview.length===0?<p className='emptyReview'> <FormattedMessage id='messForEmpty'/></p>:
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
                    {oneBook}
                </Card>
                <div>
                {props.isLogin&&<Button className='myBtn' size='sm' onClick={()=>goToNewReview()}><FormattedMessage id='newRev' /></Button>}
                <div>
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
 
const ItemBook=connect(mapStateToProps)(IntItemBook);

export default ItemBook;
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner, Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {addNameReview} from '../../store/actionForReducer'
import CardReview from './CardReview';
import './styles/stylesForItems.css';

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
        try{
            (async function(){
                let response=await fetch(`https://server-production-5ca0.up.railway.app/api/books/getonebook?id=${idBook}`);
                let data=await response.json();
                setItem(data); 
                setIsLoadReview(false);
            })()
        }catch(err){
            console.log(err)
        }
        // eslint-disable-next-line
    },[]);

    let nameItem;
    const goToNewReview=()=>{
        props.dispatch(addNameReview(nameItem))
        navigate('/newreview')
    }
    
     
    let oneBook=!isLoad? item.map(el=>{
        nameItem=el.name;
       return <React.Fragment key={el.id}>
        <div className='pictInDescription'>
            <img alt={el.nameen||el.nameru} src={el.url}/>
        </div>
           <div>
            <h3>{el.name}</h3>
            <p><FormattedMessage id='author'/>  {el.autor}</p>
            <p><FormattedMessage id='date'/> {el.data}</p>
            <p><FormattedMessage id='genre'/> {el.genre}</p>
            <p><FormattedMessage id='summary'/> {el.summary}</p>
            <p><FormattedMessage id='userscore'/>  {rating} </p>
           </div>
        </React.Fragment> 
        }):null

    const showR=(id)=>{        
       let item=allReview.find(el=>el.id===id)
      navigate('/showReview/'+item.id)
    }

    useEffect(()=>{
        try{
            (async function(){
                let response=await fetch(`https://server-production-5ca0.up.railway.app/api/review/itemreview?name=${nameItem}`);
                let data=await response.json();
                setAllReview(data); 
                setLoad(false);
            })()
        }catch(err){
            console.log(err)
        }
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
    <div className='oneReviewInDescrip'>
      {allReview.map(el=>{
        return <CardReview key={el.id}
         id={el.id}
         title={el.title}
         username={el.nameuser}
         moment={el.createdAt}
         local={props.locale.slice(0,2)}
         teg={el.teg}
         rate={el.rate}
         url={el.namepict}
         cbshowR={showR}/>
      })}  
    </div>
      
    
     
    return(
        <div className='contanerForAllContent'>
           {isLoad&&isLoadReview?<Spinner animation="border" className='loadItem'/>:
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

const mapStateToProps=(state)=>({
        isLogin:state.service.isLogin,
        locale:state.review.locale 
 })
 
const ItemBook=connect(mapStateToProps)(IntItemBook);

export default ItemBook;
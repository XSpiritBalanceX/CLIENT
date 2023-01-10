import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner, Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {addNameReview, } from '../../store/actionForReducer';
import CardReview from './CardReview';
import './styles/stylesForItems.css';

const IntItemGame=(props)=>{
    const [item, setItem]=useState([]);
    const [isLoad, setLoad]=useState(true)
    const [isLoadReview, setIsLoadReview]=useState(true);
    const [allReview, setAllReview]=useState([]);
    const [rating, setRating]=useState(0) ;
    const params=useParams();
    const idGame=params.id;
    const navigate=useNavigate();

    let nameItem;
    const goToNewReview=()=>{
        props.dispatch(addNameReview(nameItem))
        navigate('/newreview')
    }

    useEffect(()=>{
        fetch(`https://server-production-5ca0.up.railway.app/api/games/getonegame?lang=${props.locale}&id=${idGame}`)
        .then(response=>response.json())
        .then(data=>{setItem(data); setIsLoadReview(false)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

     let oneGame=!isLoad? item.map(el=>{
        nameItem=props.locale==='ru-RU'?el.nameru:el.nameen;
       return <React.Fragment key={el.id}>
          <div className='pictInDescription'>
                <img alt={el.nameen||el.nameru} src={el.url}/>
            </div>
           <div>
                <h3>{props.locale==='ru-RU'?el.nameru:el.nameen}</h3>
                <p><FormattedMessage id='developer'/>  {props.locale==='ru-RU'?el.developerru:el.developeren}</p>
                <p><FormattedMessage id='date'/> {el.data}</p>
                <p><FormattedMessage id='genre'/> {props.locale==='ru-RU'?el.genreru:el.genreen}</p>
                <p><FormattedMessage id='summary'/> {props.locale==='ru-RU'?el.summaryru:el.summaryen}</p>
                <p><FormattedMessage id='userscore'/>  {rating} </p>
           </div>
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
        
        let cardReview=allReview.length===0?<p className='emptyReview'><FormattedMessage id='messForEmpty'/></p>:
        <div className='oneReviewInDescrip'>
        {allReview.map(el=>{
          return <CardReview key={el.id}
           id={el.id}
           title={el.title}
           username={el.nameuser}
           date={el.date}
           teg={el.teg}
           rate={el.rate}
           url={el.namepict}
           cbshowR={showR}/>
        })}  
      </div>

    return(
        <div className='contanerForAllContent'>
           {isLoad&&isLoadReview?<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
            <div className='contanForItem'>
                <Card className='MyDescript' >
                 {oneGame}
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
        locale:state.info.locale,
        isLogin:state.info.isLogin
 })
 
const ItemGame=connect(mapStateToProps)(IntItemGame);

export default ItemGame;
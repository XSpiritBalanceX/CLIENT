import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner } from 'react-bootstrap';
import Games from '../components/Games';
import './styles/ContantPage.css';
import Pagination from '../components/Pagination';
import useFetch from '../components/hooks/useFetch';


const IntGamePage=(props)=>{
    const {data, loading, error}=useFetch('https://server-production-5ca0.up.railway.app/api/games/?lang='+props.locale );
    const params=useParams();
    let pageCount=params.page;
    const navigate=useNavigate();
    const [itemPerPage]=useState(6);
    const lastItemIndex=pageCount*itemPerPage;
    const firstItemIndex=lastItemIndex-itemPerPage;
    const currentItem=data.slice(firstItemIndex, lastItemIndex);

    if(error){
        console.log(error)
    }
    
    const goToGame=(id)=>{
        navigate('/games/item/'+id);
    }

    return(
        <div>
            {!loading?
            <Spinner animation="border" className='loadContant'/>:
            <div>
                <div className='contentAllPage'>
                {currentItem.map(el=>{
                     return <Games key={el.id}
                        id={el.id}
                        name={props.locale==='ru-RU'?el.nameru:el.nameen}
                        developer={el.developer}
                        genre={props.locale==='ru-RU'?el.genreru:el.genreen}
                        url={el.url}
                        locale={props.locale}
                        goToGam={goToGame}/>
                    })}
                    </div>
                    <div className='paginatContent'>
                      <Pagination itemPerPage={itemPerPage} totalItems={data.length} whereGo={'games'}/>
                    </div>
            </div>
            }
        </div>
    )
}

const mapStateToProps=(state)=>({
        locale:state.review.locale,
        gamesData:state.content.games
    })
 
 const GamePage=connect(mapStateToProps)(IntGamePage);
 
 export default GamePage;
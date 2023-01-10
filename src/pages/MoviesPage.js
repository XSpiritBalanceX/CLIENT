import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner } from 'react-bootstrap';
import Movies from '../components/Movies';
import './styles/ContantPage.css';
import Pagination from '../components/Pagination';
import useFetch from '../components/hooks/useFetch';


const IntMoviesPage=(props)=>{

    const {data, loading, error}=useFetch('https://server-production-5ca0.up.railway.app/api/movies/?lang='+props.locale );
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

    const goToMovie=(id)=>{
        navigate('/movies/item/'+id);
    }

    return(
        <div>
            {!loading?
            <Spinner animation="border" className='loadContant'/>:
            <div>
                <div className='contentAllPage'>
                {currentItem.map(el=>{
                     return <Movies key={el.id}
                        id={el.id}
                        name={props.locale==='ru-RU'?el.nameru:el.nameen}
                        genre={props.locale==='ru-RU'?el.genreru:el.genreen}
                        runtime={props.locale==='ru-RU'?`${el.runtime} мин`:`${el.runtime} min`}
                        url={el.url}
                        locale={props.locale}
                        goToM={goToMovie}/>
                    })}
                    </div>
                    <div className='paginatContent'>
                      <Pagination itemPerPage={itemPerPage} totalItems={data.length} whereGo={'movies'}/>
                    </div>
            </div>
            }
        </div>
    )
}

const mapStateToProps=(state)=>({
        locale:state.review.locale,
        moviData:state.content.movies
    })
 
 const MoviesPage=connect(mapStateToProps)(IntMoviesPage);
 
 export default MoviesPage;
import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import Series from '../components/Series';
import './styles/ContantPage.css';
import Pagination from '../components/Pagination';
import useFetch from '../components/hooks/useFetch';


const SeriesPage=(props)=>{

    const {data, loading, error}=useFetch('https://server-production-5ca0.up.railway.app/api/series/');
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
 
    const goToSeries=(id)=>{
        navigate('/series/item/'+id);
    }

    return(
        <div>
            {!loading?
            <Spinner animation="border" className='loadContant'/>:
            <div>
                <div className='contentAllPage'>
                {currentItem.map(el=>{
                     return <Series key={el.id}
                        id={el.id}
                        name={el.name}
                        genre={el.genre}
                        numberofseas={el.numberofseas}
                        url={el.url}
                        goToSer={goToSeries}/>
                    })}
                    </div>
                    <div className='paginatContent'>
                      <Pagination itemPerPage={itemPerPage} totalItems={data.length} whereGo={'series'}/>
                    </div>
            </div>
            }
        </div>
    )
}

 
 export default SeriesPage;
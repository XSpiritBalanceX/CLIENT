import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Spinner } from 'react-bootstrap';
import Books from '../components/Books';
import Pagination from '../components/Pagination';
import './styles/ContantPage.css';
import useFetch from '../components/hooks/useFetch';


const BooksPage=(props)=>{

    const {data, loading, error}=useFetch('https://server-production-5ca0.up.railway.app/api/books/');
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
    
    const goToBook=(id)=>{
        navigate('/books/item/'+id);
    }

    return(
        <div>
            {!loading?
            <Spinner animation="border" className='loadContant' />:
            <div>
                <div className='contentAllPage'>
                {currentItem.map(el=>{
                     return <Books key={el.id}
                        id={el.id}
                        name={el.name}
                        autor={el.autor}
                        genre={el.genre}
                        url={el.url}
                        goToBoo={goToBook}/>
                    })}
                    </div>
                    <div className='paginatContent'>
                        <Pagination itemPerPage={itemPerPage} totalItems={data.length} whereGo={'books'}/>
                    </div>
            </div>
            }
        </div>
    )
}

export default BooksPage;
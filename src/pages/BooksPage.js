import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner } from 'react-bootstrap';
import Books from '../components/Books';
import Pagination from '../components/Pagination';
import './styles/ContantPage.css';
import useFetch from '../components/hooks/useFetch';


const IntBooksPage=(props)=>{

    const {data, loading, error}=useFetch('https://server-production-5ca0.up.railway.app/api/books/?lang='+props.locale );
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
                        name={props.locale==='ru-RU'?el.nameru:el.nameen}
                        autor={props.locale==='ru-RU'?el.autorru:el.autoren}
                        genre={props.locale==='ru-RU'?el.genreru:el.genreen}
                        url={el.url}
                        locale={props.locale}
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

const mapStateToProps=(state)=>({
        locale:state.review.locale
    })
 
 const BooksPage=connect(mapStateToProps)(IntBooksPage);
 
 export default BooksPage;
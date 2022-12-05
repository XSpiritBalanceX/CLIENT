import React, {useState, useEffect} from 'react';
import {useParams,  NavLink, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import {loadBooks} from '../redux/explainForReducer';
import Books from '../components/Books';


const IntBooksPage=(props)=>{
    const [isLoad, setLoad]=useState(true);
    const params=useParams();
    let pageCount=params.page;
    const navigate=useNavigate();

    useEffect(()=>{
        fetch('http://localhost:5000/api/books/?lang='+props.locale)
        .then(response=>response.json())
        .then(data=>{setLoad(false); props.dispatch(loadBooks(data))})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

    let booksData;
    if(pageCount==='first'){
        booksData=props.bookData.slice(0,4);
    }else if(pageCount==='second'){
        booksData=props.bookData.slice(5,9);
    }else if(pageCount==='third'){
        booksData=props.bookData.slice(10,14);
    }else if(pageCount==='fourth'){
        booksData=props.bookData.slice(15,19);
    }else if(pageCount==='fifth'){
        booksData=props.bookData.slice(20,24);
    }else if(pageCount==='sixth'){
        booksData=props.bookData.slice(25,30);
    }
    
    const goToBook=(id)=>{
        navigate('/books/item/'+id);
    }

    return(
        <div>
            {isLoad?
            <Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
            <div>
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap',justifyContent:'center', margin:'2% 5% 2% 5%'}}>
                {booksData.map(el=>{
                     return <Books key={el.id}
                        id={el.id}
                        name={props.locale==='ru-RU'?el.nameru:el.nameen}
                        autor={props.locale==='ru-RU'?el.autorru:el.autoren}
                        genre={props.locale==='ru-RU'?el.genreru:el.genreen}
                        rate={el.rate}
                        url={el.url}
                        locale={props.locale}
                        goToBoo={goToBook}/>
                    })}
                    </div>
                    <div style={{margin:'0 auto 2% auto', position:'absolute', left:'40%',}}>
                    <ButtonToolbar >
                    <ButtonGroup className="me-2" style={{textDecoration:'none'}}>
                        <Button variant="dark" name='1'><NavLink to={'/books/first'} className={obj=>obj.isActive?'active':'page-link'}>1</NavLink ></Button> 
                        <Button variant="dark" name='2'><NavLink to={'/books/second'} className={obj=>obj.isActive?'active':'page-link'}>2</NavLink ></Button> 
                        <Button variant="dark" name='3'><NavLink to={'/books/third'} className={obj=>obj.isActive?'active':'page-link'}>3</NavLink ></Button>
                        <Button variant="dark" name='4'><NavLink to={'/books/fourth'} className={obj=>obj.isActive?'active':'page-link'}>4</NavLink ></Button>
                        <Button variant="dark" name='5'><NavLink to={'/books/fifth'} className={obj=>obj.isActive?'active':'page-link'}>5</NavLink ></Button>
                        <Button variant="dark" name='6'><NavLink to={'/books/sixth'} className={obj=>obj.isActive?'active':'page-link'}>6</NavLink ></Button>
                    </ButtonGroup>
                </ButtonToolbar>
                    </div>
            </div>
            }
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        locale:state.info.locale,
        bookData:state.info.books
    }
 }
 
 const BooksPage=connect(mapStateToProps)(IntBooksPage);
 
 export default BooksPage;
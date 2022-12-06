import React, {useState, useEffect} from 'react';
import {useParams,  NavLink, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import Movies from '../components/Movies';
import {loadMovies} from '../redux/explainForReducer';


const IntMoviesPage=(props)=>{
    const [isLoad, setLoad]=useState(true);
    const params=useParams();
    let pageCount=params.page;
    const navigate=useNavigate();


    useEffect(()=>{
        fetch('http://localhost:5000/api/movies/?lang='+props.locale)
        .then(response=>response.json())
        .then(data=>{setLoad(false); props.dispatch(loadMovies(data))})
        .catch(err=>console.log(err))       
        // eslint-disable-next-line
    },[props.locale]);

    let moviesData;
    if(pageCount==='first'){
        moviesData=props.moviData.slice(0,4);
    }else if(pageCount==='second'){
        moviesData=props.moviData.slice(5,9);
    }else if(pageCount==='third'){
        moviesData=props.moviData.slice(10,14);
    }else if(pageCount==='fourth'){
        moviesData=props.moviData.slice(15,19);
    }else if(pageCount==='fifth'){
        moviesData=props.moviData.slice(20,24);
    }else if(pageCount==='sixth'){
        moviesData=props.moviData.slice(25,30);
    }
    
    
    const goToMovie=(id)=>{
        navigate('/movies/item/'+id);
    }

    return(
        <div>
            {isLoad?
            <Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
            <div>
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap',justifyContent:'center', margin:'2% 5% 2% 5%'}}>
                {moviesData.map(el=>{
                     return <Movies key={el.id}
                        id={el.id}
                        name={props.locale==='ru-RU'?el.nameru:el.nameen}
                        genre={props.locale==='ru-RU'?el.genreru:el.genreen}
                        runtime={props.locale==='ru-RU'?`${el.runtime} мин`:`${el.runtime} min`}
                        rate={el.rate}
                        url={el.url}
                        locale={props.locale}
                        goToM={goToMovie}/>
                    })}
                    </div>
                    <div style={{margin:'0 auto 2% auto', position:'absolute', left:'40%',}}>
                    <ButtonToolbar >
                    <ButtonGroup className="me-2" style={{textDecoration:'none'}}>
                        <Button className='myBtn' name='1'><NavLink to={'/movies/first'} className={obj=>obj.isActive?'active':'page-link'}>1</NavLink ></Button> 
                        <Button className='myBtn' name='2'><NavLink to={'/movies/second'} className={obj=>obj.isActive?'active':'page-link'}>2</NavLink ></Button> 
                        <Button className='myBtn' name='3'><NavLink to={'/movies/third'} className={obj=>obj.isActive?'active':'page-link'}>3</NavLink ></Button>
                        <Button className='myBtn' name='4'><NavLink to={'/movies/fourth'} className={obj=>obj.isActive?'active':'page-link'}>4</NavLink ></Button>
                        <Button className='myBtn' name='5'><NavLink to={'/movies/fifth'} className={obj=>obj.isActive?'active':'page-link'}>5</NavLink ></Button>
                        <Button className='myBtn' name='6'><NavLink to={'/movies/sixth'} className={obj=>obj.isActive?'active':'page-link'}>6</NavLink ></Button>
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
        moviData:state.info.movies
    }
 }
 
 const MoviesPage=connect(mapStateToProps)(IntMoviesPage);
 
 export default MoviesPage;
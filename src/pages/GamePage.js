import React, {useState, useEffect} from 'react';
import {useParams,  NavLink, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import {loadGames} from '../store/actionForReducer';
import Games from '../components/Games';
import './styles/ContantPage.css';


const IntGamePage=(props)=>{
    const [isLoad, setLoad]=useState(true);
    const params=useParams();
    let pageCount=params.page;
    const navigate=useNavigate();

    useEffect(()=>{
        fetch('https://server-production-5ca0.up.railway.app/api/games/?lang='+props.locale)
        .then(response=>response.json())
        .then(data=>{setLoad(false); props.dispatch(loadGames(data))})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

    let gameData;
    if(pageCount==='first'){
        gameData=props.gamesData.slice(0,4);
    }else if(pageCount==='second'){
        gameData=props.gamesData.slice(5,9);
    }else if(pageCount==='third'){
        gameData=props.gamesData.slice(10,14);
    }else if(pageCount==='fourth'){
        gameData=props.gamesData.slice(15,19);
    }else if(pageCount==='fifth'){
        gameData=props.gamesData.slice(20,24);
    }else if(pageCount==='sixth'){
        gameData=props.gamesData.slice(25,30);
    }
    
    const goToGame=(id)=>{
        navigate('/games/item/'+id);
    }

    return(
        <div>
            {isLoad?
            <Spinner animation="border" className='loadContant'/>:
            <div>
                <div className='contentAllPage'>
                {gameData.map(el=>{
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
                    <ButtonToolbar >
                    <ButtonGroup className="me-2" >
                        <Button className='myBtn' name='1'><NavLink to={'/games/first'} className={obj=>obj.isActive?'active':'page-link'}>1</NavLink ></Button> 
                        <Button className='myBtn'name='2'><NavLink to={'/games/second'} className={obj=>obj.isActive?'active':'page-link'}>2</NavLink ></Button> 
                        <Button className='myBtn'name='3'><NavLink to={'/games/third'} className={obj=>obj.isActive?'active':'page-link'}>3</NavLink ></Button>
                        <Button className='myBtn'name='4'><NavLink to={'/games/fourth'} className={obj=>obj.isActive?'active':'page-link'}>4</NavLink ></Button>
                        <Button className='myBtn'name='5'><NavLink to={'/games/fifth'} className={obj=>obj.isActive?'active':'page-link'}>5</NavLink ></Button>
                        <Button className='myBtn'name='6'><NavLink to={'/games/sixth'} className={obj=>obj.isActive?'active':'page-link'}>6</NavLink ></Button>
                    </ButtonGroup>
                </ButtonToolbar>
                    </div>
            </div>
            }
        </div>
    )
}

const mapStateToProps=(state)=>({
        locale:state.info.locale,
        gamesData:state.info.games
    })
 
 const GamePage=connect(mapStateToProps)(IntGamePage);
 
 export default GamePage;
import React, {useState, useEffect} from 'react';
import {useParams,  NavLink, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import Series from '../components/Series';
import {loadSeries} from '../redux/explainForReducer';


const IntSeriesPage=(props)=>{
    const [isLoad, setLoad]=useState(true);
    const params=useParams();
    let pageCount=params.page;
    const navigate=useNavigate();

    useEffect(()=>{
        fetch('http://localhost:5000/api/series/?lang='+props.locale)
        .then(response=>response.json())
        .then(data=>{setLoad(false); props.dispatch(loadSeries(data))})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[props.locale]);

    let seriesData;
    if(pageCount==='first'){
        seriesData=props.series.slice(0,4);
    }else if(pageCount==='second'){
        seriesData=props.series.slice(5,9);
    }else if(pageCount==='third'){
        seriesData=props.series.slice(10,14);
    }else if(pageCount==='fourth'){
        seriesData=props.series.slice(15,19);
    }else if(pageCount==='fifth'){
        seriesData=props.series.slice(20,24);
    }else if(pageCount==='sixth'){
        seriesData=props.series.slice(25,30);
    }
    
    const goToSeries=(id)=>{
        navigate('/series/item/'+id);
    }

    return(
        <div>
            {isLoad?
            <Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
            <div>
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap',justifyContent:'center', margin:'2% 5% 2% 5%'}}>
                {seriesData.map(el=>{
                     return <Series key={el.id}
                        id={el.id}
                        name={props.locale==='ru-RU'?el.nameru:el.nameen}
                        genre={props.locale==='ru-RU'?el.genreru:el.genreen}
                        numberofseas={el.numberofseas}
                        rate={el.rate}
                        url={el.url}
                        locale={props.locale}
                        goToSer={goToSeries}/>
                    })}
                    </div>
                    <div style={{margin:'0 auto 2% auto', position:'absolute', left:'40%',}}>
                    <ButtonToolbar >
                    <ButtonGroup className="me-2" style={{textDecoration:'none'}}>
                        <Button variant="dark" name='1'><NavLink to={'/series/first'} className={obj=>obj.isActive?'active':'page-link'}>1</NavLink ></Button> 
                        <Button variant="dark" name='2'><NavLink to={'/series/second'} className={obj=>obj.isActive?'active':'page-link'}>2</NavLink ></Button> 
                        <Button variant="dark" name='3'><NavLink to={'/series/third'} className={obj=>obj.isActive?'active':'page-link'}>3</NavLink ></Button>
                        <Button variant="dark" name='4'><NavLink to={'/series/fourth'} className={obj=>obj.isActive?'active':'page-link'}>4</NavLink ></Button>
                        <Button variant="dark" name='5'><NavLink to={'/series/fifth'} className={obj=>obj.isActive?'active':'page-link'}>5</NavLink ></Button>
                        <Button variant="dark" name='6'><NavLink to={'/series/sixth'} className={obj=>obj.isActive?'active':'page-link'}>6</NavLink ></Button>
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
        series:state.info.series
    }
 }
 
 const SeriesPage=connect(mapStateToProps)(IntSeriesPage);
 
 export default SeriesPage;
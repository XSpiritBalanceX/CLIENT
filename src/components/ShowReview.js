import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {useParams} from 'react-router-dom';
import {Form, Button, Spinner} from 'react-bootstrap';

const IntShowReview=(props)=>{

    const params=useParams();
    const idReview=params.id;
    function createMarkup(text) { return {__html: text}; };
    const [newComment, setNewComment]=useState('');
    const [isLoad, setLoad]=useState(false);
    const [oneReview, setOneReview]=useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/api/review/onereview?id=${idReview}`)
        .then(response=>response.json())
        .then(data=>{setOneReview(data); setLoad(true); })
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[idReview]); 
    
    let review=isLoad?oneReview.map(el=>{
     return <div key={el.id} className='showRev'>
        <div style={{marginRight:'5%'}}>
                <img src={el.namepict} alt={el.name} className='pict'/>
            </div>
            <div>
                <h3>{el.title}</h3>
                <h5>{el.name}</h5>
                <p><FormattedMessage id='authRev'/>: {el.nameuser}</p>
                <p>{el.date}</p>
                <p><FormattedMessage id='group'/>: {el.groupn}</p>
                <p><FormattedMessage id='revTags'/>{el.teg}</p>
                <p><FormattedMessage id='ratAuth'/>{el.rate} <i className="bi bi-star-fill"></i></p>
                <p dangerouslySetInnerHTML={createMarkup(el.text)} className='textReview'/>
            </div>
      </div>
    }):null;
    
    return(
        <div>
           {!isLoad?<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
    <React.Fragment>
          {review}
        <div className='comment'>
            <div>comment</div>
            {props.isLogin&&<div className='newComment'>
            <Form.Group className="mb-3 textar" controlId="exampleForm.ControlInput1">
                <Form.Label className="mb-3 "><FormattedMessage id='comment'/></Form.Label>
                <Form.Control as="textarea"  value={newComment} onChange={(event)=>setNewComment(event.target.value)}/>
            </Form.Group>
            <Button className='myBtn newComBut' size='sm' ><FormattedMessage id='send' /></Button>
            </div>}
        </div>
        </React.Fragment>
    } 
        </div>
        
        
        
    )
}

const mapStateToProps=(state)=>{
    return {
        isLogin:state.info.isLogin        
    }
}
 
const ShowReview=connect(mapStateToProps)(IntShowReview);
export default ShowReview;
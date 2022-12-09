/* function createMarkup() { return {__html: editorHtmlValue}; };

<div dangerouslySetInnerHTML={createMarkup()} /> */
import React, {useState, useEffect} from 'react';
import {Button,  } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';


const IntShowReview=(props)=>{
    const navigate=useNavigate();

    function createMarkup(text) { return {__html: text}; };

    
    return(
        <div className='showRev'>
            <div style={{marginRight:'5%'}}>
                <img src={props.infoReview.namepict} alt={props.infoReview.name} className='pict'/>
            </div>
            <div>
                <h3>{props.infoReview.title}</h3>
                <h5>{props.infoReview.name}</h5>
                <p>{props.infoReview.date}</p>
                <p><FormattedMessage id='group'/>: {props.infoReview.groupn}</p>
                <p><FormattedMessage id='revTags'/>{props.infoReview.teg}</p>
                <p><FormattedMessage id='ratAuth'/>{props.infoReview.rate}</p>
                <p dangerouslySetInnerHTML={createMarkup(props.infoReview.text)} className='textReview'/>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        infoReview:state.info.itemReview,        
    }
}
 
const ShowReview=connect(mapStateToProps)(IntShowReview);
export default ShowReview;
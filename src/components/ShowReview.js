import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {useParams} from 'react-router-dom';
import {Form, Button, Spinner, Modal} from 'react-bootstrap';
import 'animate.css';
import {useReactToPrint} from 'react-to-print';
import {Rating} from 'react-simple-star-rating';


const IntShowReview=(props)=>{

    const params=useParams();
    const idReview=params.id;
    function createMarkup(text) { return {__html: text}; };
    const [newComment, setNewComment]=useState('');
    const [isLoad, setLoad]=useState(false);
    const [oneReview, setOneReview]=useState([]);
    const [show, setShow] = useState(false);
    const [modalInfo, setModal]=useState('');
    const handleClose = () => setShow(false);
    const [allComments, setAllComments]=useState([]);
    const [isLoadComment, setLoadComment]=useState(false);
    const template=useRef();
    const [star, setStar]=useState(0);
    const [averageRating, setAverageRating]=useState(0);
    const [like, setLike]=useState(false);

    useEffect(()=>{
        fetch( `https://server-production-5ca0.up.railway.app/api/review/onereview?id=${idReview}` )
        .then(response=>response.json())
        .then(data=>{setOneReview(data.oneReview) ; setLoad(true);setAverageRating(data.getRating); })
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[idReview]); 

    let average=0;
    averageRating===0?average=0:averageRating.map(el=>{
        return average=average+el.value/averageRating.length
    });
    let sumLikes=0;
    averageRating===0?sumLikes=0:averageRating.map(el=>{
        return sumLikes=sumLikes+el.like
    }); 
    
    let nameReviewNow;
    let nameuser;
    let review=isLoad?oneReview.map(el=>{
        nameReviewNow=el.title;
        nameuser=el.nameuser;
     return <div key={el.id} className='showRev' ref={template}>
            <div className='floatDiv'>
               <img src={el.namepict} alt={el.name} className='pict'/> 
              <p><FormattedMessage id='ratReview'/>{averageRating.length===0?0:average.toFixed(1)} <i className="bi bi-star-fill"></i></p>
                <p>{sumLikes} <i className="bi bi bi-hand-thumbs-up"></i></p>
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
    

    const sendComment=async()=>{
        let sendInfo={
            namereview:nameReviewNow,
            useremail:props.useremail,
            text:newComment
        }
        const response=await fetch('https://server-production-5ca0.up.railway.app/api/review/comment',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(sendInfo)
          })
        const data=await response.json();
        setModal(data.message);
        setShow(true);
        setNewComment('');
    }

      useEffect(() => {
        const id = setInterval(() => {
          fetch('https://server-production-5ca0.up.railway.app/api/review/getcomments')
          .then(response=>response.json())
          .then(data=>setAllComments(data), setLoadComment(true))
          .catch(err=>console.log(err))       
        }, 4000);
        return () => {
          clearInterval(id);
        };
        // eslint-disable-next-line
      }, []);   

      let comments=allComments.length===0?<p>Нет комментариев</p>:
        allComments.map(el=>{
            return el.namereview===nameReviewNow?
                (<div key={el.id} className='oneComment animate__animated animate__backInLeft'>
                <p><i className="bi bi-person"></i> {el.nameuser}</p>
                <p>{el.text}</p>
                <p><i className="bi bi-clock"></i> {el.date}</p>
            </div>):null; 
        });

        const handlePrint=useReactToPrint({
            content:()=>template.current,
            documentTitle:'review',
        })

        const handleRating=async(rate)=>{
            setStar(rate)
            let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/setrating',{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({useremail:props.useremail, value:rate, namereview:nameReviewNow})
            });
            if(response.status!==200){
                setModal('Упс...Попробуй еще раз');
                setShow(true);
            }
            let data=await response.json();
            setModal(data.message);
            setShow(true);
        }

        const clickLike=async()=>{
            setLike(!like);
            let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/setrating',{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({useremail:props.useremail, like:!like, namereview:nameReviewNow})
            });
            if(response.status!==200){
                setModal('Упс...Попробуй еще раз');
                setShow(true);
            }
            let data=await response.json();
            setModal(data.message);
            setShow(true);
        }
 
    return(
        <div>
           {!isLoad?<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>:
    <React.Fragment>
        <Button className='myBtn newComBut' onClick={handlePrint}
              style={{marginTop:'3%', width:'auto', height:'auto'}} size='sm'>
                <i className="bi bi-download"></i> | <i className="bi bi-printer"></i>
              </Button>
          {review}
          {props.isLogin&& (props.nameUserNow!==nameuser)?<div className='starRating'>
            <p><FormattedMessage id='ratUser' /></p>
            <p>
             <Rating initialValue={star} onClick={handleRating}/>
            </p>
            <p>
                <FormattedMessage id='likeRev' />
                <Button className={like?'myBtn animate__animated animate__tada likeBtn':'myBtn '} style={{marginLeft:'1%'}} onClick={clickLike}>
                <i className={like?"bi bi-hand-thumbs-up-fill likeHand":"bi bi-hand-thumbs-up"}></i>
              </Button>
                
            </p>
          </div>:null}
        {isLoadComment&&<div className='comment'>
            <div>{comments}</div>
            {props.isLogin&&<div className='newComment'>
            <Form.Group className="mb-3 textar" controlId="exampleForm.ControlInput1">
                <Form.Label className="mb-3 labelForComment"><FormattedMessage id='comment'/></Form.Label>
                <Form.Control as="textarea"  value={newComment} onChange={(event)=>setNewComment(event.target.value)}/>
            </Form.Group>
            <Button className='myBtn newComBut' size='sm' onClick={sendComment}><FormattedMessage id='send' /></Button>
            </div>}
        </div>}
        </React.Fragment>
    } 

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>{modalInfo}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary"  onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
        
        
        
    )
}

const mapStateToProps=(state)=>{
    return {
        isLogin:state.info.isLogin,
        useremail: state.info.userEmail, 
        nameUserNow:state.info.nameUser     
    }
}
 
const ShowReview=connect(mapStateToProps)(IntShowReview);
export default ShowReview;
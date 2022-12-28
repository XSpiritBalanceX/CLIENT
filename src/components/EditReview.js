import React, {useState, useEffect} from 'react';
import {Button,  Form, Container, Card,  Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import {Typeahead} from 'react-bootstrap-typeahead';
import {useParams} from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Rating} from 'react-simple-star-rating';


const IntEditReview=(props)=>{

    const params=useParams();
    const idReview=params.id;
    const intl=useIntl();
    const [isLoad, setLoad]=useState(false);
    const [infoReview, setInfoReview]=useState([]);
    const [show, setShow] = useState(false);
    const [modalInfo, setModal]=useState('');
    const handleClose = () => setShow(false);
    const [pic, setPic] = useState('');
    const [text, setText]=useState('...');
    const [star, setStar]=useState(0);

    useEffect(()=>{
        fetch(`https://server-production-5ca0.up.railway.app/api/review/itemreview?id=${idReview}`)
        .then(response=>response.json())
        .then(data=>{setLoad(true);setInfoReview({title:data.title, name:data.name, 
            groupn:data.groupn, teg:[data.teg],url:data.namepict});setText(data.text); setStar(data.rate)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[idReview]); 

    const changeInfo=(event)=>{
        setInfoReview({...infoReview, [event.target.name]:event.target.value})
    }

    const handleChange = (e) => {
        setPic(e.target.files[0]);
    };

    const sendEditInfo=async()=>{
        const formData = new FormData();
        formData.append("id", idReview);
        formData.append("pic", pic);
        formData.append("title", infoReview.title);
        formData.append("groupn", infoReview.groupn);
        formData.append("teg", infoReview.teg);
        formData.append("rate", star);
        formData.append("text", text);
        let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/editreview',{
        method:'POST',
        body:formData
      })
      let data=await response.json();
      setModal(data.message);
      setShow(true);
    }
    const handleRating=(rate)=>{
      setStar(rate)
    }

    let options=props.locale==='en-US'?['Games', 'Movies', "Books", "Series"]:['Игры', 'Фильмы', "Книги", "Сериалы"]
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{height:'auto', margin:'2% auto 2% auto'}}>          
          {isLoad?<Card style={{width:600, border:'2px solid'}} className='p-5 contMain'>
            <h2 className="m-auto"><FormattedMessage id='editRev'/></h2>
            <Form className="d-flex flex-column"  onSubmit={sendEditInfo}>
            <Form.Control type="text" className="mt-3" name='title' onChange={(event)=>changeInfo(event)} 
                placeholder={intl.formatMessage({id:'revTitle'})} value={infoReview.title} />  
                <Form.Control type="text" className="mt-3" name='titleWo'  defaultValue={infoReview.name} disabled={true}/>  
                <Form.Control as="select" className="mt-3" value={infoReview.groupn} name='groupn' onChange={(event)=>changeInfo(event)}>
                    {options.map((el, index)=>{
                        return (<option key={index}>{el}</option>)
                    })}
                    </Form.Control>  
                <Typeahead className="mt-3 myMylti" 
                    id="basic-typeahead-multiple"
                    labelKey="name"
                    multiple 
                    onChange={(event)=>setInfoReview({...infoReview,teg:event})}
                    options={props.tags}
                    placeholder={intl.formatMessage({id:'tags'})}
                    selected={infoReview.teg}
                /> 
                <div style={{textAlign:'center', marginBottom:'2%'}}>
                  <p><FormattedMessage id='rate'/></p>
                  <Rating initialValue={star} onClick={handleRating} iconsCount={10} size={30}/> 
                </div>
                 <CKEditor 
                    editor={ ClassicEditor } 
                    data={text} 
                    onChange={( event, editor ) => {
                      const data = editor.getData();
                      setText(data)
                    }}
                  /> 
                <img alt={infoReview.name} src={infoReview.url} style={{width:'7em', height:'7em', marginTop:'2%'}}/> 
                <div className='mt-3'>
                {pic!==''?<FormattedMessage id='addPict'/>:<FormattedMessage id='rule'/>}               
              </div>        
              <div className='mt-3'>
                <label htmlFor='loadPic' className='labelMyInput'><FormattedMessage id='upload'/></label>
                 <input type={'file'} onChange={handleChange} id='loadPic' className='MyInput'/>
              </div>
              <div className=" d-flex  justify-content-end mt-3 pl-3 pr-3">
                <Button  variant="outline-dark" className='myBtn'  type='submit' ><FormattedMessage id='edit'/></Button>
              </div>    
            </Form>
          </Card>:null}

          <Modal show={show} onHide={handleClose}>
            <Modal.Body>{modalInfo}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"  onClick={handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
          </Container>
    )
}

 
const mapStateToProps=(state)=>{
    return {
        isLogin:state.info.isLogin,
        tags:state.info.alltags ,      
    }
}
 
const EditReview=connect(mapStateToProps)(IntEditReview);
export default EditReview;
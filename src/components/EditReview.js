import React, {useState, useEffect} from 'react';
import {Button,  Form, Container, Card,  Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import Editor from "./editor/Editor";
import {Typeahead} from 'react-bootstrap-typeahead';
import {useParams} from 'react-router-dom';


const IntEditReview=(props)=>{

    const params=useParams();
    const idReview=params.id;
    const intl=useIntl();
    const [isLoad, setLoad]=useState(false);
    const [infoReview, setInfoReview]=useState([]);
    const [show, setShow] = useState(false);
    const [modalInfo, setModal]=useState('');
    const handleClose = () => setShow(false);
    const initialMarkdownContent ='';
    const [editorHtmlValue, setEditorHtmlValue] = useState("");
    const onEditorContentChanged = (content) => {
      setEditorHtmlValue(content.html);
    };
    const [pic, setPic] = useState('');
    const [prevTitle, setPrevTitle]=useState('');

    useEffect(()=>{
        fetch(`http://localhost:5000/api/review/itemreview?id=${idReview}`)
        .then(response=>response.json())
        .then(data=>{setLoad(true);setInfoReview({title:data.title, name:data.name, rate:data.rate, 
            groupn:data.groupn, teg:[data.teg], text:data.text, url:data.namepict}); setPrevTitle(data.title)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[idReview]); 

    const changeInfo=(event)=>{
        setInfoReview({...infoReview, [event.target.name]:event.target.value})
    }

    const changeRat=(event)=>{
        if(Number(event.target.value)>10){
            setInfoReview({...infoReview, rate:0})
            setModal(<FormattedMessage id='errRat'/>)
            setShow(true);
           }else{   
            setInfoReview({...infoReview, rate:event.target.value}) 
           }  
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
        formData.append("rate", infoReview.rate);
        formData.append("text", editorHtmlValue);
        let response=await fetch('http://localhost:5000/api/review/editreview',{
        method:'POST',
        body:formData
      })
      let data=await response.json();
      setModal(data.message);
      setShow(true);
    }

    const testFunc=async()=>{
        let newresponse=await fetch('http://localhost:5000/api/review/changeTitle',{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({prevTitle, newTitle:infoReview.title})
      })
      let newData=await newresponse.json()
      console.log(newData)
    }

    let options=props.locale==='en-US'?['Games', 'Movies', "Books", "Series"]:['Игры', 'Фильмы', "Книги", "Сериалы"]
    function createMarkup(text) { return {__html: text}; };
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{height:'auto', margin:'2% auto 2% auto'}}>          
          {isLoad?<Card style={{width:600, border:'2px solid'}} className='p-5 contMain'>
            <h2 className="m-auto"><FormattedMessage id='editRev'/></h2>
            <Form className="d-flex flex-column" onSubmit={sendEditInfo}>
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
                <Form.Control type="number" min={0} max={10} maxLength="2" name='rate'  
                 className="mt-3" onChange={(event)=>changeRat(event)} placeholder={intl.formatMessage({id:'rate'})}  value={infoReview.rate}/>
                 <p dangerouslySetInnerHTML={createMarkup(infoReview.text)} className='textReview'></p>  
                <Editor style={{border:'red 1px solid'}}
                    value={initialMarkdownContent}
                    onChange={onEditorContentChanged}
                /> 
                <img alt={infoReview.name} src={infoReview.url} style={{width:'7em', height:'7em'}}/> 
                <div className='mt-3'>
                {pic!==''?<FormattedMessage id='addPict'/>:<FormattedMessage id='rule'/>}               
              </div>        
              <div className='mt-3'>
                <label htmlFor='loadPic' className='labelMyInput'><FormattedMessage id='upload'/></label>
                 <input type={'file'} onChange={handleChange} id='loadPic' className='MyInput'/>
              </div>
              <div className=" d-flex  justify-content-end mt-3 pl-3 pr-3">
                <Button  variant="outline-dark" className='myBtn' type='submit' onClick={testFunc}><FormattedMessage id='edit'/></Button>
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
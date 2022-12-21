import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button,  Form, Container, Card,  Modal, Spinner} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {Typeahead} from 'react-bootstrap-typeahead';
import Editor from "./editor/Editor";

const IntNewReview=(props)=>{

  const initialMarkdownContent ='';
  const [editorHtmlValue, setEditorHtmlValue] = useState("");
  const onEditorContentChanged = (content) => {
    setEditorHtmlValue(content.html);
  };
    let nameRev=props.nameItem===''?'':props.nameItem;
    const [isLoad, setLoad]=useState(false);
    const [title, setTitle]=useState('');
    const [titleWo, setTitleWo]=useState(nameRev);
    const [group, setGroupn]=useState([]);
    const [tags, setTags]=useState([]);
    const [rat, setRat]=useState(0);
    const [show, setShow] = useState(false);
    const [modalInfo, setModal]=useState('');
    const handleClose = () => setShow(false);
    const [dragEnter, setDragEnter]=useState(false);
    const [pic, setPic] = useState('');
    const [allTags, setallTags]=useState([]);
    const [initialTags, setInitial]=useState([])

    const intl=useIntl();

    const changeRat=(event)=>{
          if(Number(event.target.value)>10){
           setRat(0);
           setModal(<FormattedMessage id='errRat'/>)
           setShow(true);
          }else{            
            setRat(event.target.value)
          }               
    }
    let options=props.locale==='en-US'?['Games', 'Movies', "Books", "Series"]:['Игры', 'Фильмы', "Книги", "Сериалы"]

    const dragEnterHangler=(event)=>{
      event.preventDefault();
      event.stopPropagation();
      setDragEnter(true)
    }
    const dragLeaveHangler=(event)=>{
      event.preventDefault();
      event.stopPropagation();
      setDragEnter(false)
    }
    const dragOverHangler=(event)=>{
      event.preventDefault();
      event.stopPropagation();
      setDragEnter(true)
    }

    const dropHandler=(event)=>{
      event.preventDefault();
      event.stopPropagation();
      setPic(event.dataTransfer.files[0])      
      setDragEnter(false)
    }

    const handleChange = (e) => {
      setPic(e.target.files[0]);
    };
    
    
    const sendReview=async(event)=>{
      event.preventDefault();
      if(group.length===0 || title==='' ||titleWo==='' || 
        editorHtmlValue==='' || rat==='' || tags.length===0){
        setModal(<FormattedMessage id='errField'/>)
        setShow(true);
      } else{
        const formData = new FormData();
        formData.append("pic", pic);
        formData.append("title", title);
        formData.append("name", titleWo);
        formData.append("groupn", group);
        formData.append("teg", tags);
        formData.append("rate", rat);
        formData.append("text", editorHtmlValue);
        formData.append("useremail", props.useremail);
        let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/postpic',{
        method:'POST',
        body:formData
      })
      let data=await response.json()
      setModal(data.message);
      setShow(true);
      setTitle('');
      setTitleWo('');
      setTags([]);
      setGroupn([]);
      setEditorHtmlValue('');
      setRat('');
      }          
    }
    
    useEffect(()=>{
      fetch('https://server-production-5ca0.up.railway.app/api/review/gettags')
      .then(response=>response.json())
      .then(data=>{ setallTags(data);setInitial(data);setLoad(true)})
      .catch(err=>console.log(err))
    },[])

    const changeTags=(event)=>{
      let newAllTags=allTags.slice()
      newAllTags.push(event)
      setallTags(newAllTags) 
    }

    useEffect(()=>{
      setallTags([...initialTags].concat([...tags]));
      // eslint-disable-next-line
    },[tags]) 
    
    return(
      <React.Fragment>
        {isLoad?<Container className="d-flex justify-content-center align-items-center" style={{height:'auto', margin:'2% auto 2% auto'}}>          
          <Card style={{width:600, border:'2px solid'}} className='p-5 contMain'>
            <h2 className="m-auto"><FormattedMessage id='newRev'/></h2>
            <Form className="d-flex flex-column" onSubmit={sendReview}>
              <Form.Control type="text" className="mt-3" name='title' onChange={(event)=>setTitle(event.target.value)} 
                placeholder={intl.formatMessage({id:'revTitle'})} value={title} />
              <Form.Control type="text" className="mt-3" name='titleWo' onChange={(event)=>setTitleWo(event.target.value)} 
                placeholder={intl.formatMessage({id:'titleWo'})}  value={titleWo} disabled={props.nameItem===''?false:true}/>
              <Typeahead className="mt-3" 
                 id="basic-typeahead-single"
                    labelKey="nameGroup" 
                    onChange={(event)=>setGroupn(event)}
                    options={options}
                    placeholder={intl.formatMessage({id:'group'})}
                    selected={group}
                />
                <Typeahead className="mt-3 myMylti" 
                    id="basic-typeahead-multiple"
                    labelKey="nameTags"
                    multiple 
                    onInputChange={(event)=>changeTags(event)}
                    onChange={(event)=>{setTags(event);}}
                    options={allTags}
                    placeholder={intl.formatMessage({id:'tags'})}
                    selected={tags}
                />
              <Form.Control type="number" min={0} max={10} maxLength="2" name='rat'  
                 className="mt-3" onChange={(event)=>changeRat(event)} placeholder={intl.formatMessage({id:'rate'})}  value={rat}/>
              <Editor 
                value={initialMarkdownContent}
                onChange={onEditorContentChanged}
              />     
               <div className='mt-3'>
                {pic!==''?<FormattedMessage id='addPict'/>:<FormattedMessage id='rule'/>}               
              </div>        
              <div className='mt-3'>
                <label htmlFor='loadPic' className='labelMyInput'><FormattedMessage id='upload'/></label>
                 <input type={'file'} onChange={handleChange} id='loadPic' className='MyInput'/>
              </div>               
                <div className='MyPicture mt-3'  onDragEnter={dragEnterHangler} 
                onDragLeave={dragLeaveHangler} onDragOver={dragOverHangler} onDrop={dropHandler}>                  
                { dragEnter? <FormattedMessage id='drop'/>:<FormattedMessage id='drag'/>}
              </div>
              <div className=" d-flex  justify-content-end mt-3 pl-3 pr-3">
                <Button  variant="outline-dark" className='myBtn' type='submit'><FormattedMessage id='send'/></Button>
              </div>              
            </Form>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>{modalInfo}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"  onClick={handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
          </Container>:<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>}
          </React.Fragment>
    )
        
    
}

const mapStateToProps=(state)=>{
    return { 
        nameItem:state.info.nameReview ,
        locale:state.info.locale ,  
        tags:state.info.alltags ,
        useremail:state.info.userEmail
    }
 }
 
const NewReview=connect(mapStateToProps)(IntNewReview);
 
export default NewReview;
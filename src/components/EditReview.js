import React, {useState, useEffect} from 'react';
import {Button,  Form, Container, Card} from 'react-bootstrap';
import {connect} from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import {Typeahead} from 'react-bootstrap-typeahead';
import {useParams} from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Rating} from 'react-simple-star-rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const IntEditReview=(props)=>{

    const params=useParams();
    const idReview=params.id;
    const intl=useIntl();
    const [isLoad, setLoad]=useState(false);
    const [isLoadTags, setLoadTags]=useState(false);
    const [infoReview, setInfoReview]=useState([]);
    const [pic, setPic] = useState('');
    const [text, setText]=useState('...');
    const [star, setStar]=useState(0);
    const [allTags, setallTags]=useState([]);
    const [initialTags, setInitial]=useState([]);
    const [tags, setTags]=useState('');
    const [showPicture, setShowPicture]=useState('');

    useEffect(()=>{
      try{
        (async function(){
            let response=await fetch(`https://server-production-5ca0.up.railway.app/api/review/itemreview?id=${idReview}`);
            let data=await response.json();
            setLoad(true);
            setInfoReview({title:data.title, name:data.name, groupn:data.groupn});
            setPic(data.namepict);
            setTags(data.teg.split(','));
            setText(data.text); 
            setStar(data.rate);
        })()
      }catch(err){
        console.log(err)
      }
        // eslint-disable-next-line
    },[idReview]); 

    useEffect(()=>{
      try{
        (async function(){
            let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/gettags');
            let data=await response.json();
            setallTags(data);
            setInitial(data);
            setLoadTags(true);
        })()
      }catch(err){
        console.log(err)
      }
    },[])

    const changeInfo=(event)=>{
        setInfoReview({...infoReview, [event.target.name]:event.target.value})
    }

    const handleChange = (e) => {
        setPic(e.target.files[0]);
        let reader=new FileReader();
      reader.onloadend=()=>{
        setShowPicture(reader.result)
      }
      reader.readAsDataURL(e.target.files[0]);
    };

    const sendEditInfo=async()=>{
        const formData = new FormData();
        formData.append("id", idReview);
        formData.append("pic", pic);
        formData.append("title", infoReview.title);
        formData.append("groupn", infoReview.groupn);
        formData.append("teg", tags);
        formData.append("rate", star);
        formData.append("text", text);
        let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/editreview',{
        method:'POST',
        body:formData
      })
      let data=await response.json();
      toast.success(data.message);
    }
    const handleRating=(rate)=>{
      setStar(rate)
    }

    const changeTags=(event)=>{
      let newAllTags=allTags.slice()
      newAllTags.push(event)
      setallTags(newAllTags) 
    }

    useEffect(()=>{
      setallTags([...initialTags].concat([...tags]));
      // eslint-disable-next-line
    },[tags])

    const [dragEnter, setDragEnter]=useState(false);
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
      setPic(event.dataTransfer.files[0]);
      let reader=new FileReader();
      reader.onloadend=()=>{
        setShowPicture(reader.result)
      }
      reader.readAsDataURL(event.dataTransfer.files[0])      
      setDragEnter(false)
    }
   

    let options=props.locale==='en-US'?['Games', 'Movies', "Books", "Series"]:['Игры', 'Фильмы', "Книги", "Сериалы"]
    return(
        <Container className="d-flex justify-content-center align-items-center contanerForEdi" >          
          {isLoad&&isLoadTags?<Card  className='p-5 contMain cardNewR'>
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
                      labelKey="nameTags"
                      multiple 
                      onInputChange={(event)=>changeTags(event)}
                      onChange={(event)=>{setTags(event);}}
                      options={allTags}
                      selected={tags}
                    />     
                
                <div className='ratingDiv'>
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
                 {pic?<div className='mt-3'>
                <img src={showPicture || pic} alt={infoReview.title} className='imageInReviewForm'/>
                <Button className='btnForImage' onClick={()=>{setPic('')}}><i className="bi bi-x"></i></Button>
              </div>:null }        
              {pic===''?<React.Fragment><div className='mt-3'>
                <label htmlFor='loadPic' className='labelMyInput'><FormattedMessage id='upload'/></label>
                 <input type={'file'} onChange={handleChange} id='loadPic' className='MyInput'/>
              </div>              
                <div className='MyPicture mt-3'  onDragEnter={dragEnterHangler} 
                onDragLeave={dragLeaveHangler} onDragOver={dragOverHangler} onDrop={dropHandler}>                  
                { dragEnter?<div style={{textAlign:'center'}}><i className="bi bi-card-image pictDrag"></i><div><FormattedMessage id='drop'/></div></div>:<div style={{textAlign:'center'}}><i className="bi bi-card-image pictDrag"></i><div><FormattedMessage id='drag'/></div></div> }
              </div></React.Fragment>:null}

                
              <div className=" d-flex  justify-content-end mt-3 pl-3 pr-3">
                <Button  variant="outline-dark" className='myBtn'  type='submit' ><FormattedMessage id='edit'/></Button>
              </div>    
            </Form>
          </Card>:null}

          <ToastContainer position="top-center"
              autoClose={5000}/>
          </Container>
    )
}

 
const mapStateToProps=(state)=>({
        isLogin:state.service.isLogin      
    }
)
 
const EditReview=connect(mapStateToProps)(IntEditReview);
export default EditReview;
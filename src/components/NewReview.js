import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button,  Form, Container, Card, Spinner} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {Typeahead} from 'react-bootstrap-typeahead';
import {Rating} from 'react-simple-star-rating';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IntNewReview=(props)=>{

    let nameRev=props.nameItem===''?'':props.nameItem;
    const [isLoad, setLoad]=useState(false);
    const [title, setTitle]=useState('');
    const [titleWo, setTitleWo]=useState(nameRev);
    const [group, setGroupn]=useState([]);
    const [tags, setTags]=useState([]);
    const [dragEnter, setDragEnter]=useState(false);
    const [pic, setPic] = useState('');
    const [allTags, setallTags]=useState([]);
    const [initialTags, setInitial]=useState([]);
    const [everyBook, setBook]=useState([]);
    const [everyGame, setGame]=useState([]);
    const [everyMovie, setMovie]=useState([]);
    const [everySeries, setSeries]=useState([]);
    const [dataForTitleWork, setDataTitle]=useState([]);
    const [star, setStar]=useState(0);
    const [showPicture, setShowPicture]=useState('');
    const [text, setText]=useState('...');

    const intl=useIntl();

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
      setPic(event.dataTransfer.files[0]);
      let reader=new FileReader();
      reader.onloadend=()=>{
        setShowPicture(reader.result)
      }
      reader.readAsDataURL(event.dataTransfer.files[0])      
      setDragEnter(false)
    }

    const handleChange = (e) => {
      setPic(e.target.files[0]);
      let reader=new FileReader();
      reader.onloadend=()=>{
        setShowPicture(reader.result)
      }
      reader.readAsDataURL(e.target.files[0]);
    };
    
    
    const sendReview=async(event)=>{
      event.preventDefault();
      if(group.length===0 || title==='' ||titleWo==='' || 
        text==='' || text==='...' || tags.length===0){
        toast.error(<FormattedMessage id='errField'/>);
      } else{
        const formData = new FormData();
        formData.append("pic", pic);
        formData.append("title", title);
        formData.append("name", titleWo);
        formData.append("groupn", group);
        formData.append("teg", tags);
        formData.append("rate", star);
        formData.append("text", text);
        formData.append("useremail", props.useremail);
        let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/postpic',{
        method:'POST',
        body:formData
      })
      let data=await response.json()
      toast.info(data.message);
      setTitle('');
      setTitleWo('');
      setPic('')
      setTags([]);
      setGroupn([]);
      setText('...');
      setStar(0);
      }          
    }
    
    useEffect(()=>{
      fetch('https://server-production-5ca0.up.railway.app/api/review/gettags')
      .then(response=>response.json())
      .then(data=>{ setallTags(data);setInitial(data);setLoad(true)})
      .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
      fetch('https://server-production-5ca0.up.railway.app/api/review/getall/?lang='+props.locale)
      .then(response=>response.json())
      .then(data=>{setBook(data.everyBook); setGame(data.everyGame); setMovie(data.everyMovie); setSeries(data.everySeries)})
      .catch(err=>console.log(err))
      // eslint-disable-next-line
    },[props.locale])

    const changeTags=(event)=>{
      let newAllTags=allTags.slice()
      newAllTags.push(event)
      setallTags(newAllTags) 
    }

    useEffect(()=>{
      setallTags([...initialTags].concat([...tags]));
      // eslint-disable-next-line
    },[tags]) 

    
    let choiseTitle=group.includes('Games')||group.includes('Игры')?everyGame:
      group.includes('Books')||group.includes('Книги')?everyBook:
      group.includes('Movies')||group.includes('Фильмы')?everyMovie:
      group.includes('Series')||group.includes('Сериалы')?everySeries:[];
      
    useEffect(()=>{
      let newDataTitle=[]
      choiseTitle.forEach(el=>{newDataTitle.push(el.nameru || el.nameen)})
      setDataTitle(newDataTitle);
      // eslint-disable-next-line
    },[group])

    const handleRating=(rate)=>{
      setStar(rate)
    }
    
    return(
      <React.Fragment>
        {isLoad?<Container className="d-flex justify-content-center align-items-center" style={{height:'auto', margin:'2% auto 2% auto'}}>          
          <Card style={{width:600, border:'2px solid'}} className='p-5 contMain'>
            <h2 className="m-auto"><FormattedMessage id='newRev'/></h2>
            <Form className="d-flex flex-column" onSubmit={sendReview}>
              <Form.Control type="text" className="mt-3" name='title' onChange={(event)=>setTitle(event.target.value)} 
                placeholder={intl.formatMessage({id:'revTitle'})} value={title} />
              <Typeahead className="mt-3" 
                 id="basic-typeahead-single"
                    labelKey="nameGroup" 
                    onChange={(event)=>setGroupn(event)}
                    options={options}
                    placeholder={intl.formatMessage({id:'group'})}                    
                />
                
                 {props.nameItem!==''?<Form.Control type="text" className="mt-3" name='titleWo' onChange={(event)=>setTitleWo(event.target.value)} 
                  placeholder={intl.formatMessage({id:'titleWo'})}  value={titleWo} disabled={true}/>:
                  <div>
                    <Typeahead className="mt-3"
                      id="basic-typeahead-example" 
                      labelKey="nameTitleWprk" 
                      onChange={(event)=>setTitleWo(event)}
                      options={dataForTitleWork}
                      placeholder={intl.formatMessage({id:'titleWo'})}                    
                    />
                  </div>} 
                  
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
                <div style={{textAlign:'center', marginBottom:'2%'}}>
                  <p><FormattedMessage id='rate'/></p>
                  <Rating initialValue={star} onClick={handleRating} iconsCount={10} size={30}/> 
                </div>
                <CKEditor className='myEditorField'
                  editor={ ClassicEditor } 
                  data={text} 
                  onChange={( event, editor ) => {
                    const data = editor.getData();
                    setText(data)
                  }}
                />   
               <div className='mt-3'>
                {pic!==''?<FormattedMessage id='addPict'/>:<FormattedMessage id='rule'/>}               
              </div>
              {pic?<div>
                <img src={showPicture} alt={pic.name} style={{width:'13em', height:'10em'}}/>
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
                <Button  variant="outline-dark" className='myBtn' type='submit'><FormattedMessage id='send'/></Button>
              </div>              
            </Form>
          </Card>
          <ToastContainer position="top-center"
              autoClose={5000}/>
          </Container>:<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>}
          </React.Fragment>
    )
        
    
}

const mapStateToProps=(state)=>{
    return { 
        nameItem:state.info.nameReview ,
        locale:state.info.locale , 
        useremail:state.info.userEmail,
    }
 }
 
const NewReview=connect(mapStateToProps)(IntNewReview);
 
export default NewReview;
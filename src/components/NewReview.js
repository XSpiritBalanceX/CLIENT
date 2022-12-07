import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button,  Form, Container, Card, FloatingLabel} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


const IntNewReview=(props)=>{

    let nameRev=props.nameItem===''?'':props.nameItem;
    const [formRev, setFormRev]=useState({title:'',titleWo:nameRev,group:[],tags:[],rat:0, textRev:''})
    
    const intl=useIntl();

    const changeForm=(event)=>{
        if(event.target.name==='rat'){
            Number(event.target.value)>10?setFormRev({...formRev, rat:event.target.value}):setFormRev({...formRev, rat:0})
        }
        setFormRev({...formRev, [event.target.name]:event.target.value})
    }
    let options=props.locale==='en-US'?['Games', 'Movies', "Books", "Series"]:['Игры', 'Фильмы', "Книги", "Сериалы"]


    return(
        <Container className="d-flex justify-content-center align-items-center" style={{height:window.innerHeight-54}}>          
          <Card style={{width:600, border:'2px solid'}} className='p-5 contMain'>
            <h2 className="m-auto"><FormattedMessage id='newRev'/></h2>
            <Form className="d-flex flex-column">
              <Form.Control type="text" className="mt-3" name='title' onChange={changeForm} placeholder={intl.formatMessage({id:'revTitle'})} value={formRev.title} />
              <Form.Control type="text" className="mt-3" name='titleWo' onChange={changeForm} placeholder={intl.formatMessage({id:'titleWo'})} value={formRev.titleWo} disabled={props.nameItem===''?false:true}/>
              <Typeahead className="mt-3"
                 id="basic-typeahead-single"
                    labelKey="name"
                    onChange={(event)=>setFormRev({...formRev, group:event})}
                    options={options}
                    placeholder={intl.formatMessage({id:'group'})}
                    selected={formRev.group}
                />
                <Typeahead className="mt-3"
                    id="basic-typeahead-multiple"
                    labelKey="name"
                    multiple
                    onChange={(event)=>setFormRev({...formRev, tags:event})}
                    options={options}
                    placeholder={intl.formatMessage({id:'tags'})}
                    selected={formRev.tags}
                />
              <Form.Control type="text" min={0} max={10} maxLength="2" name='rat'  className="mt-3" onChange={changeForm} placeholder={intl.formatMessage({id:'rate'})}  value={formRev.rat}/>
              <FloatingLabel controlId="floatingTextarea2" label={intl.formatMessage({id:'text'})}>
              <Form.Control className="mt-2"
               as="textarea"
                style={{ height: '100px' }} value={formRev.textRev} name='textRev' onChange={changeForm}/>
             </FloatingLabel>
              <div className=" d-flex  justify-content-end mt-3 pl-3 pr-3">
                <Button   variant="outline-dark" className='myBtn'  ><FormattedMessage id='send'/></Button>
              </div>              
            </Form>
          </Card>
          </Container>
        
    )
        
    
}

const mapStateToProps=(state)=>{
    return { 
        nameItem:state.info.nameReview ,
        locale:state.info.locale ,    
    }
 }
 
const NewReview=connect(mapStateToProps)(IntNewReview);
 
export default NewReview;
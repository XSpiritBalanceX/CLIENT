import React, {useState} from 'react';
import {connect} from 'react-redux';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {Button, Modal, Form, Container, Card} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {loginUser} from '../redux/explainForReducer'


const IntAuthPage=(props)=>{
    const location=useLocation();
    const isLogin=location.pathname==='/login';
    const navigate=useNavigate();
    const intl=useIntl();

    const [form, setForm]=useState({email:'', password:''});
    const [formReg, setFormReg]=useState({name:'', email:'', password:''});
    const [show, setShow] = useState(false);
    const [modalInfo, setModal]=useState('');
    const handleClose = () => setShow(false);

    const changeLogin=(event)=>{
     setForm({...form, [event.target.name]:event.target.value})
    }
    const changeReg=(event)=>{
        setFormReg({...formReg, [event.target.name]:event.target.value})
    }

    const sendInfoToServer=async()=>{
      let data;
      try{
        if(isLogin){
          let response=await fetch('https://server-production-5ca0.up.railway.app/api/user/login',{method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'
            },
            body:JSON.stringify(form)})
            data=await response.json();
          if(data.isBlocked){
            props.dispatch(loginUser(false));
            navigate('/login');
            setModal(<FormattedMessage id='blocked'/>);
            setShow(true);
          }else{
            props.dispatch(loginUser(true, data.email, data.token, data.name));
            navigate('/mypage')
          }
          setForm({email:'', password:''}); 
        }else{
           let response=await fetch('https://server-production-5ca0.up.railway.app/api/user/registration' ,{method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'
            },
            body:JSON.stringify(formReg)})
            data=await response.json(); 
            setModal(data.message);
            setShow(true)
            data.token?navigate('/login'):navigate('/registration');
            setFormReg({name:'', email:'', password:''}) 
        }
        
      }catch(e){
        setForm({email:'', password:''})
        setFormReg({name:'', email:'', password:''})  
        setModal(e.response.data.message)
        setShow(true); 
      }
    }

    const googleAuth=()=>{
      window.open('https://server-production-5ca0.up.railway.app/auth/google', '_self')
    }

    const discordAuth=()=>{
      window.open( 'https://server-production-5ca0.up.railway.app/auth/discord' , '_self')
    }

    return(
        <div>
            <Container className="d-flex justify-content-center align-items-center" style={{height:window.innerHeight-54}}>          
          <Card style={{width:600, border:'2px solid'}} className='p-5 contMain'>
            <h2 className="m-auto">{isLogin?<FormattedMessage id='auth'/>:<FormattedMessage id='registr'/>}</h2>
            {isLogin?<Form className="d-flex flex-column">  
            <div className='buttForAut'>
              <Button variant="danger" style={{marginRight:'10px'}} onClick={googleAuth}><i className="bi bi-google"></i> Google</Button>
              <Button  style={{backgroundColor:'rgb(88,101,242)'}} onClick={discordAuth}><i className="bi bi-discord"></i> Discord</Button>
            </div>  
              <Form.Control type="email" className="mt-3" placeholder={intl.formatMessage({id:'enterEmail'})} value={form.email} name='email' onChange={changeLogin}/>
              <Form.Control type='password' className="mt-3" placeholder={intl.formatMessage({id:'enterPass'})} name='password' value={form.password} onChange={changeLogin}/>
              <div className=" d-flex  justify-content-between mt-3 pl-3 pr-3">
                <div > <FormattedMessage id='noAcc'/> <NavLink to='/registration'><FormattedMessage id='registr'/></NavLink></div>
                <Button   variant="outline-dark" className='myBtn'  onClick={()=>sendInfoToServer()}><FormattedMessage id='signIn'/></Button>
              </div>              
            </Form>:
            <Form className="d-flex flex-column">
              <Form.Control className="mt-3" placeholder={intl.formatMessage({id:'enterName'})} value={formReg.name} name='name' onChange={changeReg}/>
            <Form.Control className="mt-3" type="email" placeholder={intl.formatMessage({id:'enterEmail'})} value={formReg.email} name='email' onChange={changeReg}/>
            <Form.Control className="mt-3" type='password' placeholder={intl.formatMessage({id:'enterPass'})} value={formReg.password} name='password' onChange={changeReg}/>
            <div className=" d-flex  justify-content-between mt-3 pl-3 pr-3">
              <div ><FormattedMessage id='haveAcc'/>  <NavLink to='/login'><FormattedMessage id='signIn'/></NavLink></div>
              <Button  variant="outline-dark" className='myBtn' onClick={()=>sendInfoToServer()}><FormattedMessage id='signIn'/></Button>
            </div>              
          </Form>}
          </Card>
          </Container>

          <Modal show={show} onHide={handleClose}>
        <Modal.Body>{modalInfo}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='myBtn' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      isLogin:state.info.isLogin
    }
 }
 
 const AuthPage=connect(mapStateToProps)(IntAuthPage);
 
 export default AuthPage;
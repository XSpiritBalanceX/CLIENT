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
    const [formReg, setFormReg]=useState({nameReg:'', emailReg:'', passwordReg:''});
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
          let response=await fetch('http://localhost:5000/api/user/login',{method:'POST',
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
            props.dispatch(loginUser('yes', data.token));
            navigate('/mypage')
            setModal(<FormattedMessage id='blocked'/>);
            setShow(true);
          }
          setForm({email:'', password:''}); 
        }else{

        }
        
      }catch(e){
        setForm({email:'', password:''})
        setFormReg({nameReg:'', emailReg:'', passwordReg:''})  
        setModal(e.response.data.message)
        setShow(true); 
      }
    }


    return(
        <div>
            <Container className="d-flex justify-content-center align-items-center" style={{height:window.innerHeight-54}}>          
          <Card style={{width:600, border:'2px solid'}} className='p-5 contMain'>
            <h2 className="m-auto">{isLogin?<FormattedMessage id='auth'/>:<FormattedMessage id='registr'/>}</h2>
            {isLogin?<Form className="d-flex flex-column">
              <Form.Control type="email" className="mt-3" placeholder={intl.formatMessage({id:'enterEmail'})} value={form.email} name='email' onChange={changeLogin}/>
              <Form.Control type='password' className="mt-3" placeholder={intl.formatMessage({id:'enterPass'})} name='password' value={form.password} onChange={changeLogin}/>
              <div className=" d-flex  justify-content-between mt-3 pl-3 pr-3">
                <div > <FormattedMessage id='noAcc'/> <NavLink to='/registration'><FormattedMessage id='registr'/></NavLink></div>
                <Button   variant="outline-dark" className='myBtn'  onClick={()=>sendInfoToServer()}><FormattedMessage id='signIn'/></Button>
              </div>              
            </Form>:
            <Form className="d-flex flex-column">
              <Form.Control className="mt-3" placeholder={intl.formatMessage({id:'enterName'})} value={formReg.nameReg} name='nameReg' onChange={changeReg}/>
            <Form.Control className="mt-3" type="email" placeholder={intl.formatMessage({id:'enterEmail'})} value={formReg.emailReg} name='emailReg' onChange={changeReg}/>
            <Form.Control className="mt-3" type='password' placeholder={intl.formatMessage({id:'enterPass'})} value={formReg.passwordReg} name='passwordReg' onChange={changeReg}/>
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
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button,Form,Table,Spinner, Modal, Dropdown } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {useNavigate } from 'react-router-dom';
import Reviews from '../components/Reviews';


const IntMyPage=(props)=>{

    const [isLoad, setLoad]=useState(false);
    const [filter, setFilter]=useState('');
    const [allReview, setAllReview]=useState([]);
    const [addiDataReview, setAddiData]=useState([]);
    const intl=useIntl();
    const navigate=useNavigate();
    const [isToken, setToken]=useState(false);
    const [allLikes, setAllLikes]=useState([]);
    const [show, setShow] = useState(false);
    const [modalInfo, setModal]=useState('');
    const handleClose = () => setShow(false);
    
    
    useEffect(()=>{
       fetch('https://server-production-5ca0.up.railway.app/api/user/auth', {
        headers:{
          'Content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
      })
      .then(response=>response.json())
      .then(data=>{data.token?setToken(true):setToken(false)})
      .catch(err=>console.log(err)) 
      // eslint-disable-next-line
  },[]) 

    useEffect(()=>{
        if(isToken){
          fetch('https://server-production-5ca0.up.railway.app/api/review/userreview?useremail='+props.email)
          .then(response=>response.json())
          .then(data=>{setLoad(true); setAllReview(data.userReview);setAddiData(data.userReview);setAllLikes(data.allLikes)})
          .catch(err=>console.log(err))}
        // eslint-disable-next-line
    },[isToken])  

    const goToNewReview=()=>{
        navigate('/newreview')
    }
    
    const showR=(id)=>{
      let item=allReview.find(el=>el.id===id)
      navigate('/showReview/'+item.id)
    }

    const editReview=(id)=>{
      let item=allReview.find(el=>el.id===id)
      navigate('/editreview/'+item.id)
    }

    const deleteReview=async(id, title)=>{
      let newReview=allReview.filter(el=>el.id!==id)
      setAllReview(newReview)
       let response=await fetch('https://server-production-5ca0.up.railway.app/api/review/delete', {
        method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({id, title})
      })
      let data=await response.json();
      setModal(data.message)
      setShow(true);       
    }

    useEffect(()=>{
      let newReview;
      if(!filter){
        newReview=addiDataReview.slice()
      }else{
        newReview=addiDataReview.filter(el=>{
          return el.title.toLowerCase().includes(filter.toLowerCase())
        })
      }
      setAllReview(newReview)
      // eslint-disable-next-line
    },[filter]);

    let review=isLoad&&allReview.length===0?
       <tr>
        <td colSpan={6} style={{textAlign:'center'}}><FormattedMessage id='emptyTable' /></td>
      </tr>:
      allReview.map(el=>{
        return <Reviews key={el.id}
         id={el.id}
         nameRev={el.title}
         nameWork={el.name}
         date={el.date}
         cbShowRev={showR}
         cbEditReview={editReview}
         cbDeleteReview={deleteReview}
         />
      });

    let likes=isLoad?allLikes.reduce((acc,el)=> acc+el.like,0):null;

    const sortBy=(name)=>{
      let sortReview;
      if(name==='byTitle'){
        sortReview=allReview.slice().sort((a, b) => a.title > b.title ? 1 : -1)
      }else if(name==='byName'){
        sortReview=allReview.slice().sort((a, b) => a.name > b.name ? 1 : -1)
      }else if(name==='returnRev'){
        sortReview=addiDataReview.slice()
      }else if(name==='byDate'){
        sortReview=allReview.slice().sort((a, b) => a > b ? 1 : -1)
      }
      setAllReview(sortReview)
    }
    
    return(
        <div className='myPageContainer'>
            {isLoad? 
            <div>
              <p className='myPerson'><i className="bi bi-person"></i> {props.name}</p>
              <p className='myPerson'><i className="bi bi bi-hand-thumbs-up"></i>{likes}</p>
                <div className='contanForControl'>  
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                  <FormattedMessage id='sortRev'/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item name='byTitle' onClick={(event)=>sortBy(event.target.name)}>
                      <FormattedMessage id='byTitle'/>
                    </Dropdown.Item>
                    <Dropdown.Item name='byDate' onClick={(event)=>sortBy(event.target.name)}>
                      <FormattedMessage id='byDate'/>
                    </Dropdown.Item>
                    <Dropdown.Item name='byName' onClick={(event)=>sortBy(event.target.name)}>
                     <FormattedMessage id='byName'/>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item name='returnRev' onClick={(event)=>sortBy(event.target.name)}>
                     <FormattedMessage id='returnRev'/>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>             
                <Form.Control type="text" className="mt-1 "  style={{margin:'0 2% 0 2%'}}
                  placeholder={intl.formatMessage({id:'findRev'})}  
                  value={filter}  onChange={(event)=>{setFilter(event.target.value )}}  />  
                  <Button className='myBtn serch' size='sm' 
                    onClick={()=>goToNewReview()}><FormattedMessage id='newRev' /></Button> 
                </div>                
            <Table  className='myTable' >
      <thead>
        <tr>
          <th><FormattedMessage id='nameRev'/></th>
          <th><FormattedMessage id='titleWo'/></th>
          <th><FormattedMessage id='dateCrea'/></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       {review}       
      </tbody>
    </Table>

            <Modal show={show} onHide={handleClose}>
              <Modal.Body>{modalInfo}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary"  onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
            </div>:<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        locale:state.info.locale,
        email:state.info.userEmail, 
        name:state.info.nameUser       
    }
 }
 
const MyPage=connect(mapStateToProps)(IntMyPage);
 
export default MyPage;
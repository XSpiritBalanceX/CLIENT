import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button,Form,Table,Spinner, Dropdown } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {useNavigate } from 'react-router-dom';
import Reviews from '../components/Reviews';
import {addNameReview} from '../store/actionForReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/MyPage.css';


const IntMyPage=(props)=>{

    const [isLoad, setLoad]=useState(false);
    const [filter, setFilter]=useState('');
    const [allReview, setAllReview]=useState([]);
    const [addiDataReview, setAddiData]=useState([]);
    const intl=useIntl();
    const navigate=useNavigate();
    const [isToken, setToken]=useState(false);
    const [allLikes, setAllLikes]=useState([]);
    
    
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
      props.dispatch(addNameReview(''))
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
      if(response.status!==200){
        toast.error(<FormattedMessage id='errShow' />);
      }else{
        let data=await response.json();
        toast.success(data.message);  
      }       
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
        <td colSpan={6} className='emptyR' ><FormattedMessage id='emptyTable' /></td>
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
                <Form.Control type="text" className="mt-1 constrolFind" 
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

            <ToastContainer position="top-center"
              autoClose={5000}/>
            </div>:<Spinner animation="border" className='loadTable' />}
        </div>
    )
}

const mapStateToProps=(state)=>({
        locale:state.review.locale,
        email:state.service.userEmail, 
        name:state.service.nameUser       
    })
 
const MyPage=connect(mapStateToProps)(IntMyPage);
 
export default MyPage;
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button,Form,Table,Spinner  } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {useNavigate } from 'react-router-dom';
import Reviews from '../components/Reviews';


const IntMyPage=(props)=>{

    const [isLoad, setLoad]=useState(false);
    const [filter, setFilter]=useState('');
    const [allReview, setAllReview]=useState([]);
    const intl=useIntl();
    const navigate=useNavigate();


    useEffect(()=>{
        fetch('http://localhost:5000/api/review/userreview?useremail='+props.email)
        .then(response=>response.json())
        .then(data=>{setLoad(true); setAllReview(data)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[]) 

    const goToNewReview=()=>{
        navigate('/newreview')
    }
    
    const showR=(id)=>{
      let item=allReview.find(el=>el.id===id)
      navigate('/showReview/'+item.id)
    }

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
         edit={<FormattedMessage id='edit' />}
         show={<FormattedMessage id='show' />}
         delete={<FormattedMessage id='delete' />}
         cbShowRev={showR}
         />
      });

    
    return(
        <div className='myPageContainer'>
            {isLoad? 
            <div>
                <div className='contanForControl'>
                 <Button className='myBtn' size='sm'><FormattedMessage id='sortRev'/></Button>
                <Form.Control type="text" className="mt-1"  style={{margin:'0 2% 0 2%'}}
                  placeholder={intl.formatMessage({id:'findRev'})}  
                  value={filter} onChange={(event)=>setFilter(event.target.value)} />  
                  <Button className='myBtn' size='sm' 
                    onClick={()=>goToNewReview()}><FormattedMessage id='newRev' /></Button> 
                </div>                
            <Table striped className='myTable'>
      <thead>
        <tr>
          <th><FormattedMessage id='nameRev'/></th>
          <th><FormattedMessage id='titleWo'/></th>
          <th><FormattedMessage id='dateCrea'/></th>
          <th><FormattedMessage id='editRev'/></th>
          <th><FormattedMessage id='showRev'/></th>
          <th><FormattedMessage id='deletRev'/></th>
        </tr>
      </thead>
      <tbody>
       {review}       
      </tbody>
    </Table>
            </div>:<Spinner animation="border" style={{position:'absolute', top:'50%', left:'50%'}}/>}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        locale:state.info.locale,
        email:state.info.userEmail,        
    }
 }
 
const MyPage=connect(mapStateToProps)(IntMyPage);
 
export default MyPage;
import React from 'react';
import {ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { NavLink} from 'react-router-dom'

const Pagination=({ itemPerPage, totalItems, whereGo})=>{

    const pageNumbers=[];

    for(let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div>
            <ButtonToolbar >
                <ButtonGroup className="me-2 " >
                    {
                        pageNumbers.map(number=>{
                            return <Button key={number}  className='myBtn' name='1'><NavLink to={`/${whereGo}/${number}`} className={obj=>obj.isActive?'active':'page-link'}>{number}</NavLink ></Button> 
                        })
                    }
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    )

}

export default Pagination;
import { applyNextFetchPolicy } from '@apollo/client'
import { printIntrospectionSchema } from 'graphql'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AuthContext from '../context/authContext'

let Wrapper = styled.div``

export default function Header({onLogin}){
    let auth = useContext(AuthContext)
    let AuthButton;
    console.log(auth)
    if(auth.authData.token)
        AuthButton=()=>(<ul className="nav pull-right">
            <li onClick={()=>{auth.authData.setToken(null); window.location='/'}}><a>Logout</a></li>
        </ul> )
    else
        AuthButton=()=>(<ul className="nav pull-right">
            <li onClick={()=>{console.log(onLogin);onLogin()}}><a>Login</a></li>
        </ul> )
    return <>
    <div className="navbar" style={{
                position:'sticky',
                marginBottom:0,
                paddingBottom:20,
                backgroundColor:'#f2f2f2',
                zIndex:3,
                top:0}}>
        <div className="navbar-inner" style={{
                boxShadow: 'inset 2px -2px 5px rgba(0, 0, 0, 0.25), inset -2px 2px 5px #ffffff',
                background: '#efefef',}}>
            <div className="container">
        
               
                {/* <!-- Be sure to leave the brand out there if you want it shown --> */}
                <Link className="brand" to={'/'}>Words</Link>
                {/* <a className="brand" href="#">Words</a> */}
                {auth.authData.token && <ul className='nav'>
                    <li>
                        <Link to={'/dictionaries'}>Dictionaries</Link>
                    </li>
                </ul>}
                       <AuthButton/>
                <div className="nav-collapse collapse">
                </div>
        
            </div>
        </div>
    </div></>
}
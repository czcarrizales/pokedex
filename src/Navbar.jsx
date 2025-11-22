import React from 'react'
import {useState} from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar({navbartoken}) {
    return (
     <>
        <div className='navbar-main'>
            <Link to="/pokedex" className='nav-link'>Pokedex</Link>
            <Link to="/pokemon-quiz" className='nav-link'>Game Corner</Link>
            <Link to="/pokemon-selection" className='nav-link'>Mystery Pull</Link>
            <Link to="/profile" className='nav-link'>Profile</Link>
            <button className='navbar-button'>
                <Link to="/login">Login</Link>
            </button>
        </div>
        <div className = 'token'>
            <span className = 'count'> x{navbartoken} </span>
            <img src = "assets/Project3Token.png" alt = "token" className = 'tokenimage'/>
        </div>
     </>
    )
}

export default Navbar
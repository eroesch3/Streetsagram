import React, { Component } from 'react'
import { Link } from 'react-router-dom'






export class Nav extends Component {
  render() {
    return (
      

      <div className='nav--mainNav--containAllLinks'>
        <h1 className='logo--navLogo-takeToHomePage'><Link to='/Feed'>Streetstagram</Link></h1>
            <ul className='navList--links--takeToDifferentComponents'>
                <li><Link to='/LogIn'>Login</Link></li>
                <li><Link to='/Feed'>Return To Feed</Link></li>
            </ul>

           
        
      </div>
    )
  }
}

export default Nav

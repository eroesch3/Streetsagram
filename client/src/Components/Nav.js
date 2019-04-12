import React, { Component } from 'react'
import { Link } from 'react-router-dom'






export class Nav extends Component {
  render() {
    return (
      

      <div className='nav--mainNav--containAllLinks'>
        <h1 className='logo--navLogo-takeToHomePage'><Link to='/Feed'>Streetstagram</Link></h1>
            <ul className='navList--links--takeToDifferentComponents'>
                <li className='list--link--takeToLogin'><Link to='/LogIn'>Login</Link></li>
                <li className='list--link--takeToFeed'><Link to='/Feed'>Return To Feed</Link></li>
            </ul>

           
        
      </div>
    )
  }
}

export default Nav

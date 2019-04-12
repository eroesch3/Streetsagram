import React, { Component } from 'react'

export class Nav extends Component {
  render() {
    return (
      

      <div className='nav--mainNav--containAllLinks'>
        <h1 className='logo--navLogo-takeToHomePage'><a href=''>Streetstagram</a></h1>
            <ul className='navList--links--takeToDifferentComponents'>
                <li><a href='/login'>Login</a></li>
                <li><a href='/register'>Register</a></li>
                <li><a href='/feed'>Return To Feed</a></li>

            </ul>
        
      </div>
    )
  }
}

export default Nav

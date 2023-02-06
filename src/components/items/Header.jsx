import React from 'react'
import userIcon from '../../assets/images/avatar-img.png'


function Header({searchInputHandler, getUsersHandler, getProfileHandler, enterKeyEventHandler}) {
  return (
    <div className='heder-container'>
        <div className="search">
            <input type="text" placeholder="Search github users" onChange={searchInputHandler} onKeyUp={enterKeyEventHandler}/>
            <button onClick={getUsersHandler}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div className="profile" onClick={getProfileHandler}>
            <img src={userIcon} alt="Profle icon" width="50"/>
        </div>
    </div>
  )
}

export default Header
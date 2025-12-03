import React from 'react'
import Searchbar from './Searchbar'

const Header = ({addNew, title, buttonTitle, buttonDisabled = false}) => {

  return (
    <div className='flex justify-between items-center'>
    <div className='flex items-center gap-2 mb-3'>
      <h1 className='text-lg '>{title || 'Authors List'}</h1>
      <Searchbar />
    </div>
    <button 
      className={`${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main-dark'} mb-3 text-white rounded px-4 py-2`}
      onClick={() => {
        if (!buttonDisabled) {
          addNew()
        }
      }}
      disabled={buttonDisabled}
    >{buttonTitle || `Add New ${title.split(" ")[0]}`}</button>
   </div>
  )
}

export default Header
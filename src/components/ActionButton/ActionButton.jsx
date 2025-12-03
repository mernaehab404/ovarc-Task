import React from 'react'

const ActionButton = ({
    icon,
    action,
    disabled = false
}) => {
  return (
     <button
                  onClick={disabled ? undefined : action}
                  disabled={disabled}
                  className={`${disabled ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-main hover:bg-main-dark cursor-pointer'} grid place-items-center w-10 h-10`}
                >
                  
                  <img src={icon} alt="Action" className="w-4 h-4" />
                </button>
  )
}

export default ActionButton
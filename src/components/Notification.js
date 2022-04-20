import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch,useSelector } from "react-redux"

const Notification = (props) => {
  const message = useSelector(state => state.notification.notification)
  
//console.log('foo on', foo)

  if (message === null) {
    return null
  }

  

  return (
    <div className="error">
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string
}

export default Notification
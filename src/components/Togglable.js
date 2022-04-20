import React,{ useState,useImperativeHandle,forwardRef } from "react";
import PropTypes from 'prop-types'
const Togglable =React.forwardRef((props,ref) =>{
 const [visible,setVisible] =useState(props.visible?props.visible:false)

 const hidden = {display: visible? 'none':'' }
 const show = {display: visible? '' : 'none'}

 const toggle=()=>{
   setVisible(!visible)
 }

 const showWide =()=>{
   setVisible(true)
 }

 useImperativeHandle(ref, () =>{
   return { toggle, showWide }
 })

 return(
   <div className='TogglableDiv'>
     <div style={hidden}>
       <button onClick={toggle}>{props.buttonLabel}</button>
     </div>
     <div style={show} className='togglableContent'>
        {props.children}
        <button onClick={toggle}>{props.buttonLabel2?props.buttonLabel2:'cancel'}</button>
     </div>
   </div>
 )


})
Togglable.displayName = 'Togglable'

Togglable.propTypes={
  buttonLabel: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string
}


export default Togglable

import React from "react"
import {useStaticQuery, graphql } from 'gatsby'
import zonedIn from '../assets/images/zoned_in.svg'
import glasses from '../assets/images/glasses.svg'

const Doodle = ({name}) => {
  let images = {
    front: zonedIn,
    notes: glasses
  }
    
  return (
    <img
      src={images[name]}
      style={{ width: '100vw' }}
    />
  )
}

export default Doodle

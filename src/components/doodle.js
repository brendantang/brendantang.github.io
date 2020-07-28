import React from "react"
import zonedIn from '../assets/images/zoned_in.svg'
import glasses from '../assets/images/glasses.svg'

const Doodle = ({name}) => {
  let images = {
    front: { src: zonedIn, alt: "a messy line drawing of brendan on his laptop" },
    notes: { src: glasses, alt: "a messy line drawing of brendans glasses" }
  }
    
  return (
    <img
      alt={images[name].alt}
      src={images[name].src}
      style={{ width: '100vw' }}
    />
  )
}

export default Doodle

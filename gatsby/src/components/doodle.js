import React from "react"

const Doodle = ({ source, description }) => {
  return (
    <img
      alt={description}
      src={source}
      style={{ width: '100%' }}
    />
  )
}

export default Doodle

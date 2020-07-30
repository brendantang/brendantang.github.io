import React from "react"
import blockStyles from "../styles/block.module.css"
import Doodle from "./doodle"

const Block = ({ name, doodleSrc, doodleAlt, children }) => {
  let doodle = () => {
    if(doodleSrc != null) {
      return(
        <Doodle source={doodleSrc} description={doodleAlt} />
      )
    } else { return null }
  }

  let title = () => {
    if(name != null) {
      return(
        <div id={name}>
          <h1 className={blockStyles.blockTitle}>
            {name}
          </h1>
        <hr />
        </div>
      )
    } else { return null }
  }

  return(
    <section className={blockStyles.block}>
      <div className={blockStyles.blockContent}>
        { doodle() }
        { title() }
        { children }
      </div>
    </section>
  )
}

Block.defaultProps = { 
  name: null,
  doodleSrc: null,
  doodleAlt: "brendan has been bad and has not written a description of this line drawing"
}

export default Block

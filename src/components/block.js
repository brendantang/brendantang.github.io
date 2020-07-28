import React from "react"
import blockStyles from "../styles/block.module.css"
import Doodle from "./doodle"

const Block = ({name, children}) => {
  return(
    <main id={name} className={blockStyles.block}>
      <div className={blockStyles.blockContent}>
        <Doodle name={name} />
        { children }
      </div>
    </main>
  )
}

export default Block

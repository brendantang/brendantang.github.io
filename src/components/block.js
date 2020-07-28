import React from "react"
import blockStyles from "../styles/block.module.css"
import Doodle from "./doodle"

const Block = ({name, children}) => {
  return(
    <section className={blockStyles.block}>
      <div className={blockStyles.blockContent}>
        <Doodle name={name} />
        <h1 className={blockStyles.blockTitle}>{name}</h1>
        <hr />
        { children }
      </div>
    </section>
  )
}

export default Block

import React from "react"
//import { Link } from "gatsby"
import Menu from "./menu"

const Layout = ({ location, title, children }) => {
  //const rootPath = `${__PATH_PREFIX__}/`

  return (
    <main>
      {children}
    </main>
  )
}

export default Layout

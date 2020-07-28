import React from "react"
import { Link } from "gatsby"
import Menu from "./menu"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <div>
        <h1>
          {title}
        </h1>
        <Menu />
      </div>
    )
  } else {
    header = (
      <h1>
        <Link to={`/`}>
          {title}
        </Link>
      </h1>
    )
  }
  return (
    <div>
      <header>{header}</header>
      <main>{children}</main>
      <footer>
      </footer>
    </div>
  )
}

export default Layout

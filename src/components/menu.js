import React from "react"
import { Link } from "gatsby"
import style from "../styles/menu.module.css"

const Menu = () => {
  const items = [
    {
      name: 'notes',
      path: '/#notes'
    }, {
      name: 'about',
      path: '/#front'
    }, {
      name: 'code',
      path: '/code'
    }]

  let nav = []

  items.forEach((item) => {
    let element = (
      <li className={style.menu__item}>
        <Link to={item.path}>
          {item.name}
        </Link>
      </li>
    )
    nav.push(element)
  })

            
  return (
    <nav className={style.menu}>
      { nav }
    </nav>
  )
}

export default Menu

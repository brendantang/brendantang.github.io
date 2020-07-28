import React from "react"
import { Link, graphql } from "gatsby"

import Doodle from "../components/doodle"
import SEO from "../components/seo"

import style from "../styles/home.module.css"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <main className={style.wrapper}>
      <SEO title="home" />
      <section className={style.block}>
        <Doodle name="front"/>
      </section>
      <section className={style.block}>
        <Doodle name="notes"/>
      </section>

    </main>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

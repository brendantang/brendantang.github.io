import React from "react"
import { Link, graphql } from "gatsby"

import Doodle from "../components/doodle"
import SEO from "../components/seo"
import NotesIndex from "../components/notes_index.js"

import style from "../styles/home.module.css"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const notes = data.allMarkdownRemark.edges

  return (
    <main className={style.wrapper}>
      <SEO title="home" />
      <section className={style.block}>
        <Doodle name="front"/>
      </section>
      <section className={style.block}>
        <div className={style.blockSection}>
          <Doodle name="notes"/>
          <NotesIndex notes={notes} />
        </div>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

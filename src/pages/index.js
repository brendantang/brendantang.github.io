import React from "react"
import { graphql } from "gatsby"

import Block from "../components/block"
import SEO from "../components/seo"
import NotesIndex from "../components/notes_index"
import Layout from "../components/layout"

import blockStyles from "../styles/block.module.css"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const notes = data.allMarkdownRemark.edges

  return (
    <Layout>
      <div className={blockStyles.blockWrapper}>
        <SEO title={siteTitle} />
        <Block name="front" />
        <Block name="notes">
          <NotesIndex notes={notes} />
        </Block>
      </div>
    </Layout>
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

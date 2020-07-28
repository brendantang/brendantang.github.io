import React from "react"
import { Link } from "gatsby"

import noteStyle from "../styles/note.module.css"

const NotesIndex = ({ notes }) => {
  const posts = notes 

  return (
    <div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h1>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h1>
              <h2>{node.frontmatter.date}</h2>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </div>
  )
}

export default NotesIndex 


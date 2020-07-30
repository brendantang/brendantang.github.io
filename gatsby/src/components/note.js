import React from 'react'

import noteStyle from '../styles/note.module.css'

const Note = ({ note }) => {
  return(
    <article>
      <header className={noteStyle.header}>
        <h1 className={noteStyle.title}>
          {note.frontmatter.title}
        </h1>
        <h2 className={noteStyle.date}>
          {note.frontmatter.date}
        </h2>
      </header>
      <section dangerouslySetInnerHTML={{ __html: note.html }} />
    </article>
  )
}

export default Note

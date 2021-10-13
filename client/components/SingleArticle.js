import React from 'react'

export function SingleArticle(props) {
  const article = props.article
  return(
    <div>
      <a href={article.article.url}> {article.name} </a>
    </div>
  )
}

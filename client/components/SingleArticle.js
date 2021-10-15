import React from 'react'

export function SingleArticle(props) {
  const article = props.article
  const taggings = article.taggings
 
  return(
    <div>
      <a href={article.article.url}> {article.name} </a>
      {taggings.map((tagging) => (
        <span key={tagging.tag.id}>{tagging.tag.name}</span>
        ))}
    </div>
  )
}

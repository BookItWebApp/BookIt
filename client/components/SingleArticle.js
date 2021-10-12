import React, {useEffect} from "react";
import { useDispatch} from "react-redux";
import {previewArticle} from '../store/SingleArticle'


export function SingleArticle(props) {
  const articleurl = props.article.article.url;
  // const [metaData, setMetaData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(previewArticle(articleurl)
  )},[dispatch])


  return ((<div>Hello</div>))
}

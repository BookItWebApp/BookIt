import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTab } from "../store/tab";
import { getTags } from "../store/tag";

export default () => {
  //In Order: supplies URL, User info, and Tag info
  const tab = useSelector((state) => state.tab);
  const user = useSelector((state)=> state.auth)
  const tags = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    //Current extension retrieves ALL tags instead of user Tags
    dispatch(getTags())
    dispatch(fetchTab());
  }, [dispatch]);

  const indivTags = []
  tags.map((tags)=> {indivTags.push(tags.tag.name)})

  return (
    //new article is submitted to DB based on simple form POST submission direct to URL
    <div>
      <form
        name="urlPOST"
        action="http://localhost:8080/api/articles/"
        method="POST"
        target="_self"
      >
        <label htmlFor="url">URL</label>
        <input type="url" type="text" name="url" value={tab.url} />
        <label htmlFor="tags">Tags</label>
        <input
          type="tags"
          type="text"
          name="tags"
          value={indivTags}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

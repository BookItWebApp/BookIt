import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTab } from "../store/tab";
import { getTags } from "../store/tag";

export default () => {
  const tab = useSelector((state) => state.tab);
  const tags = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTab());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const indivTags = []
  tags.map((tags)=> {indivTags.push(tags.tag.name)})

  return (
    <div>
      {/* <label htmlFor="urlPOST">URL</label> */}
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

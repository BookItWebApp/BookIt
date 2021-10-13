import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTab } from "../store/tab";
import { getTags } from "../store/tag";

export default () => {
  const tab = useSelector((state) => state.tab);
  const tags = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getTags)
    await dispatch(fetchTab());
  }, [dispatch]);

  return (
    <div>
      <div>{tags}</div>
      <label htmlFor="url">URL</label>
      <form
        name="url"
        action="http://localhost:8080/api/articles/"
        method="POST"
        target="_self"
      >
        <input type="url" type="text" name="url" value={tab.url}></input>
        <input type="submit" />
      </form>
    </div>
  );
};

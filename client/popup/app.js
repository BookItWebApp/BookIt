import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/chromeUser";
import { fetchTab } from "../store/tab";

export default () => {
  const tab = useSelector((state) => state.tab);
  const user = useSelector((state) => state.chromeUser);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(fetchTab());
    dispatch(fetchUser());
    console.log(user);
  }, [dispatch]);

  return (
    <div>
      <p>Your Email: {user.email}</p>
      <label for="url">URL</label>
      <input name="url" type="text" value={tab.url}></input>
    </div>
  );
};

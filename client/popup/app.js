import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTab } from '../store/tab'

export default () => {
  const tab = useSelector(state => state.tab)
  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(fetchTab())
  }, [dispatch])

  return (
    <div>
      <label for="url">URL</label>
      <input name="url" type="text" value={tab.url}></input>

    </div>
  )
}

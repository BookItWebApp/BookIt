import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';

export function Calendar() {
  const userArticles = useSelector((state) => state.userArticles);

  function displayYear(
    data,
    year = null,
    month_lines = true,
    fig = null,
    row = null) {

      if (year === null) {
        const today = new Date()
        const year = today.getFullYear()
      }

      const d1 = new Date(year, 1,1)
      const d2 = new Date(year, 12,31)

      const delta = d2-d1

      const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month_days =   [31,    28,    31,     30,    31,     30,    31,    31,    30,    31,    30,    31]

      const dates_in_year = [d1 + datetime.timedelta(i) for i in range(delta.days+1)] #gives me a list with datetimes for each day a year
    }





}


import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from './Calendar';
import { Indicator } from './indicator';
import { TagRatio } from './TagReadUnreadRatio';
import { TimeChart } from './TimeChart';
import { TagReadUnread } from './TagReadUnreadRatio';
import { BasicMetrics } from './BasicStats';

export function UserMetrics() {
  return (
    <div>
      <div className="dv-header">
        <h4>Here Are Your Latest User Metrics</h4>
        <p>Visualize Your Reading Habits</p>
      </div>
      <div align="center">
        <Indicator />
      </div>
      <div align="center">
        <div className="dataviz-box">
          <h4 className="dvSectionHeader"> Overview of Your Backlog</h4>
          <BasicMetrics />
          <div align="center" className="dataviz-row-backlog">
            <TimeChart />
            <TagReadUnread />
          </div>
        </div>
      </div>
      <div align="center">
        <div className="dataviz-box">
          <h4 className="dvSectionHeader">
            {' '}
            Reading Activity Over The Last Year
          </h4>
          <Calendar />
        </div>
      </div>
    </div>
  );
}

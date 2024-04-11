import React from 'react';
import { ILesson } from './Schedule';
import Lesson from './Lesson';

type Props = {};

const ScheduleCell = ({}: Props) => {
  return (
    <div className='w-16 h-16 flex relative items-center border-b border-r border-slate-200 last:border-r-0'></div>
  );
};

export default ScheduleCell;

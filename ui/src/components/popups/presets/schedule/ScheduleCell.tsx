import React from 'react';
import { ILesson } from './Schedule';
import Lesson from './Lesson';

type Props = {
  mouseEnterHandler(e: React.MouseEvent<HTMLDivElement>): void;
  mouseLeaveHandler(e: React.MouseEvent<HTMLDivElement>): void;
  mouseMoveHandler(e: React.MouseEvent<HTMLDivElement>, index: number): void;
  onMouseEnterLesson(): void;
  rowIndex: number;
  cellIndex: number;
  lesson: ILesson | undefined;
};

const ScheduleCell = ({
  mouseEnterHandler,
  mouseLeaveHandler,
  mouseMoveHandler,
  cellIndex,
  rowIndex,
  lesson,
  onMouseEnterLesson,
}: Props) => {
  return (
    <div
      className='w-16 h-16 flex relative items-center border-b border-r border-slate-200 last:border-r-0'
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={(e) => mouseMoveHandler(e, cellIndex + 6)}
    >
      {lesson && (
        <Lesson lessonData={lesson} onMouseEnterLesson={onMouseEnterLesson} />
      )}
    </div>
  );
};

export default ScheduleCell;

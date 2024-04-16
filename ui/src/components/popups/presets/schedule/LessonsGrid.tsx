import React from 'react';
import { ILesson } from './Schedule';
import Lesson from './Lesson';

type Props = {
  gridSize: number;
  startHour: number;
  hoursCount: number;
  days: number[];
  daysNames: string[];
  lessons: ILesson[];
  onLessonChange(newLesson: ILesson): void;
  boardRef: React.RefObject<HTMLDivElement>;
  onLessonSelect(id: string): void;
  selectedLessonID: string | null;
};

const LessonsGrid = ({
  lessons,
  gridSize,
  hoursCount,
  days,
  daysNames,
  startHour,
  onLessonChange,
  boardRef,
  onLessonSelect,
  selectedLessonID,
}: Props) => {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${hoursCount * 4}, ${gridSize / 4}px)`,
        gridTemplateRows: `repeat(${days.length}, ${gridSize}px)`,
      }}
      className='absolute grid w-full h-full'
    >
      {lessons.map((lesson) => (
        <Lesson
          boardData={{
            timeRangeFrom: startHour,
            hours: hoursCount,
            gridSize: gridSize,
            days: days,
            daysNames: daysNames,
            ref: boardRef,
          }}
          key={lesson.id}
          lessonData={lesson}
          onLessonChange={onLessonChange}
          onLessonSelect={onLessonSelect}
          isSelected={lesson.id === selectedLessonID}
        />
      ))}
    </div>
  );
};

export default LessonsGrid;

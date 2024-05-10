import React, { useMemo, useRef, useState } from 'react';
import { ILesson } from '../Schedule';
import Lesson from '../lesson/Lesson';
import { Duration } from 'luxon';
import getLessonTimeString from '../../../../../utils/schedule/getLessonTimeString';

type Props = {
  gridSize: number;
  startHour: number;
  hoursCount: number;
  days: number[];
  daysNames: string[];
  lessons: ILesson[];
  onLessonChange(newLesson: ILesson): void;
  boardRef: React.RefObject<HTMLDivElement>;
  onLessonSelect(id: string | null, side?: 'right' | 'left'): void;
  selectedLessonID: string | null;
  onLessonCreate(day: number, hour: number, minute: number): void;
};

interface ILessonXY {
  x: number;
  y: number;
}

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
  onLessonCreate,
}: Props) => {
  const [newLessonPos, setNewLessonPos] = useState<null | ILessonXY>(null);
  const [isLessonHovered, setIsLessonHovered] = useState(false);
  const [newLessonTime, setNewLessonTime] = useState({
    day: '',
    time: '',
  });
  const gridRef = useRef<HTMLDivElement>(null);
  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLessonHovered || selectedLessonID) {
      if (newLessonPos) setNewLessonPos(null);
      return;
    }

    const boardX = gridRef.current?.getBoundingClientRect().x;
    const boardY = gridRef.current?.getBoundingClientRect().y;

    if (boardX && boardY) {
      const x = Math.floor((e.nativeEvent.clientX - boardX) / (gridSize / 4));
      const y = Math.floor((e.nativeEvent.clientY - boardY) / gridSize) + 1;
      setTimeLabel(x - 1, y - 1);
      setNewLessonPos({
        x,
        y,
      });
    }
  };

  const mouseLeaveHandler = () => {
    setNewLessonPos(null);
  };

  const setTimeLabel = (x: number, y: number) => {
    setNewLessonTime({
      day: daysNames[days[y]],
      time: getLessonTimeString(startHour, x * 15, 1 * 60),
    });
  };

  const newLessonClickHandler = () => {
    if (!newLessonPos) return;

    const time = Duration.fromObject({
      hours: startHour,
      minutes: (newLessonPos.x - 1) * 15,
    }).normalize();

    if (newLessonPos)
      onLessonCreate(newLessonPos.y - 1, time.hours, time.minutes);

    setNewLessonPos(null);
  };

  const gridClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === gridRef.current && selectedLessonID) {
      onLessonSelect(null);
    }
  };

  const LessonList = useMemo(
    () => (
      <>
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
            onLessonMouseEnter={() => setIsLessonHovered(true)}
            onLessonMouseLeave={() => setIsLessonHovered(false)}
          />
        ))}
      </>
    ),
    [
      startHour,
      hoursCount,
      gridSize,
      days,
      daysNames,
      boardRef,
      selectedLessonID,
      lessons,
    ]
  );

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${hoursCount * 4}, ${gridSize / 4}px)`,
        gridTemplateRows: `repeat(${days.length}, ${gridSize}px)`,
      }}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
      className='absolute grid w-full h-full z-50'
      ref={gridRef}
      onClick={gridClickHandler}
    >
      {LessonList}
      {newLessonPos && (
        <div
          style={{
            gridColumnStart: newLessonPos.x,
            gridColumnEnd: newLessonPos.x + 4,
            gridRowStart: newLessonPos.y,
          }}
          className='h-full p-0.5 relative flex justify-center items-start opacity-65'
          onClick={newLessonClickHandler}
        >
          <div className='transition-opacity p-0.5 rounded-md w-auto h-6 absolute text-center bottom-2 z-30 text-sm text-nowrap text-slate-400 leading-none'>
            {newLessonTime.day}
            <br />
            {newLessonTime.time}
          </div>

          <div className='transition-all cursor-pointer relative w-full h-full overflow-clip bg-white border border-indigo-100 shadow-sm shadow-indigo-100 rounded-md flex justify-center items-start text-center'>
            <span
              style={{
                wordBreak: 'break-word',
              }}
              className='px-1 text-slate-600 mt-2'
            >
              Новый урок
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsGrid;

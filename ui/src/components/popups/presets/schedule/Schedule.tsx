import React, { createElement, useEffect, useRef, useState } from 'react';
import classes from './Schedule.module.css';
import Students from '../Students';
import ScheduleCell from './ScheduleCell';
import Lesson from './Lesson';

type Props = {};
export interface ILesson {
  id: string;
  studentID: string;
  studentName: string;
  day: number;
  hour: number;
  minute: number;
  duration: number;
}
const lessonsEx: ILesson[] = [
  {
    id: '1',
    studentID: '2323',
    studentName: 'Владик 6 класс',
    day: 3,
    hour: 7,
    minute: 0,
    duration: 3,
  },
  {
    id: '2',
    studentID: '2323',
    studentName: 'Владиславовичмнбек 1 класс',
    day: 3,
    hour: 11,
    minute: 0,
    duration: 1.5,
  },
];

const GRID_SIZE = 64;
const TIME_RANGE_FROM = 10;
const HOURS = 11;
const DAYS = [0, 1, 2, 3, 4, 5];
const DAYS_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const Schedule = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lessons, setLessons] = useState<ILesson[]>(
    lessonsEx.filter((lesson) => {
      if (
        lesson.hour > TIME_RANGE_FROM &&
        lesson.hour + lesson.duration <= TIME_RANGE_FROM + HOURS
      ) {
        return true;
      }
      return false;
    })
  );
  const [phantomLesson, setPhantomLesson] = useState<HTMLDivElement>();

  const onLessonChanged = (newLessonData: ILesson) => {
    setLessons((prev) => {
      return prev.map((lesson) => {
        if (lesson.id === newLessonData.id) {
          return newLessonData;
        }
        return lesson;
      });
    });
  };

  const scrollHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    if (e.deltaY > 0) {
      ref.current.scrollLeft -= GRID_SIZE;
    } else {
      ref.current.scrollLeft += GRID_SIZE;
    }
  };

  return (
    <div className='w-full h-full p-4 mt-2 z-10'>
      <div
        className='w-full h-full flex'
        onWheel={scrollHandler}
        // onMouseMove={console.log}
      >
        <div className='mt-9 *:flex *:items-center mr-2 *:text-slate-600'>
          {DAYS.map((dayCode) => (
            <div key={dayCode} style={{ height: GRID_SIZE }}>
              {DAYS_NAMES[dayCode]}
            </div>
          ))}
        </div>
        <div
          ref={ref}
          className='relative overflow-x-auto overflow-y-hidden pb-6 pl-1'
        >
          <div
            style={{ gridTemplateColumns: `repeat(${HOURS}, ${GRID_SIZE}px)` }}
            className={classes.timeRow + ' *:border-b border-slate-200'}
          >
            {new Array(HOURS).fill(0).map((_, i) => (
              <div
                key={i}
                style={{ width: GRID_SIZE }}
                className={classes.time}
              >
                <div className='mb-5 -ml-1 absolute text-slate-600'>
                  {i + TIME_RANGE_FROM + ':00'}
                </div>
                <div className={classes.hourMark}></div>
                <div className={classes.quarterMark}></div>
                <div className={classes.halfMark}></div>
                <div className={classes.quarterMark}></div>
                <div></div>
              </div>
            ))}
          </div>

          <div className='relative'>
            <div
              style={{
                gridTemplateColumns: `repeat(${HOURS * 4}, ${GRID_SIZE / 4}px)`,
                gridTemplateRows: `repeat(${DAYS.length}, ${GRID_SIZE}px)`,
              }}
              className={classes.layerGrid + ' w-full h-full'}
            >
              {lessons.map((lesson) => (
                <Lesson
                  boardData={{
                    timeRangeFrom: TIME_RANGE_FROM,
                    hours: HOURS,
                    gridSize: GRID_SIZE,
                    days: DAYS,
                    daysNames: DAYS_NAMES,
                    ref,
                  }}
                  key={lesson.id}
                  lessonData={lesson}
                  onLessonChanged={onLessonChanged}
                />
              ))}
            </div>
            {/* Рисуем таблицу */}
            <div
              style={{
                gridTemplateColumns: `repeat(${HOURS}, ${GRID_SIZE}px)`,
                gridTemplateRows: `repeat(${DAYS.length}, ${GRID_SIZE}px)`,
              }}
              className='grid w-fit h-fit border-l border-slate-200'
            >
              {new Array(DAYS.length * HOURS).fill(0).map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  // style={{ height: GRID_SIZE, width: GRID_SIZE }}
                  className='w-full h-full flex relative items-center border-b border-r border-slate-200'
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

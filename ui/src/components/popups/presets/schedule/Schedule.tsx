import React, { createElement, useEffect, useRef, useState } from 'react';
import classes from './Schedule.module.css';
import Students from '../Students';
import Lesson from './Lesson';
import VisualGrid from './VisualGrid';
import LessonsGrid from './LessonsGrid';
import ButtonPrimary from '../../../uiKit/buttons/ButtonPrimary';
import { TbUserCircle } from 'react-icons/tb';
import StudentInfo from '../StudentInfo';
import LessonDetails from './LessonDetails';

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
    day: 5,
    hour: 15,
    minute: 0,
    duration: 3,
  },
  {
    id: '2',
    studentID: '2323',
    studentName: 'ОченьДлинноеИмя 11 класс',
    day: 3,
    hour: 11,
    minute: 0,
    duration: 1.5,
  },
];

const GRID_SIZE = 80;
const TIME_RANGE_FROM = 10;
const HOURS = 12;
const DAYS = [0, 1, 2, 3, 4, 5, 6];
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

  const [selectedLessonID, setSelectedLessonID] = useState<null | string>(null);

  const onLessonChange = (newLessonData: ILesson) => {
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

  const onLessonSelect = (id: string) => {
    if (id === selectedLessonID) {
      setSelectedLessonID(null);
    } else {
      setSelectedLessonID(id);
    }
  };

  return (
    <div className='w-full h-full p-4 z-10 flex'>
      <div
        className='h-full flex relative xl:min-w-screen-md 2xl:min-w-screen-lg lg:min-w-96 md:min-w-52 min-w-0'
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
          className='relative overflow-x-auto overflow-y-hidden pb-6 pr-6 pl-1'
        >
          <div
            style={{ gridTemplateColumns: `repeat(${HOURS}, ${GRID_SIZE}px)` }}
            className={'grid *:border-b border-slate-200'}
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
          <div
            className='relative'
            // onMouse={(e) => {
            //   if (selectedLessonID && e.currentTarget.ariaLabel !== 'lesson')
            //     setSelectedLessonID(null);
            // }}
          >
            <LessonsGrid
              days={DAYS}
              daysNames={DAYS_NAMES}
              gridSize={GRID_SIZE}
              hoursCount={HOURS}
              lessons={lessons}
              startHour={TIME_RANGE_FROM}
              boardRef={ref}
              onLessonChange={onLessonChange}
              onLessonSelect={onLessonSelect}
              selectedLessonID={selectedLessonID}
            />

            <VisualGrid
              gridSize={GRID_SIZE}
              daysCount={DAYS.length}
              hoursCount={HOURS}
            />
          </div>
        </div>
        {selectedLessonID && (
          <LessonDetails
            selectedLesson={
              lessons.find(
                (lesson) => lesson.id === selectedLessonID
              ) as ILesson
            }
            onLessonChange={onLessonChange}
            onHide={() => setSelectedLessonID(null)}
          />
        )}
      </div>
      {/* <StudentInfo selectedStudentID={null} /> */}
    </div>
  );
};

export default Schedule;

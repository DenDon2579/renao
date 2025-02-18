import React, { createElement, useEffect, useRef, useState } from 'react';
import classes from './Schedule.module.css';
import Students from '../students/Students';
import ButtonPrimary from '../../../uiKit/buttons/ButtonPrimary';
import { TbPlus, TbSettings, TbUserCircle } from 'react-icons/tb';
import StudentInfo from '../students/StudentInfo';
import LessonDetails from './lessonDetails/LessonDetails';
import LessonsGrid from './lessonsGrid/LessonsGrid';
import VisualGrid from './visualGrid/VisualGrid';

type Props = {};
export interface ILesson {
  id: string;
  studentID: string | null;
  studentName: string;
  day: number;
  hour: number;
  minute: number;
  duration: number;
}
const lessonsEx: ILesson[] = [
  {
    id: '1',
    studentID: '1',
    studentName: 'Рашид',
    day: 0,
    hour: 10,
    minute: 0,
    duration: 1,
  },
  {
    id: '2',
    studentID: '2',
    studentName: 'Арсений',
    day: 0,
    hour: 16,
    minute: 0,
    duration: 1,
  },
  {
    id: '3',
    studentID: '3',
    studentName: 'Кирилл',
    day: 0,
    hour: 17,
    minute: 30,
    duration: 1,
  },
  {
    id: '4',
    studentID: '4',
    studentName: 'Полина',
    day: 1,
    hour: 11,
    minute: 30,
    duration: 1,
  },
  {
    id: '5',
    studentID: '5',
    studentName: 'Маргарита',
    day: 1,
    hour: 16,
    minute: 0,
    duration: 1,
  },
  {
    id: '6',
    studentID: '6',
    studentName: 'Зоя',
    day: 1,
    hour: 17,
    minute: 15,
    duration: 1,
  },
  {
    id: '7',
    studentID: '7',
    studentName: 'Антон',
    day: 1,
    hour: 18,
    minute: 30,
    duration: 1,
  },
  {
    id: '8',
    studentID: '8',
    studentName: 'Степан',
    day: 1,
    hour: 20,
    minute: 0,
    duration: 1,
  },
  {
    id: '9',
    studentID: '9',
    studentName: 'Майя',
    day: 2,
    hour: 15,
    minute: 30,
    duration: 1,
  },
  {
    id: '10',
    studentID: '10',
    studentName: 'Илья',
    day: 2,
    hour: 17,
    minute: 0,
    duration: 1,
  },
  {
    id: '11',
    studentID: '11',
    studentName: 'Ярослав',
    day: 2,
    hour: 19,
    minute: 30,
    duration: 1,
  },
  {
    id: '12',
    studentID: '2',
    studentName: 'Арсений',
    day: 3,
    hour: 15,
    minute: 30,
    duration: 1,
  },
  {
    id: '13',
    studentID: '12',
    studentName: 'Ильнара',
    day: 3,
    hour: 17,
    minute: 0,
    duration: 1,
  },
  {
    id: '14',
    studentID: '13',
    studentName: 'Николай',
    day: 3,
    hour: 18,
    minute: 15,
    duration: 1,
  },
  {
    id: '15',
    studentID: '8',
    studentName: 'Степан',
    day: 3,
    hour: 19,
    minute: 30,
    duration: 1,
  },
  {
    id: '16',
    studentID: '1',
    studentName: 'Рашид',
    day: 4,
    hour: 10,
    minute: 0,
    duration: 1,
  },
  {
    id: '17',
    studentID: '4',
    studentName: 'Полина',
    day: 4,
    hour: 11,
    minute: 30,
    duration: 1,
  },
  {
    id: '18',
    studentID: '5',
    studentName: 'Маргарита',
    day: 4,
    hour: 17,
    minute: 0,
    duration: 1,
  },
  {
    id: '19',
    studentID: '14',
    studentName: 'Рауль',
    day: 4,
    hour: 18,
    minute: 30,
    duration: 1,
  },
  {
    id: '20',
    studentID: '11',
    studentName: 'Ярослав',
    day: 4,
    hour: 20,
    minute: 0,
    duration: 1,
  },
  {
    id: '21',
    studentID: '9',
    studentName: 'Майя',
    day: 5,
    hour: 10,
    minute: 0,
    duration: 1,
  },
  {
    id: '22',
    studentID: '10',
    studentName: 'Илья',
    day: 5,
    hour: 11,
    minute: 30,
    duration: 1,
  },
  {
    id: '23',
    studentID: '6',
    studentName: 'Зоя',
    day: 5,
    hour: 13,
    minute: 0,
    duration: 1,
  },
  {
    id: '24',
    studentID: '15',
    studentName: 'Даня',
    day: 5,
    hour: 14,
    minute: 30,
    duration: 1,
  },
  {
    id: '25',
    studentID: '16',
    studentName: 'Азамат',
    day: 5,
    hour: 15,
    minute: 45,
    duration: 1,
  },
  {
    id: '26',
    studentID: '12',
    studentName: 'Ильнара',
    day: 5,
    hour: 17,
    minute: 0,
    duration: 1,
  },
  {
    id: '27',
    studentID: '17',
    studentName: 'Назар',
    day: 6,
    hour: 11,
    minute: 0,
    duration: 1,
  },
  {
    id: '28',
    studentID: '2',
    studentName: 'Арсений',
    day: 6,
    hour: 12,
    minute: 30,
    duration: 1,
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
      return (
        lesson.hour >= TIME_RANGE_FROM &&
        lesson.hour + lesson.minute / 60 + lesson.duration <=
          TIME_RANGE_FROM + HOURS &&
        DAYS.includes(lesson.day)
      );
    })
  );

  const [selectedLessonID, setSelectedLessonID] = useState<null | string>(null);
  const [detailsSide, setDetailsSide] = useState<'right' | 'left'>('right');

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
    if (!ref.current || selectedLessonID) return;

    if (e.deltaY > 0) {
      ref.current.scrollLeft -= GRID_SIZE;
    } else {
      ref.current.scrollLeft += GRID_SIZE;
    }
  };

  const onLessonSelect = (id: string | null, side?: 'right' | 'left') => {
    if (!id || !side || id === selectedLessonID) {
      setSelectedLessonID(null);
    } else {
      setDetailsSide(side);
      setSelectedLessonID(id);
    }
  };

  const onLessonCreate = (day: number, hour: number, minute: number) => {
    setLessons((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        studentID: null,
        studentName: '',
        day,
        hour,
        minute,
        duration: 1,
      },
    ]);
  };

  return (
    <div className='w-full h-full p-4 z-10 flex relative'>
      <ButtonPrimary className='h-10 w-10 shrink-0 absolute top-2 right-2 z-30'>
        <TbSettings size={22} className='text-slate-500' />
      </ButtonPrimary>
      <div
        className='h-full flex xl:min-w-screen-md 2xl:min-w-screen-lg lg:min-w-96 md:min-w-52 min-w-0'
        onWheel={scrollHandler}
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
          className='relative overflow-x-auto overflow-y-hidden pb-6 pr-10 pl-1'
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
              onLessonCreate={onLessonCreate}
            />

            <VisualGrid
              gridSize={GRID_SIZE}
              daysCount={DAYS.length}
              hoursCount={HOURS}
              onClick={() => setSelectedLessonID(null)}
            />
          </div>
        </div>
        {selectedLessonID && (
          <LessonDetails
            side={detailsSide}
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

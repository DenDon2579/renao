import React, { useRef, useState } from 'react';
import { ILesson } from './Schedule';
import { DateTime, Duration } from 'luxon';
type Props = {
  lessonData: ILesson;
  // onMouseEnterLesson(): void;
  onLessonChanged(newLesson: ILesson): void;
};

const Lesson = ({ lessonData, onLessonChanged }: Props) => {
  const [isResizeButtonsVisible, setIsResizeButtonsVisible] = useState(false);
  const [additionalDuration, setAdditionalDuration] = useState(0);
  const [isResizeMode, setIsresizeMode] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<'r' | 'l' | null>();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStartPoint, setDragStartPoint] = useState<null | {
    x: number;
    y: number;
  }>(null);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
    console.log('STARTDRAG');
    setDragStartPoint({ x: e.clientX, y: e.clientY });
  };

  const lessonStart = (lessonData.hour - 6) * 4 + lessonData.minute / 15 + 1; //В четвертях часа
  const lessonDuration = lessonData.duration * 4; //В четвертях часа

  const whileDragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (!e.clientX || !e.clientY) return;

    if (dragStartPoint) {
      let offsetX;
      if (e.shiftKey) {
        offsetX =
          Math.floor((e.clientX - dragStartPoint.x) / 64) * 4 -
          lessonData.minute / 15;
      } else {
        offsetX = Math.floor((e.clientX - dragStartPoint.x) / 16);
      }
      const offsetY = Math.round((e.clientY - dragStartPoint.y) / 64);

      const newLessonStart = lessonStart + offsetX;

      if (isResizeMode) {
        console.log(resizeDirection);
        console.log(offsetX);
        setAdditionalDuration(offsetX);
        if (resizeDirection === 'r') {
          return;
        }
      }
      console.log('NEW LESSON START: ', newLessonStart + lessonDuration);
      if (
        (newLessonStart > 0 && newLessonStart + lessonDuration <= 72 + 1) ||
        (resizeDirection === 'l' &&
          newLessonStart > 0 &&
          newLessonStart <= 72 + 1)
      ) {
        setOffset((prev) => ({
          x: offsetX,
          y: prev.y,
        }));
        console.log(offset);
      }

      if (lessonData.day + offsetY >= 0 && lessonData.day + offsetY < 7) {
        setOffset((prev) => ({
          x: prev.x,
          y: offsetY,
        }));
      }
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (isResizeMode) {
      if (resizeDirection === 'r') {
        console.log(additionalDuration);
        onLessonChanged({
          ...lessonData,
          duration: lessonData.duration + additionalDuration / 4,
        });
        setAdditionalDuration(0);
        setIsresizeMode(false);

        return;
      }
    }

    const { hours: newHour, minutes: newMinute } = Duration.fromObject({
      hours: lessonData.hour,
      minutes: lessonData.minute,
    })
      .plus({ minutes: 15 * offset.x })
      .normalize()
      .toObject();

    if (newHour && newMinute !== undefined)
      onLessonChanged({
        ...lessonData,
        hour: newHour,
        minute: newMinute,
        day: lessonData.day + offset.y,
        duration: lessonData.duration + -additionalDuration / 4,
      });

    setOffset({
      x: 0,
      y: 0,
    });
    setResizeDirection(null);
    setAdditionalDuration(0);
    setIsresizeMode(false);
  };

  const leftResizeHandler = () => {
    setResizeDirection('l');
    setIsresizeMode(true);
  };

  const rightResizeHandler = () => {
    setResizeDirection('r');
    setIsresizeMode(true);
  };

  return (
    <div
      key={lessonData.id}
      style={{
        gridColumnStart:
          lessonStart +
          (!isResizeMode || resizeDirection === 'l' ? offset.x : 0),
        gridColumnEnd:
          lessonStart +
          lessonDuration +
          (!isResizeMode ? offset.x : 0) +
          (resizeDirection === 'r' ? additionalDuration : 0),

        gridRowStart: lessonData.day + 1 + (!isResizeMode ? offset.y : 0),
      }}
      className='w-full h-full p-0.5 z-30'
    >
      <div
        title={lessonData.studentName}
        draggable
        onDragStart={dragStartHandler}
        onDrag={whileDragHandler}
        onDragEnd={dropHandler}
        onMouseEnter={() => setIsResizeButtonsVisible(true)}
        onMouseLeave={() => setIsResizeButtonsVisible(false)}
        className='pointer-events-auto cursor-pointer relative w-full h-full overflow-clip bg-white border border-slate-200 rounded-md flex justify-center items-center text-center hover:bg-slate-50'
      >
        {(isResizeButtonsVisible || isResizeMode) && (
          <>
            <div
              onMouseDown={leftResizeHandler}
              className='absolute w-2 h-10 bg-slate-100 border border-slate-200 rounded-md -left-1 cursor-w-resize hover:bg-slate-200'
            ></div>
            <div
              onMouseDown={rightResizeHandler}
              className='absolute w-2 h-10 bg-slate-100 border border-slate-200 rounded-md -right-1 cursor-w-resize hover:bg-slate-200'
            ></div>
          </>
        )}

        <span style={{ wordBreak: 'break-word' }}>
          {lessonData.studentName.length >= lessonDuration * 2.5
            ? lessonData.studentName.slice(0, lessonDuration * 2.5) + '..'
            : lessonData.studentName}
        </span>
      </div>
    </div>
  );
};

export default Lesson;

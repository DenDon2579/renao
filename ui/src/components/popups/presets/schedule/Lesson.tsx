import React, { useRef } from 'react';
import { ILesson } from './Schedule';

type Props = {
  lessonData: ILesson;
  onMouseEnterLesson(): void;
};

const Lesson = ({ lessonData, onMouseEnterLesson }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (ref.current) {
      console.log(e.nativeEvent.offsetX);
      // ref.current.style.left = e.nativeEvent.offsetX + 'px';
      // ref.current.style.top = e.nativeEvent.offsetY + 'px';
    }
  };

  const width = 100 * lessonData.duration;
  const offset = Math.floor(100 / (60 / lessonData.minute));
  return (
    <div
      onMouseEnter={onMouseEnterLesson}
      style={{ width: width + 3 + '%', left: offset + '%' }}
      className='h-full absolute p-1 z-10'
      ref={ref}
    >
      <div
        draggable
        onDrag={dragHandler}
        title={lessonData.studentName}
        className='lesson h-full w-full bg-white border border-slate-200 p-2 rounded-md text-sm shadow-sm flex items-center justify-center shadow-slate-200 hover:bg-slate-50 cursor-pointer'
      >
        <span className='text-slate-600 text-center overflow-hidden'>
          {lessonData.studentName}
        </span>
      </div>
    </div>
  );
};

export default Lesson;

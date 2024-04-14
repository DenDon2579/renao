import React, { useEffect, useRef, useState } from 'react';
import { ILesson } from './Schedule';
import { DateTime, Duration } from 'luxon';
type Props = {
  lessonData: ILesson;
  // onMouseEnterLesson(): void;
  onLessonChanged(newLesson: ILesson): void;
  boardData: {
    timeRangeFrom: number;
    hours: number;
    // daysRangeFrom: number;
    days: number[];
    daysNames: string[];
    gridSize: number;
    ref: React.RefObject<HTMLDivElement>;
  };
};

const Lesson = ({ lessonData, onLessonChanged, boardData }: Props) => {
  const [isResizeButtonsVisible, setIsResizeButtonsVisible] = useState(false);
  const [additionalDuration, setAdditionalDuration] = useState(0);
  const [isResizeMode, setIsresizeMode] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<'r' | 'l' | null>();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPoint, setDragStartPoint] = useState<null | {
    x: number;
    y: number;
  }>(null);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (boardData.ref.current) {
      let scrollOffset = boardData.ref.current.scrollLeft;
      if (scrollOffset - 20 < 0) {
        boardData.ref.current.scrollLeft = 0;
      }
      setScrollOffset(boardData.ref.current.scrollLeft);
    }
  }, [boardData.ref.current?.scrollLeft]);

  const [lessonTimeString, setLessonTimeString] = useState('');
  const q = useRef<HTMLDivElement>(null);
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.setDragImage(document.createElement('div'), 0, 0); // Прячем фантомный элемент при переносе
    setDragStartPoint({
      x: e.clientX + scrollOffset,
      y: e.clientY,
    }); // Записываем точку начала переноса
  };

  const lessonStart =
    (lessonData.hour - boardData.timeRangeFrom) * 4 +
    lessonData.minute / 15 +
    1; //Преобразовываем время (в часах и минутах) в четверти часа
  const lessonDuration = lessonData.duration * 4; //Получаем длительность урока в четвертяъ часа
  const lessonDay = boardData.days.indexOf(lessonData.day);

  // useEffect(() => {
  //   console.log('SCROLLED');
  //   if (boardData.ref.current) {
  //     setOffset((prev) => ({
  //       ...prev,
  //       x:
  //         prev.x +
  //         Math.floor(
  //           boardData.ref.current.scrollLeft / (boardData.gridSize / 4)
  //         ),
  //     }));
  //   }
  // }, [boardData?.ref?.current?.scrollLeft]);

  const whileDragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    // if (!boardData.ref.current) {
    //   return;
    // }
    if (boardData.ref.current) {
      const boardSizes = boardData.ref.current.getClientRects()[0];

      if (
        e.clientX + scrollOffset + e.currentTarget.clientWidth >
          boardSizes.x + boardSizes.width + scrollOffset - boardData.gridSize ||
        boardSizes.x + scrollOffset + boardData.gridSize >
          e.currentTarget.getClientRects()[0].x + scrollOffset
      ) {
        console.log('SCROLLED');
        e.currentTarget.scrollIntoView({
          behavior: 'auto',
          block: 'end',
          inline: 'nearest',
        });
      }
    }

    if (!e.clientX || !e.clientY || !dragStartPoint || !boardData.ref.current)
      return; //Если по какой-то причине координаты равны нулю или нет начальной точки, то ничего не делаем
    let offsetX; // offsetX - смещение по горизонтали начала урока по четвертям часа (1/4 клетки)
    //Если shift зажат, что перемещаем по часам, иначе по четвертям часа
    if (e.shiftKey) {
      offsetX =
        Math.floor(
          (e.clientX + scrollOffset - dragStartPoint.x) / boardData.gridSize
        ) *
          4 -
        lessonData.minute / 15;
    } else {
      offsetX = Math.floor(
        (e.clientX + scrollOffset - dragStartPoint.x) / (boardData.gridSize / 4)
      );
    }
    // boardData.ref.current?.scrollIntoView({ block: q.current });
    const offsetY = Math.round(
      (e.clientY - dragStartPoint.y) / boardData.gridSize
    ); // offsetY - смещение по вертикали сверху-вниз по дням недели(одна клетка)

    // Так как для перетаскивания и ресайза используется drag и тот же offset, если у нас resizeMode, мы передаем управление reizeHandler, и заканчиваем функцию
    if (isResizeMode) {
      resizeHadnler(offsetX);
      return;
    }
    const newLessonStart = lessonStart + offsetX; // Новая точка начала урока, с учетом смещения

    if (
      newLessonStart > 0 &&
      newLessonStart + lessonDuration <= boardData.hours * 4 + 1
    ) {
      setOffset((prev) => ({
        ...prev,
        x: offsetX,
      }));
    }

    if (
      lessonDay + offsetY >= 0 &&
      lessonDay + offsetY < boardData.days.length
    ) {
      setOffset((prev) => ({
        ...prev,
        y: offsetY,
      }));
      setTimeLabel();
    }
  };

  const setTimeLabel = () => {
    const lessonStartTimeString = Duration.fromObject({
      hours: lessonData.hour,
      minutes: lessonData.minute,
    })
      .plus({ minutes: 15 * offset.x })
      .normalize()
      .toFormat('h:mm');

    const lessonEndTimeString = Duration.fromObject({
      hours: lessonData.hour,
      minutes: lessonData.minute,
    })
      .plus({
        minutes: 15 * offset.x + (lessonDuration + additionalDuration) * 15,
      })
      .normalize()
      .toFormat('h:mm');
    console.log('OAKSDFOKASFKO');
    setLessonTimeString(
      `${
        boardData.daysNames[boardData.days[lessonDay + offset.y]]
      } ${lessonStartTimeString}-${lessonEndTimeString}`
    );
  };

  const resizeHadnler = (offsetX: number) => {
    // При ресайзе вправо, нужно изменить только длительность урока
    // А при ресайзе влево нужно изменить длительность и точку начала урока.
    setTimeLabel();
    if (resizeDirection === 'r') {
      if (
        lessonStart + lessonDuration + offsetX <= boardData.hours * 4 + 1 &&
        lessonDuration + offsetX >= 3
      )
        // Проверяем на выход за правую границу и длину
        setAdditionalDuration(offsetX);
    } else {
      if (lessonStart + offsetX > 0 && lessonDuration - offsetX >= 3) {
        // Проверяем на выход за левую границу и длину
        setAdditionalDuration(-offsetX);
        setOffset((prev) => ({
          // Изменяем точку старта урока
          ...prev,
          x: offsetX,
        }));
      }
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setIsResizeButtonsVisible(true);
    if (isResizeMode && resizeDirection === 'r') {
      onLessonChanged({
        ...lessonData,
        duration: lessonData.duration + additionalDuration / 4,
      });
      resetDragState();
      return;
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
        day: boardData.days[lessonDay + offset.y],
        duration: lessonData.duration + additionalDuration / 4,
      });

    resetDragState();
  };

  const leftResizeHandler = () => {
    setResizeDirection('l');
    setIsresizeMode(true);
  };

  const rightResizeHandler = () => {
    setResizeDirection('r');
    setIsresizeMode(true);
  };

  const resetDragState = () => {
    setIsDragging(false);
    setResizeDirection(null);
    setAdditionalDuration(0);
    setIsresizeMode(false);
    setOffset({
      x: 0,
      y: 0,
    });
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

        gridRowStart: lessonDay + 1 + (!isResizeMode ? offset.y : 0),
      }}
      className='w-full h-full p-0.5 z-30 relative flex justify-center active:z-50'
      ref={q}
    >
      <div
        className={`${
          isDragging ? 'opacity-100' : 'opacity-0'
        } transition-opacity p-0.5 rounded-md w-auto h-6 absolute -bottom-7 z-40 text-sm text-nowrap bg-white text-slate-400 leading-none`}
      >
        {lessonTimeString}
      </div>

      <div
        title={lessonData.studentName}
        draggable
        onDragStart={dragStartHandler}
        onDrag={whileDragHandler}
        onDragEnd={dropHandler}
        onMouseEnter={() => setIsResizeButtonsVisible(true)}
        onMouseLeave={() => setIsResizeButtonsVisible(false)}
        onMouseDown={() => setIsResizeButtonsVisible(false)}
        onMouseUp={() => setIsResizeButtonsVisible(true)}
        className='active:-translate-y-0.5 transition-all pointer-events-auto cursor-pointer relative w-full h-full overflow-clip active:bg-slate-50 hover:border-indigo-300 bg-white border active:border-indigo-300 border-indigo-200 shadow-sm active:shadow-md active:shadow-indigo-100 shadow-indigo-100 rounded-md flex justify-center items-center text-center hover:bg-slate-50'
      >
        {isResizeButtonsVisible && (
          <>
            <div
              onMouseDown={leftResizeHandler}
              className='absolute w-2 h-2/3 bg-indigo-100 border border-indigo-300 rounded-md -left-1 cursor-w-resize hover:bg-indigo-200'
            ></div>
            <div
              onMouseDown={rightResizeHandler}
              className='absolute w-2 h-2/3 bg-indigo-100 border border-indigo-300 rounded-md -right-1 cursor-w-resize hover:bg-indigo-200'
            ></div>
          </>
        )}

        <span
          style={{
            wordBreak: 'break-word',
            fontSize:
              isResizeButtonsVisible &&
              lessonData.studentName.length >=
                (lessonDuration + additionalDuration) * 4
                ? 12
                : 16,
          }}
          className='px-1 text-slate-800'
        >
          {!isResizeButtonsVisible
            ? lessonData.studentName.length >=
              (lessonDuration + additionalDuration) * 2.5
              ? lessonData.studentName.slice(
                  0,
                  (lessonDuration + additionalDuration) * 2.5
                ) + '..'
              : lessonData.studentName
            : lessonData.studentName.length >=
              (lessonDuration + additionalDuration) * 6
            ? lessonData.studentName.slice(
                0,
                (lessonDuration + additionalDuration) * 6
              ) + '..'
            : lessonData.studentName}
        </span>
      </div>
    </div>
  );
};

export default Lesson;

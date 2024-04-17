import React from 'react';

type Props = {
  gridSize: number;
  hoursCount: number;
  daysCount: number;
  onClick(): void;
};

const VisualGrid = ({ gridSize, hoursCount, daysCount, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{
        gridTemplateColumns: `repeat(${hoursCount}, ${gridSize}px)`,
        gridTemplateRows: `repeat(${daysCount}, ${gridSize}px)`,
      }}
      className='grid w-fit h-fit border-l border-slate-200'
    >
      {new Array(daysCount * hoursCount).fill(0).map((_, cellIndex) => (
        <div
          key={cellIndex}
          // style={{ height: GRID_SIZE, width: GRID_SIZE }}
          className='w-full h-full flex relative items-center border-b border-r border-slate-200'
        ></div>
      ))}
    </div>
  );
};

export default VisualGrid;

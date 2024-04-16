import React, { useEffect, useRef, useState } from 'react';
import Students from './presets/Students';
import { TbX } from 'react-icons/tb';
import Schedule from './presets/schedule/Schedule';
import StudentInfo from './presets/StudentInfo';
import { Route, Routes } from 'react-router-dom';

type Props = {
  title: string;
};

const Popup = (props: Props) => {
  const [isVisible, setVisibility] = useState(true);
  const popupOverlay = useRef<HTMLDivElement>(null);
  const clickHandler = (e: MouseEvent) => {
    if (popupOverlay.current === e.target) setVisibility(false);
  };
  useEffect(() => {
    popupOverlay.current?.addEventListener('click', clickHandler);
  }, []);

  useEffect(
    () => () =>
      popupOverlay.current?.removeEventListener('click', clickHandler),
    []
  );

  return isVisible ? (
    <div
      style={{
        background: 'rgba(0,0,0,0.05)',
      }}
      className='fixed w-full h-full flex justify-center items-center cursor-pointer'
      ref={popupOverlay}
    >
      <div className='bg-white rounded-lg relative shadow-sm border border-indigo-200 shadow-indigo-100 cursor-default lg:max-w-screen-lg xl:max-w-screen-xl max-w-screen-sm 2xl:max-w-screen-2xl'>
        <div className='border-b border-slate-200 flex justify-center items-center'>
          <div
            className='absolute right-0 m-2'
            onClick={() => setVisibility(false)}
          >
            <TbX
              size={26}
              className='text-slate-600 hover:text-slate-900 cursor-pointer'
            />
          </div>
          <div className='h-12 flex justify-center items-center'>
            <h2 className='text-2xl text-slate-800'>{props.title}</h2>
          </div>
        </div>
        <div className='flex w-full h-auto'>
          <Routes>
            <Route
              path='/schedule'
              element={
                <>
                  <Schedule />
                </>
              }
            />
            <Route path='/students' element={<Students />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Popup;

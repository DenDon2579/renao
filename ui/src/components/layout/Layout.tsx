import React from 'react';
import Header from './Header';
import Content from './Content';
import Popup from '../popups/Popup';
import { Route, Routes } from 'react-router-dom';
import Invite from '../pages/Invite';
import Board from '../pages/Board';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className='w-full h-full flex justify-center'>
      <Routes>
        <Route
          path='/*'
          element={
            <>
              <Header />
              <Content />
              <Popup title='Расписание' />
            </>
          }
        />
        <Route path='/invitation/:inviteCode' element={<Invite />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </div>
  );
};

export default Layout;

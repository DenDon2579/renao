import React from 'react';
import Header from './Header';
import Content from './Content';
import Popup from '../popups/Popup';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className='w-full h-full flex justify-center'>
      <Header />
      <Content />
      <Popup title='Расписание' />
    </div>
  );
};

export default Layout;

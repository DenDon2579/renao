import React, { useState } from 'react';
import ButtonPrimary from '../../../uiKit/buttons/ButtonPrimary';
import {
  TbUser,
  TbUserCircle,
  TbUserFilled,
  TbVideo,
  TbVolume,
} from 'react-icons/tb';
import Account from './categories/Account';
import Audio from './categories/Audio';
import Video from './categories/Video';

type Props = {};

const Settings = (props: Props) => {
  const categories = {
    account: <Account />,
    audio: <Audio />,
    video: <Video />,
  };
  const [selectedCategory, setSelectedCategory] = useState('account');

  return (
    <div className='w-auto h-64 flex relative'>
      <div className='h-full w-40 p-2 border-r br-slate-200'>
        <ButtonPrimary
          className='w-full mb-2 flex'
          onClick={() => setSelectedCategory('account')}
        >
          <TbUserCircle size={20} className='text-slate-500 mr-1' />
          <span>Аккаунт</span>
        </ButtonPrimary>
        <ButtonPrimary
          className='w-full mb-2 flex'
          onClick={() => setSelectedCategory('audio')}
        >
          <TbVolume size={20} className='text-slate-500 mr-1' />
          <span>Звук</span>
        </ButtonPrimary>
        <ButtonPrimary
          className='w-full flex'
          onClick={() => setSelectedCategory('video')}
        >
          <TbVideo size={20} className='text-slate-500 mr-1' />
          <span>Видео</span>
        </ButtonPrimary>
      </div>
      <div className='h-full w-64'>{categories[selectedCategory]}</div>
    </div>
  );
};

export default Settings;

import React from 'react';
import {
  TbHome,
  TbEdit,
  TbCalendar,
  TbUsers,
  TbSettings,
} from 'react-icons/tb';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='h-16 w-auto  p-2 fixed flex items-center justify-center'>
      <div className='h-full w-auto flex *:relative *:h-12 *:w-auto *:p-2 *:select-none *:mr-2 *:border *:cursor-pointer *:border-slate-200 *:shadow-sm *:shadow-slate-200 *:rounded-lg *:flex *:items-center *:justify-center'>
        <div className='hover:bg-slate-200 bg-white'>
          <TbHome size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Главная
          </span>
        </div>
        <div className='hover:bg-slate-200 bg-white'>
          <TbEdit size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Доска
          </span>
        </div>
        <div className='hover:bg-slate-200 bg-white'>
          <TbCalendar size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Расписание
          </span>
        </div>
        <div className='hover:bg-slate-200 bg-white'>
          <TbUsers size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Ученики
          </span>
        </div>
        <div className='hover:bg-slate-200 bg-white !mr-0'>
          <TbSettings size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Настройки
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;

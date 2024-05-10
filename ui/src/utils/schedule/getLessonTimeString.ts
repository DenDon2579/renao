import { Duration } from 'luxon';

const getLessonTimeString = (
  hour: number,
  minute: number,
  duration: number
) => {
  const lessonStartTimeString = Duration.fromObject({
    hours: hour,
    minutes: minute,
  })
    .normalize()
    .toFormat('h:mm');

  const lessonEndTimeString = Duration.fromObject({
    hours: hour,
    minutes: minute + duration,
  })

    .normalize()
    .toFormat('h:mm');

  return `${lessonStartTimeString}-${lessonEndTimeString}`;
};

export default getLessonTimeString;

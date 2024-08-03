interface IStudentDbModel {
  id: string;
  userName: string;
  education: string;
  grade: 10;
  avatarUrl: string;
  tutors: string[];
  schedule: string[];
}

interface IStudentForTutorViewModel {
  id: string;
  userName: string;
  alias: string;
  education: string;
  grade: 10;
}

interface IScheduleLesson {
  id: string;
  day: number;
  hour: number;
  minute: number;
  duration: number;
  studentId: string;
  note: string;
  subject: TLessonSubject;
}

interface ILesson {
  id: string;
  startedAt: Date | null;
  endedAt: Date | null;
  status: 'preparation' | 'inProgress' | 'ended';
  studentId: string;
  tutorId: string;
  subject: TLessonSubject;
}

type TLessonSubject =
  | 'math'
  | 'languages'
  | 'programming'
  | 'chemistry'
  | 'biology'
  | 'drawing'
  | 'physics'
  | 'geography'
  | 'common';

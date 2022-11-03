export type Race = {
  lanes: Lane[];
}

export type Lane = {
  name: string;
  student: Student;
  result?: number;
}

export type Student = {
  name: string;
}


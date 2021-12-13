import { DataElementInterface } from '../utils/types/types';

export const user1: DataElementInterface = {
  id: 120,
  name: 'John Doe',
  job: 'Engineer',
  dateOfBirth: '1987-04-16',
};
export const user2: DataElementInterface = {
  id: 34,
  name: 'Jane Smith',
  job: 'Doctor',
  dateOfBirth: '1987-09-23',
};
export const user3: DataElementInterface = {
  id: 56,
  name: 'Arsène Lupin',
  job: 'Gentleman Thief',
  dateOfBirth: '1874-01-01',
};
export const user4: DataElementInterface = {
  id: 78,
  name: 'Snow White',
  job: 'Princess',
  dateOfBirth: '1327-06-15',
};

export const user1WithOneMoreKey: DataElementInterface = {
  id: 120,
  name: 'John Doe',
  job: 'Engineer',
  dateOfBirth: '1987-04-16',
  nationnality: 'American',
};

export const userWithoutJob: DataElementInterface = {
  id: 120,
  name: 'John Doe',
  dateOfBirth: '1987-04-16',
};

export const dataSample: DataElementInterface[] = [user1, user2, user3, user4];

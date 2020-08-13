import { ITask } from './itask';

export interface ITaskState {
  tasks: ITask[];
  isLoading: boolean;
  error: string;
}

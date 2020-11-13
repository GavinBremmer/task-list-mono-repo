import { atom, selector } from 'recoil';

export interface ITask {
    done: boolean;
    description: string;
}

export const taskListState = atom({
    key: 'taskList',
    default: [] as ITask[]
});

export const completedTaskListState = selector({
    key: 'completedTaskList',
    get: ({ get }) => {
        return get(taskListState).filter(task => task.done)
    }
})

export const remainingTaskListState = selector({
    key: 'remainingTaskList',
    get: ({ get }) => {
        return get(taskListState).filter(task => !task.done)
    }
})
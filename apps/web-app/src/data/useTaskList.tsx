import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { tasks, tasks as tasksApi } from '../api/tasks';

export interface ITask {
    id: number;
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
});

export function useTaskList(){

    const [ taskList, setTaskList ] = useRecoilState<ITask[]>(taskListState);
    const completedTaskList = useRecoilValue(completedTaskListState);
    const remainingTaskList = useRecoilValue(remainingTaskListState);
    
    const loadRemoteTasks = () => {
        tasksApi.get().then( response => {
            setTaskList( response.data );
        });
    }

    const create = ( description:string ) => {
        tasksApi.post({ done: false, description }).then( response => {
            setTaskList([ ...taskList, response.data ]);
        });
    }

    const markDone = ( id:number, checked:boolean ) => {
        tasksApi.patch( id, { done: checked }).then( response => {
            return tasksApi.get();
        }).then( response => {
            setTaskList( response.data );
        });
    }

    const remove = ( ) => {

    }

    return {
        taskList,
        completedTaskList,
        remainingTaskList,
        setTaskList,
        loadRemoteTasks,
        create,
        markDone,
        remove
    }

}
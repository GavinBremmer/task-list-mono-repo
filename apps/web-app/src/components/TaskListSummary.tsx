import React from 'react';
import { useRecoilValue } from 'recoil';
import { completedTaskListState, remainingTaskListState, taskListState } from '../data/TaskList.recoil';

function TaskListSummary(){

    const taskList = useRecoilValue(taskListState);
    const completedTaskList = useRecoilValue(completedTaskListState);
    const remainingTaskList = useRecoilValue(remainingTaskListState);
    
    return (
        <div>
            {completedTaskList.length} / {taskList.length} Complete

            <div style={{ textAlign: 'left' }}>
                Remaining Tasks:
                <ul>
                    { remainingTaskList.map( task => <li>{task.description}</li>)}
                </ul>
            </div>
        </div>
    );

}

export default TaskListSummary;
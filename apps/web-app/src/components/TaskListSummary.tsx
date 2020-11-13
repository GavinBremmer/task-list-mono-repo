import React from 'react';
import { useTaskList } from '../data/useTaskList';

function TaskListSummary(){

    const { taskList, completedTaskList, remainingTaskList } = useTaskList();
    
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
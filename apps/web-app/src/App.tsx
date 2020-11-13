import React, { useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';
import TaskListSummary from './components/TaskListSummary';
import { useTaskList } from './data/useTaskList';
 
function App() {
    
    const { loadRemoteTasks } = useTaskList();

    useEffect(() => {
        loadRemoteTasks();
    }, []);

    return (
        <div className="App">
            <div style={{ width:"25%", float:"left" }}>{" "}</div>
            <div style={{ width:"25%", float:"left" }}>
                <TaskListSummary />
            </div>
            <div style={{ width:"25%", float:"left" }}>
                <TaskList />
            </div>
        </div>
    );
}

export default App;

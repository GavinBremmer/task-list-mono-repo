import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use(express.json());

interface ITask {
    id: number,
    done: boolean,
    description: string
}

const tasks:ITask[] = [{
    id: 1,
    done: false,
    description: "Create a POST Method to create more tasks"
},{
    id: 12,
    done: false,
    description: "Create a PUT Method to update a task"
}];

function findNextId(){
    return Math.max(...tasks.map(task => task.id)) + 1;
}

// responds with all tasks
app.get("/tasks", (request, response) => {
    
    response.send( tasks );

});

// responds with all tasks
app.get("/tasks/:taskId", (request, response) => {
    
    const taskId = Number(request.params.taskId);
    const foundTask = tasks.find( task => task.id === taskId );

    if(foundTask){
        response.send( foundTask );
    }

    else {
        response.status(404).send({
            error: 404,
            message: `Cannot find task with id ${taskId}`
        });
    }

});

app.post("/tasks", (request, response) => {
    
    const task = {
        id: findNextId(),
        done: false,
        description: request.body.description
    };
    
    tasks.push( task );

    response.status(201).send( task );

});

// IDEMPOTENT: You must send the entire task definition to set
app.put("/tasks/:taskId", ( request, response ) => {
    // write your code here
});

// NOT IDEMPOTENT: You can send only specific value to change
app.patch("/tasks/:taskId", ( request, response ) => {
    // write your code here
});

// IDEMPOTENT: Don't delete more than the same item each request 
// double requests should ignore the second
app.delete("/tasks/:taskId", ( request, response ) => {
    // write your code here
});

app.listen(port, () => {
    console.log(`Web Server Started and listening on localhost:${port}`);
});

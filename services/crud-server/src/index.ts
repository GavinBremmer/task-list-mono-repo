import express from "express";

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
    
    const taskId = Number(request.params.taskId);
    const indexOfCurrentTask = tasks.map(task=>task.id).indexOf(taskId);

    switch( true ){

        case request.body.id !== taskId: {
            response.status(400).send({
                error: 400,
                message: `The task id (${taskId}) sent in the request path does not match the id in the request body (${request.body.id})`
            });
            break;
        }

        case indexOfCurrentTask === -1: {
            response.status(404).send({
                error: 404,
                message: `Cannot find task with id ${taskId}`
            });
            break;
        }

        default: {
            const task = request.body;
            tasks.splice(indexOfCurrentTask, 1, task);
            response.status(200).send( task );
            break;
        }

    }

});

// NOT IDEMPOTENT: You can send only specific value to change
app.patch("/tasks/:taskId", ( request, response ) => {
    
    const taskId = Number(request.params.taskId);
    const indexOfCurrentTask = tasks.map(task=>task.id).indexOf(taskId);
    const currentTask = tasks[ indexOfCurrentTask ];

    switch( true ){

        case request.body.id && request.body.id !== taskId: {
            response.status(400).send({
                error: 400,
                message: `The task id (${taskId}) sent in the request path does not match the id in the request body (${request.body.id})`
            });
            break;
        }

        case indexOfCurrentTask === -1: {
            response.status(404).send({
                error: 404,
                message: `Cannot find task with id ${taskId}`
            });
            break;
        }

        default: {
            const task = { ...currentTask, ...request.body };
            tasks.splice(indexOfCurrentTask, 1, task);
            response.status(200).send( task );
            break;
        }

    }

});

// IDEMPOTENT: Don't delete more than the same item each request 
// double requests should ignore the second
app.delete("/tasks/:taskId", ( request, response ) => {
    
    const taskId = Number(request.params.taskId);
    const indexOfCurrentTask = tasks.map(task=>task.id).indexOf(taskId);
    
    switch( true ){

        case indexOfCurrentTask === -1: {
            response.status(404).send({
                error: 404,
                message: `Cannot find task with id ${taskId}`
            });
            break;
        }

        default: {
            tasks.splice(indexOfCurrentTask, 1);
            response.status(204).send();
            break;
        }

    }

});

app.listen(port, () => {
    console.log(`Web Server Started and listening on localhost:${port}`);
});

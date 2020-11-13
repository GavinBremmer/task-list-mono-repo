// function getTaskId( task:any ){
//     return task.id;
// }

// const getTaskId = task => task.id;

const tasks = [{
    id: 1
}, {
    id: 2,
    name: "hello"
}, {
    id: 3,
    name: "hello"
}];

tasks.find( task => task.id === 1 )

const newArray = tasks.filter( task => task.id > 1 ).map( task => {
    task.name = "Hello" 
    return task;
});


'use strict'

const AWS=require('aws-sdk')


const dynamodb=new AWS.DynamoDB.DocumentClient({
    region:'localhost',
    endpoint: 'http://localhost:8000'
})

module.exports.update=async(event)=>{
    let updatedTodo;
    const id=event.pathParameters.id
    const timestamp=new Date().getTime();
    const data=JSON.parse(event.body)
    if(typeof data.task!=='string' && typeof data.completed!=='boolean' ){
       // console.log(typeof data.completed)
        console.log("Validation Failed.");
        return{
            statusCode:400,
            headers:{'Content-Type':'text/plain'},
            body: JSON.stringify({
                task:data.task,
                completed:data.completed
        })
    }
    }
    const params={
        TableName:process.env.TODO_TABLE,
        Key:{
            "id":id
        },
        ExpressionAttributeNames:{
            '#todo_task':'task',
            '#todo_completed':'completed'
        },
        ExpressionAttributeValues:{
            ':task':data.task,
            ':completed':data.completed,
            ':updatedAt':timestamp
        },
        UpdateExpression: 'SET #todo_task=:task,#todo_completed=:completed,updatedAt=:updatedAt',
        ReturnValues:'ALL_NEW',

    }
    try{
        const result=dynamodb.update(params).promise();
        updatedTodo=result
        console.log(result)
    }catch(error){
        console.log(error);
        return{
            statusCode:error.statusCode,
            headers:{'Content-Type':'text/plain'},
            body:'could not fetch the todo item.'
        }

    }
    
    return{
        statusCode:200,
        body:JSON.stringify(updatedTodo)
    }
}
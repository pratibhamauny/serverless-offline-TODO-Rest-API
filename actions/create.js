'use strict'

const AWS=require('aws-sdk')
const uuid4 = require('uuid4')

const dynamodb=new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})

module.exports.create=async(event)=>{
    const data=JSON.parse(event.body)
    console.log(data)
    const timestamp=new Date().getTime();
    if(typeof data.task!=='string'){
        console.error('Validation Failed.')
        return{
            statusCode:400,
            headers: {'Content-Type':'text/plain'},
            body: 'Could not create the todo item'
        }
    }

    const newTodo={
        id:uuid4(),
        task:data.task,
        completed:data.completed,
        createdAt:timestamp,
        updatedAt:timestamp
    }
    const params={
        TableName: process.env.TODO_TABLE,
        Item:newTodo
    }
   await dynamodb.put(params).promise();
   // console.log(result)
    return{
        statusCode:200,
        body:JSON.stringify(params.Item)
    }
    
}
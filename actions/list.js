'use strict'

const AWS=require('aws-sdk')
const dynamodb=new AWS.DynamoDB.DocumentClient({
    region: 'local',
    endpoint:'http://localhost:8000'
})

module.exports.list=async(event)=>{
let todos;
const params={
    TableName: process.env.TODO_TABLE
}

try{
    const result=await dynamodb.scan(params).promise();
    todos=result.Items
}catch(error){
    console.log(error)
    return{
        statusCode:400,
        body:JSON.stringify(error)
    }
}
return{
    statusCode:200,
    body:JSON.stringify(todos)
}
}
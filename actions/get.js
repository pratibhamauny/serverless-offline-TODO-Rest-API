'use strict'

const AWS=require('aws-sdk')
const dynamodb=new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})

module.exports.get=async(event)=>{
    let todo;
    
    console.log(event.pathParameters.id)
    const params={
        TableName: process.env.TODO_TABLE,
        Key:{
            "id":event.pathParameters.id
        }
    }
    try{
       const result=await dynamodb.get(params).promise();
       todo=result.Item
    }
    catch(error){
        return{
            statusCode:400,
            body:JSON.stringify(error)
        }
    }
    return{
        statusCode:200,
        body:JSON.stringify(todo)
    }
}
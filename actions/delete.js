'use strict'

const AWS=require("aws-sdk")

const dynamodb=new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})

module.exports.delete=async(event)=>{
    const id=event.pathParameters.id
    const params={
        TableName: process.env.TODO_TABLE,
        Key:{
            "id":id
        }
    }
try{
    dynamodb.delete(params).promise()
}catch(error){
    console.log(error)
    return{
        statusCode:400,
        body:JSON.stringify(error)
    }
}
return {
    statusCode:200,
    body:JSON.stringify("Todo deleted successfully.")
}
}
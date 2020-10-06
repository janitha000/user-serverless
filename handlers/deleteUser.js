const AWS = require('aws-sdk')
const middleware = require('../common/middleware')

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const deleteUser = async (event, context) => {
    const { id } = event.pathParameters;

    const params = {
        TableName: 'UserTable-dev',
        Key: { id },
    };

    try {
        await dynamoDB.delete(params).promise();
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
    };
}

export const handler = deleteUser;
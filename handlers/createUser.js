const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');
const middleware = require('../common/middleware')

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const createUser = async (event, context) => {
    const { name } = event.body;
    const now = new Date();

    const user = {
        id: uuidv4(),
        name: name,
        created: now.toISOString(),
        updated: now.toISOString(),
        done: false,
    };

    try {
        await dynamoDB.put({ TableName: 'UserTable-dev', Item: user }).promise();
    }
    catch (err) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 201,
        body: JSON.stringify(user),
    };
}

// export const handler = middleware(createUser)
export const handler = createUser

const AWS = require('aws-sdk')
const middleware = require('../common/middleware')

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getUser = async (event, context) => {
    let users;

    try {
        const result = await dynamoDB
            .scan({
                TableName: 'UserTable-dev',
            })
            .promise();
        users = result.Items;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(users),
    };
}

//export const handler = middleware(getUser);
export const handler = getUser
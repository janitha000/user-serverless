const AWS = require('aws-sdk')
const middleware = require('../common/middleware')

const dynamoDB = new AWS.DynamoDB.DocumentClient();



const updateUser = async (event, context) => {
    const { id } = event.pathParameters;
    const { name } = event.body;
    const now = new Date();

    if (!name) {
        throw new createError.BadRequest(
            'Name must be provided'
        );
    }

    const updatedAttributes = [];
    const expressionAttributeValues = {};

    if (name) {
        updatedAttributes.push(`name = :name`);
        expressionAttributeValues[':name'] = name;
    }

    updatedAttributes.push(`updated = :updated`);
    expressionAttributeValues[':updated'] = new Date().toISOString();

    const updateExpression = `set ${updatedAttributes.join(', ')}`;

    const params = {
        TableName: 'UserTable-dev',
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    };

    let updatedUser;

    try {
        const result = await dynamoDB.update(params).promise();
        updatedUser = result.Attributes;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedUser),
    };
}

export const handler = updateUser;
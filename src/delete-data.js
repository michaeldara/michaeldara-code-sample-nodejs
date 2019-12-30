const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

const tableName = 'SchoolStudents';

/**
 * The entry point into the lambda
 *
 * @param {Object} event
 */
exports.handler = async (event) => {
  // Delete table from dynamodb (more efficient than deleting all records from table)

  var params = {
      TableName : tableName
  };

    var deleteObjectPromise =  dynamodb.deleteTable(params).promise();

    await deleteObjectPromise.then(function () {
        //console.log("delete table succeeded");
    })
};

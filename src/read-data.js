const AWS = require('aws-sdk');
const validator = require('validator');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: new AWS.Endpoint('http://localhost:8000'),
  region: 'us-west-2',
  // what could you do to improve performance?
  //Turning off request/response type conversion to dynamodb will improve performance
  convertResponseTypes: false
});

const tableName = 'SchoolStudents';
const studentLastNameGsiName = 'studentLastNameGsi';
/**
 * The entry point into the lambda
 *
 * @param {Object} event
 * @param {string} event.schoolId
 * @param {string} event.studentId
 * @param {string} [event.studentLastName]
 */
exports.handler = async (event) => {
  // TODO use the AWS.DynamoDB.DocumentClient to write a query against the 'SchoolStudents' table and return the results.
  // The 'SchoolStudents' table key is composed of schoolId (partition key) and studentId (range key).

  // TODO (extra credit) if event.studentLastName exists then query using the 'studentLastNameGsi' GSI and return the results.

  // TODO (extra credit) limit the amount of records returned in the query to 5 and then implement the logic to return all
  //  pages of records found by the query (uncomment the test which exercises this functionality)

  var params = {};
  var results = {};
  var queryObjectPromise = null;

  if (event.studentLastName == undefined || validator.isEmpty(event.studentLastName) == true) {
    params = {
      TableName: tableName,
      Key: {
        schoolId: event.schoolId,
        studentId: event.studentId,
      },
      Limit: event.Limit
    };
    queryObjectPromise = dynamodb.scan(params).promise();
  } else {
    console.log("     STUDENT LAST NAME PRESENT. QUERYING USING GSI");
    params = {
      TableName: tableName,
      IndexName: 'studentLastNameGsi',
      KeyConditionExpression: '#studentLastName = :last_name',
      ExpressionAttributeNames: { '#studentLastName': 'studentLastName' },
      ExpressionAttributeValues: { ':last_name': event.studentLastName },
      Limit: event.Limit
    };
    queryObjectPromise = dynamodb.query(params).promise();
  }

  await queryObjectPromise.then(function (data) {
    //console.log("Query Item succeeded: ", data.Items[0]);
    results = data.Items;

  }).catch(function (err) {
    console.log("Unable to read item. Error JSON: ", JSON.stringify(err, null, 2));

  });

  return results;

};
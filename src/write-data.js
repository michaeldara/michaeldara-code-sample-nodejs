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

/**
 * The entry point into the lambda
 *
 * @param {Object} event
 * @param {string} event.schoolId
 * @param {string} event.schoolName
 * @param {string} event.studentId
 * @param {string} event.studentFirstName
 * @param {string} event.studentLastName
 * @param {string} event.studentGrade
 */
exports.handler = async (event) => {
  // TODO validate that all expected attributes are present (assume they are all required)
  // TODO use the AWS.DynamoDB.DocumentClient to save the 'SchoolStudent' record
  // The 'SchoolStudents' table key is composed of schoolId (partition key) and studentId (range key).

  //validate all fields as required.
  if(event.schoolId == undefined || validator.isEmpty(event.schoolId) == true)
     throw Error("schoolId is required");
  else if(event.schoolName == undefined || validator.isEmpty(event.schoolName) == true)
     throw Error("schoolName is required");
  else if(event.studentId == undefined || validator.isEmpty(event.studentId) == true)
     throw Error("studentId is required");
  else if(event.studentFirstName == undefined || validator.isEmpty(event.studentFirstName) == true)
     throw Error("studentFirstName is required");
  else if(event.studentLastName == undefined || validator.isEmpty(event.studentLastName) == true)
     throw Error("studentLastName is required");
  else if(event.studentGrade == undefined || validator.isEmpty(event.studentGrade) == true)
     throw Error("studentGrade is required");

  //construct params and validate required fields
  const params = {
      TableName: tableName,
      Item: {
        "schoolId": event.schoolId,
        "schoolName": event.schoolName,
        "studentId": event.studentId,
        "studentFirstName": event.studentFirstName,
        "studentLastName": event.studentLastName,
        "studentGrade": event.studentGrade,
      },
    };

    var putObjectPromise =  dynamodb.put(params).promise();

    await putObjectPromise.then(function (data) {
       // console.log("put Item succeeded");
    })
};
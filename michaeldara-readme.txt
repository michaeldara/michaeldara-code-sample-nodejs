1) Install python with pip3
2) Install nodejs
3) install awsclient using pip3
   pip3 install awscli
   aws --version
   where aws
4) npm install --save-dev chai
5) npm install --save-dev mocha
6) npm install --save-dev validator
7) configure aws
   fakeuser
   fakesecretkey
   us-west-2
   json
   Cli configuration file is at C:\Users\15169\.aws\config
   type C:\Users\15169\.aws\config
8) start dynamodb
   java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
9) List tables
   aws dynamodb list-tables --endpoint-url http://localhost:8000
   aws dynamodb scan --table-name SchoolStudents --endpoint-url http://localhost:8000
   aws dynamodb delete-table --table-name SchoolStudents --endpoint-url http://localhost:8000
10) to run test: type below command from root directory of the project
   mocha
   
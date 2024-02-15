# AWS-Lambda-Node-PostgreSQL-Template
A template to create your AWS Lambda function using Node.js. It covers connecting to a PostgreSQL database, writing queries, fetching results, and sending a request to the desired endpoint.

1. Create an 'index.js' file.
2. Install the pg module using the command 'npm install pg' – this will generate the 'node_modules' folder and a 'package-lock.json' file.
3. Define the exports.handler method to execute the code.
4. Add and import all variables related to your server and database.
5. Establish a connection with your database.
6. Write a query and fetch the data.
7. Disconnect from the database if access is no longer needed.
8. Implement another method to send a request to your server's endpoint.
9. Once you have finished writing the code, compress the contents of your project's root folder and upload the zip file to your Lambda function.
10. Create a new scheduler in Amazon EventBridge to trigger this Lambda function.

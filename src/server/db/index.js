//Everything needed to set up the connection to the Database
import mysql from "mysql2";
import dotenv from "dotenv";

//List of the keys that MUST exist in our .env file:
const reqEnvKeys = ["PORT", "DB_NAME", "DB_HOST", "DB_USER", "DB_PASS"];
//Configure the environment variables
const status = dotenv.config();
//Verify that the necessary keys are present
const loadedKeys = Object.keys(process.env);
if (status.error || reqEnvKeys.some((key) => !loadedKeys.includes(key))) {
    throw new Error("Could not configure environment");
}

//Connect to the DB using the loaded env variables
const connection = mysql.createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});
//Load the port from the environment variables file
const PORT = process.env.PORT;

//Asynchronous function because it returns a Promise object.
//The purpose of this function is to simplify the db querying process.
//We simply invoke this function and give it the SQL command to execute
//and it takes care of all the response/error possibilities for us.
function query(queryStr, values){
    return new Promise((resolve, reject) => {
        connection.query(queryStr, values, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

//Export the function needed to query the database, 
//as well as the port to run the server on
export {
    query,
    PORT
}
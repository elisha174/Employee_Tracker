import express from 'express';
//import { QueryResult } from 'pg';
//import { pool, connectToDb } from './connection.js';
import { connectToDb } from './connection.js';
import { startEmployeeManager } from './index.js';
await connectToDb();
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Start the program
startEmployeeManager();
// Default response for any other request (Not Found)
app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

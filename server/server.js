import express from 'express';
import { promises as fs } from 'fs';
const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;

//MongoDB Lab
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

import pg from 'pg';

// Middleware to parse JSON bodies
app.use(express.json());

//Read environment variables values from .env
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const { Pool } = pg;

// PostgreSQL pool configuration
const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: 'postgres',
    port: 5432,
});



// Endpoint to read and send JSON file content
app.get('/socks', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




//route handler to verify correct username and password
app.post('/socks/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const result = await
            pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2',
                [username, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ uid: result.rows[0].uid });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//For previous lab exercise
app.post('/socks', async (req, res) => {
    try {
        // Obligatory reference to POST Malone
        console.log("If POST Malone were a sock, he'd be the one with the most colorful pattern.");
        // Simulate creating a user
        const { username, email } = req.body;
        if (!username || !email) {
            // Bad request if username or email is missing
            return res.status(400).send({ error: 'Username and email are required.' });
        }
        // Respond with the created user information and a 201 Created status
        res.status(201).send({
            status: 'success',
            location: 'http://localhost:3000/users/1234', // This URL should point to the newly created user
            message: 'User created successfully.'
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});


// //Delete route handler
// app.delete('/socks/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('Deleting sock with ID:', id);
//         res.status(200).send('Sock deleted successfully');
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
//     }
// });

//Put route handler 
app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email, // This URL should point to the newly created user
            message: 'User updated successfully.'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

//Get route handler
app.get('/socks/:color', async (req, res) => {

    //const color = req.params.color
    const { color } = req.params;

    if (!color) {
        return res.status(400).json({ error: 'Color parameter is required.' });
    }

    try {

        console.log('Looking up socks which match the color:', color);

        const sock1 = {
            userId: "667",
            sockDetails: {
                size: "Small",
                color: "Red",
                pattern: "striped",
                material: "Cotton",
                condition: "New",
                forFoot: "Right",
            },
            additionalFeatures: {
                waterResistant: false,
                padded: false,
                antiBacterial: false,
            },
            addedTimestamp: "fake-timestamp1",
        }
        const sock2 = {
            userId: "657",
            sockDetails: {
                size: "Large",
                color: "Blue",
                pattern: "striped",
                material: "Cotton",
                condition: "Used",
                forFoot: "Left",
            },
            additionalFeatures: {
                waterResistant: true,
                padded: false,
                antiBacterial: true,
            },
            addedTimestamp: "fake-timestamp2",
        }
        const sock3 = {
            userId: "647",
            sockDetails: {
                size: "Medium",
                color: "Red",
                pattern: "Striped",
                material: "Cotton",
                condition: "New",
                forFoot: "Right",
            },
            additionalFeatures: {
                waterResistant: false,
                padded: true,
                antiBacterial: false,
            },
            addedTimestamp: "fake-timestamp3",
        }

        const socksObjList = [sock1, sock2, sock3];

        //Filtering the socks list to see if there is a match to the color 
        if (socksObjList.length !== 0) {

            const fltrdSocks = socksObjList.filter(sock => sock.sockDetails.color === color);

            if (fltrdSocks.length !== 0) {
                res.status(200).send({
                    status: 'success',
                    message: 'Matching color socks found successfully.'
                });

            } else {
                res.status(200).send({
                    status: 'API call was a success',
                    message: 'API call success but no matching color socks found.'
                });
            }
            return fltrdSocks;
        }

    } catch (err) {
        console.error("Error:", err);
        res.status(404).send(`No ${color} socks were found ☹`);
    }
});


//Route handler that can search based on a color value
app.post('/socks/search', async (req, res) => {

    const color = req.body.searchTerm;
    //console.log(req.body);

    if (!color) {
        return res.status(400).json({ error: 'Color parameter is required.' });
    }
    try {
        //Adding code that can search MongoDB based on a color value from the Search text box.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({ "sockDetails.color": color }).toArray();
        //console.log(`${color} socks: ` + JSON.stringify(socks));
        res.json(socks)
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});

//Route handler that can delete a sock when the delete button is clicked.
app.delete('/socks/:id', async (req, res) => {

    const sockID = req.params.id;

    try {
        // TODO: Add code that delete a sock when its delete button is clicked.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const filter = { _id: new ObjectId(sockID) };
        //const status = await collection.deleteOne(filter);
        console.log(status);
        res.json({ message: `Sock with id ${sockID} deleted successfully` });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

//Route handler that adds a sock to MongoDB when a new sock is submitted using the Add Sock form.
// app.post('/socks', async (req, res) => {

//     console.log("starting to post sock");
//     const sockRes = req.body;

//     const newSock = new Object(sockRes);
//     console.log(sockRes);


//     try {
//         // TODO: Add code that adds a sock when a new sock is posted using the Add Sock form.
//         const client = await MongoClient.connect(url);
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const status = await collection.insertOne(newSock);
//         console.log(status);
//         res.json({ message: `Sock for userId ${newSock.userId} added successfully` });
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
//     }
// });


















 // const newSock = {
    //     userId: sockRes.userId,
    //     sockDetails: {
    //         size: sockRes.sockDetails.size,
    //         color:sockRes.sockDetails.color,
    //         pattern: sockRes.sockDetails.pattern,
    //         material: sockRes.sockDetails.material,
    //         condition: sockRes.sockDetails.condition,
    //         forFoot: sockRes.sockDetails.forFoot,
    //     },
    //     additionalFeatures: {
    //         waterResistant: sockRes.additionalFeatures.waterResistant,
    //         padded: sockRes.additionalFeatures.padded,
    //         antiBacterial: sockRes.additionalFeatures.antiBacterial
    //     },
    //     addedTimestamp: sockRes.addedTimestamp,
    // }




// console.log('Hello, world!');

// console.log('Developing in the dev branch.');

// console.log('This change is in the main branch.');
// console.log('Another change in the dev branch.');

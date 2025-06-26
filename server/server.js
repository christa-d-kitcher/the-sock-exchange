import express from 'express';
import { promises as fs } from 'fs';
const app = express();
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get('/socks', async (req, res) => {
    try {
        // Console log the entire request object
        console.log(req);
        // Console log specific parts of the request
        console.log("Headers:", req.headers);
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);
        const data = await fs.readFile('../data/socks.json', 'utf8');
        const jsonObj = JSON.parse(data);
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Middleware to parse JSON bodies
app.use(express.json());

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


//Delete route handler
app.delete('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting sock with ID:', id);
        res.status(200).send('Sock deleted successfully');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

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
        return res.status(400).json({error: 'Color parameter is required.'});
    }

    try {
        
        console.log('Looking up socks which match the color:', color);
        const socksList = []; //how do I call the generic "get" to get the list of all socks?
        const socksObjList = socksList.json();

        //Filtering the socks list to see if there is a match to the color 
        if(socksObjList.length !== 0) {

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
        }
    
    } catch (err) {
        console.error("Error:", err);
        res.status(404).send(`No ${color} socks were found ☹`);
    }
});





// console.log('Hello, world!');

// console.log('Developing in the dev branch.');

// console.log('This change is in the main branch.');
// console.log('Another change in the dev branch.');

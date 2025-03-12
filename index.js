const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  
const Developer = require('./models/Devs');  
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Devs', {
    useNewUrlParser: true,  
    useUnifiedTopology: true
    })
    .then(() => console.log("Database Connected Successfully!!"))
    .catch(err => console.error('Could not connect to the database', err));


app.get('/developers', async (req, res) => {
    try {
        const developers = await Developer.find().sort({ createdAt: -1 });
        res.status(200).json(developers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch developers' });
    }
});

app.get('/developers/:id', async (req, res) => {
    try {
        const developer = await Developer.findById(req.params.id);
        if (!developer) { 
            return res.status(404).json({ error: 'Developer not found' });
        }
        res.status(200).json(developer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch developer' });
    }
});

app.post('/developers', async (req, res) => {
    try {
        const developer = new Developer(req.body);
        await developer.save();
        res.status(201).send(developer);
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to create developer' });
    }
});
app.put('/developers/:id', async (req, res) => {
    try {
        const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  
            runValidators: true,  
        });
        if (!developer) { 
            return res.status(404).json({ error: 'Developer not found' });
        }
        res.status(200).json({ message: "Developer updated successfully", developer });
    } catch (err) {
        res.status(400).json({ error: 'Failed to update developer' });
    }
});

app.delete('/developers/:id', async (req, res) => {
    try {
        const developer = await Developer.findByIdAndDelete(req.params.id);
        if (!developer) {
            return res.status(404).json({ error: 'Developer not found' });
        }
        res.status(200).json({ message: 'Developer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the developer' });
    }
});

app.get('/', (req, res) => {
    res.send("Welcome to Actanos Company API");
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});





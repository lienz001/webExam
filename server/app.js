const express = require('express');
const cors = require('cors');  // For handling cross-origin requests
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable CORS to allow cross-origin requests if frontend is on a different port
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
});

// API endpoint to fetch image file names from the "public/images" directory
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    
    // Read the images directory and get the file names
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Error reading the images directory:', err);
            return res.status(500).json({ error: 'Unable to fetch images' });
        }

        // Filter for image files only
        const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
        
        // Send the image files as JSON
        res.json(imageFiles);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

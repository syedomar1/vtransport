import express from 'express';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'data_routes')));

app.get('/api/routesData', async (req, res) => {
    try {
        const response = await fetch('/data_routes/routes_data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const routesData = await response.json();

        // Sending the routes data as JSON response
        res.json(routesData);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

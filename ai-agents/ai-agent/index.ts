import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Example route
app.get('/', (req: Request, res: Response) => {
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

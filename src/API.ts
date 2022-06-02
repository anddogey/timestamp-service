import express from 'express';
import cors from 'cors';

export class API {
    static start() {
        const app = express();
        const port = process.env.PORT || 80;
        app.use(express.json());
        app.use(cors({ optionsSuccessStatus: 200 }));

        app.get('/', (req, res) => {
            res.send('Hello world!');
        });

        app.get('/api/:date?', (req, res) => {
            const date = req.params.date;
            if (!date) {
                res.json({
                    unix: new Date().getTime(),
                    utc: new Date().toUTCString(),
                });
                return;
            }
            if (!(new Date(date) instanceof Date)) {
                res.json({
                    error: 'Invalid Date',
                });
                return;
            }
            res.json({
                unix: new Date(date).getTime(),
                utc: new Date(date).toUTCString(),
            });
        });

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
}

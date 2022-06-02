import express from 'express';

export class API {
    static start() {
        const app = express();
        const port = process.env.PORT || 80;
        app.use(express.json());

        app.get('/', (req, res) => {
            res.send('Hello world!');
        });

        app.get('/api/:date?', (req, res) => {
            const date = req.params.date;
            if (!date) {
                res.json({
                    unix: new Date().getTime(),
                    utc: new Date().toString(),
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
                utc: new Date(date).toString(),
            });
        });

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
}

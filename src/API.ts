import express from 'express';

export class API {
    static start() {
        const app = express();
        const port = 80;
        app.use(express.json());
        app.get('/api/:date?', (req, res) => {
            const date = req.params.date;

            if (!date) {
                res.json({
                    unix: new Date().getTime(),
                    utc: new Date().toString(),
                });
                return;
            }
            if (isNaN(Date.parse(date))) {
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

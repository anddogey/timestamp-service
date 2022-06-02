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
            const dateParam = req.params.date;
            if (!dateParam) {
                const now = new Date();
                res.json({
                    unix: now.getTime(),
                    utc: now.toUTCString(),
                });
                return;
            }
            if (/^[0-9]+$/g.test(dateParam)) {
                const dateParamAsNumber = parseInt(dateParam);
                if (!(new Date(dateParamAsNumber) instanceof Date)) {
                    res.json({
                        error: 'Invalid Date',
                    });
                    return;
                }
                res.json({
                    unix: new Date(dateParamAsNumber).getTime(),
                    utc: new Date(dateParamAsNumber).toUTCString(),
                });
                return;
            }
            if (!(new Date(dateParam) instanceof Date)) {
                res.json({
                    error: 'Invalid Date',
                });
                return;
            }
            res.json({
                unix: new Date(dateParam).getTime(),
                utc: new Date(dateParam).toUTCString(),
            });
        });

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
}

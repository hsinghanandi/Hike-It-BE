const express = require('express');
const cors = require('cors');
const app = express();
const mongoConnect = require('./server/db/connection.js');
const router = require('./server/routes/index.js');

app.use(cors());
app.use(express.json());

mongoConnect.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(
            `Connected to HikeIt DB & Server running on port ${
                process.env.PORT || 4000
            }`
        );
    });
});

app.use('/hikeit/api/v1', router);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });

app.get('/', (req, res, next) => {
    res.send('Hike It Server Running!');
});

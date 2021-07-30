const express = require('express');
const app = express();
const port = 3000;
const open = require('open');

app.use('/js', express.static('dist/js'));
app.use('/css/', express.static('dist/css'));
app.use('/fontawesome', express.static('css/fontawesome'));
app.use('/test', express.static('css/test'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sample.html');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    open(`http://localhost:${port}`);
});

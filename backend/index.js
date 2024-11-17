const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { login, createAccount, getAccount, updateAccount } = require('./accounts');

const app = express();
const PORT = 5032;

app.use(cors());
app.use(bodyParser.json());

// Login and account 
app.post('/login', login);
app.post('/createAccount', createAccount);
app.get('/getAccount', getAccount);
app.put('/updateAccount', updateAccount);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

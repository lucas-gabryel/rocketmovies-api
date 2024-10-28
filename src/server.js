const express = require('express');

const routes = require('./routes');

const app = express();
app.use(express.json()); // informa ao servidor que as requisições serão feitas em JSON

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
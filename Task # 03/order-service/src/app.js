const express = require('express');
const app = express();
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

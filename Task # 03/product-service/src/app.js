const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

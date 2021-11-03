const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (_req, res) => {
	res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(PORT, () => {
	console.log(`* SERVER * listening on port ${PORT}`);
});

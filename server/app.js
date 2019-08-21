const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cros origin request
app.use(cors());

//connect to mlab database
mongoose.connect(
	`mongodb+srv://abbey:${encodeURIComponent(
		'THEdifference2001?'
	)}@graphqltest-hviu9.mongodb.net/test?retryWrites=true&w=majority`,
	{ useNewUrlParser: true }
);
mongoose.connection.once('open', () => {
	console.log('Connected to database');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(4000, () => {
	console.log('now listening for request on port:4000');
});

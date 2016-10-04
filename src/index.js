import SwaggerExpress from 'swagger-express-mw';
import express from 'express';

var server = express();

let config = {
	appRoot: __dirname
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
	if (err) { throw err; }

	swaggerExpress.register(server);

	let port = process.env.PORT || 10010;
	server.listen(port);

	if(swaggerExpress.runner.swagger.paths['/hello']) {
		console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
	}
});

export { server };

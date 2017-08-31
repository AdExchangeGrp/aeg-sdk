import { SecurityService } from '../../src/security-service';
import token from '../../src/token';
import app from '../express-mock';

token
	.on('error', (err) => {

		console.log(err);

	});

describe('SecurityService', async () => {

	it('passwordToken', async () => {

		const security = new SecurityService();
		await security.passwordToken({username: 'test@test.com', password: 'Pa$$w0rd'});

	});

	it('token.callApi: passwordToken', async () => {

		const security = new SecurityService();
		await token.callApi(app, security, 'passwordToken', {username: 'test@test.com', password: 'Pa$$w0rd'});

	});

});

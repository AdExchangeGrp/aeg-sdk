'use strict';

import should from 'should';
import token from '../../src/stormpath/token';

describe('Token', () => {

	describe('#willExpire()', () => {

		it('should be expired', (done) => {
			token.willExpire('eyJraWQiOiIzNTU1RjRJSE1WWFRTQjBXVVpGSlFaUVBKIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI5SGlXbDZTU3RGOW5HQjlsdmpJdnciLCJpYXQiOjE0NDkwNzg1NjIsImlzcyI6Imh0dHBzOi8vYXBpLnN0b3JtcGF0aC5jb20vdjEvYXBwbGljYXRpb25zLzZ4OWkxQnZjVGRhVVRqYldoWWhOYngiLCJzdWIiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FjY291bnRzLzRVYUtSbUZzZEhvWkJ0TFNsY0dXQVgiLCJleHAiOjE0NDkwODIxNjIsInJ0aSI6IjlIaVdobU5ZSXdCQVI1SVpmczJKcyJ9.yY6RMsEoAUk1ruMZUaEo8lP4bn2c9zcXW9-Hn2IZ4Xo', 3600, (err) => {
				should.exist(err);
				done();
			});
		});

	});

});
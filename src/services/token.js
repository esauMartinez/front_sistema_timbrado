module.exports = token = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			'auth-token': `${token}`
		}
	};

	return config;
}
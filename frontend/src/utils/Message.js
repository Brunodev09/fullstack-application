export default class Message {
	constructor(type, message) {
		if (typeof type !== 'string' || typeof message !== 'string') {
			type = type + '';
			message = message + '';
		}
		const types = {
			ok: 'success',
			warn: 'warning',
			err: 'error'
		};
		this.type = types[type];
		this.message = message;
		if (!this.type) throw new Error('No such type of message! Message types: ok, warn or err!');
	}
}

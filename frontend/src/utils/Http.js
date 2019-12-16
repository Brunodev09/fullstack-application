
export 
class Options {
	constructor(method, body, headers) {
		this.method = method;
		// this.uri = uri;
		if (body) this.body = JSON.stringify(body);
		if (headers) this.headers = headers;
	}
}

/**
 * Lightweight Http class to make requests and point to services. GET, POST, PUT and DELETE.
 * @param {string} host
 * @returns {object} { key: value } Object literal for mandatory headers.
 */
class Http {
	constructor(host, defaultHeaders) {
		this.host = host;
		this.defaultHeaders = defaultHeaders || {};
	}

	setHeader(key, value) {
		this.defaultHeaders[key] = value;
	}

	request(method, url, body, headers = {}) {
		url = `${this.host}${url}`;

		if (!(body instanceof FormData))
			this.setHeader('Content-Type', 'application/json');

		for (let header in headers) {
			this.setHeader(header, headers[header]);
		}
		try {
			return new Promise(async (resolve, reject) => {
				try {
					const req = await fetch(
						new Request(
							url,
							new Options(method, body, this.defaultHeaders)
						)
					);
					if (req && (req.status + "")[0] !== "2") reject(req);
					const parsed = await req.json();
					console.log(parsed);
					if (parsed) resolve(parsed);
				} catch (e) {
					console.error(e);
					reject(e);
				}
			});
		} catch (error) {
			throw error;
		}
	}

	get(url, headers) {
		return this.request('GET', url, null, headers);
	}

	post(url, body, headers) {
		return this.request('POST', url, body, headers);
	}

	put(url, body, headers) {
		return this.request('PUT', url, body, headers);
	}

	delete(url, headers) {
		return this.request('DELETE', url, null, headers);
	}
}

/**
 * Singleton instances to point to each service.
 */
export const httpSubmit = new Http('http://localhost:5001', {});
export const httpAdmin = new Http('http://localhost:5000', {});


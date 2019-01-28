import config from '@bradenhc/client-config';

class ApiGateway {
    constructor() {
        this.baseUrl = null;
        this.initialized = false;
    }

    init(cb) {
        config.load(errs => {
            if (errs) console.log(errs);
            this.initialized = true;
            this.baseUrl = `http://${config.get('api.host')}/api/${config.get('api.version')}`;
            cb(errs);
        });
    }

    get(path, cb) {
        this._request('GET', path, null, cb);
    }

    post(path, data, cb) {
        this._request('POST', path, data, cb);
    }

    put(path, data, cb) {
        this._request('PUT', path, data, cb);
    }

    delete(path, cb) {
        this._request('DELETE', path, null, cb);
    }

    _request(method, path, data, cb) {
        if (!this.initialized) {
            this.init(err => {
                if (err) return cb(new Error('Failed to make request: ' + err.message));
                this._sendRequest(method, path, data, cb);
            });
        } else {
            this._sendRequest(method, path, data, cb);
        }
    }

    _sendRequest(method, path, data, cb) {
        let success = false;
        let options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };
        if (data) options.body = JSON.stringify(data);
        fetch(this.baseUrl + path, options)
            .then(res => {
                success = res.ok;
                return res.json();
            })
            .then(data => {
                if (!success) return cb(data);
                cb(null, data);
            })
            .catch(err => cb(err, null));
    }
}

const gateway = new ApiGateway();

export default gateway;

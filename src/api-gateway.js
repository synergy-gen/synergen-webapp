import config from '@bradenhc/client-config';

class ApiGateway {
    constructor() {
        this.baseUrl = null;
        this.initialized = false;
        this.token = this._getCookie('auth');
    }

    init(cb) {
        config.load(errs => {
            if (errs) console.log(errs);
            this.initialized = true;
            this.baseUrl = `${config.get('api.scheme')}://${config.get('api.host')}/api/${config.get('api.version')}`;
            cb(null);
        });
    }

    setToken(token) {
        this.token = token;
        document.cookie = 'auth=' + token + '; path=/';
    }

    deleteToken() {
        this.token = null;
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    get(path, cb) {
        this._request('GET', path, null, cb);
    }

    post(path, data, cb) {
        this._request('POST', path, data, cb);
    }

    patch(path, data, cb) {
        this._request('PATCH', path, data, cb);
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
            }
        };
        if (this.token) options.headers['Authorization'] = 'Bearer ' + this.token;
        if (data) options.body = JSON.stringify(data);
        let url = path.indexOf('http') < 0 ? this.baseUrl + path : path;
        fetch(url, options)
            .then(
                res => {
                    success = res.ok;
                    return res.json();
                },
                err => cb(err, null)
            )
            .then(
                data => {
                    if (!success) return cb(data);
                    cb(null, data);
                },
                err => cb(err, null)
            );
    }

    _getCookie(cname) {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }
}

const gateway = new ApiGateway();

export default gateway;

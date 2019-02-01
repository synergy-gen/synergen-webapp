import api from '../api-gateway';

class AuthController {
    constructor() {
        this.isAuthenticated = null;
        this.user = null;
    }

    authenticate(username, password, cb) {
        api.put('/auth', { username, password }, (err, res) => {
            if (err) return cb(err);
            this.isAuthenticated = true;
            this.user = res.content.user;
            return cb(null, res);
        });
    }

    register(form, cb) {
        let user = {
            name: form.name,
            username: form.username,
            email: form.email,
            username: form.username,
            password: form.password
        };
        api.post('/users', user, (err, res) => {
            if (err) return cb(err);
            this.authenticate(user.username, user.password, cb);
        });
    }

    verify(cb) {
        api.get('/auth', (err, res) => {
            if (err) {
                this.isAuthenticated = false;
                return cb(err);
            }
            this.isAuthenticated = true;
            this.user = res.content.user;
            return cb(null, this.user);
        });
    }
}

const controller = new AuthController();

export default controller;

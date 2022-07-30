const {loginCheck} = require('../controller/user');
const {SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    if (method === 'POST' && req.path === '/api/user/login') {
        const {userName, password} = req.body;
        console.log(req.body, "req.body")
        const result = loginCheck(userName, password);
        if (result) {
            return new SuccessModel(result)
        }
        return new ErrorModel('登陆失败')
    }
}

module.exports = handleUserRouter
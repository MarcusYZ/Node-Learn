const  loginCheck = (userName, password) => {
    console.log(userName, password, "data")
    if (userName === 'zhangSan' && password === '123' ) {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}
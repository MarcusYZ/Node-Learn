const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 异步处post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return;
        }
        // 如果非 json 形式怎么返回
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return;
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData));
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[0])

    // 解析query 
    req.query = querystring.parse(url.split('?')[1]);
    // 处理post的接口，用req.on 获取传递过来的数据。 具体再到路由里去找
    getPostData(req).then(postData => {
        req.body = postData; 
        const blogResult =  handleBlogRouter(req, res); // 返回一个promise 对象
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData));
            })
            return
        }

        // 处理 user 路由
        const userData = handleUserRouter(req, res); // 返回用户数据
        if (userData) {
            res.end(JSON.stringify(userData))
            return; 
        }

        // 未命中路由
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.write("404 Not Found\n");
        res.end();
    })
}

module.exports = serverHandle

// process.env.NODE_ENV
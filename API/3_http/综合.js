const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method // 获取方法
    const url = req.url // 获取路径
    const path = url.split('?')[0] // 获取路径
    const query = querystring.parse(url.split('?')[1]) // 获取搜索信息

    // 设置返回格式为 JSON
    res.setHeader('Content-type', 'application/json') // 服务器返回信息设置成json

    // 返回的数据
    const resData = {
        method,
        url,
        path,
        query
    }

    // 返回
    if (method === 'GET') {
        res.end(
            JSON.stringify(resData)
        )
    }
    if (method === 'POST') {
        let postData = ''
        // req.on(data)指每次发送的数据；
        req.on('data', chunk => {
            console.log(chunk, "chunk");
            postData += chunk.toString()
        })
        // req.on(end)表示数据发送完成
        req.on('end', () => {
            resData.postData = postData
            // 返回
            res.end( 
                JSON.stringify(resData)
            )
        })
    }
})

server.listen(8000)
console.log('OK')

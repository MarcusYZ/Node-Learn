const http = require('http')
const { type } = require('os')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'})
    res.end('<h1>hello world</h1>')
})

server.listen(3000, () => {
    console.log('listen 3000')
})

if (! String.prototype.includes) {
    Object.defineProperties(String.prototype, "includes", {
        value: function (searchString, position = 0) {
            if (typeof position !== 'number') {
                position = 0
            }
            if (position + searchString.length > this.length) {
                return false
            } else {
                return this.indexOf(searchString, position) !== -1
            }
        }
    })
}

console.log("555".includes("4")) 
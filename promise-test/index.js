const fs = require('fs');

const path = require('path');

// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', fileName) // __dirname 当前文件路径
//     fs.readFile(fullFileName, (err, data)  => {
//         if (err) {
//             console.error(err)
//             return;
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// 测试
// getFileContent('a.json', aData => {
//     console.log("aData", aData)
//     getFileContent(aData.next, bData => {
//         console.log(bData, 'bData');
//         getFileContent(bData.next, cData => {
//             console.log(cData, 'cData'); 
//         });
//     });
// })

// 用promise 获取文件内容

function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName) 
        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise;
}

getFileContent('a.json').then(aData => {
    console.log('aData', aData);
    return getFileContent(aData.next)  
}).then(bData => {
    console.log('bData', bData);
    return getFileContent(bData.next);
}).then(cData => {
    console.log(cData, "cData");
})

// async/await koa2 原生支持 async/await
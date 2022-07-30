const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）这里增加  1=1 避免报错 
    let sql = `select * from blogs where  1=1 `
    console.log(sql, "sql");
    if (author) {
        sql + `and author='${author}'`
    }
    if(keyword) {
        sql += `and title like '%${keyword}'`
    }
    sql += `order by createtime desc;`
    // 返回 promise
    return exec(sql)
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 this content 属性
    return {
        id: 3 // 表示新建博客拆入到数据表里的id
    }
}
const getDetail = (id) => {
    // 先返回假数据
    return  {
        id: 1,
        title: '标题1',
        content: '内容1',
        createTime: 1659001094292,
    }
}  

const updateDetail = (id, blogData = {}) => {
    // blogData 是一个博客对象，包含title、 content属性
    console.log('update log', id, blogData);
    return false;
}

const delBlog = (id) => {
    // 删除博客的id
    
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateDetail,
    delBlog
}
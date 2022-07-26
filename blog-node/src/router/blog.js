const { getList, getDetail, newBlog, updateDetail, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST 
    const id = req.query.id;

    //  获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id);
        return new SuccessModel(data);
    }
    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body);
        return new SuccessModel(data);

    }
    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateDetail(id, req.body);
        if (result === true) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败')
        }
    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const result = delBlog(id);
        if (result === true) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter
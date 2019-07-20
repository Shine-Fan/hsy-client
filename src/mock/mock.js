// 引入mockjs
const Mock = require('mockjs')

var arr=['aa','bb','cc']

var obj={
    'host':'www.baidu.com',
    'port':'12345',
    'node':'selector'
}

Mock.mock(process.env.API_HOST + 'test',{
    'list|100':[{
       'Id|1-100':100,
       'postId|101-200':200,
    'authorId|201-300':300,
    'time':'@date("yyyy-MM-dd")',
    'content':'@cparagraph',
    'pid|301-400': 400,
    'replyUserId':'@cname'

    }]
})

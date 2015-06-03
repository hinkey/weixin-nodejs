var wechat = require('wechat');
var employees = require('../config/employees');
var config = {
    token: 'PKTaj8f9gNrM',
    appid: 'wxc671906008c8ab8a',
    encodingAESKey: 'S1ZlrQJZkJ3qM9RhVK4nBwkyMUDViPPV44b12MfxdSX'
};

module.exports = function (app) {
    app.use('/wechat', wechat(config, function (req, res, next) {
        // 微信输入信息都在req.weixin上
        var message = req.weixin;
        if (message.Content === 'whoami') {
            //res.reply('你是猪');
            res.reply([
                {
                    title: '推荐的维修厂',
                    description: '里面有具体的说明',
                    picurl: 'http://img4.duitang.com/uploads/item/201207/03/20120703100424_meX8s.jpeg',
                    url: 'http://yuntu.amap.com/share/VFBN7j'
                }
            ]);
        }
        else if (message.EventKey === 'bybaike') {
            res.reply('保养百科正在开发中。。。');
        }
        else if (message.EventKey === 'bychangshi') {
            res.reply('保养常识正在开发中。。。');
        }
        else if (message.EventKey === 'brand') {
            res.reply('品牌大全正在开发中。。。');
        }
        else if (message.Content === '1') {
            // 回复屌丝(普通回复)
            res.reply('厂家1，2，3');
        }
        else if (message.Content === '2') {
            //你也可以这样回复text类型的信息
            res.reply('用户的回复用什么形式呢？');
        }
        else if (message.Content === '3') {
            // 回复一段音乐
            res.reply([
                {
                    title: 'qqq',
                    description: 'rtgrtg',
                    picurl: 'http://img4.duitang.com/uploads/item/201207/03/20120703100424_meX8s.jpeg',
                    url: 'http://www.baidu.com/'
                }
            ]);
        }
        else {
            res.reply('欢迎关注本微信，本微信公众平台专注修车客户,菜单里可以看修车厂地图demo,请允许访问定位提示，回复1查看维修厂家，回复2查看用户评价。不知道消费者回复你要什么效果的。');
        }
    }));
    app.get('/employees', employees.findAll);
    app.get('/employees/:id', employees.findById);
    app.get('/employees/:id/reports', employees.findReports);
}
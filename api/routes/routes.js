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
            res.reply('你是猪');
        }
        else if (message.Content === 'whoareyou') {
            res.reply('我是神，联系地址：我问问大地');
        }
        else if (message.Content === '1') {
            // 回复屌丝(普通回复)
            res.reply('1个毛');
        }
        else if (message.Content === '2') {
            //你也可以这样回复text类型的信息
            res.reply({
                content: 'text object',
                type: '挺2'
            });
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
            // 回复高富帅(图文回复)
            res.reply([
                {
                    title: '你来我ww',
                    description: '这是女神与高富帅之间的对话',
                    picurl: 'http://img4.duitang.com/uploads/item/201207/03/20120703100424_meX8s.jpeg',
                    url: 'http://weibo.com/4337365'
                }
            ]);
        }
    }));
    app.get('/employees', employees.findAll);
    app.get('/employees/:id', employees.findById);
    app.get('/employees/:id/reports', employees.findReports);
}
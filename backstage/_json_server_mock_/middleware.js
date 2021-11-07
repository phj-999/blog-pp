/**使用json server时候捕获数据模拟返回 */

module.exports = (req, res, next) => {
    if (req.method === "post" && req.path === "/login") {
        if (req.body.username === 'jack' && req.body.password === '123456') {
            return res.status(200).json({
                user: {
                    token: "123"
                }
            })
        } else {
            return res.status(400).json({ message: "用户名或密码错误" })

        }
    }
    next()
}
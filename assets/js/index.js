$(function () {
    //1.获取用户信息，方便后续更改头像等操作
    getUserInfo()

    //3.退出登录
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (
            index
        ) {
            //do something
            //关闭提示框
            layer.close(index)
            //删除本地token
            localStorage.removeItem('token')
            //页面跳转
            location.href = '/第2遍/code/login.html'
        })
    })
})
//1.封装函数===获取用户信息，方便后续更改头像等操作
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        //  jquery中的Ajax，如果路径中带有my,则需要用请求头获取权限
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function (res) {
            // console.log(res)
            //1.判断用户信息是否查询成功
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //2.成功后，调用用户渲染函数
            renderUser(res.data)
        },
        // //对身份进行验证，不可以直接进入后台首页
        // complete: function (res) {
        //     // console.log(res)
        //     if (
        //         res.responseJSON.sataus == 1 &&
        //         res.responseJSON.message == '身份认证失败！'
        //     ) {
        //         //1.强制清空token
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登陆页面
        //         location.href = '/第2遍/code/login.html'
        //     }
        // },
    })
}
//2.封装用户渲染界面函数
function renderUser(user) {
    //1.渲染用户名
    var uname = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
    //2.判断用户的头像信息，如果有就渲染图片，没有就渲染文字
    if (user.user_pic !== null) {
        // 如果有就渲染图片
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatat').hide()
    } else {
        $('.text-avatat').show().html(uname[0].toUpperCase())
        $('.layui-nav-img').hide()
    }
}

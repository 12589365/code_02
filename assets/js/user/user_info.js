$(function () {
    //1.定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称应该输入1-6位之间'
            }
        },
    })
    initUserInfo()
    //2.初始化用户信息，把后台信息在页面展示
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                // //获取用户信息校验
                // console.log(res.data)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //信息获取成功在form表单显示
                form.val('formUserInfo', res.data)
            },
        })
    }
    //3.重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        //初始化用户信息
        initUserInfo()
    })
    //4.提交用户修改
    $('.layui-form').on('submit', function (e) {
        // 取消form表单的默认提交行为，改为ajax提交
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败')
                } else {
                    layer.msg('信息修改成功')
                    //  刷新父框架里面的用户信息
                    window.parent.getUserInfo()
                }
            },
        })
    })
})

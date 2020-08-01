$(function () {
    //1.点击注册和登录按钮实现切换效果
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //2.自定义表单验证规则
    var form = layui.form
    form.verify({
        pwd: [/^\S{6,12}$/, '密码6-12位，并且不能为空'],
        repwd: function (value) {
            if ($('#reg-pwd').val() != value) {
                alert('两次输入密码不一致')
            }
        },
    })
    //3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // console.log($('#form_reg').serialize())
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                //注册成功后登陆界面显示
                $('#link_login').click()
                //注册表单清空
                $('#link_reg')[0].reset()
            },
        })
    })

    //4.登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //保存token
                localStorage.setItem('token', res.token)
                location.href = '/第2遍/code/index.html'
            },
        })
    })
})

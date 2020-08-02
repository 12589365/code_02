$(function () {
    //1.自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //密码长度
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //新密码和原密码不能相同
        samePwd: function (value) {
            if (value == $('[name="oldPwd"]').val()) {
                return '新密码和旧密码不能相同'
            }
        },
        //二次密码验证
        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次输入的密码不一致'
            }
        },
    })

    //3.修改密码，提交后台
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        //发送ajax
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('失败')
                } else {
                    layer.msg('密码修改成功')
                    // 重置表单
                    $('.layui-form')[0].reset()
                }
            },
        })
    })
})

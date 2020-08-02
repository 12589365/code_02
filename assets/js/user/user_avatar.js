$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview',
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //2.修改上传的图片
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //3.将图片渲染到页面上
    $('#file').on('change', function (e) {
        // console.log(e)
        //1.获取唯一的一个文件
        var file = e.target.files[0]
        //2.原生js的方法，在内存中生成一个图片的路径
        var newImgURL = URL.createObjectURL(file)
        //3.渲染到剪裁区
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //4.图片上传
    $('#btnUpload').on('click', function () {
        //获取base64图片地址
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100,
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // console.log(dataURL)
        //发送ajax请求,
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg('重新校验')
                }
                layui.layer.msg('头像上传成功')
                // 更新父框架中的头像
                window.parent.getUserInfo()
            },
        })
    })
})

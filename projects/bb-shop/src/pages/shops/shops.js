$(function() {
    var shopsName = document.getElementById('shopsName')
    var data = {
        "shopsId": "10010"
    }
    $.ajax({
        url: "shops.json",  // url 里的参数是请求接口地址
        type: 'get',
        data: data,
        dataType: "json",
        success:function(res) {
            if (res.retCode === "200") {
                // 获取数据成功
                var data = res.data
                console.log(data)
                shopsName.textContent = data.shopsName
            }
        }
    })
})
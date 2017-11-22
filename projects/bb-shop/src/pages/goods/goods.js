$(function() {
    var goodsName = document.getElementById('goodsName')
    var data = {
        "goodsId": "10010"
    }
    $.ajax({
        url: "goods.json",
        type: 'get',
        data: data,
        dataType: "json",
        success:function(res) {
            if (res.retCode === "200") {
                // 获取数据成功
                var data = res.data
                console.log(data)
                goodsName.textContent = data.goodsName
            }
        }
    })
})
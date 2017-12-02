$(function($){
    // console.log(123)
    var imgList = $('.carousel-item')
    var len = imgList.length
    // console.log(len)
    var now = 0
    var carouselW = $('carousel-wrapper')[0]
    var timer = null
    imgList[now].style.zIndex = '999'
    now++
    //定义setInterval，使当前项的z-index变为999
    $(add = function(){
        timer = setInterval(function(){
            reset()
            imgList[now].style.zIndex = '999'
            now++
            if(now > 3){
                now = 0
            }
        },1000)
    })
    add()  
    // reset方法，使imgList中所有项的z-index初始化为1
    $(reset = function(){
        for(var i = 0;i < len;i++){
            imgList[i].style.zIndex = '1'
        }
    })

    carouselW.mouseenter(function(){clearInterval(timer)})
    carouselW.mouseleave(function(){add()})    
});
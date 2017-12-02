(function(){
    var imgList = document.getElementsByClassName('carousel-item')
    var len = imgList.length
    var now = 0
    var carouselW = document.getElementsByClassName('carousel-wrapper')[0]
    var timer = null
    imgList[now].style.zIndex = '999'
    now++
    /**
     * add方法，定义setInterval，使当前项的z-index变为999
     */
    var add = function(){
        timer = setInterval(function(){
            reset()
            imgList[now].style.zIndex = '999'
            now++
            if(now > 3){
                now = 0
            }
        },1000)
    }
    add()
    /**
     * reset方法，使imgList中所有项的z-index初始化为1
     */
    var reset = function(){
        for(var i = 0;i < len;i++){
            imgList[i].style.zIndex = '1'
        }
    }
    // mouseenter qingchu timer
    carouselW.addEventListener('mouseenter', function(){
        clearInterval(timer)
    },false)
    carouselW.addEventListener('mouseleave',function(){
            add()
    },false)
})()
const PLACEHOLDER = 'OPPO R11S'
$(function() {
    var hotWords = []
    var $searchInput = $('.search-input')
    $searchInput.focus(function(){
        $(this).attr('placeholder', '')
    }).blur(function(){
        $(this).attr('placeholder', PLACEHOLDER)
    })

    var $searchBtn = $('.search-btn')
    $searchBtn.mouseenter(function(){
        $(this).css('color','#ccc')
    }).mouseleave(function(){
        $(this).css('color','#fff')
    })

    // ajax请求部分

})


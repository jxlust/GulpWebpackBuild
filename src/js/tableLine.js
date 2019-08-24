class TableLine {
    constructor() {

    }
    init() {

    }
}

function initEvent() {
    
}
var liHeight = $('.moveul li').outerHeight();
$("#slidebar").css({
    top: liHeight
});
console.log('liHeight', liHeight);
//var outwidthmargin = $('.moveul li').eq(0).outerWidth(true);
//console.log('第一个paddingleft',$('.moveul li').eq(0).css('paddingLeft'));
let activeEl = $('.moveul li.active');
moveSliderBar(activeEl);

$(".moveul li").mouseenter(function () {
    let _this = $(this);
    _this.addClass('active').siblings('li').removeClass('active');
    moveSliderBar(_this);


});

function moveSliderBar($el) {
    var index = $el.index();
    var liHeight = $el.outerHeight();
    var barWidth = $el.innerWidth();
    var liLeft = $el.position().left + $el.outerWidth(true) - $el.outerWidth();
    $("#slidebar").css({
        left: liLeft,
        top: liHeight,
        opacity: 1,
        width: barWidth
    });
    // contentShow(index);
    contentShow2(index);
}
function contentShow2(index) {
    $('.display-content-lists .item').eq(index).fadeIn().siblings('.item').fadeOut();
}
function contentShow(index) {
    let width = $('.ul-slide-wrap').outerWidth();
    $('.content-lists').animate({
        left: -index * 800 + 'px'
    }, 500);
}
// $(".moveul li").mouseleave(function() {
// 	$("#slidebar").css({
// 		left: "0px"
// 	})
// })

export default TableLine;
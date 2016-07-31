/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
// 预加载
var sourceArr = [
    'images/universal-bg.jpg',
    'images/arrow-left.png',
    'images/arrow-up.png',
    'images/bc.png',
    'images/city.png',
    'images/close.png',
    'images/computer.png',
    'images/computer-content.png',
    'images/cover-content1.png',
    'images/cover-content2.png',
    'images/detail.png',
    'images/end-content1.png',
    'images/end-content2.png',
    'images/light.png',
    'images/line.png',
    'images/loading-bg.jpg',
    'images/logo.png',
    'images/music-off.png',
    'images/music-on.png',
    'images/process-s8b97f2c170.png',
    'images/star-bg.jpg',
    'images/wy.png',
    'images/yc.png',
    'media/bgmusic.mp3'
]; //需要加载的资源列表

new mo.Loader(sourceArr,{
	onLoading : function(count,total){
		console.log('onloading:single loaded:',arguments);
        console.log('加载中...（'+count/total*100+'%）');
        var loadPercent = Math.floor(count/total*100);
        $('#loading-num').html(loadPercent+'%');
	},
	onComplete : function(time){
		console.log('oncomplete:all source loaded:',arguments);
        $('#bg-music').attr('src', 'media/bgmusic.mp3');
        var hideLoading = new TimelineMax({
            onStart: setImages,
            delay: 2,
            onComplete: function () {
                // TweenMax.set('#music-control', {display: 'block', autoAlpha: 1});
                // bgAud.play();
                // showCover();

            }
        });
        hideLoading.to(['#loading-num', '#loading-bg'], 0.6, {autoAlpha: 0})
        .set(['#loading-num', '#loading-bg'], {display: 'none'})
	}
});

function setImages() {
    $('#all').css('background-image', 'url(images/universal-bg.jpg)');
    $('#city').css('background-image', 'url(images/city.png)');
    $('#music-control').css('background-image', 'url(images/music-off.png)');
    $('#process').css('background-image', 'url(images/star-bg.jpg)');
    $('#arrow-up').css('background-image', 'url(images/arrow-up.png)');
    $('#arrow-left').css('background-image', 'url(images/arrow-left.png)');
}

(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动

    });  //Document ready
})(jQuery);

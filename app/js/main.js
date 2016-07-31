/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var jumpTime = 0.8;
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
                // showCity();
                logoShake1.play(0);

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

// 初始抖动
var logoShake1 = new TimelineMax({
    paused: true,
    repeat: 11,
    yoyo: true,
    onComplete: showCity
});
logoShake1.to('#logo', 0.1, {x: -20, ease: Power1.easeInOut});

function showCity() {
    var cityShow = new TimelineMax({
        onComplete: moveLogo
    });
    cityShow.set('#city', {autoAlpha: 1})
    .add('tencent')
    .fromTo('#city', 0.8, {autoAlpha: 0, y: 640}, {autoAlpha: 1, y: 0}, 'tencent')
    .to('#logo', 0.6, {
        x: '-=30',
        y: '-=160',
        ease: Back.easeIn.config(1.6),
        onComplete: function () {
            logoRotation.play(0);
        }
    }, 'tencent')
}

// logo 旋转
var logoRotation = new TimelineMax({
    paused: true,
    repeat: -1
});
logoRotation.to('#logo', 1.2, {rotation: 360, ease: Power0.easeNone});

function moveLogo() {
    var logoMove = new TimelineMax();
    logoMove.to('#logo', jumpTime, {
        bezier:
        [
            {x:'+=40', y: '-=80'},
            {x: '+=240', y: '+=200'}
        ],

        ease: Back.easeIn.config(1.2)
    })
    .to(['#city', '#logo'], 0.6, {x: '-=290', y: '-=40'})
    .to('#logo', 0.6, {x: '+=270', y: '+=100'})
    .to(['#city', '#logo'], 0.6, {x: '-=290', y: '-=300'})
    .to('#logo', jumpTime, {
        bezier:
        [
            {x:'+=80', y: '-=180'},
            {x: '+=330', y: '-=290'}
        ],

        ease: Back.easeIn.config(1.2)
    })
    .to(['#city', '#logo'], 0.6, {x: '-=460'})
    .to('#logo', jumpTime, {
        bezier:
        [
            {x:'+=200', y: '-=40'},
            {x: '+=510', y: '+=350'}
        ],

        ease: Back.easeIn.config(1.2)
    })
    .to(['#city', '#logo'], 0.6, {x: '-=400', y: '-=80'})
    .to('#logo', jumpTime, {
        bezier:
        [
            {x:'+=100', y: '-=100'},
            {x: '+=280', y: '+=500'}
        ],

        ease: Back.easeIn.config(1.2)
    })
    .to('#logo', jumpTime, {
        bezier:
        [
            {x:'+=80', y: '+=16'},
            {x: '+=220', y: '+=220'}
        ],

        ease: Back.easeIn.config(1.2)
    })

}



(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动

    });  //Document ready
})(jQuery);

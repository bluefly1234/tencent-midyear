/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var jumpTime = 0.8;
// 预加载
var sourceArr = [
    'images/logo.png',
    'images/loading-bg.jpg',
    'images/universal-bg.jpg',
    'images/arrow-left.png',
    'images/right.png',
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
    'images/hyyq.png',
    'images/icon.jpg',
    'images/light.png',
    'images/line.png',
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
                TweenMax.set('#music-control', {autoAlpha: 1});
                bgAud.play();
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
    $('#arrow-right').css('background-image', 'url(images/arrow-right.png)');
}

// 音乐初始化
var bgAud = $("#bg-music")[0];
console.log(bgAud);
function initAud(){
 if (bgAud.currentTime){
     console.log("背景音乐开始播放");
     $('#music-control').css('background-image', 'url(images/music-on.png)');
     bgAud.removeEventListener("timeupdate", initAud, false); //只执行一次，防止控制按钮动画无法暂停
 }
}

bgAud.addEventListener("timeupdate", initAud, false);

function playBM() {
 bgAud.play();
 $('#music-control').css('background-image', 'url(images/music-on.png)');
}

function pauseBM() {
 bgAud.pause();

 $('#music-control').css('background-image', 'url(images/music-off.png)');
}

// 音乐控制
$("#music-control").on('touchstart', function(){
 if(bgAud.paused){
   playBM();
 }else{
   pauseBM();
 }
})

// 初始抖动
var logoShake1 = new TimelineMax({
    paused: true,
    repeat: 7,
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
    var logoMove = new TimelineMax({
        onComplete: function () {
            showCover();
            logoRotation.pause(0);
        }
    });
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
    .to('#city', 0.6, {autoAlpha: 0})
    .set('#city', {display: 'none'})
}

function showCover() {
    var coverShow = new TimelineMax({
        onComplete: function () {
            showArrow();
            // 左滑
            touch.on($("#cover"), 'swipeleft', function(ev){
              console.log(ev.type + ' cover');
              hideArrow();
              hideCover();
            });

            // 右滑
            touch.on($("#cover"), 'swiperight', function(ev){
              console.log(ev.type + ' cover');
              hideArrow();
              window.location.reload();
            });
        }
    });
    coverShow.set('#logo', {x: '-=640', y: '-=1100'})
    .set('#cover', {display: 'block'})
    .add('coverLogo')
    .to('#logo', 0.6, {x: '+=40', y: '+=130', ease: Back.easeOut.config(1.2)}, 'coverLogo')
    .from('#cover-content1', 0.6, {autoAlpha: 0, x: '+=240', ease: Back.easeOut.config(1.2)}, 'coverLogo')
    .from('#cover-content2', 0.6, {autoAlpha: 0, y: 200})
}

function hideCover() {
    var coverHide = new TimelineMax({
        onStart: function () {
            logoShake2.play(0);
        }
    });
    coverHide.to('#cover', 0.6, {autoAlpha: 0})
    .set('#cover', {display: 'none'})
}

// 二次抖动
var logoShake2 = new TimelineMax({
    paused: true,
    repeat: 5,
    yoyo: true,
    onComplete: showComputer
});
logoShake2.to('#logo', 0.1, {x: '-=20', ease: Power1.easeInOut});

// 滑动指示箭头动画
var arrowGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
arrowGuide.add('arrowStart')
.to($('#arrow-left'), 0.8, {x: '+=30', ease: Power0.easeNone}, 'arrowStart')
.to($('#arrow-right'), 0.8, {x: '-=30', ease: Power0.easeNone}, 'arrowStart')

function showArrow() {
    TweenMax.fromTo(['#arrow-left', '#arrow-right'], 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
        arrowGuide.play();
    }});
} // 显示左滑箭头并播放箭头动画

function hideArrow() {
    TweenMax.to(['#arrow-left', '#arrow-right'], 0.5, {autoAlpha: 0, onComplete: function () {
        arrowGuide.pause(0);
    }});
} // 隐藏左滑箭头并停止箭头动画

// 滑动指示箭头动画
var arrowLeftGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
arrowLeftGuide.to($('#arrow-left'), 0.8, {x: '+=30', ease: Power0.easeNone})

function showleftArrow() {
    TweenMax.fromTo('#arrow-left', 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
        arrowLeftGuide.play();
    }});
} // 显示左滑箭头并播放箭头动画

function hideLeftArrow() {
    TweenMax.to('#arrow-left', 0.5, {autoAlpha: 0, onComplete: function () {
        arrowLeftGuide.pause(0);
    }});
} // 隐藏左滑箭头并停止箭头动画

function showComputer() {
    var computerShow = new TimelineMax({
        onComplete: function () {
            computerShake.play(0);
        }
    });
    computerShow.set('#computer-container', {display: 'block'})
    .add('computerStart')
    .fromTo('#computer-container', 0.6, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.6)}, 'computerStart')
    .to('#logo', jumpTime, {
        bezier:
        [
            {x:'+=80', y: '+=16'},
            {x: '+=230', y: '+=620'}
        ],

        ease: Bounce.easeOut
    }, '-=0.2')
    .fromTo('#computer-content', 0.8, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
    .fromTo('#light', 0.4 ,{autoAlpha: 0}, {autoAlpha: 1, delay: 1})
}

function showDetail() {
    var detailShow = new TimelineMax({
        delay: 0.5
    });
    detailShow.set('#process-detail-container', {display: 'block'})
    .fromTo('#process-detail-container', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
    .fromTo('#detail', 0.6, {autoAlpha: 0, y: 300}, {autoAlpha: 1, y: 0}, '-=0.2')
}

function closeDetail() {
    var detailHide = new TimelineMax();
    detailHide.to(['#process-detail-container', '#detail'], 0.4, {autoAlpha: 0})
    .set('#process-detail-container', {display: 'none'})
}

$('#close').on('touchstart', closeDetail);

$('#cf').on('touchstart', function () {
    $('#detail-content').css('background-image', 'url(images/bc.png)');
    showDetail();
});

$('#wy').on('touchstart', function () {
    $('#detail-content').css('background-image', 'url(images/wy.png)');
    showDetail();
});

$('#hy').on('touchstart', function () {
    $('#detail-content').css('background-image', 'url(images/yc.png)');
    showDetail();
});

$('#hyyq').on('touchstart', function () {
    $('#detail-content').css('background-image', 'url(images/hyyq.png)');
    showDetail();
});

var cfBreath = new TimelineMax({
    paused: true,
});

cfBreath.to('#cf', 1.6, {autoAlpha: 0.6, ease: Power1.easeInOut, repeat: -1, yoyo: true});

var hyBreath = new TimelineMax({
    paused: true,
});

hyBreath.to('#hy', 1.6, {autoAlpha: 0.5, ease: Power1.easeInOut, repeat: -1, yoyo: true});

var wyBreath = new TimelineMax({
    paused: true,
});

wyBreath.to('#wy', 1.6, {autoAlpha: 0.5, ease: Power1.easeInOut, repeat: -1, yoyo: true});

var hyyqBreath = new TimelineMax({
    paused: true,
});

hyyqBreath.to('#hyyq', 1.6, {autoAlpha: 0.5, ease: Power1.easeInOut, repeat: -1, yoyo: true});


// computer抖动
var computerShake = new TimelineMax({
    paused: true,
    repeat: 11,
    yoyo: true,
    onComplete: hideComputer
});
computerShake.to('#computer-container', 0.1, {x: '-=30', ease: Power1.easeInOut});

// 隐藏电脑
function hideComputer() {
    var computerHide = new TimelineMax({
        onComplete: showProcess
    });
    computerHide.add('computerHideStart')
    .to('#computer-container', 0.6, {scale: 6, ease: Power3.easeOut, force3D: true}, 'computerHideStart')
    .to('#logo', 0.6, {
        autoAlpha: 0
    }, 'computerHideStart')
    .to('#computer-container', 0.4, {autoAlpha: 0})
    .set('#computer-container', {display: 'none', scale: 0})
}

// 显示流程界面
function showProcess() {
    var processShow = new TimelineMax({
        onComplete: function () {
            processFloat.play(0);
            cfBreath.play(0);
            hyBreath.play(0);
            wyBreath.play(0);
            hyyqBreath.play(0);
        }
    });
    processShow.set('#process', {display: 'block', autoAlpha: 1})
    .fromTo('#process', 0.6, {autoAlpha: 0}, {autoAlpha: 1})
}

var processFloat = new TimelineMax({
    paused: true,
    repeat: -1,
    yoyo: true
});
processFloat.to('#process-all', 2, {y: -60, ease: Power1.easeInOut});

Draggable.create("#process", {type:"scrollTop",
    edgeResistance:1,
    throwProps:true,
    onDragStart: function () {
        showArrow();
        // 左滑
        touch.on($("#process"), 'swipeleft', function(ev){
          console.log(ev.type + ' process');
          hideArrow();
          hideProcess();
        });
    }
});

function hideProcess() {
    var processHide = new TimelineMax({
        onStart: function () {
            processFloat.pause(0);
            cfBreath.pause(0);
            hyBreath.pause(0);
            wyBreath.pause(0);
            hyyqBreath.pause(0);
        },
        onComplete: showEnd
    });
    processHide.to('#process', 0.4, {autoAlpha: 0})
    .set(['#process', '#process-detail-container'], {display: 'none'})
}

function showEnd() {
    var endShow = new TimelineMax({
        onComplete: function () {
            showleftArrow();
        }
    });
    endShow.set('#end', {display: 'block', perspective: 500})
    .set('#logo', {scale: 0.8})
    .to('#logo', 0.6, {
        autoAlpha: 1
    })
    .to('#logo', 0.8, {x: -60, y: -200, ease: Back.easeOut.config(1.6)})
    .fromTo('#end-content1', 1.2, {autoAlpha: 0, z: -300}, {autoAlpha: 1, z: 0}, '-=0.8')
    .fromTo('#end-content2', 0.6, {autoAlpha: 0, y: 100}, {autoAlpha: 1, y: 0})

}

(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动

    });  //Document ready
})(jQuery);

/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var jumpTime = 0.8;
var canSwipe = false;
var SWIPEDIRECTION;
// 预加载
var sourceArr = [
    'images/logo.png',
    'images/loading-bg.jpg',
    'images/universal-bg.jpg',
    // 'images/arrow-left.png',
    // 'images/arrow-right.png',
    'images/bc.png',
    'images/city.png',
    'images/close.png',
    'images/computer.png',
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
    'images/process-s64cfe0c5a6.png',
    'images/star-bg.jpg',
    'images/wy.png',
    'images/yc.png',
    'images/cf-light.png',
    'images/hy-light.png',
    'images/wy-light.png',
    'images/hyyq-light.png',
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
    // $('#arrow-up').css('background-image', 'url(images/arrow-up.png)');
    // $('#arrow-left').css('background-image', 'url(images/arrow-left.png)');
    // $('#arrow-right').css('background-image', 'url(images/arrow-right.png)');
    $('#bc-detail').css('background-image', 'url(images/bc.png)');
    $('#cf-light').css('background-image', 'url(images/cf-light.png)');
    $('#hy-light').css('background-image', 'url(images/hy-light.png)');
    $('#wy-light').css('background-image', 'url(images/wy-light.png)');
    $('#hyyq-light').css('background-image', 'url(images/hyyq-light.png)');
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
    cityShow.set('#city', {display: 'block', autoAlpha: 1})
    .add('tencent')
    .fromTo('#city', 0.8, {autoAlpha: 0, y: 640}, {autoAlpha: 1, y: 0}, 'tencent')
    .to('#logo', 0.6, {
        x: -30,
        y: -160,
        ease: Back.easeIn.config(1.6),
        onComplete: function () {
            // logoRotation.play(0);
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
            // logoRotation.pause(0);
        }
    });
    logoMove.to('#logo', jumpTime, {
        bezier:
        [
            {x: 10, y: -240},
            {x: 210, y: 40}
        ],

        ease: Back.easeIn.config(1.2)
    })

    .to('#city', 0.6, {x: -290, y: -40})
    .to('#logo', 0.6, {x: -90, y: 0}, '-=0.6')
    .to('#logo', jumpTime, {
        bezier:
        [
            {x: -30, y: -180},
            {x: 40, y: -490}
        ],

        ease: Back.easeIn.config(1.2)
    })
    .to('#city', 0.6, {x: -760, y: -340}, '-=0.2')
    .to('#city', 0.6, {x: -1040}, '+=0.2')
    .to('#logo', 0.6, {x: -240}, '-=0.6')
    .to('#logo', jumpTime, {
        bezier:
        [
            {x: -40, y: -530},
            {x: 270, y: -140}
        ],

        ease: Back.easeIn.config(1.2)
    })
    .to('#city', 0.6, {x: -1440, y: -420})
    .to('#logo', 0.6, {x: -130, y: -220}, '-=0.6')
    .to('#logo', jumpTime, {
        bezier:
        [
            {x: -30, y: -320},
            {x: 150, y: 280}
        ],

        ease: Back.easeIn.config(1.2)
    })
    .to('#logo', jumpTime, {
        bezier:
        [
            {x: 230, y: -200},
            {x: 370, y: -400}
        ],

        ease: Back.easeIn.config(1.2)
    }, '+=0.1')
    .to('#city', 0.6, {autoAlpha: 0})
    .set('#city', {display: 'none'})
}

function showCover() {
    var coverShow = new TimelineMax({
        onComplete: function () {
            // showArrow();
            canSwipe = true;
            if (canSwipe) {
                // 左滑
                touch.on($("#cover"), 'swipeleft', function(ev){
                    canSwipe = false;
                    SWIPEDIRECTION = 'left';
                    console.log(ev.type + ' cover');
                    // hideArrow();
                    hideCover();
                });

                // 右滑
                touch.on($("#cover"), 'swiperight', function(ev){
                    console.log(ev.type + ' cover');
                    canSwipe = false;
                    SWIPEDIRECTION = 'right';
                    // hideArrow();
                    hideCover();
                    TweenMax.to('#logo', 0.4, {autoAlpha: 0});
                    // window.location.reload();
                });
            }

        }
    });
    coverShow.set('#logo', {x: -370, y: -400})
    .set('#cover', {display: 'block', autoAlpha: 1})
    .add('coverLogo')
    .to('#logo', 0.6, {x: -218, y: -464, ease: Back.easeOut.config(1.2)}, 'coverLogo')
    .from('#cover-content1', 0.6, {autoAlpha: 0, x: '+=240', ease: Back.easeOut.config(1.2)}, 'coverLogo')
    .from('#cover-content2', 0.6, {autoAlpha: 0, y: 200})
}

function hideCover() {
    var coverHide = new TimelineMax({
        onStart: function () {
            if (SWIPEDIRECTION == 'left') {
                logoShake2.play(0);
                SWIPEDIRECTION = '';
            }
        },
        onComplete: function () {
            if (SWIPEDIRECTION == 'right') {
                TweenMax.set('#logo', {autoAlpha: 1, x: 0, y: 0});
                TweenMax.set('#city', { x: 0, y: 0});
                logoShake1.play(0);
                SWIPEDIRECTION = '';
            }
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

// // 滑动指示箭头动画
// var arrowGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
// arrowGuide.add('arrowStart')
// .to($('#arrow-left'), 0.8, {x: '+=30', ease: Power0.easeNone}, 'arrowStart')
// .to($('#arrow-right'), 0.8, {x: '-=30', ease: Power0.easeNone}, 'arrowStart')
//
// function showArrow() {
//     TweenMax.fromTo(['#arrow-left', '#arrow-right'], 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
//         arrowGuide.play(0);
//     }});
// } // 显示左滑箭头并播放箭头动画
//
// function hideArrow() {
//     TweenMax.to(['#arrow-left', '#arrow-right'], 0.5, {autoAlpha: 0, onComplete: function () {
//         arrowGuide.pause(0);
//     }});
// } // 隐藏左滑箭头并停止箭头动画
//
// // 滑动指示箭头动画
// var arrowLeftGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
// arrowLeftGuide.to($('#arrow-left'), 0.8, {x: '+=30', ease: Power0.easeNone})
//
// function showLeftArrow() {
//     TweenMax.fromTo('#arrow-left', 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
//         arrowLeftGuide.play(0);
//     }});
// } // 显示左滑箭头并播放箭头动画
//
// function hideLeftArrow() {
//     TweenMax.to('#arrow-left', 0.5, {autoAlpha: 0, onComplete: function () {
//         arrowLeftGuide.pause(0);
//     }});
// } // 隐藏左滑箭头并停止箭头动画

function showComputer() {
    var computerShow = new TimelineMax({
        onComplete: function () {
            // computerShake.play(0);
            // showProcess();
            hideComputer();
        }
    });
    computerShow
    .set('#computer-container', {display: 'block', autoAlpha: 1})
    // .add('computerStart')
    // .fromTo('#computer-container', 0.6, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.6)}, 'computerStart')
    .to('#logo', 0.3, {
        bezier:
        [
            {x: -150, y: -464},
            {x: 0, y: 0}
        ],
        // ease: Power2.easeOut
        // ease: Bounce.easeOut
    }, '-=0.2')
    // .set('#logo', {autoAlpha: 0})
    // .fromTo('#computer-content', 0.8, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
    .fromTo('#computer-container', 0.2 ,{autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1})
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
    detailHide.to(['#process-detail-container', '#detail', '#detail-content', '#bc-content'], 0.4, {autoAlpha: 0})
    .set('#process-detail-container', {display: 'none'})
}

$('#close').on('touchstart', closeDetail);

$('#cf').on('touchstart', function () {
    TweenMax.set('#bc-content', {autoAlpha: 1});
    showDetail();
});

$('#wy').on('touchstart', function () {
    $('#detail-content').css('background-image', 'url(images/wy.png)');
    TweenMax.set('#detail-content', {autoAlpha: 1});
    showDetail();
});

$('#hy').on('touchstart', function () {
    $('#detail-content').css('background-image', 'url(images/yc.png)');
    TweenMax.set('#detail-content', {autoAlpha: 1});
    showDetail();
});

$('#hyyq').on('touchstart', function () {
    $('#detail-content').css('background-image', 'url(images/hyyq.png)');
    TweenMax.set('#detail-content', {autoAlpha: 1});
    showDetail();
});

Draggable.create("#bc-content", {type:"scrollTop",
    edgeResistance:1,
    throwProps:true
});

var cfBreath = new TimelineMax({
    paused: true,
});

cfBreath.to('#cf-light', 0.6, {autoAlpha: 0.1, ease: Power1.easeInOut, repeat: -1, yoyo: true});

var hyBreath = new TimelineMax({
    paused: true,
});

hyBreath.to('#hy-light', 0.6, {autoAlpha: 0.1, ease: Power1.easeInOut, repeat: -1, yoyo: true});

var wyBreath = new TimelineMax({
    paused: true,
});

wyBreath.to('#wy-light', 0.6, {autoAlpha: 0.1, ease: Power1.easeInOut, repeat: -1, yoyo: true});

var hyyqBreath = new TimelineMax({
    paused: true,
});

hyyqBreath.to('#hyyq-light', 0.6, {autoAlpha: 0.1, ease: Power1.easeInOut, repeat: -1, yoyo: true});


// computer抖动
var computerShake = new TimelineMax({
    paused: true,
    repeat: 5,
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
    .to('#computer-container', 0.6, {scale: 60, ease: Power3.easeOut, force3D: true}, 'computerHideStart')
    .to('#logo', 0.6, {
        autoAlpha: 0
    }, 'computerHideStart')
    .to('#computer-container', 0.4, {autoAlpha: 0})
    .set('#computer-container', {display: 'none', scale: 1})
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
            // showArrow();
            canSwipe = true;
            if (canSwipe) {

                // 左滑
                touch.on($("#process"), 'swipeleft', function(ev){
                  console.log(ev.type + ' process');
                  canSwipe = false;
                  SWIPEDIRECTION = 'left';
                //   hideArrow();
                  hideProcess();
                });

                // 左滑
                touch.on($("#process"), 'swiperight', function(ev){
                  console.log(ev.type + ' process');
                  canSwipe = false;
                  SWIPEDIRECTION = 'right';
                //   hideArrow();
                  hideProcess();
                });
            }
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
    // onDragStart: function () {
    //     showArrow();
    //     canSwipe = true;
    //     if (canSwipe) {
    //
    //         // 左滑
    //         touch.on($("#process"), 'swipeleft', function(ev){
    //           console.log(ev.type + ' process');
    //           canSwipe = false;
    //           SWIPEDIRECTION = 'left';
    //           hideArrow();
    //           hideProcess();
    //         });
    //
    //         // 左滑
    //         touch.on($("#process"), 'swiperight', function(ev){
    //           console.log(ev.type + ' process');
    //           canSwipe = false;
    //           SWIPEDIRECTION = 'right';
    //           hideArrow();
    //           hideProcess();
    //         });
    //
    //     }
    // }
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
        onComplete: function () {
            if (SWIPEDIRECTION== 'left') {
                showEnd();
                SWIPEDIRECTION='';
            }else if (SWIPEDIRECTION=='right') {
                TweenMax.set('#logo', {autoAlpha: 1});
                showCover();
                SWIPEDIRECTION='';
            }
        }
    });
    processHide.to('#process', 0.4, {autoAlpha: 0})
    .set(['#process', '#process-detail-container'], {display: 'none'})
}

function showEnd() {
    var endShow = new TimelineMax({
        onComplete: function () {
            // showLeftArrow();
            canSwipe = true;
            if (canSwipe) {
                // 右滑
                touch.on($("#end"), 'swiperight', function(ev){
                    canSwipe = false;
                    console.log(ev.type + ' end');
                    // hideLeftArrow();
                    hideEnd();
                });
            }
        }
    });
    endShow.set('#end', {display: 'block', autoAlpha: 1,perspective: 500})
    .set('#logo', {x: -270, y: -610})
    // .set('#logo', {scale: 0.8})
    .to('#logo', 0.1, {
        autoAlpha: 1
    })
    .add('endLogo')
    .to('#logo', 0.6, {x: -218, y: -464, ease: Back.easeOut.config(1.2)}, 'endLogo')
    .from('#end-content0', 0.6, {autoAlpha: 0, x: '+=240', ease: Back.easeOut.config(1.2)}, 'endLogo')
    // .to('#logo', 0.8, {x: -70, y: -230, ease: Back.easeOut.config(1.6)})
    .fromTo('#end-content1', 1.2, {autoAlpha: 0, z: -300}, {autoAlpha: 1, z: 0}, '-=0.2')
    .fromTo('#end-content2', 0.6, {autoAlpha: 0, y: 100}, {autoAlpha: 1, y: 0}, '-=1.2')

}

function hideEnd() {
    var endHide = new TimelineMax({
        onComplete: function () {
            showComputer();
        }
    });
    endHide.to(['#end', '#logo'], 0.6, {autoAlpha: 0})
    .set('#end', {display: 'none'})
    .set('#logo', {autoAlpha: 1, x: -230, y: -480}) // 回退时确保位置
}

(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动

    });  //Document ready
})(jQuery);

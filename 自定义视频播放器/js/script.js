
(function($) {
  
  // 获取video元素
  var video = $('#myVideo');
  var video2 = document.getElementById('myVideo')
  console.log(video);
  console.log(video2)
  console.log(video[0]);
  /**
   * 
   * @param {*} seconds
   * 自定义format方法 将传入seconds（时间），格式化成 10:52这种格式
   * 这里使用了Math.floor方法，表示的是向下取整。比如有121秒，126/60 = 2.01 用Math.floor方法后就是2
   * 这个时间format方法其实不够完整，没有小时的位数。而且操作也比较复杂
   * 思考： 如何自定义一个比较简单的format时间方法
   */
	var timeFormat = function(seconds) {
		var minite = Math.floor(seconds / 60);
    if(minite < 10) {
      minite = "0" + minite;
    }
		var second = Math.floor(seconds % 60);
    if(second < 10) {
      second = "0" + second;
    }
		return minite + ":" + second;
	};
  
  // 标题和控制板显示/隐藏
  /**
   * @param {*} shouldShow  这个是一个布尔值参数，用来区分鼠标是进入还是出去当前的视频播放区域 
   * 这个方法是监听鼠标在进出视频界面的时候执行的方法
   * 知识点： JQuery的stop方法。停止当前正在执行的动画  
   * animate方法，动画方法。参数1：css属性构成的对象。参数2，执行该动画方法需要的时间。
   * 其实还有两个参数 easing设置动画的速度风格（贝塞尔曲线） callback，回调函数 
   */
  var showTitleAndControl = function(shouldShow) {
    if(shouldShow) {
      $('.control').stop().animate({'bottom':0}, 500);
			$('.caption').stop().animate({'top':0}, 500);
    } else {
      $('.control').stop().animate({'bottom':-50}, 500); // 说明下面的那个菜单区高度应该是50
      $('.caption').stop().animate({'top':-50}, 500);
    }
  }
  
  // 播放和暂停切换
  /**
   * 通过监听当前是暂停还是播放状态来进行下一步操作。
   * 这个函数回去自己尝试实现
   */
  var playAndPause = function() {
    if(video[0].paused || video[0].ended) {
			$('#playBtn').removeClass('play').addClass('pause');
			video[0].play();
		}
		else {
			$('#playBtn').removeClass('pause').addClass('play');
			video[0].pause();
		}
  }
  
  // 结束视频
  /**
   * 该方法对应停止按钮
   * 停止的时候需要给开始按钮修改样式
   */
  var stopVideo = function() {
		video[0].pause();
    updateProgress($('.progress').offset().left);
    $('#playBtn').removeClass("pause").addClass("play");
  }
  
  // 调整播放速度
  /**
   * 
   * @param {*} speed 
   * 哇，好多h5的接口没有用过啊
   */
  var playSpeed = function(speed) {
    if(speed == 1) {
      $('#speed1Btn').addClass("selected");
      $('#speed3Btn').removeClass("selected");
    } else if(speed == 3) {
      $('#speed1Btn').removeClass("selected");
      $('#speed3Btn').addClass("selected");
    }
    video[0].playbackRate = speed;
  }
  
  // 声音和静音切换
  var soundAndMute = function() {
    if(video[0].muted) {
      video[0].muted = false;
      $('#soundBtn').removeClass("mute").addClass("sound");
      $('.volumeBar').css('width', video[0].volume * 100 + '%');
    } else {
      video[0].muted = true;
      $('#soundBtn').removeClass("sound").addClass("mute");
      $('.volumeBar').css('width', 0);
    }
	};
  
  // 进度拖拽处理
  var enableProgressDrag = function() {
    var progressDrag = false;
    $('.progress').on('mousedown', function(e) {
      progressDrag = true;
      updateProgress(e.pageX);
    });
    $(document).on('mouseup', function(e) {
      if(progressDrag) {
        progressDrag = false;
        updateProgress(e.pageX);
      }
    });
    $(document).on('mousemove', function(e) {
      if(progressDrag) {
        updateProgress(e.pageX);
      }
    });
  };
  // 更新进度
  var updateProgress = function(x) {
    var progress = $('.progress');
    
    var position = x - progress.offset().left;
    var percentage = 100 * position / progress.width();
    if(percentage > 100) {
      percentage = 100;
    }
    if(percentage < 0) {
      percentage = 0;
    }
    $('.timeBar').css('width', percentage+'%');
    
    video[0].currentTime = video[0].duration * percentage / 100;
  };
  
  // 声音拖拽处理
  var enableSoundDrag = function() {
    var volumeDrag = false;
    $('.volume').on('mousedown', function(e) {
      volumeDrag = true;
      updateVolume(e.pageX);
      video[0].muted = false;
      $('#soundBtn').removeClass("mute").addClass("sound");
    });
    $(document).on('mouseup', function(e) {
      if(volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX);
      }
    });
    $(document).on('mousemove', function(e) {
      if(volumeDrag) {
        updateVolume(e.pageX);
      }
    });
  };
  // 更新声音
  var updateVolume = function(x, vol) {
		var volume = $('.volume');
		var percentage;
    // 如果设置了vol参数，则直接使用vol
		if(vol) {
			percentage = vol * 100;
		} else {
			var position = x - volume.offset().left;
			percentage = 100 * position / volume.width();
		}
		if(percentage > 100) {
			percentage = 100;
		}
		if(percentage < 0) {
			percentage = 0;
		}
		$('.volumeBar').css('width', percentage + '%');
    
		video[0].volume = percentage / 100;
	};
  
  // 获取元数据，初始化视频数据
  video.on("loadedmetadata", function() {
  
    video.width($('.vContainer').width());
    video.height($('.vContainer').height());
    
    showTitleAndControl(false);
    
    $('#currentTime').text(timeFormat(0));
		$('#duration').text(timeFormat(video[0].duration));
		
    // 鼠标进入视频区域时，显示标题和控制板
    // 鼠标离开视频区域时，隐藏标题和控制板
    $('.vContainer').hover(function() {
			showTitleAndControl(true);
		}, function() {
			showTitleAndControl(false);
		})
    
    // 播放按钮事件绑定
    $('#playBtn').on('click', playAndPause);
    // 结束按钮事件绑定
    $('#stopBtn').on('click', stopVideo);
    // 1倍速度按钮事件绑定
    $('#speed1Btn').on('click', function() {
      playSpeed(1);
    });
    // 3倍速度按钮事件绑定
    $('#speed3Btn').on('click', function() {
      playSpeed(3);
    });
    // 声音按钮事件绑定
    $('#soundBtn').on('click', soundAndMute);
    // 进度条拖拽事件绑定
    enableProgressDrag();
    // 声音条拖拽事件绑定
    enableSoundDrag();
    
    // 初始化声音
    updateVolume(0, 0.7);
  });
  
  var loadingTimer = null;
  // 每一次播放位置发生改变
  video.on('timeupdate', function() {
		var currentTime = video[0].currentTime;
		var duration = video[0].duration;
		var percent = 100 * currentTime / duration;
		$('.timeBar').css('width', percent + '%');
		$('#currentTime').text(timeFormat(currentTime));
    
    $('.loading').fadeOut(100);
    clearTimeout(loadingTimer);
    loadingTimer = setTimeout(function() {
      if(!video[0].paused && !video[0].ended) {
        $('.loading').fadeIn(100);
      }
    }, 500);
	});
  
  // 视频播放结束的时候
  video.on('ended', function() {
    updateProgress($('.progress').offset().left);
    $('#playBtn').removeClass("pause").addClass("play");
  });
  
  // 可以播放视频的时候
  video.on('canplay', function() {
    $('.loading').fadeOut(100);
  });
  
})(jQuery);

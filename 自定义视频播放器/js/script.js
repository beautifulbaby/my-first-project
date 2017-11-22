
(function($) {
  
  // 获取video元素
  var video = $('#myVideo');
  var video2 = document.getElementById('myVideo')
  console.log(video);
  console.log(video2)
  console.log(video[0]);
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
  var showTitleAndControl = function(shouldShow) {
    if(shouldShow) {
      $('.control').stop().animate({'bottom':0}, 500);
			$('.caption').stop().animate({'top':0}, 500);
    } else {
      $('.control').stop().animate({'bottom':-50}, 500);
      $('.caption').stop().animate({'top':-50}, 500);
    }
  }
  
  // 播放和暂停切换
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
  var stopVideo = function() {
		video[0].pause();
    updateProgress($('.progress').offset().left);
    $('#playBtn').removeClass("pause").addClass("play");
  }
  
  // 调整播放速度
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

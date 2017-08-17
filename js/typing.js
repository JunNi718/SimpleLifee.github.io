

(function($) {
  // Caption
  $('.article-entry').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().hasClass('fancybox')) return

      var alt = this.alt

      if (alt) {
        $(this).after('<span class="caption">' + alt +
          '</span>')
      }

      $(this).wrap('<a href="' + this.src + '" title="' + alt +
        '" class="fancybox"></a>')
    })

    $(this).find('.fancybox').each(function() {
      $(this).attr('rel', 'article' + i)
    })
  })

  if ($.fancybox) {
    $('.fancybox').fancybox()
  }

  //让网页每次刷新随机显示不同文字
  document.write("<script src='/js/resume.js'></script>");
  document.write("<script src='/js/toc.js'></script>");
  document.write("<script src='/js/activate-power-mode.js'></script>");
  document.write("<script src='/js/bootstrap-min.js'></script>");
  document.write("<script src='/js/custom.js'></script>");
  
  document.write("<link rel='stylesheet' href='/css/custom.css'>");
  document.write("<link rel='stylesheet' href='/css/codepretty.css'>");
  // function mrc() {
  //   var butong_net = new Array('有朋自远方来，不亦乐乎', '己所不欲，勿施于人', '四海之内皆兄弟也', '学而不厌，诲人不倦', '工欲善其事，必先利其器', '人而无信，不知其可也', '礼之用，和为贵');
  //   var butong_net2 = Math.floor(Math.random() * butong_net.length);
  //   var text = document.getElementById("text");
  //   text.firstChild.nodeValue = butong_net[butong_net2];
  // }

  // window.onload = mrc;
})(jQuery)

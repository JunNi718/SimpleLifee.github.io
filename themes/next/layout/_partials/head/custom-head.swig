
{#
Custom head.
#}

<!-- 自定义代码块样式  2017年07月05日08:36:14-->

<!-- <link rel="stylesheet" href="//cdn.bootcss.com/highlight.js/9.6.0/styles/androidstudio.min.css">
<script src="//cdn.bootcss.com/highlight.js/9.6.0/highlight.min.js"></script> -->

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/androidstudio.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script> 
<!-- railscasts   mono-blue  tomorrow  androidstudio  monokai-->
<script>hljs.initHighlightingOnLoad();</script>

<!-- <script>
  var trim_indent = true;
  var line_number = true;
  // enable highlight
  $('pre code').each(function(i, block) {
    var texts = $(this).text().split('\n');
     // trim indent
     if (trim_indent){
      var tab = texts[0].match(/^\s{0,}/);
      if (tab) {
        var arr = [];
        texts.forEach(function(temp) {
          arr.push(temp.replace(tab, ''));
        });
        $(this).text(arr.join('\n'));
      }
    }
    // add line number
    if (line_number) {
      console.log("show line number in front-end");
      var lines = texts.length - 1;
      var $numbering = $('<ul/>').addClass('pre-numbering');
      $(this).addClass('has-numbering').parent().append($numbering);
      for (i = 1; i <= lines; i++) {
        $numbering.append($('<li/>').text(i));
      }
    }
    // hightlight
    hljs.highlightBlock(block);

</script> -->

<!-- 自定义代码块样式 2017年07月05日08:36:17-->
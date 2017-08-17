jQuery(function($) {
  function init() {
    var pre = document.getElementsByTagName("pre")
    console.log("hahaaha")
    for (var i = 0; i < pre.length; i++) {
      pre[i].setAttribute("class","prettyprint linenums prettyprinted"); 
    }
  }

  $(document).ready(
    function() {

      init();

    }
  );
});

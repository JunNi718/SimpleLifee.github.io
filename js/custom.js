
    POWERMODE.colorful = true;
    POWERMODE.shake = false;
    document.body.addEventListener('input', POWERMODE);



       

jQuery(function($) {
  function init() {
     var searchView = $("#gsc-i-id1");
     console.log(searchView)
     searchView.removeAttribute("placeholder");
    // searchView.setAttribute("placeholder", "");
  }

  $(document).ready(
    function() {

      init();

    }
  );
});


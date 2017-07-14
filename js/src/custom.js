$(function() {
  $(".post-body img").addClass("brick-item");
});



$(".post-body img").on({
 mouseenter: function() { 
    $(this).addClass("brick-item-active") 
  }, 
  mouseleave: function() {
   $(this).removeClass("brick-item-active") 
 } 
});

// t.find(".brick-item").on({
//  mouseenter: function() { 
//     $(this).addClass("brick-item-active") 
//   }, 
//   mouseleave: function() {
//    $(this).removeClass("brick-item-active") 
//  } 
// })

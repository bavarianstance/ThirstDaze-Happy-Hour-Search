$(document).ready(function(){
  $("div.btn-group button.btn").click(function(){
    $("div.btn-group").find(".active").removeClass("active");
    $(this).addClass("active");
  });  

  $("div.btn-group-lg button.btn").click(function(){
    $("div.btn-group-lg").find(".active").removeClass("active");
    $(this).addClass("active");
  });  


});


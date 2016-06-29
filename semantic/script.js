$(function() {
  $(".add-trustee").hide();
  $.validate();

  $("#add").click(function() {
    $(".add-trustee").show();
    $("#add").hide();
  });

});

$("#reset").click(function() {
  $('.container form').get(0).reset();
  $(".add-trustee").hide();
  $("#add").show();
});

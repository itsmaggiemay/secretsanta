$(function(){
  $(".add-more").click(function(){
    template = $("#person_template");
    element = template.tmpl({num:$(".person").length+1});
    $(this).closest(".control-group").before(element);
  });
});
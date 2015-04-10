window.addEventListener('DOMContentLoaded', function(){

  var $ = function(selector, context){
    return (context || document).querySelector(selector)
  }
  var $$ = function(selector, context){
    return (context || document).querySelectorAll(selector)
  }
  $.toArray = function(list){
    return Array.prototype.slice.call(list)
  }

  var inputs = $$('.bm_optionList input');
  var resultDiv = $('.bm_result');

  $.toArray(inputs).forEach(function(input){
      input.addEventListener('click', function(e){
        var target_li = e.currentTarget.parentNode;
        var to = target_li.getAttribute('data-to');
        var next_question = document.querySelector("[data-question-id='"+to+"']");
        var this_question = target_li.parentNode.parentNode.style.display = 'none';
        next_question.style.display = 'block';
    });
  });
}, false)

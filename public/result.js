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
        var this_question = target_li.parentNode.parentNode;
        var isLast = this_question.getAttribute('data-islast');
        var isToEnd = target_li.getAttribute('data-istoend');
        if(isToEnd == 'true'){
          $.toArray(target_li.parentNode.querySelectorAll('input')).forEach(function(el) {
            el.disabled = "disabled";
          });
          target_li.className += ' active';
          var target_id = target_li.getAttribute('data-to');
          document.querySelector("[data-result-id='"+target_id+"']").style.display = 'block';
          document.querySelector('.bm_results').style.display = 'block';
        } else {
          var to = target_li.getAttribute('data-to');
          var next_question = document.querySelector("[data-result-id='"+to+"']");
          this_question.style.display = 'none';
          next_question.style.display = 'block';
        }
    });
  });
}, false)

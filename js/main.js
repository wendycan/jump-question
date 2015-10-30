var React = require('react');
var $ = require('jquery');

var MakerApp = require('./app');

React.render(
  <MakerApp />,
  document.getElementById('content')
);

$('.question-box .top-buttons .btn').click(function(e) {
  $('.question-box .top-buttons .btn').removeClass('active');
  $(e.currentTarget).addClass('active');
});

$('#edit-result').click();

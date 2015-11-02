var React = require('react');
var $ = require('jquery');

var QuestionForm = require('./questionForm');
var Questions = require('./questions');
var ResultOptions = require('./resultOptions');
var ResultForm = require('./resultForm');
var Result = require('./result');
var data = require('../public/data');

var MakerApp = React.createClass({
  r_count: 0,
  q_count: 1,

  getInitialState: function() {
    return data;
    // return {questions: [], meta: {}, result: []};
  },

  handleQuestionSubmit: function(question) {
    var questions = this.state.questions;
    question.id = this.q_count++;
    questions.push(question);
    this.setState({questions: questions}, this.previewQuestion);
  },

  handleResultSubmit: function(data) {
    this.r_count = data.count;
    this.setState({result: data.result});
  },

  handleQuestionEditSubmit: function(question, id) {
    var questions = this.state.questions;
    questions[id] = question;
    this.setState({questions: questions}, this.previewQuestion);
  },

  newQuestion: function(){
    React.render(
      <QuestionForm onQuestionSubmit={this.handleQuestionSubmit}/>,
      document.getElementById('question-container')
    );
  },

  editResult: function() {
    React.render(
      <ResultForm onResultSubmit={this.handleResultSubmit} data={this.state.result} count={this.r_count}/>,
      document.getElementById('question-container')
    );
  },

  editQuestion: function(id) {
    var question = {};
    this.state.questions.forEach(function (quest) {
      if (quest.id === id) {
        question = quest;
      }
    })
    React.render(
      <QuestionForm onQuestionSubmit={this.handleQuestionEditSubmit} question_id={id} question={question} isEdit='true' />,
      document.getElementById('question-container')
    );
  },

  deleteQuestion: function (id) {
    var questions = this.state.questions;
    for (var i = questions.length - 1; i >= 0; i--) {
      if (questions[i].id === id) {
        questions.splice(i, 1);
      }
    };
    this.setState({questions: questions}, this.previewQuestion);
  },

  previewQuestion: function() {
    React.render(
      <div>
        <h3>问题</h3>
        <Questions onEditQuestion={this.editQuestion} data={this.state.questions} onDeleteQuestion={this.deleteQuestion}/>
        <h3>结果</h3>
        <ResultOptions options={this.state.result} />
      </div>,
      document.getElementById('question-container')
    );
    $('.question-box .top-buttons .btn').removeClass('active');
    $('.question-box .top-buttons .col-md-2:nth-child(3) .btn').addClass('active');
  },

  fetchCode: function (callback) {
    var jsCode = '';
    var cssCode = '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './public/result.js');
    xhr.onreadystatechange = function (e) {
      if(xhr.readyState == 4) {
        jsCode = xhr.responseText;
        xhr_css.send();
      }
    };
    xhr.send();
    var xhr_css = new XMLHttpRequest();
    xhr_css.open('GET', './build/result.css');
    xhr_css.onreadystatechange = function () {
      if (xhr_css.readyState == 4) {
        cssCode = xhr_css.responseText;
        callback(jsCode, cssCode);
      }
    }
  },

  generateHTML: function() {
    $('#question-container').empty();
    React.render(
      <div id='result-text'><h4>生成的 HTML</h4><textarea name="result" rows="15" className="form-control"></textarea></div>,
      document.getElementById('question-container')
    )
    var text = '<html><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"></head><body>';
    text += React.renderToStaticMarkup(<Result data={this.state.questions} meta={this.state.meta} result={this.state.result} />);
    this.fetchCode(function (jsCode, cssCode) {
      text += '<style>' + cssCode + '</style>';
      text += '<script>' + jsCode + '</script></body></html>';
      $('#result-text textarea').val(text);
    });
  },

  render: function() {
    window.state = this.state;
    return (<div className="question-box">
      <div className="row top-buttons">
        <div className="col-md-2 col-xs-6">
          <div className="btn btn-default" id="edit-result" onClick={this.editResult}>编辑结果</div>
        </div>
        <div className="col-md-2 col-xs-6">
          <div className="btn btn-default" onClick={this.newQuestion}>添加问题</div>
        </div>
        <div className="col-md-2 col-xs-6">
          <div className="btn btn-default" onClick={this.previewQuestion}>预览</div>
        </div>
        <div className="col-md-2 col-xs-6">
          <div className="btn btn-default" onClick={this.generateHTML}>生成 HTML</div>
        </div>
        <div className="col-md-2 col-xs-6">
          <a className="btn btn-default" href="./example.html" target="_blank">示例</a>
        </div>
      </div>
      <div id="question-container"></div>
    </div>
    );
  }
});

module.exports = MakerApp;

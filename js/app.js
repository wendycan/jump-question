var React = require('react');
var $ = require('jquery');

var QuestionForm = require('./questionForm');
var PageForm = require('./pageForm');
var PageMetas = require('./pageMetas');
var Questions = require('./questions');
var ResultOptions = require('./resultOptions');
var ResultForm = require('./resultForm');
var Result = require('./result');

var cssUrl = 'http://localhost:8000/build/result.css';
var jsUrl = 'http://localhost:8000/public/result.js';

var MakerApp = React.createClass({
  getInitialState: function() {
    return {data: [], meta: {}, result: []};
  },

  handleQuestionSubmit: function(question) {
    var questions = this.state.data;
    questions.push(question);
    this.setState({data: questions}, this.previewQuestion);
  },

  handlePageSubmit: function(meta) {
    this.setState({meta: meta}, this.previewQuestion)
  },

  handleResultSubmit: function(result) {
    this.setState({result: result}, this.previewQuestion);
  },

  handleQuestionEditSubmit: function(question, id) {
    var questions = this.state.data;
    questions[id] = question;
    this.setState({data: questions}, this.previewQuestion);
  },

  newQuestion: function(){
    React.render(
      <QuestionForm onQuestionSubmit={this.handleQuestionSubmit}/>,
      document.getElementById('question-container')
    );
  },

  editPage: function() {
    React.render(
      <PageForm onPageSubmit={this.handlePageSubmit} data={this.state.meta}/>,
      document.getElementById('question-container')
    );
  },

  editResult: function() {
    React.render(
      <ResultForm onResultSubmit={this.handleResultSubmit} data={this.state.result}/>,
      document.getElementById('question-container')
    );
  },

  editQuestion: function(id) {
    React.render(
      <QuestionForm onQuestionSubmit={this.handleQuestionEditSubmit} question_id={id} question={this.state.data[id.id]} isEdit='true' />,
      document.getElementById('question-container')
    );
  },

  previewQuestion: function() {
    React.render(
      <div>
        <PageMetas data={this.state.meta} />
        <Questions onEditQuestion={this.editQuestion} data={this.state.data} />
        <h4>结果</h4>
        <ResultOptions options={this.state.result} />
      </div>,
      document.getElementById('question-container')
    );
    $('.question-box .top-buttons .btn').removeClass('active');
    $('.question-box .top-buttons .col-md-2:nth-child(4) .btn').addClass('active');
  },

  generateHTML: function() {
    $('#question-container').empty();
    React.render(
      <div id='result-text'><h4>生成的 HTML</h4><textarea name="result" rows="15" className="form-control"></textarea></div>,
      document.getElementById('question-container')
    )
    var text = '<html><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"></head><body>';
    text += React.renderToStaticMarkup(<Result data={this.state.data} meta={this.state.meta} result={this.state.result} />);
    text += '<link rel="stylesheet" type="text/css" href="' + cssUrl + '">';
    text += '<script type="text/javascript" src="' + jsUrl + '"></script></body></html>';
    $('#result-text textarea').val(text);
  },
  render: function() {
    return (<div className="question-box">
      <div className="row top-buttons">
        <div className="col-md-2 col-xs-6">
          <div className="btn btn-default" onClick={this.editPage}>页面信息</div>
        </div>
        <div className="col-md-2 col-xs-6">
          <div className="btn btn-default" onClick={this.editResult}>编辑结果</div>
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
      </div>
      <div id="question-container"></div>
    </div>
    );
  }
});

module.exports = MakerApp;

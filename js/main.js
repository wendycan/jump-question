jQuery(function($) {
  var toLetters = function(num) {
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? toLetters(pow) + out : out;
  };
  var jsUrl = 'http://localhost:8000/js/result.js';
  var cssUrl = 'http://localhost:8000/css/result.css'
  var Question = React.createClass({
    render: function() {
      return (
        <div className="question">
          <h4>问题{this.props.index}：{this.props.title}</h4>
          <img src={this.props.image_url}/>
          <OptionsList options={this.props.options}></OptionsList>
        </div>
      );
    }
  });
  var OptionForm = React.createClass({
    handleOptionSubmit: function() {
      var option = React.findDOMNode(this.refs.option).value.trim();
      var to = React.findDOMNode(this.refs.option_to).value.trim();
      if (!option) return;
      this.props.onOptionSubmit({option: option, to: to});
      React.findDOMNode(this.refs.option).value = '';
      React.findDOMNode(this.refs.option_to).value = '';
      $('#f-option').focus();
    },
    render: function() {
      return (
        <div className="row">
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="选项" ref="option" id="f-option" />
          </div>
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="跳转到问题" ref="option_to" id="f-option-to" />
          </div>
          <div className="col-md-2">
            <div className="btn btn-info" id="create-option" onClick={this.handleOptionSubmit}>添加</div>
          </div>
        </div>
      );
    }
  });
  var ResultOptionForm = React.createClass({
    handleOptionSubmit: function() {
      var option = React.findDOMNode(this.refs.r_option).value.trim();
      var desc = React.findDOMNode(this.refs.r_option_desc).value.trim();
      if (!option) return;
      this.props.onResultOptionSubmit({option: option, desc: desc});
      React.findDOMNode(this.refs.r_option).value = '';
      React.findDOMNode(this.refs.r_option_desc).value = '';
      $('#f-option-desc').focus();
    },
    render: function() {
      return (
        <div className="row">
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="选项" ref="r_option" id="r-option" />
          </div>
          <div className="col-md-5">
            <textarea type="text" className="form-control" placeholder="内容" ref="r_option_desc" id="r-option-desc" />
          </div>
          <div className="col-md-2">
            <div className="btn btn-info" id="create-option" onClick={this.handleOptionSubmit}>添加</div>
          </div>
        </div>
      );
    }
  });
  var QuestionForm = React.createClass({
    getInitialState: function() {
      return {options: []};
    },
    handleSubmit: function(e) {
      e.preventDefault();
      var title = React.findDOMNode(this.refs.title).value.trim();
      var url = React.findDOMNode(this.refs.url).value.trim();
      if (!title || this.state.options.length < 1) {
        return;
      }

      this.props.onQuestionSubmit({title: title, options: this.state.options, image_url: url});
      $('#question-form').empty();
    },
    handleOptionSubmit: function(option) {
      var options = this.state.options;
      options.push(option);
      this.setState({options: options});
    },
    render: function() {
      return (
        <form className="questionForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="f-title">问题</label>
            <input type="text" className="form-control" placeholder="Title" ref="title" id="f-title" />
          </div>
          <div className="form-group">
            <label htmlFor="f-url">图片地址</label>
            <input type="text" className="form-control" placeholder="URL" ref="url" id="f-url" />
          </div>
          <div className="form-group">
            <label htmlFor="f-option">选项</label>
            <OptionForm onOptionSubmit={this.handleOptionSubmit}/>
            <Options options={this.state.options}></Options>
          </div>
          <button type="submit" className="btn btn-primary">保存</button>
        </form>
      );
    }
  });
  var Options = React.createClass({
    render: function() {
      var optionsNodes = this.props.options.map(function(option, index) {
        return (
          <p data-title={option.option} data-id={index} key={index}>
          {toLetters(index + 1)+ '.' + option.option} <span className='right'>跳转到问题 {option.to}</span>
          </p>
        );
      }.bind(this));//to pass this to function
      return (
        <div className="optionsList">
          {optionsNodes}
        </div>
      )
    }
  });
  var ResultOptions = React.createClass({
    render: function() {
      var optionsNodes = this.props.options.map(function(option, index) {
        return (
          <p data-title={option.option} data-id={index} key={index}>
          {toLetters(index + 1)+ '.' + option.option}<br/><span className='right'>跳转到问题 {option.desc}</span>
          </p>
        );
      }.bind(this));//to pass this to function
      return (
        <div className="optionsList">
          {optionsNodes}
        </div>
      )
    }
  });
  var OptionsList = React.createClass({
    render: function() {
      var optionsNodes = this.props.options.map(function(option, index) {
        return (
          <p key={index}>{toLetters(index + 1)+ '.' + option.option} <span className='right'>跳转到问题 {option.to}</span></p>
        );        
      }.bind(this));
      return (
        <div className="optionsList">
          {optionsNodes}
        </div>
      )
    }
  });
  var Questions = React.createClass({
    render: function() {
      var questionNodes = this.props.data.map(function(question, index) {
        return (
          <Question title={question.title} image_url={question.image_url} options={question.options} index={index + 1} key={index}>
          </Question>
        );
      });
      return (
        <div className="questionList">
          {questionNodes}
        </div>
      );
    }
  });
  var PageMetas = React.createClass({
    render: function() {
      return (
        <div>
          <h3>{this.props.data.title}</h3>
          <p>{this.props.data.desc}</p>
        </div>
      );
    }
  });
  var Result = React.createClass({
    render: function() {
      var questionNodes = this.props.data.map(function(question, index) {
        var _index = index;
        var optionsNodes = question.options.map(function(option, index) {
          return (
            <li key={index} style={{listStyle: 'none'}} data-to={option.to}>
            <input type="radio" name={_index} value={index} id={"f-option-" + _index + '-' + index}/>
            <label htmlFor={"f-option-" + _index + '-' + index}>{option.option}</label>
            </li>
          )
        });
        var display = index == 0? 'block':'none';
        return (
          <li key={index} className="bm_question" data-question-id={index+1} style={{listStyle: 'none', display: display}}>
            <h4>{ index + 1 + '.  ' + question.title }</h4>
            <img src={question.image_url} />
            <ul className="bm_optionList">{optionsNodes}</ul>
          </li>
        );
      });
      return (
        <div className="bm_page">
          <h3>{this.props.meta.title}</h3>
          <p>{this.props.meta.desc}</p>
          <ul className="bm_questionList">
            {questionNodes}
          </ul>
        </div>
      );
    }
  });
  var PageForm = React.createClass({
    handleSubmit: function(e){
      e.preventDefault();
      this.props.onPageSubmit({
        title: React.findDOMNode(this.refs.title).value.trim(),
        desc: React.findDOMNode(this.refs.desc).value.trim()
      });
    },
    render: function() {
      return (
        <form className="PageForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="f-p-title">标题</label>
            <input type="text" className="form-control" placeholder="Title" ref="title" id="f-p-title" defaultValue={this.props.data.title} />
          </div>
          <div className="form-group">
            <label htmlFor="f-p-desc">描述</label>
            <textarea className="form-control" placeholder="Desc" row="5" ref="desc" id="f-p-desc" defaultValue={this.props.data.desc}/>
          </div>
          <button type="submit" className="btn btn-primary">更新</button>
        </form>
      );
    }
  });
  var ResultForm = React.createClass({
    getInitialState: function() {
      return {options: []};
    },
    handleSubmit: function(e) {
      e.preventDefault();
      this.props.onResultSubmit(this.state.options);
    },
    handleResultOptionSubmit: function(option) {
      var options = this.state.options;
      options.push(option);
      this.setState({options: options});
    },
    render: function() {
      return (
        <form className="ResultForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <ResultOptionForm onResultOptionSubmit={this.handleResultOptionSubmit}/>
            <ResultOptions options={this.state.options}/>
          </div>
          <button type="submit" className="btn btn-primary">更新</button>
        </form>
      )
    }
  });
  var ContentBox = React.createClass({
    getInitialState: function() {
      return {data: [], meta: {}, result: []};
    },
    handleQuestionSubmit: function(question) {
      var questions = this.state.data;
      questions.push(question);
      this.setState({data: questions});
      this.previewQuestion();
    },
    handlePageSubmit: function(meta) {
      this.setState({meta: meta})
      $('#question-form').empty();
      this.previewQuestion();
    },
    handleResultSubmit: function(result) {
      this.setState({result: result});
      this.previewQuestion();
    },
    newQuestion: function(){
      $('#result-text').hide();
      $('#question-form').show()
      this.hidePreviewQuestion();
      React.render(
        <QuestionForm onQuestionSubmit={this.handleQuestionSubmit}/>,
        document.getElementById('question-form')
      );
    },
    editPage: function() {
      $('#result-text').hide();
      $('#question-form').show();
      this.hidePreviewQuestion();
      React.render(
        <PageForm onPageSubmit={this.handlePageSubmit} data={this.state.meta}/>,
        document.getElementById('question-form')
      );
    },
    editResult: function() {
      React.render(
        <ResultForm onResultSubmit={this.handleResultSubmit} data={this.state.result}/>,
        document.getElementById('question-form')
      );
    },
    hidePreviewQuestion: function() {
      $('#questionlist').hide();
    },
    previewQuestion: function() {
      $('#question-form').hide();
      $('#result-text').hide();
      $('#questionlist').show();
      $('.question-box .top-buttons .btn').removeClass('active');
      $('.question-box .top-buttons .col-md-2:nth-child(4) .btn').addClass('active');
    },
    generateHTML: function() {
      $('#question-form').show();
      $('#questionlist').hide();
      React.render(
        <div id='result-text'><h4>生成的 HTML</h4><textarea name="result" rows="15" className="form-control"></textarea></div>,
        document.getElementById('question-form')
      )
      if (this.state.data.length <= 0) {return};
      var text = '<html><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"></head><body>';
      text += React.renderToStaticMarkup(<Result data={this.state.data} meta={this.state.meta}/>);
      text += '<link rel="stylesheet" type="text/css" href="' + cssUrl + '">';
      text += '<script type="text/javascript" src="' + jsUrl + '"></script></body></html>';
      $('#result-text textarea').val(text);
      $('#result-text').css('display', 'block');
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
        <div id="question-form"></div>
        <div id="questionlist">
          <PageMetas data={this.state.meta} />
          <Questions data={this.state.data} />
          <ResultOptions options={this.state.result} />
        </div>
      </div>
      );
    }
  });

  React.render(
    <ContentBox />,
    document.getElementById('content')
  );
  $('.question-box .top-buttons .btn').click(function(e) {
    $('.question-box .top-buttons .btn').removeClass('active');
    $(e.currentTarget).addClass('active');
  });
  $('.question-box .top-buttons .col-md-2:nth-child(1) .btn').click();
});

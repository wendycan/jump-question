jQuery(function($) {
  var toLetters = function(num) {
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? toLetters(pow) + out : out;
  };
  var jsUrl = 'http://localhost:8000/js/result.js';
  var cssUrl = 'http://localhost:8000/css/result.css'
  var Question = React.createClass({displayName: "Question",
    render: function() {
      return (
        React.createElement("div", {className: "question"}, 
          React.createElement("h4", null, "问题", this.props.index, "：", this.props.title), 
          React.createElement("img", {src: this.props.image_url}), 
          React.createElement(OptionsList, {options: this.props.options})
        )
      );
    }
  });
  var OptionForm = React.createClass({displayName: "OptionForm",
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
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-5"}, 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "选项", ref: "option", id: "f-option"})
          ), 
          React.createElement("div", {className: "col-md-5"}, 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "跳转到问题", ref: "option_to", id: "f-option-to"})
          ), 
          React.createElement("div", {className: "col-md-2"}, 
            React.createElement("div", {className: "btn btn-info", id: "create-option", onClick: this.handleOptionSubmit}, "添加")
          )
        )
      );
    }
  });
  var QuestionForm = React.createClass({displayName: "QuestionForm",
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
        React.createElement("form", {className: "questionForm", onSubmit: this.handleSubmit}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "f-title"}, "问题"), 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "Title", ref: "title", id: "f-title"})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "f-url"}, "图片地址"), 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "URL", ref: "url", id: "f-url"})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "f-option"}, "选项"), 
            React.createElement(OptionForm, {onOptionSubmit: this.handleOptionSubmit}), 
            React.createElement(Options, {options: this.state.options})
          ), 
          React.createElement("button", {type: "submit", className: "btn btn-primary"}, "保存")
        )
      );
    }
  });
  var Options = React.createClass({displayName: "Options",
    selectOption: function(e) {
      $(e.target).addClass('active').siblings().removeClass('active');
    },
    render: function() {
      var optionsNodes = this.props.options.map(function(option, index) {
        return (
          React.createElement("p", {"data-title": option.option, "data-id": index, key: index, onClick: this.selectOption}, 
          toLetters(index + 1)+ '.' + option.option, " ", React.createElement("span", {className: "right"}, "跳转到问题 ", option.to)
          )
        );
      }.bind(this));//to pass this to function
      return (
        React.createElement("div", {className: "optionsList"}, 
          optionsNodes
        )
      )
    }
  });
  var OptionsList = React.createClass({displayName: "OptionsList",
    render: function() {
      var optionsNodes = this.props.options.map(function(option, index) {
        return (
          React.createElement("p", {key: index}, toLetters(index + 1)+ '.' + option.option, " ", React.createElement("span", {className: "right"}, "跳转到问题 ", option.to))
        );        
      }.bind(this));
      return (
        React.createElement("div", {className: "optionsList"}, 
          optionsNodes
        )
      )
    }
  });
  var Questions = React.createClass({displayName: "Questions",
    render: function() {
      var questionNodes = this.props.data.map(function(question, index) {
        return (
          React.createElement(Question, {title: question.title, image_url: question.image_url, options: question.options, index: index + 1, key: index}
          )
        );
      });
      return (
        React.createElement("div", {className: "questionList"}, 
          questionNodes
        )
      );
    }
  });
  var PageMetas = React.createClass({displayName: "PageMetas",
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("h3", null, this.props.data.title), 
          React.createElement("p", null, this.props.data.desc)
        )
      );
    }
  });
  var Result = React.createClass({displayName: "Result",
    render: function() {
      var questionNodes = this.props.data.map(function(question, index) {
        var _index = index;
        var optionsNodes = question.options.map(function(option, index) {
          return (
            React.createElement("li", {key: index, style: {listStyle: 'none'}, "data-to": option.to}, 
            React.createElement("input", {type: "radio", name: _index, value: index, id: "f-option-" + _index + '-' + index}), 
            React.createElement("label", {htmlFor: "f-option-" + _index + '-' + index}, option.option)
            )
          )
        });
        var display = index == 0? 'block':'none';
        return (
          React.createElement("li", {key: index, className: "bm_question", "data-question-id": index+1, style: {listStyle: 'none', display: display}}, 
            React.createElement("h4", null,  index + 1 + '.  ' + question.title), 
            React.createElement("img", {src: question.image_url}), 
            React.createElement("ul", {className: "bm_optionList"}, optionsNodes)
          )
        );
      });
      return (
        React.createElement("div", {className: "bm_page"}, 
          React.createElement("h3", null, this.props.meta.title), 
          React.createElement("p", null, this.props.meta.desc), 
          React.createElement("ul", {className: "bm_questionList"}, 
            questionNodes
          )
        )
      );
    }
  });
  var PageForm = React.createClass({displayName: "PageForm",
    handleSubmit: function(e){
      e.preventDefault();
      this.props.onPageSubmit({
        title: React.findDOMNode(this.refs.title).value.trim(),
        desc: React.findDOMNode(this.refs.desc).value.trim()
      });
    },
    render: function() {
      return (
        React.createElement("form", {className: "PageForm", onSubmit: this.handleSubmit}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "f-p-title"}, "标题"), 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "Title", ref: "title", id: "f-p-title", defaultValue: this.props.data.title})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "f-p-desc"}, "描述"), 
            React.createElement("textarea", {className: "form-control", placeholder: "Desc", row: "5", ref: "desc", id: "f-p-desc", defaultValue: this.props.data.desc})
          ), 
          React.createElement("button", {type: "submit", className: "btn btn-primary"}, "更新")
        )
      );
    }
  });
  var ContentBox = React.createClass({displayName: "ContentBox",
    getInitialState: function() {
      return {data: [], meta: {}};
    },
    handleQuestionSubmit: function(question) {
      var questions = this.state.data;
      questions.push(question);
      this.setState({data: questions});
      this.previewQuestion();
    },
    handlePageSubmit: function(meta) {
      this.setState({meta: meta})
      $('#meta-form').empty();
      this.previewQuestion();
    },
    newQuestion: function(){
      $('#meta-form').empty();
      $('#result-text').hide();
      $('#question-form').show()
      this.hidePreviewQuestion();
      React.render(
        React.createElement(QuestionForm, {onQuestionSubmit: this.handleQuestionSubmit}),
        document.getElementById('question-form')
      );
    },
    editPage: function() {
      $('#result-text').hide();
      $('#question-form').empty();
      $('#meta-form').show();
      this.hidePreviewQuestion();
      React.render(
        React.createElement(PageForm, {onPageSubmit: this.handlePageSubmit, data: this.state.meta}),
        document.getElementById('meta-form')
      );
    },
    hidePreviewQuestion: function() {
      $('#questionlist').hide();
    },
    previewQuestion: function() {
      $('#question-form').hide();
      $('#meta-form').hide();
      $('#result-text').hide();
      $('#questionlist').show();
      $('.question-box .top-buttons .btn').removeClass('active');
      $('.question-box .top-buttons .col-md-2:nth-child(3) .btn').addClass('active');
    },
    generateHTML: function() {
      $('#result-text').show();
      $('#questionlist').hide();
      $('#question-form').empty();
      $('#meta-form').empty();
      console.log(this.state.data);
      if (this.state.data.length <= 0) {return};
      var text = '<html><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"></head><body>';
      text += React.renderToStaticMarkup(React.createElement(Result, {data: this.state.data, meta: this.state.meta}));
      text += '<link rel="stylesheet" type="text/css" href="' + cssUrl + '">';
      text += '<script type="text/javascript" src="' + jsUrl + '"></script></body></html>';
      $('#result-text textarea').val(text);
      $('#result-text').css('display', 'block');
    },
    render: function() {
      return (React.createElement("div", {className: "question-box"}, 
        React.createElement("div", {className: "row top-buttons"}, 
          React.createElement("div", {className: "col-md-2 col-xs-6"}, 
            React.createElement("div", {className: "btn btn-default", onClick: this.editPage}, "页面信息")
          ), 
          React.createElement("div", {className: "col-md-2 col-xs-6"}, 
            React.createElement("div", {className: "btn btn-default", onClick: this.newQuestion}, "添加问题")
          ), 
          React.createElement("div", {className: "col-md-2 col-xs-6"}, 
            React.createElement("div", {className: "btn btn-default", onClick: this.previewQuestion}, "预览")
          ), 
          React.createElement("div", {className: "col-md-2 col-xs-6"}, 
            React.createElement("div", {className: "btn btn-default", onClick: this.generateHTML}, "生成 HTML")
          )
        ), 
        React.createElement("div", {id: "question-form"}), 
        React.createElement("div", {id: "meta-form"}), 
        React.createElement("div", {id: "questionlist"}, 
          React.createElement(PageMetas, {data: this.state.meta}), 
          React.createElement(Questions, {data: this.state.data})
        )
      )
      );
    }
  });

  React.render(
    React.createElement(ContentBox, null),
    document.getElementById('content')
  );
  $('.question-box .top-buttons .btn').click(function(e) {
    $('.question-box .top-buttons .btn').removeClass('active');
    $(e.currentTarget).addClass('active');
  });
  $('.question-box .top-buttons .col-md-2:nth-child(1) .btn').click();
});

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
    edit: function() {
      this.props.onEditQuestion({id:this.props.index-1});
    },
    render: function() {
      return (
        React.createElement("div", {className: "question"}, 
          React.createElement("h4", null, "问题", this.props.index, "：", this.props.title, React.createElement("a", {onClick: this.edit, className: "right"}, "编辑")), 
          React.createElement("img", {src: this.props.image_url}), 
          React.createElement(OptionsList, {options: this.props.options, isLast: this.props.isLast})
        )
      );
    }
  });
  var OptionForm = React.createClass({displayName: "OptionForm",
    handleOptionSubmit: function() {
      var option = React.findDOMNode(this.refs.option).value.trim();
      var to = React.findDOMNode(this.refs.option_to).value.trim();
      if (!option || ((!to || to <= 0) && !$("input[type='checkbox']").is(":checked"))) return
      this.props.onOptionSubmit({option: option, to: to});
      React.findDOMNode(this.refs.option).value = '';
      React.findDOMNode(this.refs.option_to).value = '';
      $('#f-option').focus();
    },
    render: function() {
      return (
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-9"}, 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "选项", ref: "option", id: "f-option"})
          ), 
          React.createElement("div", {className: "col-md-2"}, 
            React.createElement("input", {type: "number", min: "1", className: "form-control", placeholder: "跳转到问题序号", ref: "option_to", id: "f-option-to"})
          ), 
          React.createElement("div", {className: "col-md-1"}, 
            React.createElement("div", {className: "btn btn-info", id: "create-option", onClick: this.handleOptionSubmit}, "添加")
          )
        )
      );
    }
  });
  var ResultOptionForm = React.createClass({displayName: "ResultOptionForm",
    handleOptionSubmit: function() {
      var desc = React.findDOMNode(this.refs.r_option_desc).value.trim();
      this.props.onResultOptionSubmit({desc: desc});
      React.findDOMNode(this.refs.r_option_desc).value = '';
      $('#f-option-desc').focus();
    },
    render: function() {
      return (
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-10"}, 
            React.createElement("textarea", {type: "text", className: "form-control", placeholder: "内容", ref: "r_option_desc", id: "r-option-desc"})
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
      if(this.props.isEdit){
        return {options: this.props.question.options};
      } else {
        return {options: []};
      }
    },
    handleSubmit: function(e) {
      e.preventDefault();
      var title = React.findDOMNode(this.refs.title).value.trim();
      var url = React.findDOMNode(this.refs.url).value.trim();
      var isLast = $('#f-option-to').prop('disabled');
      if (!title || this.state.options.length < 1) {
        return;
      }

      if(this.props.isEdit){
        this.props.onQuestionSubmit({title: title, options: this.state.options, image_url: url, isLast: isLast},this.props.question_id.id);
      } else {
        this.props.onQuestionSubmit({title: title, options: this.state.options, image_url: url, isLast: isLast});
      }
      $('#question-container').empty();
    },
    handleOptionSubmit: function(option) {
      var options = this.state.options;
      options.push(option);
      this.setState({options: options});
    },
    lastStatuschange: function() {
      if ($("input[type='checkbox']").is(":checked")) {
        $('#f-option-to').prop('disabled', true);
        $('.optionsList .right').css('display','none');
      } else {
        $('#f-option-to').prop('disabled', false);
      }
    },
    componentDidMount: function() {
      if(this.props.question && this.props.question.isLast) {
        $("#f-last").prop('checked', true);
      } else {
        $("#f-last").prop('checked', false);
      }
    },
    render: function() {
      return (
        React.createElement("form", {className: "questionForm", onSubmit: this.handleSubmit}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("input", {id: "f-last", ref: "last", type: "checkbox", onChange: this.lastStatuschange}), 
            React.createElement("label", {htmlFor: "f-last"}, " 是最后一个问题")
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "f-title"}, "问题"), 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "Title", ref: "title", id: "f-title", defaultValue: this.props.question&&this.props.question.title})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "f-url"}, "图片地址"), 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "URL", ref: "url", id: "f-url", defaultValue: this.props.question&&this.props.question.image_url})
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
    render: function() {
      var optionsNodes = this.props.options.map(function(option, index) {
        if($('#f-option-to').prop('disabled')){
          return (
            React.createElement("p", {"data-title": option.option, "data-id": index, key: index}, 
            toLetters(index + 1)+ '.' + option.option
            )
          );
        } else {
          return (
            React.createElement("p", {"data-title": option.option, "data-id": index, key: index}, 
            toLetters(index + 1)+ '.' + option.option, " ", React.createElement("span", {className: "right"}, "跳转到问题 ", option.to)
            )
          );
        }
      }.bind(this));//to pass this to function
      return (
        React.createElement("div", {className: "optionsList"}, 
          optionsNodes
        )
      )
    }
  });
  var ResultOptions = React.createClass({displayName: "ResultOptions",
    deleteOption: function(e) {
      var option_id = $(e.currentTarget).parent().data('id');
      this.props.onDeleteOption(option_id);
    },
    render: function() {
      var optionsNodes = this.props.options.map(function(option, index) {
        if(this.props.isEdit == 'true') {
          return (
            React.createElement("div", {"data-id": index, key: index}, 
              React.createElement("p", {"data-title": option.option, "data-id": index, className: "col-md-11"}, 
              toLetters(index + 1) + ': ' + option.desc
              ), 
              React.createElement("p", {className: "col-md-1", onClick: this.deleteOption}, React.createElement("a", null, "删除"))
            )
          );
        } else {
          return (
            React.createElement("p", {"data-title": option.option, "data-id": index, key: index}, 
            toLetters(index + 1) + ': ' + option.desc
            )
          );          
        }
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
        if(this.props.isLast) {
          return (
            React.createElement("p", {key: index}, toLetters(index + 1)+ '.' + option.option)
          );                  
        } else {
          return (
            React.createElement("p", {key: index}, toLetters(index + 1)+ '.' + option.option, " ", React.createElement("span", {className: "right"}, "跳转到问题 ", option.to))
          );                  
        }
      }.bind(this));
      return (
        React.createElement("div", {className: "optionsList"}, 
          optionsNodes
        )
      )
    }
  });
  var Questions = React.createClass({displayName: "Questions",
    editQuestion: function(id) {
      this.props.onEditQuestion(id);
    },
    render: function() {
      var questionNodes = this.props.data.map(function(question, index) {
        return (
          React.createElement(Question, {onEditQuestion: this.editQuestion, title: question.title, isLast: question.isLast, image_url: question.image_url, options: question.options, index: index + 1, key: index}
          )
        );
      }.bind(this));
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
            React.createElement("li", {key: index, style: {listStyle: 'none'}, "data-to": option.to, "data-option-index": index+1}, 
            React.createElement("input", {type: "radio", name: _index, value: index, id: "f-option-" + _index + '-' + index}), 
            React.createElement("label", {htmlFor: "f-option-" + _index + '-' + index}, option.option)
            )
          );
        });
        var display = index == 0? 'block':'none';
        return (
          React.createElement("li", {key: index, className: "bm_question", "data-islast": question.isLast, "data-question-id": index+1, style: {listStyle: 'none', display: display}}, 
            React.createElement("h4", null,  index + 1 + '.  ' + question.title), 
            React.createElement("img", {src: question.image_url}), 
            React.createElement("ul", {className: "bm_optionList"}, optionsNodes)
          )
        );
      });
      var resultNodes = this.props.result.map(function(r,index) {
        return (
          React.createElement("li", {"data-result-index": index+1, style: {listStyle: 'none',display: 'none'}}, 
            React.createElement("p", null, r.desc)
          )
        );
      });

      return (
        React.createElement("div", {className: "bm_page"}, 
          React.createElement("h3", null, this.props.meta.title), 
          React.createElement("p", null, this.props.meta.desc), 
          React.createElement("ul", {className: "bm_questionList"}, 
            questionNodes
          ), 
          React.createElement("ul", {className: "bm_results", style: {display: 'none'}}, 
            resultNodes
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
  var ResultForm = React.createClass({displayName: "ResultForm",
    getInitialState: function() {
      return {options: this.props.data};
    },
    deleteOption: function(index) {
      var options = this.state.options;
      options.splice(index,1);
      this.setState({options: options});
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
        React.createElement("form", {className: "ResultForm", onSubmit: this.handleSubmit}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement(ResultOptionForm, {onResultOptionSubmit: this.handleResultOptionSubmit}), 
            React.createElement(ResultOptions, {options: this.state.options, onDeleteOption: this.deleteOption, isEdit: "true"})
          ), 
          React.createElement("button", {type: "submit", className: "btn btn-primary"}, "更新")
        )
      )
    }
  });
  var ContentBox = React.createClass({displayName: "ContentBox",
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
        React.createElement(QuestionForm, {onQuestionSubmit: this.handleQuestionSubmit}),
        document.getElementById('question-container')
      );
    },
    editPage: function() {
      React.render(
        React.createElement(PageForm, {onPageSubmit: this.handlePageSubmit, data: this.state.meta}),
        document.getElementById('question-container')
      );
    },
    editResult: function() {
      React.render(
        React.createElement(ResultForm, {onResultSubmit: this.handleResultSubmit, data: this.state.result}),
        document.getElementById('question-container')
      );
    },
    editQuestion: function(id) {
      React.render(
        React.createElement(QuestionForm, {onQuestionSubmit: this.handleQuestionEditSubmit, question_id: id, question: this.state.data[id.id], isEdit: "true"}),
        document.getElementById('question-container')
      );
    },
    previewQuestion: function() {
      React.render(
        React.createElement("div", null, 
          React.createElement(PageMetas, {data: this.state.meta}), 
          React.createElement(Questions, {onEditQuestion: this.editQuestion, data: this.state.data}), 
          React.createElement("h4", null, "结果"), 
          React.createElement(ResultOptions, {options: this.state.result})
        ),
        document.getElementById('question-container')
      );
      $('.question-box .top-buttons .btn').removeClass('active');
      $('.question-box .top-buttons .col-md-2:nth-child(4) .btn').addClass('active');
    },
    generateHTML: function() {
      $('#question-container').empty();
      React.render(
        React.createElement("div", {id: "result-text"}, React.createElement("h4", null, "生成的 HTML"), React.createElement("textarea", {name: "result", rows: "15", className: "form-control"})),
        document.getElementById('question-container')
      )
      var text = '<html><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"></head><body>';
      text += React.renderToStaticMarkup(React.createElement(Result, {data: this.state.data, meta: this.state.meta, result: this.state.result}));
      text += '<link rel="stylesheet" type="text/css" href="' + cssUrl + '">';
      text += '<script type="text/javascript" src="' + jsUrl + '"></script></body></html>';
      $('#result-text textarea').val(text);
    },
    render: function() {
      return (React.createElement("div", {className: "question-box"}, 
        React.createElement("div", {className: "row top-buttons"}, 
          React.createElement("div", {className: "col-md-2 col-xs-6"}, 
            React.createElement("div", {className: "btn btn-default", onClick: this.editPage}, "页面信息")
          ), 
          React.createElement("div", {className: "col-md-2 col-xs-6"}, 
            React.createElement("div", {className: "btn btn-default", onClick: this.editResult}, "编辑结果")
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
        React.createElement("div", {id: "question-container"})
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

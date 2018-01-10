const exec = function (command, value = null) {
  console.log(command)
  document.execCommand(command, false, value)
}
const toggleClassName = function (el, className) {
  className = className.trim()

  let sElClassName = ' ' + el.className + ' '
  let rsClassName = ''
  let sClassName = ' ' + className + ' '

  let index = sElClassName.indexOf(sClassName)
  rsClassName = index == '-1' ?
    sElClassName + className :
    sElClassName.replace(sClassName, ' ')  

  el.className = rsClassName.trim()
}

let simple = {}
console.log(/[\W]abc\W/.test(' abc '))
simple.init = function (settings) {
  var actions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    result: function result() {
      return exec('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: function result() {
      return exec('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: function result() {
      return exec('underline');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    result: function result() {
      return exec('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: function result() {
      return exec('formatBlock', '<H1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: function result() {
      return exec('formatBlock', '<H2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: function result() {
      return exec('formatBlock', '<P>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: function result() {
      return exec('formatBlock', '<BLOCKQUOTE>');
    }
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: function result() {
      return exec('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: function result() {
      return exec('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: function result() {
      return exec('formatBlock', '<PRE>');
    }
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: function result() {
      return exec('insertHorizontalRule');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: function result() {
      var url = window.prompt('Enter the link URL');
      if (url) exec('createLink', url);
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: function result() {
      var url = window.prompt('Enter the image URL');
      if (url) exec('insertImage', url);
    }
  }
};

  const classes = {
    content: 'simple-content',
    toolbar: 'simple-toolbar',
    editor: 'simple-wrapper'
  }

  

  const editor = settings.el
  editor.className = classes.editor

  const opts = settings.actions.map(action => {
    if (typeof action === 'string') {
      return actions[action]
    }
  }) 
  settingsDefault = {
    actions: [
      'bold',
    ]
  }
  
  const toolbar = document.createElement('div')
  toolbar.className = classes.toolbar
  const buttons = opts.map(opt => {
    // console.log(opt)
    const button = document.createElement('button')
    button.innerHTML = opt.icon
    button.title = opt.title
    button.addEventListener('click', function () {
      this.focus()
      po_Last_Div(editor.content)

      toggleClassName(this, 'active-button')
      opt.result()
    })
    toolbar.appendChild(button)
  })
  editor.appendChild(toolbar)

  editor.content = document.createElement('div')
  editor.content.className = classes.content
  editor.content.contentEditable = true
  editor.appendChild(editor.content)
  
}

function po_Last_Div(obj) {
  if (window.getSelection) {//ie11 10 9 ff safari
      obj.focus(); //解决ff不获取焦点无法定位问题
      var range = window.getSelection();//创建range
      range.selectAllChildren(obj);//range 选择obj下所有子内容
      range.collapseToEnd();//光标移至最后
  }
  else if (document.selection) {//ie10 9 8 7 6 5
      var range = document.selection.createRange();//创建选择对象
      //var range = document.body.createTextRange();
      range.moveToElementText(obj);//range定位到obj
      range.collapse(false);//光标移至最后
      range.select();
  }
}
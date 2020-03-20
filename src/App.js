import React from 'react';
import './App.scss';

const marked = require('marked');

class App extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      markdown: placeHolder,
      editorMaximized: false,
      previewerMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximized = this.handleEditorMaximized.bind(this);
    this.handlePreviewerMaximized = this.handlePreviewerMaximized.bind(this);
  }

  handleChange = (e) => { 
    this.setState({markdown: e.target.value});
  }

  handleEditorMaximized = () => {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    })
  }

  handlePreviewerMaximized = () => {
    this.setState({
      previewerMaximized: !this.state.previewerMaximized
    })
  }

  render() {
    const classes = this.state.editorMaximized?
      ['editorWrap maximized',
       'previewerWrap hide',
       'fa fa-compress']:
      this.state.previewerMaximized?
      ['editorWrap hide',
       'previewerWrap maximized',
       'fa fa-compress']:
      ['editorWrap',
       'previewerWrap',
       'fa fa-arrows-alt'];
  
    let {markdown} = this.state;
    return (
      
      <div>
        <div className={classes[0]}>
          <Toolbar 
            icon={classes[2]}
            onClick={this.handleEditorMaximized}
            text="Editor" />
          <Editor
            markdown={markdown}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes[1]}>
          <Toolbar 
            icon={classes[2]}
            onClick={this.handlePreviewerMaximized}
            text="Previewer" />
          <Previewer 
            markdown={markdown}/>
        </div>
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar"> 
      <i className="fa fa-anchor"><span>{props.text}</span></i>
      <i onClick={props.onClick} className={props.icon}></i>
    </div>
  );
}

const Editor = (props) => { 
  return (
    <textarea 
      id="editorTextarea" 
      value={props.markdown} 
      onChange={props.onChange} />
  );
}

const Previewer = (props) => { 
  return (
    <div 
      id="preview"
      dangerouslySetInnerHTML={{__html: marked(props.markdown)}} />
  );
}

const placeHolder  = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
export default App;


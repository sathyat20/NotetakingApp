import React, { Component } from 'react';

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  onInputChange = (event) => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
  };

  // Adapted from https://stackoverflow.com/questions/28479239/setting-onsubmit-in-react-js
  onInputSubmit = (event) => {
    this.props.newNote(this.state.title);
    // this.setState({ title: '' });
  };

  render() {
    return (
      <div id="input-bar">
        <form id="add-note" onSubmit={this.onInputSubmit}>
          <input id="input" onChange={this.onInputChange} value={this.state.title} />
          <input id="button" type="button" value="Submit" onClick={this.onInputSubmit} />
        </form>
      </div>
    );
  }
}

export default InputBar;

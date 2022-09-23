import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import ReactMarkdown from 'react-markdown';
import Textarea from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSwitch = this.onSwitch.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.renderSomeSection = this.renderSomeSection.bind(this);
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({ text: event.target.value });
    this.props.edit(this.props.id, event.target.value);
  }

  // Deleting note
  onDelete(event) {
    this.props.delete(this.props.id);
  }

  // Editing note
  onSwitch(event) {
    const edit = this.state.isEditing;
    this.setState({ isEditing: !edit });
  }

  onDrag(event, ui) {
    console.log(ui.x);
    this.props.drag(this.props.id, { x: ui.x, y: ui.y });
    console.log(this.props.id);
    console.log(ui.y);
  }

  onEdit(event) {
    const edit = this.state.isEditing;
    const texting = this.state.text;
    this.setState({ isEditing: !edit });
    this.props.edit(this.props.id, { text: texting });
  }

  renderSomeSection() {
    if (this.state.isEditing) {
      // console.log('Editing in progress');
      // console.log(this.props.note.text);
      // console.log(this.props.note);
      // console.log(this.props.note.title);
      console.log(this.props);
      return (
        <div className="body1">
          <div className="icons"><button type="button" className="Hey" onClick={this.onSwitch}><i className="fa fa-check fa-1x" aria-label="Check" /></button></div>
          <Textarea className="textbox"
            onChange={this.onChange}
            style={{ boxSizing: 'border-box' }}
            minRows={3}
            maxRows={6}
            maxLength="600"
            value={this.props.text}
          />
        </div>
      );
    } else {
      return (
        <ReactMarkdown className="noteBody">{this.props.note.text || ''}</ReactMarkdown>
      );
    }
  }

  render() {
    return (
      <Draggable
        axis="both"
        handle=".note" // this is for you to define, what part of the note do you want to drag by
        grid={[1, 1]} // snapping to grid pixels
        defaultPosition={{ x: 5, y: 5 }} // if no position given
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.handleStartDrag}
        onDrag={this.onDrag}
        onStop={this.handleStopDrag}
      >
        <div className="note">
          <div className="topBar">
            <div className="noteTitle">
              {this.props.note.title}
            </div>
            <div className="icons">
              <div>
                <div className="pencil"><button className="Hey" type="button" onClick={this.onSwitch}><i className="fa fa-pencil-square-o fa-1x" aria-label="Write" /></button></div>
              </div>
              <div className="trash"><button className="Hey" type="button" onClick={this.onDelete}><i className="fa fa-trash fa-1x" aria-label="Discard" /></button></div>
              <div className="resize"><button className="Hey" type="button" id="hello"><i className="fa fa-arrows fa-1x" aria-label="MoveAround" /></button></div>
            </div>
          </div>
          <div className="bodysection">{this.renderSomeSection()}</div>
        </div>
      </Draggable>
    );
  }
}

export default Note;

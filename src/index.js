import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import { enableAllPlugins } from 'immer';
import InputBar from './components/input_bar';
import Note from './components/note';
import * as db from './services/datastore';

enableAllPlugins();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {},
      id: 1,
    };

    this.deletes = this.deletes.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes });
      // console.log(notes);
    });
  }

  newNote = (newTitle) => {
    const note = {
      title: newTitle,
      text: '![](http://i.giphy.com/gyRWkLSQVqlPi.gif)',
      x: 200,
      y: 12,
      zIndex: 26,
    };
    db.add(note);
    this.state.id += 1;
    // const { id } = this.state;
    // this.setState(produce((newState) => {
    //   const State = newState;
    //   State.notes[id] = note;
    // }));
  };

  edit = (id, noteComponent) => {
    // this.setState(produce((newState) => {
    //   const State = newState;
    //   State.notes[id] = { ...State.notes[id], text: noteComponent };
    // }));
    console.log(this.state);
    db.updates(id, noteComponent);
  };

  drag = (id, noteComponent) => {
    // this.setState(produce((newState) => {
    //   const State = newState;
    //   State.notes[id] = { ...State.notes[id], x: noteComponent.x, y: noteComponent.y };
    // }));
    console.log(this.state);
    db.move(id, noteComponent);
  };

  // deletes = (id) => {
  //   this.setState(produce((newState) => {
  //     const State = newState;
  //     delete State.notes[id];
  //   }));
  //   // db.removes(this.state.notes.id);
  // };

  deletes(id) {
    console.log(this.state);
    db.removes(id);
  }

  renderNote() {
    console.log(this.state.notes);
    return (this.state.notes !== null ? Object.entries(this.state.notes).map(([id, note]) => {
      console.log('In render note');
      // console.log(id, note);
      return (<Note id={id} key={id} note={note} title={note.title} text={note.text} edit={this.edit} delete={this.deletes} drag={this.drag} />);
    }) : <div />);
  }

  render() {
    return (
      <div>
        <div className="landing">
          <h1 className="Header"> Citrus Notes </h1>
          <InputBar newNote={this.newNote} />
        </div>
        <div className="notepad">{this.renderNote()}</div>
      </div>
    );
  }
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);

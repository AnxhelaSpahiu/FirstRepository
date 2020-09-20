import React from "react";
import "./App.css";
console.log('hirrrreeeer')

class SearchBar extends React.Component {
  state = {
    inputText: "",
  };
  handleTyping = (e) => {
    this.setState({ inputText: e.target.value });
  };

  handleSendInfoToParent = () => {
    this.props.sendText(this.state.inputText);
    this.setState({ inputText: "" });
  };

  render() {
    return (
      <div className="container">
        <input value={this.state.inputText} onChange={this.handleTyping} />
        <button
          className="button"
          disabled={!this.state.inputText}
          onClick={this.handleSendInfoToParent}
        >
          {" "}
          ADD TODO{" "}
        </button>
      </div>
    );
  }
}

class SingleLi extends React.Component {
  
  render() {
    console.log('propsss',this.props)
    return (
      <div>
        <input
          type="checkbox"
          onChange={() => this.props.onCheck(this.props.id)}
        />
        <li
          style={{
            textDecorationLine: this.props.ischecked1 ? "line-through" : "none",
          }}
        >
          {this.props.singleTodo}
        </li>
        <button onClick={() => this.props.onRemove(this.props.id)}>
          I do the Remove part{" "}
        </button>
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    const item = this.props.items.map((note) => (
        <SingleLi
        key={note.id.toString()}
          singleTodo={note.text}
          id={note.id}
          ischecked1={note.isChecked}
          onCheck={this.props.handlecheckbox}
          onRemove={this.props.remove}
          
        />
    ));

    return <ul>{item}</ul>;
  }
}

class Report extends React.Component {
  // Difference between calling a function and referencing it. Here we can only referce it

  render() {
    const lists = this.props.notelist.map((list) => (
      <li key={Math.random().toString()}>
        {" "}
        {list.text} {list.isChecked.toString()}
      </li>
    ));
    

    return (
      <div>
        <h1>This shows a Report of TO-DOs</h1>
        <ul>{lists}</ul>
      </div>
    );
  }
}
class App extends React.Component {
  state = {
    noteList: [],
  };
  onRemoveItem = (id) => {
    let newTodos = this.state.noteList.filter((todo) => todo.id !== id);
    this.setState({ noteList: newTodos });
  };

  handleAddTodo = (event) => {
    const test = {
      text: event,
      id: Math.random(),
      isChecked: false,
    };

    this.setState({
      noteList: [...this.state.noteList, test],
    });
  };
  handleCheckbox = (id)=>{
    const data  = this.state.noteList.map(todo=>{
      if(todo.id === id){
        return {
          id: todo.id,
          text: todo.text,
          isChecked : !todo.isChecked
        }
      } 
    
      return todo
    })
    this.setState({ noteList: data });
  }

  render() {
    return (
      <div>
        <p> This is your favourite TO-DO App</p>
        <SearchBar sendText={this.handleAddTodo} />
        <List
          items={this.state.noteList}
          remove={this.onRemoveItem}
          handlecheckbox={this.handleCheckbox}
          
        />
        <Report notelist={this.state.noteList} />
      </div>
    );
  }
}

export default App;
/*<Child
anxhSexBomba={this.state.sum}
sendText={this.childClickHandler}
/>*/

/*class Child extends React.Component {
  state ={
    hi: 2
  }
  render(){

 
  return (
    <div>
      <button onClick={() => this.props.sendInfoToParent(this.state.hi, 2)}>click me</button>
    </div>
  )}
};
*/

/*childClickHandler = (param1, param2) => {
    this.setState({ sum: param1 + param2 });
  };*/

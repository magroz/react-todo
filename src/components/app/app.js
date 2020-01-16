import React, {Component} from 'react';

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";

import './app.css'
import AddItem from "../add-item/add-item";

export default class App extends Component {

  maxId = 100;

  createTodoItem = (label) => {
    return {
      label,
      important: false,
      done: false,
      id: ++this.maxId,
    }
  };

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make App'),
      this.createTodoItem('Have lunch')
    ],
    term:'',
    filter: "all",
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const ind = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, ind);
      const after = todoData.slice(ind + 1);
      return {
        todoData: [...before, ...after],
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoData}) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      }
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = {...arr[idx], [propName]: value};
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState((state) => {
      const todoData = this.toggleProperty(state.todoData, id, 'important');
      return {todoData};
    });
  };

  onToggleDone = (id) => {
    this.setState((state) => {
      const todoData = this.toggleProperty(state.todoData, id, 'done');
      return {todoData};
    });
  };

  onSearchChange = (term) => {
    this.setState({term});
  };

  showItemsAfterSearch = (items, term) => {
    if (term.length === 0) {
      return items
    }
    return items.filter((item) => item.label.toLowerCase().includes(term.toLowerCase()))
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  showItemsAfterFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  };

  render() {
    const {todoData, term, filter} = this.state;
    const visibleItems = this.showItemsAfterFilter(
      this.showItemsAfterSearch(todoData, term), filter);
    const doneCount = todoData.filter((elem) => elem.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearchChange}/>
          <ItemStatusFilter onFilter={this.onFilterChange} filter={filter}/>
        </div>
        <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant}
                  onToggleDone={this.onToggleDone}/>
        <AddItem onItemAdded={this.addItem}/>
      </div>
    );
  }
};

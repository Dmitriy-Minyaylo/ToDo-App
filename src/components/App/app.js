import React, { Component } from 'react';

import AppHeader from '../App-header';
import SearchPanel from '../Search-panel';
import ItemStatusFilter from '../item-status-filter';
import ToDoList from '../Todo-list';
import ItemAddForm from '../Item-add-form'

import './app.css';

export default class App extends Component {

   maxId = 10;
   // создаем массив данных для передачи его в props
   state = {
      todoData: [
         this.createTodoItem("DrinkCoffee"),
         this.createTodoItem("DrinkCoffee twice"),
         this.createTodoItem("DrinkTea and Make Aswesome App"),
         this.createTodoItem("DrinkCoffee after one week"),
      ],
      term: '',
      filter: 'all' // all, active, done
   }
   // создание нового TodoItem
   createTodoItem(label) {
      return {
         label,
         done: false,
         important: false,
         id: this.maxId++,
      };
   }

   // при удалении задания state нельзя менять, потому используем метод слайс
   deleteItem = (id) => {
      this.setState(({ todoData }) => {
         const idx = todoData.findIndex((el) => el.id === id);
         // берем данные со старого массива и создаем новый
         const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
         ];
         // возращаем новое состояние после удаления
         return {
            todoData: newArray
         }
      })
   }

   addItem = (text) => {
      // новый с элемент с новым id
      const newItem = this.createTodoItem(text);
      // добавление нового элемента в state
      this.setState(({ todoData }) => {
         // берем данные со старого массива и создаем новый
         const newArr = [
            ...todoData,
            newItem
         ];
         // возращаем новое состояние после добавление newItem
         return {
            todoData: newArr
         }
      })
   };

   // функция изменения done и important 
   toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);
      // обновляем объект с противоположным значением
      const oldItem = arr[idx];
      const newItem = {
         ...oldItem,
         [propName]: !oldItem[propName]
      };
      // возращаем новое состояние после добавление newItem в массив 
      return [
         ...arr.slice(0, idx),
         newItem,
         ...arr.slice(idx + 1)
      ];
   }

   onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
         // возращаем новое состояние после добавление newItem с нужным Property
         return {
            todoData: this.toggleProperty(todoData, id, 'important')
         }
      })
   };

   onToggleDone = (id) => {
      this.setState(({ todoData }) => {
         // возращаем новое состояние после добавление newItem с нужным Property
         return {
            todoData: this.toggleProperty(todoData, id, 'done')
         }
      })
   };

   onSearchChange = (term) => {
      this.setState({ term })
   }
   onFilterChange = (filter) => {
      this.setState({ filter })
   }

   // поиск 
   search(items, term) {
      if (term.lehgth === 0) {
         return items
      }
      return items.filter((item) => {
         return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1
      })
   }

   // фильтр по выполнению
   filter(items, filter) {
      switch (filter) {
         case 'all':
            return items;
         case 'active':
            return items.filter((items) => !items.done);
         case 'done':
            return items.filter((items) => items.done);
         default:
            return items;
      }
   }


   render() {

      const { todoData, term, filter } = this.state;
      const doneCount = todoData
         .filter((el) => el.done).length;

      const visibleItems = this.filter(
         this.search(todoData, term), filter);

      const todoCount = todoData.length - doneCount;
      return (
         <div className="app-board" >
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
               <SearchPanel
                  onSearchChange={this.onSearchChange} />
               <ItemStatusFilter
                  filter={filter}
                  onFilterChange={this.onFilterChange} />
            </div>
            <ToDoList
               todos={visibleItems}
               onDeleted={this.deleteItem}
               onToggleImportant={this.onToggleImportant}
               onToggleDone={this.onToggleDone}
            />
            <ItemAddForm
               onItemAdded={this.addItem} />
         </div>);
   }
};

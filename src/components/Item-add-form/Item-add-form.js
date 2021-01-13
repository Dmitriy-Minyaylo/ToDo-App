import React, { Component } from 'react';
import './Item-add-form.css'

export default class ItemAddForm extends Component {

   state = {
      label: '',
   }

   onLabelChange = (e) => {
      this.setState({
         label: e.target.value
      })
   }

   onSubmit = (e) => {
      // при наличии event не нужно обновлять страницу
      e.preventDefault();
      // 
      this.props.onItemAdded(this.state.label);
      this.setState({
         label: '',
      })
   }

   render() {
      return (
         <form className="item-add-form"
            // обработчик событий для передачи данных с формы - при Enter
            onSubmit={this.onSubmit}>
            <input type="text"
               className="form-control"
               // слушатель по изменению состояния формы
               onChange={this.onLabelChange}
               placeholder="Type to add a new task"
               // контроль значения формы 
               value={this.state.label} />

            <button
               className="btn btn-outline-success float-right">
               <i className="fa fa-plus-circle" />
            </button>
         </form>
      )
   }
}

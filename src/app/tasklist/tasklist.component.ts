import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent {

  NgForm: any;
  addData: boolean = false;
  tasks: any[] = [{"desc":"New Task 1", "status":"This is Swati's First Task"},{"desc":"New Task 2", "status":"This is Second Task"}];
  selectedTask: any = null; 
  count: number = 1;
  maxCount: number = 1000;


  toggleAddData(task?: any) {
    if (task) {
      this.selectedTask = { ...task }; 
    } else {
      this.selectedTask = null; 
    }
    this.addData = !this.addData;
  }

  addNewTask(formData: NgForm){
    console.log(formData.value)
    if (formData?.value) {
      const newTask = {
        desc: formData?.value?.desc,
        status: formData?.value?.status
      };
      this.tasks.push(newTask);
      formData.resetForm(); 
      this.addData = false; 
    }
  }

  updateTask(formData: NgForm) {
    if (formData && this.selectedTask) {
      const index = this.tasks.findIndex(task => task.id === this.selectedTask.id);
      if (index !== -1) {
        this.tasks[index].desc = formData.value.desc;
        this.tasks[index].status = formData.value.status;
        this.selectedTask = null;
        formData.resetForm();
        this.addData = false; 
      }
    }
  }

  deleteTask(index: number) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1); 
      this.selectedTask = null; 
    }
  }

  increment() {
    if (this.count < this.maxCount) {
      this.count++;
    }
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = parseInt(inputElement.value, 10);
  
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= this.maxCount) {
      this.count = parsedValue;
    } else if (parsedValue < 1) {
      this.count = 1; 
    } else {
      this.count = 1; 
    }
  }
  
}

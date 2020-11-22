import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/interfaces/task-response.interface';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  formValid: boolean = false
  formTask = this.formBuilder.group({
    id: [],
    name: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    userId: [
      sessionStorage.getItem('usuario'),
      [Validators.required]
    ],
    expirationDate: ['', [Validators.required]],
  });
  tasks: [] = [];
  tasksVendica: [] = [];
  tasksVendicaOne: [] = [];
  tasksOne: [] = [];
  dataEdit: any;
  bndEdit: boolean = false;
  task: Task;
  idUserLogged: any;
  constructor(private taskService: TaskService, private formBuilder: FormBuilder,
    private modalService: NgbModal, private toastr: ToastrService,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.idUserLogged = this.authService.getUserInfo().userId;
    sessionStorage.setItem('usuario', this.idUserLogged)
    this.getTask();
  }
  0
  getTask() {
    this.taskService.getTask().subscribe((res: any) => {
      const dateNow = new Date();
      let mes = dateNow.getMonth() + 1
      const diaHoy = dateNow.getFullYear() + '-' + mes + '-' + dateNow.getDate() + 'T' + dateNow.getHours() + ':' + dateNow.getMinutes();
      this.tasksOne = res.filter(task => task.userId == sessionStorage.getItem('usuario'));
      this.tasks = res.filter(task => task.expirationDate >= diaHoy);

      this.tasksVendicaOne = res.filter(task => task.userId == sessionStorage.getItem('usuario'));
      this.tasksVendica = res.filter(task => task.expirationDate < diaHoy);

    }, (error) => {
      console.log(error);
      this.toastr.success('Lo sentimos, algo va mal!', 'Ups!');
    })
  }

  createTask() {
    this.formValid = true;
    if (this.formTask.invalid) { return }
    this.taskService.createTask(this.formTask.value).subscribe((res: any) => {
      this.getTask();
      this.toastr.success('Tarea actualziada con exito!', 'Genial!');
      this.modalService.dismissAll();
    }, (error) => {
      console.log(error);
      this.toastr.error('Lo sentimos, algo va mal!', 'Ups!');
    })
  }

  editTask(add, data: Task) {
    this.dataEdit = data;
    this.bndEdit = true;
    this.formTask.setValue({
      id: data.id,
      name: data.name,
      priority: data.priority,
      expirationDate: data.expirationDate
    });
    this.modalService.open(add, { centered: true, size: 'md', scrollable: true });
  }

  updateTask() {
    if (this.formTask.invalid) { return }
    this.taskService.updateTask(this.formTask.value).subscribe((res: any) => {
      this.getTask();
      this.toastr.success('Tarea actualizada con exito!', 'Genial!');
      this.modalService.dismissAll();
    }, (error) => {
      console.log(error);
      this.toastr.success('Lo sentimos, algo va mal!', 'Ups!');
    })
  }

  deleteTask(task: Task) {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Se borrar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task).subscribe((res: any) => {
          this.toastr.warning('Tarea eliminada con exito!', 'Genial!');
          this.getTask();
        }, (error) => {
          console.log(error);
          this.toastr.success('Lo sentimos, algo va mal!', 'Ups!');
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.toastr.warning('Operación cancelada', 'Ok');
      }
    }, error => {
      console.log(error);
      this.toastr.success('Lo sentimos, algo va mal!', 'Ups!');
    })
  }

  openModal(add) {
    this.modalService.open(add, { centered: true, size: 'md', scrollable: true });
  }

  close() {
    this.modalService.dismissAll()
  }

  salir() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
  get id() {
    return this.formTask.get("id");
  }
  get name() {
    return this.formTask.get("name");
  }
  get priority() {
    return this.formTask.get("priority");
  }
  get expirationDate() {
    return this.formTask.get("expirationDate");
  }
}

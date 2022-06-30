import { Employee } from '../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
@Input() 
  id: number;
  employee: Employee;

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
  //  this.employee = new Employee();

    this.getEmployee (this.route.snapshot.params['id']);
  }

  getEmployee(id: number): void {
    this.employeeService.getEmployee(id)
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateEmployee() {
    console.log(this.route.snapshot.params['id']);
    console.log(this.employee);
    this.employeeService.updateEmployee(this.route.snapshot.params['id'], this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    this.list();
  }

  list(){
    this.router.navigate(['employees']);
  }
}
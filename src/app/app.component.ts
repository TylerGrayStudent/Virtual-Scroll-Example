import { Component } from '@angular/core';
import { PersonDataSource } from './datasource';
import { Service } from './service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public dataSource: PersonDataSource;
  constructor(service: Service) {
    this.dataSource = new PersonDataSource(service);
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { FormBuilder } from '@angular/forms';
import { defer } from 'rxjs';

fdescribe('UsersComponent', () => {
  let component: UsersComponent;
  const formBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
  const dataService = jasmine.createSpyObj('DataService', ['getUsers', 'postUser']);

  beforeEach(() => {
    component = new UsersComponent(formBuilder, dataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set unique countries', () => {
    const users = [{fullName: 'Gayathri', country: 'India'}, {fullName: 'Sharadha', country: 'India'}];
    dataService.getUsers.and.returnValue(asyncData(users));
    component.ngOnInit();
    setTimeout(() => expect(component.countries).toEqual([{country: 'India'}]), 1000);
  });
  it('should filter the users for the selected country', () => {
    component.country = {country: 'India'};
    component.users = [{fullName: 'Gayathri', country: 'India'}, {fullName: 'Sharadha', country: 'America'}];
    const actual = component.getUsers();
    expect(actual).toEqual([{fullName: 'Gayathri', country: 'India'}]);
  });
});

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

import { DataService } from './data.service';
import { defer } from 'rxjs';

fdescribe('DataService', () => {
  let service: DataService;
  let mockHttpClient;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new DataService(mockHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const users = [{name: 'Gayathri'}];
    mockHttpClient.get.and.returnValue(asyncData(users));
    service.getUsers().subscribe((data) => expect(data).toEqual(users));
  });
  it('should post a user', () => {
    const user = {name: 'Gayathri'};
    service.postUser(user);
    expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:8080/users-back-1.0/api/data/user', user);
  });
  it('should persist a post', () => {
    const post = {title: 'Angular'};
    service.persistPost(post);
    expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:8080/users-back-1.0/api/data/post', post);
  });
});

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

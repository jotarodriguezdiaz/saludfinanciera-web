import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { TagResult } from '../models/get-category.result';
import { CreateTagCommand } from '../models/tag/create-tag.command';

@Injectable({
  providedIn: 'root',
})

export class TagsService {
  private url = `${environment.urlGateway}/tags`;

  constructor(private http: HttpClient) { }

  add(command: CreateTagCommand): Observable<TagResult> {
    const url = `${this.url}`;
    return this.http.post<TagResult>(url, command);
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.url}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
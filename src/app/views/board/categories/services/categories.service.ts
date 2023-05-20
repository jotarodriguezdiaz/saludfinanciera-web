import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateCategoryCommand, GetCategoryResult, SearchCategoryResult, UpdateCategoryCommand } from '../models';

@Injectable({
  providedIn: 'root',
})

export class CategoriesService {
  private url = `${environment.urlGateway}/categories`;

  constructor(private http: HttpClient) { }

  getBasicCategories(): Observable<SearchCategoryResult[]> {
    const url = `${this.url}/basic-categories`;
    return this.http.get<SearchCategoryResult[]>(url);
  }

  searchCategoriesByName(name: string): Observable<GetCategoryResult[]> {
    const url = `${this.url}/search/${name}`;
    return this.http.get<GetCategoryResult[]>(url);
  }

  getUserCategories(boardId: number): Observable<GetCategoryResult[]> {
    const url = `${this.url}/boards/${boardId}`;
    return this.http.get<GetCategoryResult[]>(url);
  }

  addCategory(command: CreateCategoryCommand): Observable<number> {
    const url = `${this.url}`;
    return this.http.post<number>(url, command);
  }

  updateCategory(categoryId: number, command: UpdateCategoryCommand): Observable<number> {
    const url = `${this.url}/${categoryId}`;
    return this.http.put<number>(url, command);
  }

  deleteCategory(categoryId: number): Observable<boolean> {
    const url = `${this.url}/${categoryId}`;
    return this.http.delete<boolean>(url);
  }
}
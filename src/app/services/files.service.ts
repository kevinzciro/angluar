import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { tap, map } from 'rxjs';
import { environment } from "../../environments/environment";
import { File } from "../models/file.model";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiURL = `${environment.API_URL}/api/files`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getFile(name: string, url: string, type: string){
    return this.httpClient.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map( () => true )
    );
  }

  uploadFile(file: Blob){
    const dto = new FormData();
    dto.append('file', file);
    return this.httpClient.post<File>(`${this.apiURL}/upload`, dto,
      {
        // headers: {
        //   'Content-type': 'multipart/form-data'
        // }
      }
    );
  }
}

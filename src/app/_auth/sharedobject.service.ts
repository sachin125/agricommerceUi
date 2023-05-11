import { Injectable } from '@angular/core';
import { HttpService } from '../_httpservice/http-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtResponse } from '../_model/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class SharedObjectService {
  
  public static jwtToken: string;

  constructor (
  ) {}

  setjwtToken(jwtTokenValue: string) {
    SharedObjectService.jwtToken = jwtTokenValue;
  }

  getjwtToken(): string {
    return SharedObjectService.jwtToken;
  }
}
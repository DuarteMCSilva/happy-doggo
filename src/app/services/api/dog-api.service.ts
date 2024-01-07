import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DogApiService {

  constructor(private httpClient: HttpClient) { }

  getAllBreeds(){
    const reqURL = 'https://dog.ceo/api/breeds/list/all';
    return this.httpClient.get<GetResponseBreeds>(reqURL);
  }
}

interface BreedsSignature {
  [key: string]: string[];
}

interface GetResponseBreeds{
  message: BreedsSignature;
  status: string;
}

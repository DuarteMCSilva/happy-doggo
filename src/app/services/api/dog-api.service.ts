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

  getRandomImage(){
    const reqURL = 'https://dog.ceo/api/breeds/image/random';
    return this.httpClient.get<GetResponseImages>(reqURL);
  }

  getDoggoByBread(breed: string){
    const reqURL = `https://dog.ceo/api/breed/${breed}/images/random`;
    return this.httpClient.get<GetResponseImages>(reqURL);
  }
  
  getDoggoBySubBread(breed: string, subBreed: string){
    const reqURL = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
    return this.httpClient.get<GetResponseImages>(reqURL);
  }
}

interface BreedsSignature {
  [key: string]: string[];
}

interface GetResponseBreeds{
  message: BreedsSignature;
  status: string;
}

export interface GetResponseImages {
  message: string;
  status: string;
}

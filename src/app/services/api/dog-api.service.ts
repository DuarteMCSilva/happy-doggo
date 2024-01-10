import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DogApiService {

  constructor(private httpClient: HttpClient) { }

  getAllBreeds() {
    const reqURL = 'https://dog.ceo/api/breeds/list/all';
    return this.httpClient.get<GetResponseBreeds>(reqURL);
  }

  getRandomImage() {
    const reqURL = 'https://dog.ceo/api/breeds/image/random';
    return this.httpClient.get<GetResponseImage>(reqURL).pipe(map((response) => {
      if (response.status !== 'success' || !response.message) {
        console.error("Internal service error!")
        return '';
      }
      return response.message;
    }));
  }

  getDoggoByBread(breed: string, number: number) {
    const reqURL = `https://dog.ceo/api/breed/${breed}/images/random/${number}`;
    if (number === 1) {
      return this.httpClient.get<GetResponseImage>(reqURL)
        .pipe(map((response) => {
          if (response.status !== 'success' || !response.message) {
            console.error("Internal service error!")
            return [];
          }
          return [response.message];
        }));
    }

    return this.httpClient.get<GetResponseImages>(reqURL).pipe(map((response) => {
      if (response.status !== 'success' || !response.message) {
        console.error("Internal service error!")
        return [];
      }
      return response.message;
    }));;
  }

  getDoggoBySubBread(breed: string, subBreed: string, number: number): Observable<string[]> {
    const reqURL = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${number}`;
    if (number === 1) {
      return this.httpClient.get<GetResponseImage>(reqURL)
        .pipe(map((response) => {
          if (response.status !== 'success' || !response.message) {
            console.error("Internal service error!")
            return [];
          }
          return [response.message];
        }));
    }

    return this.httpClient.get<GetResponseImages>(reqURL)
      .pipe(map((response) => {
        if (response.status !== 'success' || !response.message) {
          console.error("Internal service error!")
          return [];
        }
        return response.message;
      }));
  }
}

interface BreedsSignature {
  [key: string]: string[];
}

interface GetResponseBreeds {
  message: BreedsSignature;
  status: string;
}

export interface GetResponseImages {
  message: string[];
  status: string;
}

export interface GetResponseImage {
  message: string;
  status: string;
}

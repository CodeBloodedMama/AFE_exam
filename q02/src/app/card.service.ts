import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export interface Card {
  name: string;
  imageUrl: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http
      .get<Card[]>('https://api.magicthegathering.io/v1/cards')
      .pipe(
        map((data: any) =>
          data.cards.map((card: any) => ({
            name: card.name,
            imageUrl: card.imageUrl,
            id: card.id,
          }))
        )
      );
  }

  getCard(id: number): Observable<Card> {
    return this.http
      .get<Card>(`https://api.magicthegathering.io/v1/cards/${id}`)
      .pipe(
        map((data: any) => ({
          name: data.card.name,
          imageUrl: data.card.imageUrl,
          id: data.card.id,
        })),
        catchError((err) => {
          console.log(err);
          return of({
            name: 'Error! Michael says no!',
            imageUrl:
              'https://media0.giphy.com/media/zCpYQh5YVhdI1rVYpE/giphy.gif?cid=ecf05e47js0l7tkiq3pak6qxu3oo0g80idcxcpqgy53xsxao&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            id: '',
          });
        })
      );
  }
}

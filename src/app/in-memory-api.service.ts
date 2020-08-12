import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryApiService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, title: 'Teste 1', done: false },
      { id: 2, title: 'Teste 2', done: true },
      { id: 3, title: 'Teste 3', done: true },
      { id: 4, title: 'Teste 4', done: false },
      { id: 5, title: 'Teste 5', done: false }
    ];

    return {
      tasks
    };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(items: any[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}

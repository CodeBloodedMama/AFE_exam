import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const pickGuard: CanActivateFn = (route, state) => {
  const number = +route.params['number'];
  console.log('number', number);
  console.log('state', state);
  console.log('route', route);
  if (
    number <= 6 && 
    number >= 1 && 
    number === number && 
    number % 1 === 0
  ) {
    return true;
  } else if (number === 0) {
    alert('You have to pick a number between 1 and 6');
    return inject(Router).parseUrl('/');
  } else {
    alert('You have to pick a number between 1 and 6')
    return inject(Router).parseUrl(`/wrong${state.url}`);
  }
};

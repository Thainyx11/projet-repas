// src/router.js
import { Home } from './views/Home.js';
import { Menu } from './views/Menu.js';
import { Restaurants } from './views/Restaurants.js';
import { Recommandations } from './views/Recommandations.js';
import { Cart } from './views/Cart.js';

export class Router {
  constructor() {
    this.routes = [
      { path: '/', view: Home },
      { path: '/menu', view: Menu },
      { path: '/restaurants', view: Restaurants },
      { path: '/recommandations', view: Recommandations },
      { path: '/panier', view: Cart },
      { path: '*', view: Home } // Route par défaut
    ];

    this.navigateTo = this.navigateTo.bind(this);
    window.addEventListener('popstate', this.render.bind(this));
    document.addEventListener('DOMContentLoaded', this.render.bind(this));
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.render();
  }

  async render() {
    const path = window.location.pathname;
    const route = this.routes.find(route => route.path === path) || this.routes.find(route => route.path === '*');
    const app = document.getElementById('app');
    app.innerHTML = route.view();

    document.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        this.navigateTo(e.target.href);
      });
    });
  }
}
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import data from '../data.json';

export function Restaurants() {
  const restaurantsHTML = data.restaurants.map(restaurant => `
    <div class="col-md-6 mb-4">
      <div class="card">
        <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.nom}">
        <div class="card-body">
          <h5 class="card-title">${restaurant.nom}</h5>
          <p class="card-text">${restaurant.description}</p>
          <p class="card-text">
            Adresse: ${restaurant.adresse}<br>
            Téléphone: ${restaurant.telephone}
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <a href="/menu?restaurant=${restaurant.id}" class="btn btn-primary" data-link>Voir le menu</a>
            <div class="rating" data-rating="${restaurant.rating || 0}">
              ${generateStarRating(restaurant.rating || 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    ${Header()}
    <main class="container mt-5">
      <h1>Nos Restaurants Partenaires</h1>
      <div class="row mt-4">
        ${restaurantsHTML}
      </div>
    </main>
    ${Footer()}
  `;
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return `
    ${'<i class="fas fa-star text-warning"></i>'.repeat(fullStars)}
    ${halfStar ? '<i class="fas fa-star-half-alt text-warning"></i>' : ''}
    ${'<i class="far fa-star text-warning"></i>'.repeat(emptyStars)}
  `;
}
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import data from '../data.json';

export function Home() {
  const platsHTML = data.repas.map(repas => {
    const category = data.categories.find(c => c.id === repas.categorieId);
    const restaurant = data.restaurants.find(r => r.id === repas.restaurantId);
    return `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${repas.image}" class="card-img-top" alt="${repas.nom}">
          <div class="card-body">
            <h5 class="card-title">${repas.nom}</h5>
            <p class="card-text">${repas.description}</p>
            <p class="card-text">
              Prix: ${repas.prix} € | Catégorie: ${category.nom}<br>
              Restaurant: ${restaurant.nom}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-primary" onclick="addToCart(${repas.id})">Ajouter au panier</button>
              <div class="rating" data-rating="${repas.rating || 0}">
                ${generateStarRating(repas.rating || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    ${Header()}
    <main class="container mt-5">
      <h1>Bienvenue sur notre site de commande de repas</h1>
      <p>Découvrez notre sélection de délicieux plats !</p>
      <div class="row mt-4">
        ${platsHTML}
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
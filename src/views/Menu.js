// Menu.js - Page d'affichage du menu avec filtrage et pagination

import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import data from '../data.json';

const ITEMS_PER_PAGE = 6;

export function Menu() {
  // Récupération des paramètres de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get('page')) || 1;
  let searchQuery = urlParams.get('search') || '';
  let categoryId = parseInt(urlParams.get('category')) || null;
  let restaurantId = parseInt(urlParams.get('restaurant')) || null;

  // Filtrage des repas
  const filteredRepas = data.repas.filter(repas => 
    (categoryId ? repas.categorieId === categoryId : true) &&
    (restaurantId ? repas.restaurantId === restaurantId : true) &&
    (repas.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repas.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredRepas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const repasToShow = filteredRepas.slice(startIndex, endIndex);

  // Génération du HTML pour les repas
  const repasHTML = repasToShow.map(repas => {
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

  // Génération de la pagination
  const paginationHTML = generatePagination(currentPage, totalPages, searchQuery, categoryId, restaurantId);

  // Rendu de la page
  return `
    ${Header()}
    <main class="container mt-5">
      <h1>Notre Menu</h1>
      <form class="mb-4" onsubmit="search(event)">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Rechercher un repas" value="${searchQuery}" id="searchInput">
          <button class="btn btn-outline-secondary" type="submit">Rechercher</button>
        </div>
      </form>
      <div class="row">
        ${repasHTML}
      </div>
      ${paginationHTML}
    </main>
    ${Footer()}
  `;
}

// Fonction pour générer le HTML des étoiles de notation
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

// Fonction pour générer la pagination
function generatePagination(currentPage, totalPages, searchQuery, categoryId, restaurantId) {
  let paginationHTML = '<nav aria-label="Page navigation"><ul class="pagination justify-content-center">';

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="/menu?page=${i}&search=${searchQuery}${categoryId ? `&category=${categoryId}` : ''}${restaurantId ? `&restaurant=${restaurantId}` : ''}" data-link>${i}</a>
      </li>
    `;
  }

  paginationHTML += '</ul></nav>';
  return paginationHTML;
}
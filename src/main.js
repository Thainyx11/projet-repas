import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'
import { Router } from './router.js'
import { Home } from './views/Home.js'
import { Menu } from './views/Menu.js'
import { Cart } from './views/Cart.js'

const router = new Router([
  { path: '/', view: Home },
  { path: '/menu', view: Menu },
  { path: '/panier', view: Cart },
])

window.addToCart = (repasId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[repasId] = (cart[repasId] || 0) + 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Repas ajouté au panier !');
  router.render();
};

window.updateQuantity = (repasId, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  if (newQuantity > 0) {
    cart[repasId] = newQuantity;
  } else {
    delete cart[repasId];
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  router.render();
};

window.removeFromCart = (repasId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};delete cart[repasId];
  localStorage.setItem('cart', JSON.stringify(cart));
  router.render();
};

window.clearCart = () => {
  localStorage.removeItem('cart');
  router.render();
};

window.checkout = () => {
  alert('Commande passée avec succès !');
  localStorage.removeItem('cart');
  router.navigateTo('/');
};

window.search = (event) => {
  event.preventDefault();
  const searchQuery = document.getElementById('searchInput').value;
  router.navigateTo(`/menu?search=${searchQuery}`);
};

document.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    router.navigateTo(e.target.href);
  }
});
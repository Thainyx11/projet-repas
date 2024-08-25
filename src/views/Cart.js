import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import data from '../data.json';

export function Cart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const repas = data.repas.find(r => r.id === parseInt(id));
    return `
      <div class="cart-item mb-3">
        <h3>${repas.nom}</h3>
        <p>Prix: ${repas.prix} €</p>
        <div class="quantity-control">
          <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${repas.id}, ${quantity - 1})">-</button>
          <span class="mx-2">${quantity}</span>
          <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${repas.id}, ${quantity + 1})">+</button>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${repas.id})">Supprimer</button>
      </div>
    `;
  }).join('');

  const total = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const repas = data.repas.find(r => r.id === parseInt(id));
    return sum + repas.prix * quantity;
  }, 0);

  return `
    ${Header()}
    <main class="container mt-5">
      <h1>Votre Panier</h1>
      <div id="cart-items">
        ${cartItems}
      </div>
      <p>Total: ${total.toFixed(2)} €</p>
      <button class="btn btn-primary" onclick="checkout()">Commander</button>
      <button class="btn btn-secondary" onclick="clearCart()">Vider le panier</button>
    </main>
    ${Footer()}
  `;
}
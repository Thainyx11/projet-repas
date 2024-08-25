// Header.js - Composant d'en-tête avec navigation

export function Header() {
  return `
    <header class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/" data-link>Commande de Repas</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><a class="nav-link" href="/" data-link>Accueil</a></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/menu?category=1" data-link>Entrées</a></li>
                <li><a class="dropdown-item" href="/menu?category=2" data-link>Plats principaux</a></li>
                <li><a class="dropdown-item" href="/menu?category=3" data-link>Desserts</a></li>
              </ul>
            </li>
            <li class="nav-item"><a class="nav-link" href="/restaurants" data-link>Restaurants</a></li>
            <li class="nav-item"><a class="nav-link" href="/panier" data-link>Panier</a></li>
            <li class="nav-item"><a class="nav-link" href="/recommandations" data-link>Recommandations</a></li>
          </ul>
        </div>
      </div>
    </header>
  `;
}
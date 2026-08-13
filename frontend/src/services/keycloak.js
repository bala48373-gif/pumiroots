import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://pumiroots-keycloak.onrender.com",
  realm: "pumiroots",
  clientId: "pumiroots-frontend",
});

export default keycloak;
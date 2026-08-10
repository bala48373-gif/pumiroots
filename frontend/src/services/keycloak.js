import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "pumiroots",
  clientId: "pumiroots-frontend",
});

export default keycloak;
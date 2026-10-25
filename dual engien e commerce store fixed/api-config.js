// Use the local API during development and the same-origin API on Render.
const isLocalDevelopment =
    window.location.protocol === "file:" ||
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

window.NOVA_API_URL = isLocalDevelopment
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`;
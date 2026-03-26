document.addEventListener("DOMContentLoaded", () => {
  // 1. SÉCURITÉ : Vérifier si l'utilisateur est connecté
  const userString = localStorage.getItem("user");
  if (!userString && window.location.pathname !== "/") {
    window.location.href = "/";
    return;
  }

  if (userString) {
    const user = JSON.parse(userString);
    const nameDisplay = document.getElementById("userNameDisplay");
    if (nameDisplay) nameDisplay.textContent = `Connecté : ${user.username}`;
  }

  // 2. BOUTON DÉCONNEXION
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "/";
    });
  }

  // GESTION DES CATWAYS
  const addCatwayForm = document.getElementById("addCatwayForm");
  if (addCatwayForm) {
    addCatwayForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        catwayNumber: document.getElementById("catwayNumber").value,
        type: document.getElementById("type").value,
        catwayState: document.getElementById("catwayState").value,
      };
      const res = await fetch("/catways", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Catway ajouté !");
        location.reload();
      }
    });
  }

  // GESTION DES RÉSERVATIONS
  const addResaForm = document.getElementById("addResaForm");
  if (addResaForm) {
    addResaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const catwayNumber = document.getElementById("resaCatwayNumber").value;
      const payload = {
        clientName: document.getElementById("clientName").value,
        boatName: document.getElementById("boatName").value,
        checkIn: document.getElementById("checkIn").value,
        checkOut: document.getElementById("checkOut").value,
      };
      const res = await fetch(`/catways/${catwayNumber}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Réservation créée !");
        location.reload();
      }
    });
  }

  // GESTION DES UTILISATEURS (PERSONNEL)
  const addUserForm = document.getElementById("addUserForm");
  if (addUserForm) {
    addUserForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        username: document.getElementById("newUsername").value,
        email: document.getElementById("newEmail").value,
        password: document.getElementById("newPassword").value,
      };
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Agent créé avec succès !");
        location.reload();
      }
    });
  }
});

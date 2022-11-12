function showLoader() {
  let bars = document.querySelectorAll(".load-bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.animationDelay = `${i / 15}s`;
  }
  document.getElementById("loader").classList.add("show-loader");
}
function closeLoader() {
  document.getElementById("loader").classList.remove("show-loader");
}

function OpenModal() {
  let modal = document.getElementById("modal");
  let user_id = document.getElementById("username").value;
  let water = document.getElementById("water").value;
  let supplement = document.getElementById("supplement").value;
  let flavour = document.getElementById("flavour").value;

  modal.style.display = "grid";
  user_id.textContent = user_id;
  user_id.textContent = user_id;
  user_id.textContent = user_id;

  if (user_id != "") {
    document.getElementById("modal-username").textContent = user_id;
  } else {
    document.getElementById("modal-username").textContent = "not speciefied";
  }
  if (water != "") {
    document.getElementById("modal-water").textContent = water;
  } else {
    document.getElementById("modal-water").textContent = "not speciefied";
  }
  if (supplement != "") {
    document.getElementById("modal-supplement").textContent = supplement;
  } else {
    document.getElementById("modal-supplement").textContent = "not speciefied";
  }
  if (flavour != "") {
    document.getElementById("modal-flavour").textContent = flavour;
  } else {
    document.getElementById("modal-flavour").textContent = "not speciefied";
  }
}
function CloseModal(e) {
  if (e == 0) {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  } else {
    const modal = document.getElementById("modal_service");
    modal.style.display = "none";
    document
      .getElementById("error-password")
      .classList.remove("alert-danger-service");
    document.getElementById("error-password").textContent = "";
    document.getElementById("password").value = "";
  }
}

function showModalService() {
  const modal_service = document.getElementById("modal_service");
  modal_service.style.display = "grid";
}

function closemenu() {
  document.getElementById("sidebarServiceMenu").classList.remove("opened");
  document.getElementById("sidebarServiceMenu").classList.add("closed");
  document.getElementById("sidebar_section").style.display = "none";
}

const showErrorMessage = (msg) => {
  document.getElementById("msg").classList.remove("alert-success");
  document.getElementById("msg").classList.add("alert-danger");
  document.getElementById("msg").textContent = msg;
};

const showSuccessMessage = (msg) => {
  document.getElementById("msg").classList.remove("alert-danger");
  document.getElementById("msg").classList.add("alert-success");
  document.getElementById("msg").textContent = msg;
};

const cleanMessage = (time) => {
  const interval = time ? time : 5000;
  setTimeout(() => {
    document.getElementById("msg").classList.remove("alert-success");
    document.getElementById("msg").classList.remove("alert-danger");
    document.getElementById("msg").textContent = "";
  }, interval);
};

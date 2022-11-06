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
  var modal = document.getElementById("modal");
  modal.style.display = "grid";
  var user_id = document.getElementById("username").value;
  var water = document.getElementById("water").value;
  user_id.textContent = user_id;
  var supplement = document.getElementById("supplement").value;
  user_id.textContent = user_id;
  var flavour = document.getElementById("flavour").value;
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
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  } else {
    var modal = document.getElementById("modal_service");
    modal.style.display = "none";
    document
      .getElementById("error-password")
      .classList.remove("alert-danger-service");
    document.getElementById("error-password").textContent = "";
    document.getElementById("password").value = "";
  }
}

function showModalService() {
  var modal_service = document.getElementById("modal_service");
  modal_service.style.display = "grid";
}

function closemenu() {
  document.getElementById("sidebarServiceMenu").classList.remove("opened");
  document.getElementById("sidebarServiceMenu").classList.add("closed");
  document.getElementById("sidebar_section").style.display = "none";
}

const showErrorMessage = (msg) => {
  document.getElementById("msg").classList.remove("alert-danger");
  document.getElementById("msg").classList.add("alert-success");
  document.getElementById("msg").textContent = msg;
};

const showSuccessMessage = (msg) => {
  document.getElementById("msg").classList.remove("alert-danger");
  document.getElementById("msg").classList.add("alert-success");
  document.getElementById("msg").textContent = msg;
};

const cleanMessage = () => {
  setTimeout(() => {
    document.getElementById("msg").classList.remove("alert-success");
    document.getElementById("msg").classList.remove("alert-danger");
    document.getElementById("msg").textContent = "";
  }, 5000);
};

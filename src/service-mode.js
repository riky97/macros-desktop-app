const serviceModeSectionId = [
  "clean_fill",
  "supplement_selection",
  "flavour_selection",
  "erogation_time",
  "clean_time",
  "fill_time",
];
const serviceModeButtonId = [
  "cleanFillButtonMode",
  "supplementButtonMode",
  "flavourButtonMode",
  "erogationTimeButtonMode",
  "cleanTimeButtonMode",
  "fillTimeButtonMode",
];

const manageCssServiceMode = (section, button) => {
  for (const element of serviceModeSectionId) {
    if (element === section) {
      console.log("section", element);
      document.getElementById(element).style.display = "block";
    } else {
      document.getElementById(element).style.display = "none";
    }
  }
  for (const element of serviceModeButtonId) {
    if (element === button) {
      document.getElementById(element).style.opacity = "1";
    } else {
      document.getElementById(element).style.opacity = ".4";
    }
  }
  cleanMessage(0);
};

/**********************OPEN SERVICE MODE*****************************/
function openServiceMode() {
  let psw = document.getElementById("password");
  if (psw.value == "Admin") {
    document.getElementById("logo-macros").onclick = null;
    document
      .getElementById("error-password")
      .classList.remove("alert-danger-service");
    document.getElementById("error-password").textContent = "";
    CloseModal(1);
    document.getElementById("section-erogation").style.display = "none";
    document.getElementById("section-service").style.display = "block";
    document.getElementById("text-p").style.display = "none";
    document.getElementById("sidebarServiceMenu").style.display = "flex";
    document.getElementById("openmenu").style.display = "flex";
    document.getElementById("sidebarServiceMenu").classList.remove("opened");
    document.getElementById("sidebarServiceMenu").classList.add("closed");
    cleanMessage(0);
    serviceSidebar("sm");
  } else {
    document
      .getElementById("error-password")
      .classList.add("alert-danger-service");
    document.getElementById("error-password").textContent = "Password wrong!";
  }
}

/**********************CLOSE SERVICE MODE*****************************/

function closeServiceMode() {
  document
    .getElementById("logo-macros")
    .setAttribute("onclick", "showModalService()");
  document.getElementById("text-p").style.display = "block";
  document.getElementById("section-erogation").style.display = "block";
  document.getElementById("section-service").style.display = "none";
  document.getElementById("sidebarServiceMenu").style.display = "none";
  document.getElementById("openmenu").style.display = "none";
  document.getElementById("sidebar_section").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("water").value = "";
  document.getElementById("supplement").value = "";
  document.getElementById("flavour").value = "";
  cleanMessage(0);
}

const listSerialPorts = async (key) => {
  console.log("key", key);
  await SerialPort.list().then((ports, err) => {
    try {
      if (err) {
        console.log(err);
        return;
      }

      console.log("ports", ports);

      if (ports.length === 0) {
        console.log("No ports discovered");
      }
      let com;
      ports.forEach(function (port) {
        if (port.manufacturer == "FTDI") {
          if (port.serialNumber == "A100Y8LF") {
            com = port.path;
          }
        }
      });
      console.log(com);
      serport = new SerialPort({ path: com, baudRate: rate });

      serport.on("error", function (err) {
        console.log("Error: ", err.message);
        serport.close(function (err) {
          console.log("port closed", err);
        }); // close the port after received command from mic
      });

      serport.write(sentBufferResult(key), (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("buffReqSupp :>> ", sentBufferResult(key));
        }
      });
      serport.on("readable", function () {
        const buffReceive = serport.read();
        const cmd_mic_app = buffReceive.toString("utf8");

        console.log("receive:", buffReceive);
        console.log("CMD_MICRO >> ", cmd_mic_app);
        if (cmd_mic_app == "30") {
          showErrorMessage("There is an error!");
          cleanMessage();
        } else {
          getBufferResult(key, cmd_mic_app);
        }
        serport.close(function (err) {
          console.log("port closed", err);
        }); // close the port after received command from mic
      });
    } catch (error) {
      console.log("error", error);
    }
  });
};

const sentBufferResult = (key) => {
  switch (key) {
    case "sm":
      return Buffer.from("8.e");
    case "ss":
      return Buffer.from("4.e");
    case "fs":
      return Buffer.from("6.e");
    case "et":
      return Buffer.from("202.e");
    case "ct":
      return Buffer.from("200.e");
    case "ft":
      return Buffer.from("201.e");
    default:
      break;
  }
};

const getBufferResult = (key, cmd_mic_app) => {
  switch (key) {
    case "sm":
      if (cmd_mic_app == "0") {
        for (let p = 3; p <= 4; p++) {
          document
            .getElementById("service_" + p.toString())
            .classList.remove("btn-bg-tertiary");
          document
            .getElementById("service_" + p.toString())
            .classList.add("btn-bg-secondary");
        }
      }
      if (cmd_mic_app == "1") {
        document
          .getElementById("service_3")
          .classList.remove("btn-bg-tertiary");
        document.getElementById("service_3").classList.add("btn-bg-secondary");
        document.getElementById("service_4").classList.add("btn-bg-tertiary");
        document
          .getElementById("service_4")
          .classList.remove("btn-bg-secondary");
      }

      if (cmd_mic_app == "2") {
        document
          .getElementById("service_4")
          .classList.remove("btn-bg-tertiary");
        document.getElementById("service_4").classList.add("btn-bg-secondary");
        document.getElementById("service_3").classList.add("btn-bg-tertiary");
        document
          .getElementById("service_3")
          .classList.remove("btn-bg-secondary");
      }
      if (cmd_mic_app == "3") {
        for (let p = 3; p <= 4; p++) {
          document
            .getElementById("service_" + p.toString())
            .classList.add("btn-bg-tertiary");
          document
            .getElementById("service_" + p.toString())
            .classList.remove("btn-bg-secondary");
        }
      }
      break;
    case "ss":
      for (let i = 1; i <= 4; i++) {
        if (cmd_mic_app == "0") {
          for (let p = 1; p <= 4; p++) {
            document
              .getElementById("supplement_" + p.toString())
              .classList.remove("btn-bg-tertiary");
            document
              .getElementById("supplement_" + p.toString())
              .classList.add("btn-bg-secondary");
          }
        } else {
          if (cmd_mic_app == i.toString()) {
            document
              .getElementById("supplement_" + i.toString())
              .classList.remove("btn-bg-secondary");
            document
              .getElementById("supplement_" + i.toString())
              .classList.add("btn-bg-tertiary");
          } else {
            document
              .getElementById("supplement_" + i.toString())
              .classList.add("btn-bg-secondary");
            document
              .getElementById("supplement_" + i.toString())
              .classList.remove("btn-bg-tertiary");
          }
        }
      }
      break;
    case "fs":
      for (let i = 1; i <= 5; i++) {
        if (cmd_mic_app == "0") {
          for (let p = 1; p <= 5; p++) {
            document
              .getElementById("flavour_" + p.toString())
              .classList.remove("btn-bg-tertiary");
            document
              .getElementById("flavour_" + p.toString())
              .classList.add("btn-bg-secondary");
          }
        } else {
          if (cmd_mic_app == i.toString()) {
            document
              .getElementById("flavour_" + i.toString())
              .classList.remove("btn-bg-secondary");
            document
              .getElementById("flavour_" + i.toString())
              .classList.add("btn-bg-tertiary");
          } else {
            document
              .getElementById("flavour_" + i.toString())
              .classList.add("btn-bg-secondary");
            document
              .getElementById("flavour_" + i.toString())
              .classList.remove("btn-bg-tertiary");
          }
        }
      }
      break;
    case "et":
      const cmdErogationTime = cmd_mic_app.split(".");
      const valvFlow = cmdErogationTime[0] + " [ml/s x10]";
      const pumpFlow = cmdErogationTime[1] + " [ml/s x100]";
      const feederFlow = cmdErogationTime[2] + " [gr/s x100]";

      document.getElementById("water_erogation_time").placeholder = valvFlow;
      document.getElementById("flavour_erogation_time").placeholder = pumpFlow;
      document.getElementById("supplement_erogation_time").placeholder =
        feederFlow;
      break;
    case "ct":
      const cmdCleanTime = cmd_mic_app.split(".");
      const pumpCleanTime = cmdCleanTime[0] + " [s]";
      const feederCleanTime = cmdCleanTime[1] + " [s]";
      document.getElementById("peristaltic_pump_clean_time").placeholder =
        pumpCleanTime;
      document.getElementById("spiral_feeder_clean_time").placeholder =
        feederCleanTime;
      break;
    case "ft":
      const cmdFillTime = cmd_mic_app.split(".");
      const pumpFillTime = cmdFillTime[0] + " [s]";
      const feederFillTime = cmdFillTime[1] + " [s]";
      document.getElementById("peristaltic_pump_fill_time").placeholder =
        pumpFillTime;
      document.getElementById("spiral_feeder_fill_time").placeholder =
        feederFillTime;
      break;
    default:
      break;
  }
};

const switchCssServiceMode = (key) => {
  switch (key) {
    case "sm":
      return manageCssServiceMode(
        serviceModeSectionId[0],
        serviceModeButtonId[0]
      );
    case "ss":
      return manageCssServiceMode(
        serviceModeSectionId[1],
        serviceModeButtonId[1]
      );
    case "fs":
      return manageCssServiceMode(
        serviceModeSectionId[2],
        serviceModeButtonId[2]
      );
    case "et":
      return manageCssServiceMode(
        serviceModeSectionId[3],
        serviceModeButtonId[3]
      );
    case "ct":
      return manageCssServiceMode(
        serviceModeSectionId[4],
        serviceModeButtonId[4]
      );
    case "ft":
      return manageCssServiceMode(
        serviceModeSectionId[5],
        serviceModeButtonId[5]
      );
    default:
      break;
  }
};

/***********************SERVICE SIDEBAR******************/
function serviceSidebar(e) {
  switchCssServiceMode(e);
  listSerialPorts(e);
}

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
  for (let index = 0; index < serviceModeSectionId.length; index++) {
    const element = serviceModeSectionId[index];
    if (element === section) {
      console.log("section", element);
      document.getElementById(element).style.display = "block";
    } else {
      document.getElementById(element).style.display = "none";
    }
  }
  for (let index = 0; index < serviceModeButtonId.length; index++) {
    const element = serviceModeButtonId[index];
    if (element === button) {
      document.getElementById(element).style.opacity = "1";
    } else {
      document.getElementById(element).style.opacity = ".4";
    }
  }
  document.getElementById("msg").classList.remove("alert-success");
  document.getElementById("msg").classList.remove("alert-danger");
  document.getElementById("msg").textContent = "";
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
    //document.getElementById("text-p").textContent="Service Mode";
    document.getElementById("text-p").style.display = "none";
    document.getElementById("sidebarServiceMenu").style.display = "flex";
    document.getElementById("openmenu").style.display = "flex";
    document.getElementById("sidebarServiceMenu").classList.remove("opened");
    document.getElementById("sidebarServiceMenu").classList.add("closed");
    document.getElementById("msg").classList.remove("alert-success");
    document.getElementById("msg").classList.remove("alert-danger");
    document.getElementById("msg").textContent = "";
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
  document.getElementById("msg").textContent = "";
  document.getElementById("msg").classList.remove("alert-danger");
  document.getElementById("msg").classList.remove("alert-success");
  document.getElementById("sidebarServiceMenu").style.display = "none";
  document.getElementById("openmenu").style.display = "none";
  document.getElementById("sidebar_section").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("water").value = "";
  document.getElementById("supplement").value = "";
  document.getElementById("flavour").value = "";
}

/***********************SERVICE SIDEBAR******************/
function serviceSidebar(e) {
  if (e == "sm") {
    manageCssServiceMode(serviceModeSectionId[0], serviceModeButtonId[0]);

    var result = "8.e";

    console.log(result);
    var buffReqCleanFill = Buffer.from(result);

    async function listSerialPorts() {
      await SerialPort.list().then((ports, err) => {
        if (err) {
          //document.getElementById('error').textContent = err.message
          console.log(err);
          return;
        }

        console.log("ports", ports);

        if (ports.length === 0) {
          //document.getElementById('error').textContent = 'No ports discovered'
          console.log("No ports discovered");
        }
        var com;
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
        });

        serport.write(buffReqCleanFill, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("buffReqSupp :>> ", buffReqCleanFill);
          }
        });
        serport.on("readable", function () {
          let buffReceive = serport.read();
          console.log("receive:", buffReceive);
          console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
          if (buffReceive.toString("utf8") == "30") {
            cmd_mic_app = buffReceive.toString("utf8");
            msg = "There is an error!";
            document.getElementById("msg").classList.remove("alert-success");
            document.getElementById("msg").textContent = msg;
            document.getElementById("msg").classList.add("alert-danger");
          } else {
            if (buffReceive.toString("utf8") == "0") {
              for (var p = 3; p <= 4; p++) {
                document
                  .getElementById("service_" + p.toString())
                  .classList.remove("btn-bg-tertiary");
                document
                  .getElementById("service_" + p.toString())
                  .classList.add("btn-bg-secondary");
              }
            }
            if (buffReceive.toString("utf8") == "1") {
              document
                .getElementById("service_3")
                .classList.remove("btn-bg-tertiary");
              document
                .getElementById("service_3")
                .classList.add("btn-bg-secondary");
              document
                .getElementById("service_4")
                .classList.add("btn-bg-tertiary");
              document
                .getElementById("service_4")
                .classList.remove("btn-bg-secondary");
            }

            if (buffReceive.toString("utf8") == "2") {
              document
                .getElementById("service_4")
                .classList.remove("btn-bg-tertiary");
              document
                .getElementById("service_4")
                .classList.add("btn-bg-secondary");
              document
                .getElementById("service_3")
                .classList.add("btn-bg-tertiary");
              document
                .getElementById("service_3")
                .classList.remove("btn-bg-secondary");
            }
            if (buffReceive.toString("utf8") == "3") {
              for (var p = 3; p <= 4; p++) {
                document
                  .getElementById("service_" + p.toString())
                  .classList.add("btn-bg-tertiary");
                document
                  .getElementById("service_" + p.toString())
                  .classList.remove("btn-bg-secondary");
              }
            }
          }

          serport.close(function (err) {
            console.log("port closed", err);
          }); // close the port after received command from mic
        });
      });
    }
    setTimeout(() => {
      listSerialPorts();
      //closeLoader();
    }, 100);
  }
  if (e == "ss") {
    manageCssServiceMode(serviceModeSectionId[1], serviceModeButtonId[1]);

    var result = "4.e";

    console.log(result);
    var buffReqSupp = Buffer.from(result);

    async function listSerialPorts() {
      await SerialPort.list().then((ports, err) => {
        if (err) {
          //document.getElementById('error').textContent = err.message
          console.log(err);
          return;
        }

        console.log("ports", ports);

        if (ports.length === 0) {
          //document.getElementById('error').textContent = 'No ports discovered'
          console.log("No ports discovered");
        }
        var com;
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
        });

        serport.write(buffReqSupp, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("buffReqSupp :>> ", buffReqSupp);
          }
        });
        serport.on("readable", function () {
          let buffReceive = serport.read();
          console.log("receive:", buffReceive);
          console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
          if (buffReceive.toString("utf8") == "30") {
            cmd_mic_app = buffReceive.toString("utf8");
            msg = "There is an error!";
            document.getElementById("msg").classList.remove("alert-success");
            document.getElementById("msg").textContent = msg;
            document.getElementById("msg").classList.add("alert-danger");
          } else {
            for (var i = 1; i <= 4; i++) {
              if (buffReceive.toString("utf8") == "0") {
                for (var p = 1; p <= 4; p++) {
                  document
                    .getElementById("supplement_" + p.toString())
                    .classList.remove("btn-bg-tertiary");
                  document
                    .getElementById("supplement_" + p.toString())
                    .classList.add("btn-bg-secondary");
                }
              } else {
                if (buffReceive.toString("utf8") == i.toString()) {
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
          }

          serport.close(function (err) {
            console.log("port closed", err);
          }); // close the port after received command from mic
        });
      });
    }
    setTimeout(() => {
      listSerialPorts();
      //closeLoader();
    }, 100);
  }
  if (e == "fs") {
    manageCssServiceMode(serviceModeSectionId[2], serviceModeButtonId[2]);
    var result = "6.e";
    console.log(result);
    var buffReqFl = Buffer.from(result);

    async function listSerialPorts() {
      await SerialPort.list().then((ports, err) => {
        if (err) {
          //document.getElementById('error').textContent = err.message
          console.log(err);
          return;
        }

        console.log("ports", ports);

        if (ports.length === 0) {
          //document.getElementById('error').textContent = 'No ports discovered'
          console.log("No ports discovered");
        }
        var com;
        ports.forEach(function (port) {
          if (port.manufacturer == "FTDI") {
            com = port.path;
          }
        });
        console.log(com);
        serport = new SerialPort({ path: com, baudRate: rate });
        serport.on("error", function (err) {
          console.log("Error: ", err.message);
        });

        serport.write(buffReqFl, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("buffReqFl :>> ", buffReqFl);
          }
        });
        serport.on("readable", function () {
          let buffReceive = serport.read();
          console.log("receive:", buffReceive);
          console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
          if (buffReceive.toString("utf8") == "30") {
            cmd_mic_app = buffReceive.toString("utf8");
            msg = "There is an error!";
            document.getElementById("msg").classList.remove("alert-success");
            document.getElementById("msg").textContent = msg;
            document.getElementById("msg").classList.add("alert-danger");
          } else {
            for (var i = 1; i <= 5; i++) {
              if (buffReceive.toString("utf8") == "0") {
                for (var p = 1; p <= 5; p++) {
                  document
                    .getElementById("flavour_" + p.toString())
                    .classList.remove("btn-bg-tertiary");
                  document
                    .getElementById("flavour_" + p.toString())
                    .classList.add("btn-bg-secondary");
                }
              } else {
                if (buffReceive.toString("utf8") == i.toString()) {
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
          }

          serport.close(function (err) {
            console.log("port closed", err);
          }); // close the port after received command from mic
        });
      });
    }
    setTimeout(() => {
      listSerialPorts();
      //closeLoader();
    }, 100);
  }
  if (e == "et") {
    manageCssServiceMode(serviceModeSectionId[3], serviceModeButtonId[3]);
    var result = "6.e";
    console.log(result);
    var buffReqFl = Buffer.from(result);

    async function listSerialPorts() {
      await SerialPort.list().then((ports, err) => {
        if (err) {
          //document.getElementById('error').textContent = err.message
          console.log(err);
          return;
        }

        console.log("ports", ports);

        if (ports.length === 0) {
          //document.getElementById('error').textContent = 'No ports discovered'
          console.log("No ports discovered");
        }
        var com;
        ports.forEach(function (port) {
          if (port.manufacturer == "FTDI") {
            com = port.path;
          }
        });
        console.log(com);
        serport = new SerialPort({ path: com, baudRate: rate });
        serport.on("error", function (err) {
          console.log("Error: ", err.message);
        });

        serport.write(buffReqFl, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("buffReqFl :>> ", buffReqFl);
          }
        });
        serport.on("readable", function () {
          let buffReceive = serport.read();
          console.log("receive:", buffReceive);
          console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
          if (buffReceive.toString("utf8") == "30") {
            cmd_mic_app = buffReceive.toString("utf8");
            msg = "There is an error!";
            document.getElementById("msg").classList.remove("alert-success");
            document.getElementById("msg").textContent = msg;
            document.getElementById("msg").classList.add("alert-danger");
          } else {
            for (var i = 1; i <= 5; i++) {
              if (buffReceive.toString("utf8") == "0") {
                for (var p = 1; p <= 5; p++) {
                  document
                    .getElementById("flavour_" + p.toString())
                    .classList.remove("btn-bg-tertiary");
                  document
                    .getElementById("flavour_" + p.toString())
                    .classList.add("btn-bg-secondary");
                }
              } else {
                if (buffReceive.toString("utf8") == i.toString()) {
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
          }

          serport.close(function (err) {
            console.log("port closed", err);
          }); // close the port after received command from mic
        });
      });
    }
    setTimeout(() => {
      listSerialPorts();
      //closeLoader();
    }, 100);
  }
  if (e == "ct") {
    manageCssServiceMode(serviceModeSectionId[4], serviceModeButtonId[4]);
    var result = "200.e";
    console.log(result);
    var buffReqFl = Buffer.from(result);

    async function listSerialPorts() {
      try {
        await SerialPort.list().then((ports, err) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log("ports", ports);

          if (ports.length === 0) {
            console.log("No ports discovered");
          }
          var com;
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
          });

          serport.write(buffReqFl, (err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("buffReqFl :>> ", buffReqFl);
            }
          });
          serport.on("readable", function () {
            let buffReceive = serport.read();
            console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
            if (buffReceive.toString("utf8") == "30") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "There is an error!";
              document.getElementById("msg").classList.remove("alert-success");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-danger");
            } else {
              const cmdCleanTime = buffReceive.toString("utf8").split(".");
              const pumpCleanTime = cmdCleanTime[0] + " [s]";
              const feederCleanTime = cmdCleanTime[1] + " [s]";
              document.getElementById(
                "peristaltic_pump_clean_time"
              ).placeholder = pumpCleanTime;
              document.getElementById("spiral_feeder_clean_time").placeholder =
                feederCleanTime;
            }

            serport.close(function (err) {
              console.log("port closed", err);
            }); // close the port after received command from mic
          });
        });
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    setTimeout(() => {
      listSerialPorts();
      //closeLoader();
    }, 100);
  }
  if (e == "ft") {
    manageCssServiceMode(serviceModeSectionId[5], serviceModeButtonId[5]);
    var result = "201.e";
    console.log(result);
    var buffReqFl = Buffer.from(result);

    async function listSerialPorts() {
      try {
        await SerialPort.list().then((ports, err) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log("ports", ports);

          if (ports.length === 0) {
            console.log("No ports discovered");
          }
          var com;
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
          });

          serport.write(buffReqFl, (err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("buffReqFl :>> ", buffReqFl);
            }
          });
          serport.on("readable", function () {
            let buffReceive = serport.read();
            console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
            if (buffReceive.toString("utf8") == "30") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "There is an error!";
              document.getElementById("msg").classList.remove("alert-success");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-danger");
            } else {
              const cmdFillTime = buffReceive.toString("utf8").split(".");
              const pumpFillTime = cmdFillTime[0] + " [s]";
              const feederFillTime = cmdFillTime[1] + " [s]";
              document.getElementById(
                "peristaltic_pump_fill_time"
              ).placeholder = pumpFillTime;
              document.getElementById("spiral_feeder_fill_time").placeholder =
                feederFillTime;
            }

            serport.close(function (err) {
              console.log("port closed", err);
            }); // close the port after received command from mic
          });
        });
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    setTimeout(() => {
      listSerialPorts();
      //closeLoader();
    }, 100);
  }
}

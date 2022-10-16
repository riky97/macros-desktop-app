// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require("serialport");
var serport = "";
var rate = 57600;
var serports = [];

/********************USER EXPERIENCE**************************/

function validateForm(cmd) {
  var cmd = cmd;
  if (cmd == 1) {
    CloseModal(0);
  }
  var user_id = document.getElementById("username").value;
  var water = document.getElementById("water").value;
  var supplement = document.getElementById("supplement").value;
  var flavour = document.getElementById("flavour").value;
  console.log("inputUsername :>> ", user_id);
  console.log("inputUsername :>> ", water);
  console.log("inputUsername :>> ", supplement);
  console.log("inputUsername :>> ", flavour);
  console.log(cmd);
  console.log("typeOf(water) :>> ", typeof water);

  if (
    isNaN(parseInt(user_id)) ||
    isNaN(parseInt(water)) ||
    isNaN(parseInt(supplement)) ||
    isNaN(parseInt(flavour))
  ) {
    document.getElementById("msg").classList.remove("alert-success");
    document.getElementById("msg").classList.add("alert-danger");
    document.getElementById("msg").textContent = "There is an error!";
    if (parseInt(user_id) > 0 && parseInt(user_id) <= 255) {
      document
        .getElementById("error-username")
        .classList.remove("alert-danger");
      document
        .getElementById("error-username")
        .classList.remove("alert-success");
      document.getElementById("error-username").textContent = "";
    } else {
      document.getElementById("error-username").classList.add("alert-danger");
      document.getElementById("error-username").textContent = "1-255";
    }
    if (parseInt(water) > 0 && parseInt(water) <= 500) {
      document.getElementById("error-water").classList.remove("alert-danger");
      document.getElementById("error-water").classList.remove("alert-success");
      document.getElementById("error-water").textContent = "";
    } else {
      document.getElementById("error-water").classList.add("alert-danger");
      document.getElementById("error-water").textContent = "1-500";
    }
    if (parseInt(supplement) > 0 && parseInt(supplement) <= 100) {
      document
        .getElementById("error-supplement")
        .classList.remove("alert-danger");
      document
        .getElementById("error-supplement")
        .classList.remove("alert-success");
      document.getElementById("error-supplement").textContent = "";
    } else {
      document.getElementById("error-supplement").classList.add("alert-danger");
      document.getElementById("error-supplement").textContent = "1-100";
    }
    if (parseInt(flavour) > 0 && parseInt(flavour) <= 50) {
      document.getElementById("error-flavour").classList.remove("alert-danger");
      document
        .getElementById("error-flavour")
        .classList.remove("alert-success");
      document.getElementById("error-flavour").textContent = "";
    } else {
      document.getElementById("error-flavour").classList.add("alert-danger");
      document.getElementById("error-flavour").textContent = "1-50";
    }
  } else {
    if (
      !(parseInt(user_id) > 0 && parseInt(user_id) <= 255) ||
      !(parseInt(water) > 0 && parseInt(water) <= 500) ||
      !(parseInt(supplement) > 0 && parseInt(supplement) <= 100) ||
      !(parseInt(flavour) > 0 && parseInt(flavour) <= 50)
    ) {
      if (!(parseInt(user_id) > 0 && parseInt(user_id) <= 255)) {
        document.getElementById("error-username").classList.add("alert-danger");
        document.getElementById("error-username").textContent = "1-255";
      } else {
        document
          .getElementById("error-username")
          .classList.remove("alert-danger");
        document.getElementById("error-username").textContent = "";
      }
      if (!(parseInt(water) > 0 && parseInt(water) <= 500)) {
        document.getElementById("error-water").classList.add("alert-danger");
        document.getElementById("error-water").textContent = "1-500";
      } else {
        document.getElementById("error-water").classList.remove("alert-danger");
        document.getElementById("error-water").textContent = "";
      }
      if (!(parseInt(supplement) > 0 && parseInt(supplement) <= 100)) {
        document
          .getElementById("error-supplement")
          .classList.add("alert-danger");
        document.getElementById("error-supplement").textContent = "1-100";
      } else {
        document
          .getElementById("error-supplement")
          .classList.remove("alert-danger");
        document.getElementById("error-supplement").textContent = "";
      }
      if (!(parseInt(flavour) > 0 && parseInt(flavour) <= 50)) {
        document.getElementById("error-flavour").classList.add("alert-danger");
        document.getElementById("error-flavour").textContent = "1-50";
      } else {
        document
          .getElementById("error-flavour")
          .classList.remove("alert-danger");
        document.getElementById("error-flavour").textContent = "";
      }
      document.getElementById("msg").classList.remove("alert-success");
      document.getElementById("msg").classList.add("alert-danger");
      document.getElementById("msg").textContent = "There is an error!";
    } else {
      if (cmd == 1) {
        showLoader();
      } // mostra il loader di erogazione in corso
      //se non ci sono errori rimuovo classi e testi
      document.getElementById("msg").classList.remove("alert-danger");
      document.getElementById("msg").textContent = "";
      document
        .getElementById("error-username")
        .classList.remove("alert-danger");
      document.getElementById("error-username").textContent = "";
      document.getElementById("error-water").classList.remove("alert-danger");
      document.getElementById("error-water").textContent = "";
      document
        .getElementById("error-supplement")
        .classList.remove("alert-danger");
      document.getElementById("error-supplement").textContent = "";
      document.getElementById("error-flavour").classList.remove("alert-danger");
      document.getElementById("error-flavour").textContent = "";

      let water_msb,
        water_lsb = 0;
      if (water < 255) {
        water_msb = 0;
        water_lsb = water;
      } else {
        let sub_lsb = "";
        function dec2Bin(dec) {
          return (dec >>> 0).toString(2);
        }
        var binary = dec2Bin(water);
        console.log("binary :>> ", binary);
        water_msb = 1;
        sub_lsb = binary.substring(1);
        water_lsb = parseInt(sub_lsb, 2);
      }
      var cs = cmd ^ user_id ^ water_msb ^ water_lsb ^ supplement ^ flavour;

      var result =
        cmd.toString() +
        "." +
        user_id.toString() +
        "." +
        water_msb.toString() +
        "." +
        water_lsb.toString() +
        "." +
        supplement.toString() +
        "." +
        flavour.toString() +
        "." +
        cs.toString() +
        ".e";

      console.log(result);
      var sentBuff = Buffer.from(result);
      console.log(sentBuff);

      async function listSerialPorts() {
        await serialport.list().then((ports, err) => {
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
              if (port.serialNumber == "AC01P2CA") {
                com = port.path;
              } /*if(port.serialNumber== undefined){
            com=port.path;
          }*/
            }
          });
          console.log(com);

          serport = new serialport(com, { baudRate: rate });
          serport.on("error", function (err) {
            console.log("Error: ", err.message);
          });

          serport.write(sentBuff, (err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("result :>> ", sentBuff);
            }
          });

          serport.on("readable", function () {
            let buffReceive = serport.read();
            console.log("receive:", buffReceive);
            console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
            if (buffReceive.toString("utf8") == "10") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "Recipe received!";
              document.getElementById("msg").classList.remove("alert-danger");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-success");
              document.getElementById("username").value = "";
              document.getElementById("water").value = "";
              document.getElementById("supplement").value = "";
              document.getElementById("flavour").value = "";
              setTimeout(() => {
                document.getElementById("msg").textContent = "";
                document
                  .getElementById("msg")
                  .classList.remove("alert-success");
              }, 2000);
              //res.json({cmd_mic:cmd_mic_app,message:msg});
            }
            if (buffReceive.toString("utf8") == "11") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "Erogation completed successfully!";
              closeLoader();
              document.getElementById("msg").classList.remove("alert-danger");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-success");
              //res.json({cmd_mic:cmd_mic_app,message:msg});
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-success");
              document.getElementById("username").value = "";
              document.getElementById("water").value = "";
              document.getElementById("supplement").value = "";
              document.getElementById("flavour").value = "";
              setTimeout(() => {
                document.getElementById("msg").textContent = "";
                document
                  .getElementById("msg")
                  .classList.remove("alert-success");
              }, 2000);
            }
            if (buffReceive.toString("utf8") == "12") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "Error in receiving the recipe!";
              document.getElementById("msg").classList.remove("alert-success");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-danger");
              //res.json({cmd_mic:cmd_mic_app,message:msg});
            }
            if (buffReceive.toString("utf8") == "13") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "Erogation failed!";
              closeLoader();
              document.getElementById("msg").classList.remove("alert-success");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-danger");
              //res.json({cmd_mic:cmd_mic_app,message:msg});
            }

            serport.close(function (err) {
              console.log("port closed", err);
            }); // close the port after received command from mic
          });
        });
      }

      // Set a timeout that will check for new serialPorts every 2 sseconds.
      // This timeout reschedules itself.
      setTimeout(() => {
        listSerialPorts();
        //closeLoader();
      }, 100);
    }
  }
}

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
    document.getElementById("service_mode").style.display = "none";
    document.getElementById("supplement_selection").style.display = "none";
    document.getElementById("supplementButtonMode").style.opacity = ".4";
    document.getElementById("cleanFillButtonMode").style.opacity = "1";
    document.getElementById("flavourButtonMode").style.opacity = ".4";
    document.getElementById("service_mode").style.display = "block";
    document.getElementById("supplement_selection").style.display = "none";
    document.getElementById("flavour_selection").style.display = "none";
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
    document.getElementById("service_mode").style.display = "block";
    document.getElementById("supplement_selection").style.display = "none";
    document.getElementById("flavour_selection").style.display = "none";
    document.getElementById("supplementButtonMode").style.opacity = ".4";
    document.getElementById("cleanFillButtonMode").style.opacity = "1";
    document.getElementById("flavourButtonMode").style.opacity = ".4";
    document.getElementById("msg").classList.remove("alert-success");
    document.getElementById("msg").classList.remove("alert-danger");
    document.getElementById("msg").textContent = "";

    var result = "8.e";

    console.log(result);
    var buffReqCleanFill = Buffer.from(result);

    async function listSerialPorts() {
      await serialport.list().then((ports, err) => {
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
            if (port.serialNumber == "AC01P2CA") {
              com = port.path;
            }
          }
        });
        console.log(com);
        serport = new serialport(com, { baudRate: rate });
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
    document.getElementById("service_mode").style.display = "none";
    document.getElementById("supplement_selection").style.display = "block";
    document.getElementById("flavour_selection").style.display = "none";
    document.getElementById("cleanFillButtonMode").style.opacity = ".4";
    document.getElementById("supplementButtonMode").style.opacity = "1";
    document.getElementById("flavourButtonMode").style.opacity = ".4";
    document.getElementById("msg").classList.remove("alert-success");
    document.getElementById("msg").classList.remove("alert-danger");
    document.getElementById("msg").textContent = "";

    var result = "4.e";

    console.log(result);
    var buffReqSupp = Buffer.from(result);

    async function listSerialPorts() {
      await serialport.list().then((ports, err) => {
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
            if (port.serialNumber == "AC01P2CA") {
              com = port.path;
            }
          }
        });
        console.log(com);
        serport = new serialport(com, { baudRate: rate });
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
    document.getElementById("service_mode").style.display = "none";
    document.getElementById("supplement_selection").style.display = "none";
    document.getElementById("flavour_selection").style.display = "block";
    document.getElementById("cleanFillButtonMode").style.opacity = ".4";
    document.getElementById("supplementButtonMode").style.opacity = ".4";
    document.getElementById("flavourButtonMode").style.opacity = "1";
    document.getElementById("msg").classList.remove("alert-success");
    document.getElementById("msg").classList.remove("alert-danger");
    document.getElementById("msg").textContent = "";

    var result = "6.e";
    console.log(result);
    var buffReqFl = Buffer.from(result);

    async function listSerialPorts() {
      await serialport.list().then((ports, err) => {
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
            if (port.serialNumber == "AC01P2CA") {
              com = port.path;
            }
          }
        });
        console.log(com);
        serport = new serialport(com, { baudRate: rate });
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
}

/**********************CLEAN AND FILL MODE*****************************/
function cleanAndFill(cmd, items, ver) {
  console.log("e :>> ", cmd);
  let cs = parseInt(cmd) ^ parseInt(items);
  let cmd_ser = cmd + "." + items + "." + cs + ".e";

  console.log("cmd_ser :>> ", cmd_ser);

  let sentBuffSer = Buffer.from(cmd_ser);

  async function listSerialPorts() {
    await serialport.list().then((ports, err) => {
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
          //serports.push(port.path);
          //console.log('port :>> ', port);
          if (port.serialNumber == "AC01P2CA") {
            com = port.path;
          } /*if(port.serialNumber== undefined){
          com=port.path;
        }*/
        }
      });
      console.log(com);

      serport = new serialport(com, { baudRate: rate });
      serport.on("error", function (err) {
        console.log("Error: ", err.message);
      });

      serport.write(sentBuffSer, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("result :>> ", sentBuffSer);

          for (var i = 1; i <= 4; i++) {
            if (i.toString() !== ver) {
              document.getElementById("service_" + i).style.opacity = ".4";
              document.getElementById("service_" + i).disabled = "true";
            } else {
              document.getElementById("service_" + i).disabled = "true";
            }
          }
        }
      });

      serport.on("readable", function () {
        let buffReceive = serport.read();
        console.log("receive:", buffReceive);
        console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
        if (buffReceive.toString("utf8") == "14") {
          cmd_mic_app = buffReceive.toString("utf8");
          msg = "peristaltic pump clean!";
          document.getElementById("msg").classList.remove("alert-danger");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-success");

          document
            .getElementById("service_3")
            .classList.remove("btn-bg-tertiary");
          document
            .getElementById("service_3")
            .classList.add("btn-bg-secondary");
        }
        if (buffReceive.toString("utf8") == "15") {
          cmd_mic_app = buffReceive.toString("utf8");
          msg = "peristaltic pump fill!";
          document.getElementById("msg").classList.remove("alert-danger");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-success");
          document
            .getElementById("service_" + ver)
            .classList.add("btn-bg-tertiary");
          document
            .getElementById("service_" + ver)
            .classList.remove("btn-bg-secondary");
        }
        if (buffReceive.toString("utf8") == "16") {
          cmd_mic_app = buffReceive.toString("utf8");
          msg = "Spiral feeder clean!";
          document.getElementById("msg").classList.remove("alert-danger");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-success");
          document
            .getElementById("service_4")
            .classList.remove("btn-bg-tertiary");
          document
            .getElementById("service_4")
            .classList.add("btn-bg-secondary");
        }
        if (buffReceive.toString("utf8") == "17") {
          cmd_mic_app = buffReceive.toString("utf8");
          msg = "Spiral feeder fill!";
          document.getElementById("msg").classList.remove("alert-danger");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-success");

          document
            .getElementById("service_" + ver)
            .classList.add("btn-bg-tertiary");
          document
            .getElementById("service_" + ver)
            .classList.remove("btn-bg-secondary");
        }
        if (buffReceive.toString("utf8") == "30") {
          cmd_mic_app = buffReceive.toString("utf8");
          msg = "There is an error!";
          document.getElementById("msg").classList.remove("alert-success");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-danger");
        }

        for (var i = 1; i <= 4; i++) {
          document.getElementById("service_" + i).style.opacity = "1";
          document.getElementById("service_" + i).removeAttribute("disabled");
        }
        serport.close(function (err) {
          console.log("port closed", err);
        }); // close the port after received command from mic
      });
    });
  }

  // Set a timeout that will check for new serialPorts every 2 sseconds.
  // This timeout reschedules itself.
  setTimeout(() => {
    listSerialPorts();
    //closeLoader();
  }, 100);
}

////////////*SUPPLEMENT SELECTION*////////////////

function supplementSelection(cmd, items) {
  /*
  if(items=='0'){
    localStorage.setItem("items", items)
  }
  if(items=='1'){
    localStorage.setItem("items", items)
  }
  if(items=='2'){
    localStorage.setItem("items", items)
  }
  if(items=='3'){
    localStorage.setItem("items", items)
  }*/

  var cs = parseInt(cmd) ^ parseInt(items);

  var result =
    cmd.toString() + "." + items.toString() + "." + cs.toString() + ".e";

  console.log(result);
  var buffSetSupp = Buffer.from(result);

  async function listSerialPorts() {
    await serialport.list().then((ports, err) => {
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
          //serports.push(port.path);
          //console.log('port :>> ', port);
          if (port.serialNumber == "AC01P2CA") {
            com = port.path;
          } /*if(port.serialNumber== undefined){
            com=port.path;
          }*/
        }
      });
      console.log(com);

      serport = new serialport(com, { baudRate: rate });
      serport.on("error", function (err) {
        console.log("Error: ", err.message);
      });

      serport.write(buffSetSupp, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("result :>> ", buffSetSupp);
        }
      });

      serport.on("readable", function () {
        let buffReceive = serport.read();
        console.log("receive:", buffReceive);
        console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
        if (buffReceive.toString("utf8") == "19") {
          for (var i = 1; i <= 4; i++) {
            if (items == i.toString()) {
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
        if (buffReceive.toString("utf8") == "30") {
          cmd_mic_app = buffReceive.toString("utf8");
          msg = "There is an error!";
          document.getElementById("msg").classList.remove("alert-success");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-danger");
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

/*******************FLAVOUR SELECTION************************/

function flavourSelection(cmd, items) {
  var cs = parseInt(cmd) ^ parseInt(items);

  var result =
    cmd.toString() + "." + items.toString() + "." + cs.toString() + ".e";

  console.log(result);
  var buffSetSupp = Buffer.from(result);

  async function listSerialPorts() {
    await serialport.list().then((ports, err) => {
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
          //serports.push(port.path);
          //console.log('port :>> ', port);
          if (port.serialNumber == "AC01P2CA") {
            com = port.path;
          } /*if(port.serialNumber== undefined){
            com=port.path;
          }*/
        }
      });
      console.log(com);

      serport = new serialport(com, { baudRate: rate });
      serport.on("error", function (err) {
        console.log("Error: ", err.message);
      });

      serport.write(buffSetSupp, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("result :>> ", buffSetSupp);
        }
      });

      serport.on("readable", function () {
        let buffReceive = serport.read();
        console.log("receive:", buffReceive);
        console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
        if (buffReceive.toString("utf8") == "20") {
          for (var i = 1; i <= 5; i++) {
            if (items == i.toString()) {
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
        if (buffReceive.toString("utf8") == "30") {
          cmd_mic_app = buffReceive.toString("utf8");
          msg = "There is an error!";
          document.getElementById("msg").classList.remove("alert-success");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-danger");
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

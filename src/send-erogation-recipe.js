/********************USER EXPERIENCE**************************/

const sendErogationRecipe = (cmd) => {
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
                console.log("port.path", port.path);
                com = port.path;
              }
            }
          });
          console.log(com); //A100Y8LF

          serport = new SerialPort({ path: com, baudRate: rate });
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
            } else if (buffReceive.toString("utf8") == "11") {
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
            } else if (buffReceive.toString("utf8") == "12") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "Error in receiving the recipe!";
              document.getElementById("msg").classList.remove("alert-success");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-danger");
              //res.json({cmd_mic:cmd_mic_app,message:msg});
            } else if (buffReceive.toString("utf8") == "13") {
              cmd_mic_app = buffReceive.toString("utf8");
              msg = "Erogation failed!";
              closeLoader();
              document.getElementById("msg").classList.remove("alert-success");
              document.getElementById("msg").textContent = msg;
              document.getElementById("msg").classList.add("alert-danger");
              //res.json({cmd_mic:cmd_mic_app,message:msg});
            } else {
              closeLoader();
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
};

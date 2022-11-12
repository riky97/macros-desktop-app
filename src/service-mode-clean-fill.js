/**********************CLEAN AND FILL MODE*****************************/
function cleanAndFill(cmd, items, ver) {
  console.log("e :>> ", cmd);
  let cs = parseInt(cmd) ^ parseInt(items);
  let cmd_ser = cmd + "." + items + "." + cs + ".e";

  console.log("cmd_ser :>> ", cmd_ser);

  const sentBuffSer = Buffer.from(cmd_ser);

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
      });

      serport.write(sentBuffSer, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("result :>> ", sentBuffSer);

          for (let i = 1; i <= 4; i++) {
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
        const buffReceive = serport.read();
        const cmd_mic_app = buffReceive.toString("utf8");
        console.log("receive:", buffReceive);
        console.log("CMD_MICRO >> ", cmd_mic_app);
        if (cmd_mic_app == "14") {
          showSuccessMessage("peristaltic pump clean!");
          document
            .getElementById("service_3")
            .classList.remove("btn-bg-tertiary");
          document
            .getElementById("service_3")
            .classList.add("btn-bg-secondary");
        }
        if (cmd_mic_app == "15") {
          showSuccessMessage("peristaltic pump fill!");
          document
            .getElementById("service_" + ver)
            .classList.add("btn-bg-tertiary");
          document
            .getElementById("service_" + ver)
            .classList.remove("btn-bg-secondary");
        }
        if (cmd_mic_app == "16") {
          showSuccessMessage("Spiral feeder clean!");
          document
            .getElementById("service_4")
            .classList.remove("btn-bg-tertiary");
          document
            .getElementById("service_4")
            .classList.add("btn-bg-secondary");
        }
        if (cmd_mic_app == "17") {
          showSuccessMessage("Spiral feeder fill!");
          document
            .getElementById("service_" + ver)
            .classList.add("btn-bg-tertiary");
          document
            .getElementById("service_" + ver)
            .classList.remove("btn-bg-secondary");
        }
        if (cmd_mic_app == "30") {
          showErrorMessage("There is an error!");
        }

        for (var i = 1; i <= 4; i++) {
          document.getElementById("service_" + i).style.opacity = "1";
          document.getElementById("service_" + i).removeAttribute("disabled");
        }
        cleanMessage();
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

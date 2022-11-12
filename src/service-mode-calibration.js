const sendData = (cmd, item) => {
  switch (cmd) {
    case 9:
      if (item === 0) {
        const value = document.getElementById("water_erogation_time").value;
        let cs = cmd ^ item ^ value;
        let result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
        console.log(result);
        let buffReqFl = Buffer.from(result);

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

            serport.write(buffReqFl, (err) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("buffReqFl :>> ", buffReqFl);
              }
            });
            serport.on("readable", function () {
              const buffReceive = serport.read();
              const cmd_mic_app = buffReceive.toString("utf8");
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", cmd_mic_app);
              if (cmd_mic_app == "30") {
                showErrorMessage("Value not in range [1-255]!");
              }
              if (cmd_mic_app == "20") {
                document.getElementById("water_erogation_time").placeholder =
                  value + " [ml/s x10]";
                document.getElementById("water_erogation_time").value = "";
                showSuccessMessage("Value updated!");
              }
              cleanMessage();

              serport.close(function (err) {
                console.log("port closed", err);
              }); // close the port after received command from mic
            });
          });
        }
        setTimeout(() => {
          listSerialPorts();
        }, 100);
      }
      if (item === 1) {
        const value = document.getElementById("flavour_erogation_time").value;
        let cs = cmd ^ item ^ value;
        let result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
        console.log(result);
        let buffReqFl = Buffer.from(result);

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

            serport.write(buffReqFl, (err) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("buffReqFl :>> ", buffReqFl);
              }
            });
            serport.on("readable", function () {
              const buffReceive = serport.read();
              const cmd_mic_app = buffReceive.toString("utf8");
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", cmd_mic_app);
              if (cmd_mic_app == "30") {
                showErrorMessage("Value not in range [1-255]!");
              }
              if (cmd_mic_app == "20") {
                document.getElementById("flavour_erogation_time").placeholder =
                  value + " [ml/s x100]";
                document.getElementById("flavour_erogation_time").value = "";
                showSuccessMessage("Value updated!");
              }
              cleanMessage();
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
      if (item === 2) {
        const value = document.getElementById(
          "supplement_erogation_time"
        ).value;
        let cs = cmd ^ item ^ value;
        let result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
        console.log(result);
        let buffReqFl = Buffer.from(result);

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

            serport.write(buffReqFl, (err) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("buffReqFl :>> ", buffReqFl);
              }
            });
            serport.on("readable", function () {
              const buffReceive = serport.read();
              const cmd_mic_app = buffReceive.toString("utf8");
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", cmd_mic_app);
              if (cmd_mic_app == "30") {
                showErrorMessage("Value not in range [1-255]!");
              }
              if (cmd_mic_app == "20") {
                document.getElementById(
                  "supplement_erogation_time"
                ).placeholder = value + " [gr/s x100]";
                document.getElementById("supplement_erogation_time").value = "";
                showSuccessMessage("Value updated!");
              }
              cleanMessage();
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
      break;
    case 100:
      if (item === 0) {
        const value = document.getElementById(
          "peristaltic_pump_clean_time"
        ).value;
        let cs = cmd ^ item ^ value;
        let result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
        console.log(result);
        let buffReqFl = Buffer.from(result);

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

            serport.write(buffReqFl, (err) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("buffReqFl :>> ", buffReqFl);
              }
            });
            serport.on("readable", function () {
              const buffReceive = serport.read();
              const cmd_mic_app = buffReceive.toString("utf8");
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", cmd_mic_app);
              if (cmd_mic_app == "30") {
                showErrorMessage("Value not in range [1-30s]!");
              }
              if (cmd_mic_app == "20") {
                document.getElementById(
                  "peristaltic_pump_clean_time"
                ).placeholder = value + " [s]";
                document.getElementById("peristaltic_pump_clean_time").value =
                  "";
                showSuccessMessage("Value updated!");
              }
              cleanMessage();
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
      if (item === 1) {
        const value = document.getElementById("spiral_feeder_clean_time").value;
        let cs = cmd ^ item ^ value;
        let result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
        console.log(result);
        let buffReqFl = Buffer.from(result);

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

            serport.write(buffReqFl, (err) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("buffReqFl :>> ", buffReqFl);
              }
            });
            serport.on("readable", function () {
              const buffReceive = serport.read();
              const cmd_mic_app = buffReceive.toString("utf8");
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", cmd_mic_app);
              if (cmd_mic_app == "30") {
                showErrorMessage("Value not in range [1-60s]!");
              }
              if (cmd_mic_app == "20") {
                document.getElementById(
                  "spiral_feeder_clean_time"
                ).placeholder = value + " [s]";
                document.getElementById("spiral_feeder_clean_time").value = "";
                showSuccessMessage("Value updated!");
              }
              cleanMessage();
              serport.close(function (err) {
                console.log("port closed", err);
              }); // close the port after received command from mic
            });
          });
        }
        setTimeout(() => {
          listSerialPorts();
        }, 100);
      }
      break;
    case 101:
      if (item === 0) {
        const value = document.getElementById(
          "peristaltic_pump_fill_time"
        ).value;
        let cs = cmd ^ item ^ value;
        let result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
        console.log(result);
        let buffReqFl = Buffer.from(result);

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

            serport.write(buffReqFl, (err) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("buffReqFl :>> ", buffReqFl);
              }
            });
            serport.on("readable", function () {
              const buffReceive = serport.read();
              const cmd_mic_app = buffReceive.toString("utf8");
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", cmd_mic_app);
              if (cmd_mic_app == "30") {
                showErrorMessage("Value not in range [1-30s]!");
              }
              if (cmd_mic_app == "20") {
                document.getElementById(
                  "peristaltic_pump_fill_time"
                ).placeholder = value + " [s]";
                document.getElementById("peristaltic_pump_fill_time").value =
                  "";
                showSuccessMessage("Value updated!");
              }
              cleanMessage();
              serport.close(function (err) {
                console.log("port closed", err);
              }); // close the port after received command from mic
            });
          });
        }
        setTimeout(() => {
          listSerialPorts();
        }, 100);
      }
      if (item === 1) {
        const value = document.getElementById("spiral_feeder_fill_time").value;
        let cs = cmd ^ item ^ value;
        let result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
        console.log(result);
        let buffReqFl = Buffer.from(result);

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

            serport.write(buffReqFl, (err) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("buffReqFl :>> ", buffReqFl);
              }
            });
            serport.on("readable", function () {
              const buffReceive = serport.read();
              const cmd_mic_app = buffReceive.toString("utf8");
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", cmd_mic_app);
              if (cmd_mic_app == "30") {
                showErrorMessage("Value not in range [1-60s]!");
              }
              if (cmd_mic_app == "20") {
                document.getElementById("spiral_feeder_fill_time").placeholder =
                  value + " [s]";
                document.getElementById("spiral_feeder_fill_time").value = "";
                showSuccessMessage("Value updated!");
              }
              cleanMessage();

              serport.close(function (err) {
                console.log("port closed", err);
              }); // close the port after received command from mic
            });
          });
        }
        setTimeout(() => {
          listSerialPorts();
        }, 100);
      }
      break;
    default:
      break;
  }
};

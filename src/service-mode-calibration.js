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
              let buffReceive = serport.read();
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
              if (buffReceive.toString("utf8") == "30") {
                cmd_mic_app = buffReceive.toString("utf8");
                msg = "Value not in range [1-255]!";
                showErrorMessage(msg);
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById("water_erogation_time").placeholder =
                  value + " [ml/s x10]";
                document.getElementById("water_erogation_time").value = "";
                const msg = "Value updated!";
                showSuccessMessage(msg);
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
              let buffReceive = serport.read();
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
              if (buffReceive.toString("utf8") == "30") {
                cmd_mic_app = buffReceive.toString("utf8");
                const msg = "Value not in range [1-255]!";
                showErrorMessage(msg);
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById("flavour_erogation_time").placeholder =
                  value + " [ml/s x100]";
                document.getElementById("flavour_erogation_time").value = "";
                const msg = "Value updated!";
                showSuccessMessage(msg);
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
              let buffReceive = serport.read();
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
              if (buffReceive.toString("utf8") == "30") {
                cmd_mic_app = buffReceive.toString("utf8");
                msg = "Value not in range [1-255]!";
                showErrorMessage(msg);
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById(
                  "supplement_erogation_time"
                ).placeholder = value + " [gr/s x100]";
                document.getElementById("supplement_erogation_time").value = "";
                const msg = "Value updated!";
                showSuccessMessage(msg);
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
              let buffReceive = serport.read();
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
              if (buffReceive.toString("utf8") == "30") {
                cmd_mic_app = buffReceive.toString("utf8");
                msg = "Value not in range [1-30s]!";
                showErrorMessage(msg);
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById(
                  "peristaltic_pump_clean_time"
                ).placeholder = value + " [s]";
                document.getElementById("peristaltic_pump_clean_time").value =
                  "";
                const msg = "Value updated!";
                showSuccessMessage(msg);
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
              let buffReceive = serport.read();
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
              if (buffReceive.toString("utf8") == "30") {
                cmd_mic_app = buffReceive.toString("utf8");
                msg = "Value not in range [1-60s]!";
                showErrorMessage(msg);
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById(
                  "spiral_feeder_clean_time"
                ).placeholder = value + " [s]";
                document.getElementById("spiral_feeder_clean_time").value = "";
                const msg = "Value updated!";
                showSuccessMessage(msg);
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
              let buffReceive = serport.read();
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
              if (buffReceive.toString("utf8") == "30") {
                cmd_mic_app = buffReceive.toString("utf8");
                msg = "Value not in range [1-30s]!";
                showErrorMessage(msg);
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById(
                  "peristaltic_pump_fill_time"
                ).placeholder = value + " [s]";
                document.getElementById("peristaltic_pump_fill_time").value =
                  "";
                const msg = "Value updated!";
                showSuccessMessage(msg);
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
              let buffReceive = serport.read();
              console.log("receive:", buffReceive);
              console.log("CMD_MICRO >> ", buffReceive.toString("utf8"));
              if (buffReceive.toString("utf8") == "30") {
                cmd_mic_app = buffReceive.toString("utf8");
                msg = "Value not in range [1-60s]!";
                showErrorMessage(msg);
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById("spiral_feeder_fill_time").placeholder =
                  value + " [s]";
                document.getElementById("spiral_feeder_fill_time").value = "";
                const msg = "Value updated!";
                showSuccessMessage(msg);
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

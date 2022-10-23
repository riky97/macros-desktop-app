const sendData = (cmd, item) => {
  switch (cmd) {
    case 100:
      if (item === 0) {
        const value = document.getElementById(
          "peristaltic_pump_clean_time"
        ).value;
        var cs = cmd ^ item ^ value;
        var result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
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
                document
                  .getElementById("msg")
                  .classList.remove("alert-success");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-danger");
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById(
                  "peristaltic_pump_clean_time"
                ).placeholder = value + " [s]";
                document.getElementById("peristaltic_pump_clean_time").value =
                  "";
                const msg = "Value updated!";
                document.getElementById("msg").classList.remove("alert-danger");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-success");
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
      if (item === 1) {
        const value = document.getElementById("spiral_feeder_clean_time").value;
        var cs = cmd ^ item ^ value;
        var result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
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
                document
                  .getElementById("msg")
                  .classList.remove("alert-success");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-danger");
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById(
                  "spiral_feeder_clean_time"
                ).placeholder = value + " [s]";
                document.getElementById("spiral_feeder_clean_time").value = "";
                const msg = "Value updated!";
                document.getElementById("msg").classList.remove("alert-danger");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-success");
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
      break;
    case 101:
      if (item === 0) {
        const value = document.getElementById(
          "peristaltic_pump_fill_time"
        ).value;
        var cs = cmd ^ item ^ value;
        var result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
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
                document
                  .getElementById("msg")
                  .classList.remove("alert-success");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-danger");
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById(
                  "peristaltic_pump_fill_time"
                ).placeholder = value + " [s]";
                document.getElementById("peristaltic_pump_fill_time").value =
                  "";
                const msg = "Value updated!";
                document.getElementById("msg").classList.remove("alert-danger");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-success");
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
      if (item === 1) {
        const value = document.getElementById("spiral_feeder_fill_time").value;
        var cs = cmd ^ item ^ value;
        var result =
          cmd.toString() +
          "." +
          item.toString() +
          "." +
          value.toString() +
          "." +
          cs.toString() +
          ".e";
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
                document
                  .getElementById("msg")
                  .classList.remove("alert-success");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-danger");
              }
              if (buffReceive.toString("utf8") == "20") {
                document.getElementById("spiral_feeder_fill_time").placeholder =
                  value + " [s]";
                document.getElementById("spiral_feeder_fill_time").value = "";
                const msg = "Value updated!";
                document.getElementById("msg").classList.remove("alert-danger");
                document.getElementById("msg").textContent = msg;
                document.getElementById("msg").classList.add("alert-success");
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
      break;
    default:
      break;
  }
};

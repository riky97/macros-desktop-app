/*********SUPPLEMENT SELECTION*********/

function supplementSelection(cmd, items) {
  const cs = parseInt(cmd) ^ parseInt(items);
  const result =
    cmd.toString() + "." + items.toString() + "." + cs.toString() + ".e";
  console.log(result);
  const buffSetSupp = Buffer.from(result);

  const listSerialPorts = async () => {
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

      serport.write(buffSetSupp, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("result :>> ", buffSetSupp);
        }
      });

      serport.on("readable", function () {
        const buffReceive = serport.read();
        const cmd_mic_app = buffReceive.toString("utf8");
        console.log("receive:", buffReceive);
        console.log("CMD_MICRO >> ", cmd_mic_app);
        if (cmd_mic_app == "19") {
          for (let i = 1; i <= 4; i++) {
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
        if (cmd_mic_app == "30") {
          document.getElementById("msg").classList.remove("alert-success");
          document.getElementById("msg").textContent = msg;
          document.getElementById("msg").classList.add("alert-danger");
          showErrorMessage("There is an error!");
        }
        serport.close(function (err) {
          console.log("port closed", err);
        }); // close the port after received command from mic
      });
    });
  };
  setTimeout(() => {
    listSerialPorts();
  }, 100);
}

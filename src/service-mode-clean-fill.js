/**********************CLEAN AND FILL MODE*****************************/
function cleanAndFill(cmd, items, ver) {
  console.log("e :>> ", cmd);
  let cs = parseInt(cmd) ^ parseInt(items);
  let cmd_ser = cmd + "." + items + "." + cs + ".e";

  console.log("cmd_ser :>> ", cmd_ser);

  let sentBuffSer = Buffer.from(cmd_ser);

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
          //serports.push(port.path);
          //console.log('port :>> ', port);
          if (port.serialNumber == "A100Y8LF") {
            com = port.path;
          } /*if(port.serialNumber== undefined){
            com=port.path;
          }*/
        }
      });
      console.log(com);

      serport = new SerialPort({path: com,  baudRate: rate });
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

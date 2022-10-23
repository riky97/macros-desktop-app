/*******************FLAVOUR SELECTION************************/

function flavourSelection(cmd, items) {
  var cs = parseInt(cmd) ^ parseInt(items);

  var result =
    cmd.toString() + "." + items.toString() + "." + cs.toString() + ".e";

  console.log(result);
  var buffSetSupp = Buffer.from(result);

  const listSerialPorts = async () => {
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
          if (port.serialNumber == "A100Y8LF") {
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
  };
  setTimeout(() => {
    listSerialPorts();
    //closeLoader();
  }, 100);
}

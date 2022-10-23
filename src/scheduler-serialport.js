async function schedulerSerialport() {
  await SerialPort.list().then((ports, err) => {
    if (err) {
      console.log(err);
      return;
    }
    //console.log('ports', ports);

    if (ports.length === 0) {
      document.getElementById("msg_usb").classList.remove("alert-danger");
      document.getElementById("msg_usb").classList.add("alert-danger");
      document.getElementById("msg_usb").textContent = "USB not connected!";
      document.getElementById("serial").style.display = "none";
      console.log("No ports discovered");
    }

    ports.forEach(function (port) {
      if (port.manufacturer == "FTDI") {
        //serports.push(port.path);
        if (port.serialNumber == "A100Y8LF") {
          document.getElementById("msg_usb").classList.remove("alert-danger");
          document.getElementById("msg_usb").textContent = "";
          document.getElementById("serial").style.display = "flex";
          document
            .getElementById("supplementButtonMode")
            .removeAttribute("disabled");
          document
            .getElementById("cleanFillButtonMode")
            .removeAttribute("disabled");
          document
            .getElementById("flavourButtonMode")
            .removeAttribute("disabled");
        } else {
          document.getElementById("msg_usb").classList.add("alert-danger");
          document.getElementById("msg_usb").textContent = "USB not connected!";
          document.getElementById("serial").style.display = "none";
          //document.getElementById("supplementButtonMode").disabled="true";document.getElementById("cleanFillButtonMode").disabled="true";
          //document.getElementById("flavourButtonMode").disabled="true";

          //document.getElementById("msg").classList.remove("alert-danger"); document.getElementById("msg").textContent = "";
          //document.getElementById("msg").classList.remove("alert-success");
        }
      } else {
        document.getElementById("msg_usb").classList.add("alert-danger");
        document.getElementById("msg_usb").textContent = "USB not connected!";
        document.getElementById("serial").style.display = "none";
        //document.getElementById("supplementButtonMode").disabled="true";document.getElementById("cleanFillButtonMode").disabled="true";
        //document.getElementById("flavourButtonMode").disabled="true";
      }
    });
  });
}
setTimeout(function listPorts() {
  schedulerSerialport();
  setTimeout(listPorts, 100);
}, 100);

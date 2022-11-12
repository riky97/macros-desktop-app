async function pollingSerialport() {
  await SerialPort.list().then((ports, err) => {
    if (err) {
      console.log(err);
      return;
    }
    if (ports.length === 0) {
      document.getElementById("msg_usb").classList.remove("alert-danger");
      document.getElementById("msg_usb").classList.add("alert-danger");
      document.getElementById("msg_usb").textContent = "USB not connected!";
      document.getElementById("serial").style.display = "none";
      console.log("No ports discovered");
    }

    ports.forEach(function (port) {
      if (port.manufacturer == "FTDI") {
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
          showErrorMessage("USB not connected!");
          document.getElementById("serial").style.display = "none";
        }
      } else {
        showErrorMessage("USB not connected!");
        document.getElementById("serial").style.display = "none";
      }
    });
  });
}
setTimeout(function listPorts() {
  pollingSerialport();
  setTimeout(listPorts, 100);
}, 100);

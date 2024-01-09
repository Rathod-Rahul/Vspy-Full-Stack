document.addEventListener("DOMContentLoaded", function () {
  const deviceLinks = document.querySelectorAll(".device-link");

  deviceLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const deviceName = this.getAttribute("data-device");
      document.getElementById("deviceNamePlaceholder").textContent = deviceName;
    });
  });
});

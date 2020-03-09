var L = window.L
var map = L.map('main-map').setView([10.235, -68.010], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

L.marker([10.259, -68.010]).addTo(map)
L.marker([10.214, -67.973]).addTo(map)
L.marker([10.211, -68.006]).addTo(map)

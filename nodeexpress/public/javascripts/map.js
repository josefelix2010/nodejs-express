var L = window.L
var map = L.map('main-map').setView([10.235, -68.010], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

$.ajax({
  dataType: 'json',
  url: 'api/bicicletas',
  success: function (result) {
    console.log(result)
    result.bicicletas.forEach(function (bici) {
      L.marker(bici.ubicacion, { title: bici.id }).addTo(map)
    })
  }
})

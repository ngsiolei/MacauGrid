Simple script to convert Macau Grid cooridinate into Latitude/Longitude

###Example

  <script src="./MacauGrid.js"></script>
  <script>
  var mg = new MacauGrid();
  var pt = {'E': 20800.08, 'N': 18145.04};
  var cartesian = mg.toWgs84Cartesian(pt.E, pt.N);
  var geo = mg.toWgs84Geodetic(cartesian.east, cartesian.north);
  console.log(geo); // {'lat': 22.194444429765454, 'long': 113.54722220609713}
  </script>  

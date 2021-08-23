//@include 'json.jsx'
function getSelectedObjectsData() {
  var items = app.selection;
  var response = {
    success: false,
    message: "",
    area: 0,
    longitud: 0,
  };
  if (items == null || items.length == 0) {
    response.success = false;
    response.message = "Seleccione uno o mas artes para proceder";
  } else {
    var area = 0;
    var longitud = 0;
    for (i = 0; i < items.length; ++i) {
      if (items[i].typename == "CompoundPathItem") {
        var compoundPathPathItems = items[i].pathItems;
        var areaCuadradaCP = items[i].height * items[i].width;
        area = area + areaCuadradaCP;
        for (x = 0; x < compoundPathPathItems.length; x++) {
          if (compoundPathPathItems[x].area > 0) {
            longitud = longitud + compoundPathPathItems[x].length;
          }
        }
      } else if (items[i].typename == "PathItem") {
        var areaCuadradaP = items[i].height * items[i].width;
        area = area + areaCuadradaP;
        longitud = longitud + items[i].length;
      }
    }
  }
  response.success = true;
  response.message = "";
  response.area = area;
  response.longitud = longitud;
  return JSON.lave(response);
}

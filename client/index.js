var csInterface = new CSInterface();

var frictionPercentageCameo3 = 0.0126;
var frictionPercentageCameo4 = 0.0042;
var minutesPerYear = 525600;
var costList = [];

var defaultData = { data: [] };
var equiposData = { data: [] };
var materialesData = { data: [] };
var tapetesData = { data: [] };

var prototypes = {
  default: [
    {
      label: "",
      name: "id",
      type: "uuid",
      value: "",
      tooltip: "",
    },
    {
      label: "",
      name: "equipoPredeterminado",
      type: "hidden",
      value: "",
      tooltip: "",
    },
    {
      label: "",
      name: "tapetePredeterminado",
      type: "hidden",
      value: "",
      tooltip: "",
    },
    {
      label: "",
      name: "copiasPredeterminado",
      type: "hidden",
      value: "",
      tooltip: "",
    },
    {
      label: "Perfil",
      name: "nombre",
      type: "text",
      value: "",
      tooltip: "",
    },
    {
      label: "Max. Copias",
      name: "maxCantidadCopias",
      type: "int",
      min: "1",
      max: "",
      step: "1",
      value: 0,
      tooltip: "Número máximo decopias a generaren desplegable 'Copias'",
    },
    {
      label: "Mano de obra por hora",
      name: "moHora",
      type: "float",
      min: "0",
      max: "",
      step: "0.1",
      value: 0,
      tooltip: "Mano de obra por hora, expresado en moneda local",
    },
    {
      label: "Pausa entre corte (min)",
      name: "pausaXCorte",
      type: "int",
      value: 0,
      tooltip: "Pausa entre cada corte. Expresada en minutos",
    },
    {
      label: "Merma %",
      name: "merma",
      type: "float",
      value: 0,
      min: "0",
      max: "",
      step: "0.1",
      tooltip:
        "Valor entre 0  y 100 que representa el porcentaje de merma agregado al area del arte seleccionado",
    },
    {
      label: "Costo de Cuchilla",
      name: "costoCuchilla",
      type: "float",
      value: 0,
      min: "0",
      max: "",
      step: "0.1",
      tooltip: "Valor de cuchilla enmoneda local",
    },
    {
      label: "Depreciación de Cuchilla (años)",
      name: "periodoDepreciacionCuchilla",
      type: "float",
      step: "0.1",
      min: "0.1",
      max: "",
      value: 0,
      tooltip: "Valor expresado en años",
    },
    {
      label: "",
      name: "depreciacionPorMinutoCuchilla",
      type: "hidden",
      value: 0,
      tooltip: "",
    },
  ],
  equipo: [
    {
      label: "",
      name: "id",
      type: "uuid",
      value: "",
      tooltip: "",
    },
    {
      label: "Nombre",
      name: "nombre",
      type: "text",
      value: "",
      tooltip: "Nombre del equipo",
    },
    {
      label: "Distancia máxima (cm) x seg.",
      name: "distanciaPorSegundo",
      type: "float",
      step: "0.01",
      min: "0",
      max: "",
      value: 0,
      tooltip: "Máxima distancia recorrida en un segundo. Expresada en Cms",
    },
    {
      label: "Costo",
      name: "costo",
      type: "float",
      step: "0.1",
      min: "0.1",
      max: "",
      value: 0,
      tooltip: "Costo del equipo. Expresado en moneda local",
    },
    {
      label: "Ratio de friccion",
      name: "frictionRatio",
      type: "float",
      step: "0.0001",
      min: "0",
      max: "",
      value: 0,
      tooltip: "Valor de fricción",
    },
    {
      label: "Depreciación (años)",
      name: "periodoDepreciacion",
      type: "float",
      step: "0.1",
      min: "0.1",
      max: "",
      value: 0,
      tooltip: "Valor expresado en años",
    },
    {
      label: "",
      name: "depreciacionPorMinuto",
      type: "hidden",
      value: 0,
      tooltip: "",
    },
  ],
  material: [
    {
      label: "",
      name: "id",
      type: "uuid",
      value: "",
      tooltip: "",
    },
    {
      label: "Descripción",
      name: "nombre",
      type: "text",
      value: "",
      tooltip: "Nombre del material",
    },
    {
      label: "Largo (cms)",
      name: "largo",
      type: "float",
      step: "0.01",
      min: "0.01",
      max: "",
      value: 0,
      tooltip: "Largo de material expresado en centímetros",
    },
    {
      label: "Ancho (cms)",
      name: "ancho",
      type: "float",
      step: "0.01",
      min: "0.01",
      max: "",
      value: 0,
      tooltip: "Ancho de material expresado en centímetros",
    },
    {
      label: "Costo",
      name: "costo",
      type: "float",
      step: "0.1",
      min: "0.1",
      max: "",
      value: 0,
      tooltip: "Costo del pliego de material. Expresado en moneda local",
    },
    {
      label: "Velocidad",
      name: "velocidad",
      type: "int",
      value: 1,
      min: "1",
      step: "1",
      max: "10",
      tooltip: "Velocidad de corte",
    },
    {
      label: "Fuerza",
      name: "fuerza",
      type: "int",
      value: 1,
      step: "1",
      min: "1",
      max: "35",
      tooltip: "Fuerza de corte",
    },
    {
      label: "Pases",
      name: "pases",
      type: "int",
      value: 1,
      step: "1",
      min: "1",
      max: "10",
      tooltip: "Pases de corte",
    },
  ],
  tapete: [
    {
      label: "",
      name: "id",
      type: "uuid",
      value: "",
      tooltip: "",
    },
    {
      label: "Descripción",
      name: "nombre",
      type: "text",
      value: "",
      tooltip: "Descripción del tapete",
    },
    {
      label: "Largo (cms)",
      name: "largo",
      type: "float",
      step: "0.01",
      min: "0.01",
      max: "",
      value: 0,
      tooltip: "Largo de tapete expresado en centímetros",
    },
    {
      label: "Ancho (cms)",
      name: "ancho",
      type: "float",
      step: "0.01",
      min: "0.01",
      max: "",
      value: 0,
      tooltip: "Ancho de tapete expresado en centímetros",
    },
    {
      label: "Costo",
      name: "costo",
      type: "float",
      step: "0.1",
      min: "0.1",
      max: "",
      value: 0,
      tooltip: "Costo de tapete. Expresado en moneda local",
    },
    {
      label: "Depreciación (años)",
      name: "periodoDepreciacion",
      type: "float",
      step: "0.1",
      min: "0.1",
      max: "",
      value: 0,
      tooltip: "Valor expresado en años",
    },
    {
      label: "",
      name: "depreciacionPorMinuto",
      type: "hidden",
      value: 0,
      tooltip: "",
    },
  ],
};

document.addEventListener("copy", function (e) {
  if (costList.length > 0) {
    let data = buildCostListText(costList);
    e.clipboardData.setData("text/plain", data);
  }
  e.preventDefault();
});

$(document).ready(function () {
  costList = [];
  $("#mobileMenu").prop("checked", false);
  loadHomeScreen();
});
// Costing
$("#addQuoteItem-button").on("click", function (e) {
  e.preventDefault();
  csInterface.evalScript("getSelectedObjectsData()", (result) => {
    let area = JSON.parse(result);
    // let area = {
    //   success: true,
    //   message: "",
    //   area: 1210009.81883653,
    //   longitud: 5574.912368006,
    // };
    let data = validateStatusForCost(area);
    if (data.isValid === false) {
      alert(data.message);
    } else {
      let item = getCostItem(data.area, data.form);
      costList.push(item);
      buildCostTable(costList);
    }
  });
});

// Navigation
$("body").on("click", ".listSelector", function (e) {
  e.preventDefault();
  let type = $(this).data("type");
  let name = $(this).data("name");
  loadListHome(type, name);
});

$("body").on("click", ".navSelector", function (e) {
  e.preventDefault();
  let type = $(this).data("type");
  let name = $(this).data("name");
  if (type === "home") {
    loadHomeScreen();
  } else if (type === "about") {
    loadAboutModal();
  } else {
    loadListHome(type, name);
  }

  $("#mobileMenu").prop("checked", false);
});

$("#headerCloseBtnList").on("click", function (e) {
  e.preventDefault();
  loadHomeScreen();
});

$(".backHome").on("click", function (e) {
  e.preventDefault();
  loadHomeScreen();
});

$("#headerCloseBtnCrud").on("click", function (e) {
  let type = $(this).data("type");
  let name = $(this).data("name");
  loadListHome(type, name);
});

$("#headerAddBtnList").on("click", function (e) {
  e.preventDefault();
  let type = $(this).data("type");
  let name = $(this).data("name");
  loadCUScreen("agregar", type, name);
});

//CRUD Ui
$("body").on("submit", ".ItemForm", function (e) {
  e.preventDefault();
  let type = $(this).data("type");
  let name = $(this).data("name");
  let action = $(this).data("action");

  let itemArray = $(this).serializeArray();
  let obj = {};
  itemArray.forEach((item) => {
    obj[item.name] = item.value;
  });

  if (action === "agregar") {
    addToStorage(type, obj);
  } else if (action === "editar") {
    updateInStorage(type, obj);
  }

  loadListHome(type, name);
});

$("body").on("click", ".itemDeleteBtn", function (e) {
  e.preventDefault();
  let id = $(this).data("id");
  let type = $(this).data("type");
  let name = $(this).data("name");

  removeFromStorage(type, id);
  loadListHome(type, name);
  alert("Elemento eliminado!");
});

$("body").on("click", ".removeQuoteItem", function (e) {
  e.preventDefault();
  let id = $(this).data("id");
  costList = costList.filter((x) => x.id !== id);
  buildCostTable(costList);
});

$("body").on("click", "#cleanQuoteList-button", function (e) {
  e.preventDefault();
  costList = [];
  buildCostTable(costList);
});

$("body").on("click", "#copyQuoteList-button", function (e) {
  e.preventDefault();
  let element = $(this);
  document.execCommand("copy");
  $(element).removeClass("info");
  $(element).addClass("success");
  $(element).empty();
  $(element).append("Hecho!");
  setTimeout(() => {
    $(element).removeClass("success");
    $(element).addClass("info");
    $(element).empty();
    $(element).append("Copiar");
  }, 1300);
});

//removeQuoteItem

$("body").on("click", ".itemEditBtn", function (e) {
  e.preventDefault();
  let id = $(this).data("id");
  let type = $(this).data("type");
  let name = $(this).data("name");

  let obj = getFromStorage(type, id);
  if (obj !== null) {
    loadCUScreen("editar", type, name, obj);
  } else {
    alert("No se encontró el registro");
  }
});

$("body").on("click", ".seleccionPredeterminado", function (e) {
  let type = $(this).data("type");
  let defaultObj = getFromStorage("default")[0];
  let value = null;
  switch (type) {
    case "equipo":
      value = $("#ddlEquipo").val();
      break;
    case "tapete":
      value = $("#ddlTapete").val();
      break;
    case "copia":
      value = $("#ddlCopias").val();
      break;
  }
  if (value !== "") {
    switch (type) {
      case "equipo":
        defaultObj.equipoPredeterminado = value;
        break;
      case "tapete":
        defaultObj.tapetePredeterminado = value;
        break;
      case "copia":
        defaultObj.copiasPredeterminado = value;
        break;
    }
    updateInStorage("default", defaultObj);
  } else {
    alert("Seleccione un elemento válido");
  }
});

//Interaction
$("body").on("change", "#ddlMaterial", function () {
  let id = $(this).val();
  let selectedMaterial = getFromStorage("material", id);
  if (selectedMaterial !== undefined) {
    $("#txtCosto").val(selectedMaterial.costo);
  }
});

//CRUD
function initStorage() {
  let configStatus = {
    empty: [],
    full: [],
  };
  if (localStorage.getItem("default") === null) {
    configStatus.empty.push({ name: "Valores por defecto", id: "default" });
    localStorage.setItem("default", JSON.stringify(defaultData));
  } else {
    defaultData = JSON.parse(localStorage.getItem("default"));
    if (defaultData.data.length > 0) {
      configStatus.full.push({ name: "Valores iniciales", id: "default" });
    } else {
      configStatus.empty.push({ name: "Valores iniciales", id: "default" });
    }
  }
  if (localStorage.getItem("equipos") === null) {
    configStatus.empty.push({ name: "Equipos", id: "equipo" });
    localStorage.setItem("equipos", JSON.stringify(equiposData));
  } else {
    equiposData = JSON.parse(localStorage.getItem("equipos"));
    if (equiposData.data.length > 0) {
      configStatus.full.push({ name: "Equipos", id: "equipo" });
    } else {
      configStatus.empty.push({ name: "Equipos", id: "equipo" });
    }
  }
  if (localStorage.getItem("materiales") === null) {
    configStatus.empty.push({ name: "Materiales", id: "material" });
    localStorage.setItem("materiales", JSON.stringify(materialesData));
  } else {
    materialesData = JSON.parse(localStorage.getItem("materiales"));
    if (materialesData.data.length > 0) {
      configStatus.full.push({ name: "Materiales", id: "material" });
    } else {
      configStatus.empty.push({ name: "Materiales", id: "material" });
    }
  }
  if (localStorage.getItem("tapetes") === null) {
    configStatus.empty.push({ name: "Tapetes", id: "tapete" });
    localStorage.setItem("tapetes", JSON.stringify(tapetesData));
  } else {
    tapetesData = JSON.parse(localStorage.getItem("tapetes"));
    if (tapetesData.data.length > 0) {
      configStatus.full.push({ name: "Tapetes", id: "tapete" });
    } else {
      configStatus.empty.push({ name: "Tapetes", id: "tapete" });
    }
  }

  return configStatus;
}

function addToStorage(location, data) {
  switch (location) {
    case "equipo":
      let pDepEquipo = parseFloat(data.periodoDepreciacion);
      if (pDepEquipo > 0) {
        let minsXPDep = minutesPerYear * pDepEquipo;
        data.depreciacionPorMinuto = (
          parseFloat(data.costo) / minsXPDep
        ).toFixed(7);
      } else {
        data.depreciacionPorMinuto = 0;
      }
      equiposData.data.push(data);
      localStorage.setItem("equipos", JSON.stringify(equiposData));
      break;
    case "tapete":
      let pDepTapete = parseFloat(data.periodoDepreciacion);
      if (pDepTapete > 0) {
        let minsXPDepTapete = minutesPerYear * pDepTapete;
        data.depreciacionPorMinuto = (
          parseFloat(data.costo) / minsXPDepTapete
        ).toFixed(7);
      } else {
        data.depreciacionPorMinuto = 0;
      }
      tapetesData.data.push(data);
      localStorage.setItem("tapetes", JSON.stringify(tapetesData));
      break;
    case "material":
      materialesData.data.push(data);
      localStorage.setItem("materiales", JSON.stringify(materialesData));
      break;
    case "default":
      let pDepCuchilla = parseFloat(data.periodoDepreciacionCuchilla);
      if (pDepCuchilla > 0) {
        let minsXPDepCuchilla = minutesPerYear * pDepCuchilla;
        data.depreciacionPorMinutoCuchilla = (
          parseFloat(data.costoCuchilla) / minsXPDepCuchilla
        ).toFixed(7);
      } else {
        data.depreciacionPorMinuto = 0;
      }
      defaultData.data.push(data);
      localStorage.setItem("default", JSON.stringify(defaultData));
      break;
  }
}

function removeFromStorage(location, id) {
  switch (location) {
    case "equipo":
      equiposData.data = equiposData.data.filter((x) => x.id !== id);
      localStorage.setItem("equipos", JSON.stringify(equiposData));
      break;
    case "tapete":
      tapetesData.data = tapetesData.data.filter((x) => x.id !== id);
      localStorage.setItem("tapetes", JSON.stringify(tapetesData));
      break;
    case "material":
      materialesData.data = materialesData.data.filter((x) => x.id !== id);
      localStorage.setItem("materiales", JSON.stringify(materialesData));
      break;
    case "default":
      defaultData.data = {};
      localStorage.setItem("default", JSON.stringify(defaultData));
      break;
  }
}

function updateInStorage(location, data) {
  switch (location) {
    case "equipo":
      let pDepEquipo = parseFloat(data.periodoDepreciacion);
      if (pDepEquipo > 0) {
        let minsXPDep = minutesPerYear * pDepEquipo;
        data.depreciacionPorMinuto = (
          parseFloat(data.costo) / minsXPDep
        ).toFixed(7);
      } else {
        data.depreciacionPorMinuto = 0;
      }
      equiposData.data = equiposData.data.map((x) => {
        if (x.id === data.id) {
          return data;
        } else {
          return x;
        }
      });
      localStorage.setItem("equipos", JSON.stringify(equiposData));
      break;
    case "tapete":
      let pDepTapete = parseFloat(data.periodoDepreciacion);
      if (pDepTapete > 0) {
        let minsXPDepTapete = minutesPerYear * pDepTapete;
        data.depreciacionPorMinuto = (
          parseFloat(data.costo) / minsXPDepTapete
        ).toFixed(7);
      } else {
        data.depreciacionPorMinuto = 0;
      }
      tapetesData.data = tapetesData.data.map((x) => {
        if (x.id === data.id) {
          return data;
        } else {
          return x;
        }
      });
      localStorage.setItem("tapetes", JSON.stringify(tapetesData));
      break;
    case "material":
      materialesData.data = materialesData.data.map((x) => {
        if (x.id === data.id) {
          return data;
        } else {
          return x;
        }
      });

      localStorage.setItem("materiales", JSON.stringify(materialesData));
      break;
    case "default":
      let pDepCuchilla = parseFloat(data.periodoDepreciacionCuchilla);
      if (pDepCuchilla > 0) {
        let minsXPDepCuchilla = minutesPerYear * pDepCuchilla;
        data.depreciacionPorMinutoCuchilla = (
          parseFloat(data.costoCuchilla) / minsXPDepCuchilla
        ).toFixed(7);
      } else {
        data.depreciacionPorMinuto = 0;
      }
      defaultData.data = defaultData.data.map((x) => {
        if (x.id === data.id) {
          return data;
        } else {
          return x;
        }
      });
      localStorage.setItem("default", JSON.stringify(defaultData));
      break;
  }
}

function getFromStorage(location, data) {
  var getResponse;
  switch (location) {
    case "equipo":
      if (data === undefined) {
        getResponse = equiposData.data;
      } else {
        getResponse = equiposData.data.find((x) => x.id === data);
      }
      break;
    case "tapete":
      if (data === undefined) {
        getResponse = tapetesData.data;
      } else {
        getResponse = tapetesData.data.find((x) => x.id === data);
      }
      break;
    case "material":
      if (data === undefined) {
        getResponse = materialesData.data;
      } else {
        getResponse = materialesData.data.find((x) => x.id === data);
      }
      break;
    case "default":
      if (data === undefined) {
        getResponse = defaultData.data;
      } else {
        getResponse = defaultData.data.find((x) => x.id === data);
      }
      break;
  }
  return getResponse;
}

//Utilities
function createUUID() {
  let dt = new Date().getTime();

  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
}

function getFieldValue(field, data) {
  let response;
  if (data === undefined) {
    if (field.type === "uuid") {
      response = createUUID();
    } else {
      response = field.value;
    }
  } else {
    response = data[field.name];
  }
  return response;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Screens and Ui components
function buildQuoteForm() {
  var _equipos = getFromStorage("equipo");
  var _tapetes = getFromStorage("tapete");
  var _materiales = getFromStorage("material");
  var _default = getFromStorage("default");
  $("#ddlEquipo").empty();
  $("#ddlTapete").empty();
  $("#ddlMaterial").empty();
  $("#ddlCopias").empty();
  $("#txtCosto").val("");
  $("#txtMerma").val("");
  $("#txtMo").val("");
  $("#txtPausa").val("");
  if (
    _default[0].equipoPredeterminado === undefined ||
    _default[0].equipoPredeterminado === ""
  ) {
    $("#ddlEquipo").append("<option selected value=''>---</option>");
  }

  if (
    _default[0].tapetePredeterminado === undefined ||
    _default[0].tapetePredeterminado === ""
  ) {
    $("#ddlTapete").append("<option selected value=''>---</option>");
  }

  if (
    _default[0].copiasPredeterminado === undefined ||
    _default[0].copiasPredeterminado === ""
  ) {
    $("#ddlCopias").append("<option selected value=''>---</option>");
  }

  $("#ddlMaterial").append("<option selected value=''>---</option>");

  for (iEquipos = 0; iEquipos < _equipos.length; iEquipos++) {
    $("#ddlEquipo").append(
      "<option value='" +
        _equipos[iEquipos].id +
        "'>" +
        _equipos[iEquipos].nombre +
        "</option>"
    );
  }

  for (iTapetes = 0; iTapetes < _tapetes.length; iTapetes++) {
    $("#ddlTapete").append(
      "<option value='" +
        _tapetes[iTapetes].id +
        "'>" +
        _tapetes[iTapetes].nombre +
        "</option>"
    );
  }

  for (iMateriales = 0; iMateriales < _materiales.length; iMateriales++) {
    $("#ddlMaterial").append(
      "<option value='" +
        _materiales[iMateriales].id +
        "'>" +
        _materiales[iMateriales].nombre +
        "</option>"
    );
  }

  if (_default[0].maxCantidadCopias > 0) {
    for (
      iCopias = 1;
      iCopias < parseInt(_default[0].maxCantidadCopias) + 1;
      iCopias++
    ) {
      $("#ddlCopias").append(
        "<option value='" + iCopias + "'>" + iCopias + "</option>"
      );
    }
  }

  if (_default[0].equipoPredeterminado !== "") {
    $("#ddlEquipo").val(_default[0].equipoPredeterminado).change();
  }

  if (_default[0].tapetePredeterminado !== "") {
    $("#ddlTapete").val(_default[0].tapetePredeterminado).change();
  }

  if (_default[0].copiasPredeterminado !== "") {
    $("#ddlCopias").val(_default[0].copiasPredeterminado).change();
  }

  $("#txtCosto").val("");
  $("#txtMerma").val(_default[0].merma);
  $("#txtMo").val(_default[0].moHora);
  $("#txtPausa").val(_default[0].pausaXCorte);
}

function loadAboutModal() {
  $(".ScreenHolder").each(function () {
    $(this).addClass("hide");
  });
  $("#screen-about").removeClass("hide");
}

function loadHomeScreen() {
  let configStatus = initStorage();
  $(".ScreenHolder").each(function () {
    $(this).addClass("hide");
  });

  let parametros = "<ul>";
  configStatus.empty.forEach((item) => {
    parametros +=
      "<li><a href='#' class='listSelector' data-name='" +
      item.name +
      "' data-type='" +
      item.id +
      "'>" +
      item.name +
      "</a></li>";
  });
  parametros += "</ul>";

  if (configStatus.empty.length === 4) {
    //Primera vez, mostrar mensaje de configuración
    $("#screen-messages").removeClass("hide");
    $("#infoMessageBody").empty();

    $("#infoMessageBody").html(
      "<p>Por favor, ingrese los valores abajo solicitados: " +
        parametros +
        "</p>"
    );
  } else if (configStatus.empty.length > 0 && configStatus.empty.length < 4) {
    // Aun faltan configuraciones
    $("#screen-messages").removeClass("hide");
    $("#infoMessageBody").empty();
    $("#infoMessageBody").html(
      "<p>Los siguientes parámetros aún no contienen registros: " +
        parametros +
        "</p>"
    );
  } else if (
    configStatus.empty.length === 0 &&
    configStatus.full.length === 4
  ) {
    // Todo bien, cargar pagina de inicio
    $("#screen-home").removeClass("hide");
    $("#infoMessageBody").empty();
    buildQuoteForm();
  }
}

function loadListHome(type, name) {
  $(".ScreenHolder").each(function () {
    $(this).addClass("hide");
  });

  $("#headerConfList").empty();
  $("#headerConfList").append(String(name).toUpperCase());
  $("#headerAddBtnList").data("type", type);
  $("#headerAddBtnList").data("name", name);
  $("#bodyConfList").empty();

  let list = getFromStorage(type);
  let table = buildListTable(list, type, name);
  $("#bodyConfList").append(table);
  $("#screen-list").removeClass("hide");
}

function loadCUScreen(action, type, name, data) {
  $(".ScreenHolder").each(function () {
    $(this).addClass("hide");
  });

  let title = `${toTitleCase(action)} ${type}`;
  $("#headerConfCrud").empty();
  $("#headerConfCrud").append(title.toUpperCase());
  $("#headerCloseBtnCrud").data("type", type);
  $("#headerCloseBtnCrud").data("name", name);
  $("#bodyConfCrud").empty();

  let form = buildForm(action, type, name, data);

  $("#bodyConfCrud").append(form);

  $("#screen-crud").removeClass("hide");
}

function buildItemToolTip(type, item) {
  let objArray = prototypes[type];
  let dataTable = `<table style="width:100%" class="tbl">
  <tbody>`;
  objArray.forEach((field) => {
    if (field.type !== "uuid" && field.type !== "hidden") {
      let fieldInstance = item[field.name];
      dataTable += `<tr><td class="text-smaller tblPadding">${field.label}</td><td class="text-smaller tblPadding">${fieldInstance}</td></tr>`;
    }
  });
  dataTable += `</tbody>
</table>`;
  let response = `<a href="javascript:;" class="tooltip tip-bottom" style="text-decoration:none !important;color:#fff !important">${item.nombre}<span class="tip">${dataTable}</span></a>`;
  return response;
}

function buildListTable(list, type, name) {
  let response = `<table style="width:100%" class="tbl">
  <tbody>`;

  list.forEach((item) => {
    let details = buildItemToolTip(type, item);
    response += `<tr>
    <td style="width: 10%">
        <a href="#" class="flag danger itemDeleteBtn" data-type="${type}" data-name="${name}" data-id="${item.id}">x</a>
      </td>
      <td style="width: 80%;padding-left:60px">${details}</td>
      <td style="width: 10%">
        <a href="#" class="flag info itemEditBtn" data-type="${type}" data-name="${name}" data-id="${item.id}">editar</a>
      </td>
    </tr>`;
  });

  response += `</tbody>
</table>`;
  return response;
}

function buildForm(action, type, name, data) {
  let objArray = prototypes[type];
  let response = `<form class="form-horizontal ItemForm" data-type="${type}" data-name="${name}" data-action="${String(
    action
  ).toLowerCase()}"><div class="flex-grid form-elements elements-sm">`;
  objArray.forEach((field) => {
    let fieldValue = getFieldValue(field, data);
    switch (field.type) {
      case "uuid":
        response += `<input type="hidden" id="${field.name}" name="${field.name}" value="${fieldValue}">`;
        break;
      case "hidden":
        response += `<input type="hidden" id="${field.name}" name="${field.name}" value="${fieldValue}">`;
        break;
      case "text":
        response += `
        <div title="${field.tooltip}" class="col-2 col-12-sm">
			<label class="text-smaller" for="${field.name}">${field.label}:</label>
		</div>
		<div class="col-10 col-12-sm">
			<input type="text" id="${field.name}" name="${field.name}" value="${fieldValue}">
		</div>
        `;
        break;
      case "int":
        response += `
        <div  title="${field.tooltip}" class="col-2 col-12-sm">
			<label class="text-smaller" for="${field.name}">${field.label}:</label>
		</div>
		<div class="col-10 col-12-sm">
			<input type="number" id="${field.name}" name="${field.name}" min="${field.min}" max="${field.max}" step="${field.step}" value="${fieldValue}">
		</div>
        `;
        break;
      case "float":
        response += `
        <div  title="${field.tooltip}" class="col-2 col-12-sm">
			<label class="text-smaller" for="${field.name}">${field.label}:</label>
		</div>
		<div class="col-10 col-12-sm">
			<input type="number" id="${field.name}" name="${field.name}" min="${field.min}" max="${field.max}" step="${field.step}" value="${fieldValue}">
		</div>
        `;
        break;
    }
  });
  response += `
  <div class="col-10 col-offset-2  col-12-sm col-offset-clear-sm">											
			<input type="submit" class="btn primary" value="${String(
        action
      ).toUpperCase()}">
			<input type="reset" class="btn" value="Limpiar">
		</div>
  `;
  response += `</div></form>`;

  return response;
}

function buildCostTable(list) {
  let tiempo = 0;
  let costo = 0;
  list.forEach((item) => {
    tiempo += item.tiempo;
    costo += item.costo;
  });

  $("#quoteDetails").empty();
  let response = "";

  list.forEach((item) => {
    let details = buildCostItemToolTip(item);
    response += `<tr>
    <td style="width: 5%;"><span class="flag danger removeQuoteItem" data-id="${item.id}">X</span></td>
      <td style="width: 45%;">${details}</td>
      <td style="width: 25%;">
      ~ ${item.tiempo} mins.
     </td>
      <td style="width: 25%;">
       ${item.costo}
      </td></tr>
    `;
  });
  $("#quoteTotalTiempo").empty();
  $("#quoteTotalCosto").empty();
  $("#quoteTotalTiempo").html(
    "<strong>" + tiempo.toFixed(0) + " mins</strong>"
  );
  $("#quoteTotalCosto").html("<strong>" + costo.toFixed(2) + "</strong>");
  $("#quoteDetails").html(response);
}

function buildCostItemToolTip(item) {
  let dataTable = `<table style="width:100%" class="tbl">
  <tbody>`;
  item.details.forEach((detail) => {
    dataTable += `<tr><td class="text-smaller tblPadding">${detail.item}</td><td class="text-smaller tblPadding">${detail.value}</td></tr>`;
  });
  dataTable += `</tbody>
</table>`;
  let title = "";
  if (item.descripcion !== "") {
    title = `${item.descripcion}<br><span>${item.material}</span>`;
  } else {
    title = `${item.material}`;
  }
  let response = `<a href="javascript:;" class="tooltip tip-bottom" style="text-decoration:none !important;color:#fff !important">${title}<span class="tip">${dataTable}</span></a>`;
  return response;
}

function buildCostListText(list) {
  let response =
    "============== C3 - RESUMEN DE COSTO =============\r\n\r\n\r\n";
  let counter = 1;

  let total = 0;
  let ttotal = 0;
  list.forEach((item) => {
    total += parseFloat(item.costo);
    ttotal += parseFloat(item.tiempo);

    if (item.descripcion !== "") {
      response += `${counter}) ${item.descripcion} \r\n`;
      response += `  |-${item.material} \r\n`;
    } else {
      response += `${counter}) ${item.material} \r\n`;
    }

    let timeVal = item.tiempo.toFixed(0);
    let ht = 3 - timeVal.length;
    let htVal = "";
    for (let it = 0; it < ht; it++) {
      htVal += "=";
    }

    let costVal = item.costo.toFixed(2);
    let hc = 8 - costVal.length;
    let hcVal = "";
    for (let it = 0; it < hc; it++) {
      hcVal += "=";
    }

    response += `============================${htVal} ~${timeVal} mins =${hcVal} $${costVal} \r\n`;
    item.details.forEach((detail) => {
      if (detail.item.toLowerCase() === "tiempo corte") {
        response += `${detail.item}: ${detail.value} minutos\r\n`;
      } else {
        response += `${detail.item}: $${detail.value} \r\n`;
      }
    });
    response += `---------------------------- \r\n\r\n`;
    counter++;
  });

  response += `\r\n_________________________________________________\r\n `;

  let totalTimeVal = ttotal.toFixed(0);
  let totalTimeHyphens = 3 - totalTimeVal.length;
  let totalTimeHyphensVal = "";
  for (let it = 0; it < totalTimeHyphens; it++) {
    totalTimeHyphensVal += "=";
  }

  let totalCostVal = total.toFixed(2);
  let totalCostHyphens = 8 - totalCostVal.length;
  let totalCostHyphensVal = "";
  for (let it = 0; it < totalCostHyphens; it++) {
    totalCostHyphensVal += "=";
  }

  response += `\r\nTOTAL ===================${totalTimeHyphensVal} ~${totalTimeVal} mins ====${totalCostHyphensVal} $${totalCostVal}\r\n `;
  return response;
}

//Cost BLL
function getQuoteFormValues() {
  let response = {
    equipo: undefined,
    tapete: undefined,
    material: undefined,
    costo: undefined,
    merma: undefined,
    copias: undefined,
    mo: undefined,
    pausa: undefined,
    descripcion: undefined,
  };

  response.equipo =
    $("#ddlEquipo").val() === "" ? undefined : $("#ddlEquipo").val();
  response.tapete =
    $("#ddlTapete").val() === "" ? undefined : $("#ddlTapete").val();
  response.material =
    $("#ddlMaterial").val() === "" ? undefined : $("#ddlMaterial").val();
  response.copias =
    $("#ddlCopias").val() === ""
      ? undefined
      : parseFloat($("#ddlCopias").val());
  response.costo =
    $("#txtCosto").val() === "" ? undefined : parseFloat($("#txtCosto").val());
  response.merma =
    $("#txtMerma").val() === "" ? undefined : parseFloat($("#txtMerma").val());
  response.mo =
    $("#txtMo").val() === "" ? undefined : parseFloat($("#txtMo").val());
  response.pausa =
    $("#txtPausa").val() === "" ? undefined : parseFloat($("#txtPausa").val());
  response.descripcion =
    $("#txtDescripcion").val() === "" ? "" : $("#txtDescripcion").val();

  return response;
}

function validateQuoteFormValues(data) {
  let response = true;
  let keys = Object.keys(data);
  keys.forEach((key) => {
    if (data[key] === undefined) {
      response = false;
    }
  });
  return response;
}

function validateStatusForCost(area) {
  let response = { isValid: true, message: "", area: {}, form: {} };
  let formData = getQuoteFormValues();
  let formDataVal = validateQuoteFormValues(formData);
  if (area.success === false && formDataVal === true) {
    response.isValid = false;
    response.message = area.message;
  } else if (area.success === true && formDataVal === false) {
    response.isValid = false;
    response.message = "Compruebe los datos ingresados en el formulario";
  } else if (area.success === false && formDataVal === false) {
    response.isValid = false;
    response.message = `Se encontraron los siguientes errores:\n1.${area.message} \n2. Los datos ingresados en el formulario contienen errores\n`;
  } else {
    response.area = area;
    response.form = formData;
  }
  return response;
}

function getCostItem(arte, form) {
  let response = {
    id: "",
    details: [],
    material: "",
    descripcion: "",
    tiempo: 0,
    costo: 0,
  };
  let _default = getFromStorage("default")[0];
  let _equipo = getFromStorage("equipo", form.equipo);
  let _tapete = getFromStorage("tapete", form.tapete);
  let _material = getFromStorage("material", form.material);
  let _costo = form.costo;
  let _merma = form.merma;
  let _copias = form.copias;
  let _mo = form.mo;
  let _pausa = form.pausa;
  let _areaArte = parseFloat((parseFloat(arte.area) * 0.0012).toFixed(4));
  let _longitudArte = parseFloat(
    (parseFloat(arte.longitud) * 0.0352778).toFixed(4)
  );
  let friction = parseFloat(_equipo.frictionRatio);

  let areaMaterial = parseFloat(_material.largo) * parseFloat(_material.ancho);
  let areaTapete = parseFloat(_tapete.largo) * parseFloat(_tapete.ancho);
  let distanciaPorSegundoMaterial =
    (_material.velocidad * _equipo.distanciaPorSegundo) / 10;
  var manoObraPorMinuto = _mo / 60;
  let areaTotalArte = (_areaArte + _areaArte * (_merma / 100)) * _copias;
  let longitudTotalArte = _longitudArte * _copias;

  //total de pliegos material
  let totalPliegosMaterial = parseFloat(
    (areaTotalArte / areaMaterial).toFixed(2)
  );

  //costo Total Pliegos Material
  let costoTotalPliegosMaterial = totalPliegosMaterial * _costo;

  //total Tapetes a Cortar
  let totalTapetesCortar = parseFloat((areaTotalArte / areaTapete).toFixed(0));

  //total Tiempo Corte Equipo
  let totalTiempoCorteEquipo = parseFloat(
    (longitudTotalArte / distanciaPorSegundoMaterial / 60).toFixed(4)
  );
  totalTiempoCorteEquipo =
    totalTiempoCorteEquipo * parseInt(_material.pases, 10);
  totalTiempoCorteEquipo =
    totalTiempoCorteEquipo +
    totalTiempoCorteEquipo * (friction * parseInt(_material.fuerza, 10));

  //total Minutos Pausa
  let totalMinutosPausa = (totalTapetesCortar + 1) * _pausa;

  //total Tiempo Utilizado
  let totalTiempoUtilizado = totalTiempoCorteEquipo + totalMinutosPausa;

  //costo Mano de obra
  let costoManoObra = totalTiempoUtilizado * manoObraPorMinuto;

  //costo Depreciacion Equipo
  let costoDepreciacionEquipo = parseFloat(
    (
      totalTiempoCorteEquipo * parseFloat(_equipo.depreciacionPorMinuto)
    ).toFixed(4)
  );

  //costo Depreciacion Cuchilla
  let costoDepreciacionCuchilla = parseFloat(
    (
      totalTiempoCorteEquipo *
      parseFloat(_default.depreciacionPorMinutoCuchilla)
    ).toFixed(4)
  );

  //costo Depreciacion Tapete
  let costoDepreciacionTapete = parseFloat(
    (
      totalTiempoCorteEquipo * parseFloat(_tapete.depreciacionPorMinuto)
    ).toFixed(4)
  );

  //costo arte seleccionado

  let costoArteSeleccionado =
    costoTotalPliegosMaterial +
    costoManoObra +
    costoDepreciacionEquipo +
    costoDepreciacionCuchilla +
    costoDepreciacionTapete;
  costoArteSeleccionado = parseFloat(costoArteSeleccionado.toFixed(2));

  response.id = createUUID();
  response.material = `Cartulina ${_material.nombre}`;
  response.material = response.material.toUpperCase();

  response.descripcion = `${form.descripcion}`;
  response.descripcion = response.descripcion.toUpperCase();

  response.tiempo = parseFloat(totalTiempoUtilizado.toFixed(0));
  response.details.push({
    item: "Tiempo corte",
    value: totalTiempoCorteEquipo.toFixed(2),
  });
  response.details.push({
    item: "Costo Pliegos",
    value: costoTotalPliegosMaterial.toFixed(2),
  });
  response.details.push({
    item: "Mano de obra",
    value: costoManoObra.toFixed(2),
  });
  response.details.push({
    item: "Depreciación equipo",
    value: costoDepreciacionEquipo.toFixed(2),
  });
  response.details.push({
    item: "Depreciación tapete",
    value: costoDepreciacionTapete.toFixed(2),
  });
  response.details.push({
    item: "Depreciación cuchilla",
    value: costoDepreciacionCuchilla.toFixed(2),
  });
  response.costo = costoArteSeleccionado;
  return response;
}

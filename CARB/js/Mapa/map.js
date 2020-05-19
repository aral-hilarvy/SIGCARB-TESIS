var Contenido = new Vue({
  el: "#Contenido",
  data: {
    mensaje: "algo",
    uri: "http://localhost:3978/api/",
    array_poligono_base: [],
    array_poligono_base2: [],
    array_poligono_bosque: [],
    array_poligono_sabana: [],
    array_poligono_matorral: [],
    array_poligono_pastizal: [],
    array_poligono_centro_poblado: [],
    array_poligono_cuerpo_agua: [],
    array_propiedades_bosque: [],
    array_propiedades_sabana: [],
    array_propiedades_matorral: [],
    array_propiedades_pastizal: [],
    array_propiedades_centro_poblado: [],
    array_propiedades_cuerpo_agua: [],
    Bosq: null,
    Sabana: null,
    Matorral: null,
    Pastizal: null,
    CentroP: null,
    CuerpoA: null,
    contador: 0,
    array_anios: [],
    anio_consulta: 0,
    baseMaps: null,
    mymap: null,
    mymap2: null,
    info: null,
    info2: null,
    polygon1: null,
    polygon2: null,
    polygon3: null,
    polygon4: null,
    polygon5: null,
    polygon6: null,
    Geo: null,
    Cancelado: false,
    Cancelado2: false,
    band_dist_pt: false,
    cont_click_pt: 0,
    cont_terc: 0,
    coordenadas_linea: [],
    polyline: null,
    MarcadorInicio: null,
    MarcadorFinal: null,
    styleObject: {
      width: "100%",
      height: "100%",
      boxShadow: "5px 5px 5px #888",
      float: "left"
    },
    mostrado: false,
    parte_accion: 0,
    consulta_mitad_derecha: false,
    marcadores_flora: [],
    id_especie_fl: 0,

    nameBosq: '',
    _areaTT: 0,

    area_bosque: 0,
    area_sabana: 0,
    area_matorral: 0,
    area_pastizal: 0,
    area_centro_poblado: 0,
    area_cuerpo_agua: 0,
    texto: '',
    nuevoLayer: null,
    PruebaLayer: null,
    marker: []
  },
  mounted() {
    this.InitSelectAnios();
    this.DataMapaBase("mapid");
  },
  methods: {
    Inicializar() {
      $this = this;

      this.mymap.on("click", function (e) {
        console.log($this.band_dist_pt);
        if ($this.band_dist_pt) {
          $this.cont_terc++;
          $this.cont_click_pt++;
          console.log(e.latlng);
          $this.coordenadas_linea.push(e.latlng);
          if ($this.cont_click_pt == 2) {
            $this.DistanciaPuntos();
          }
          if ($this.cont_terc == 3) {
            $this.RemoverLinea();
          }
        }
      });
    },
    DistanciaPuntos() {
      var latlngs = [
        [this.coordenadas_linea[0].lat, this.coordenadas_linea[0].lng],
        [this.coordenadas_linea[1].lat, this.coordenadas_linea[1].lng]
      ];
      this.polyline = L.polyline(latlngs, {
        color: "red"
      }).addTo(this.mymap);
      this.mymap.fitBounds(this.polyline.getBounds());
      this.CalculoDistancia();
    },
    CalculoDistancia() {
      var from = turf.point([
        this.coordenadas_linea[0].lat,
        this.coordenadas_linea[0].lng
      ]);
      var to = turf.point([
        this.coordenadas_linea[1].lat,
        this.coordenadas_linea[1].lng
      ]);
      var options = {
        units: "meters"
      };

      var distance = turf.distance(from, to, options);
      this.MarcadorInicio = L.marker([
          this.coordenadas_linea[0].lat,
          this.coordenadas_linea[0].lng
        ])
        .bindTooltip("Distancia : " + Math.round(distance) + " Metros")
        .addTo(this.mymap);
      this.MarcadorFinal = L.marker([
          this.coordenadas_linea[1].lat,
          this.coordenadas_linea[1].lng
        ])
        .bindTooltip("Distancia : " + Math.round(distance) + " Metros")
        .addTo(this.mymap);
      this.Reseteo();
    },
    Reseteo() {
      this.cont_click_pt = 0;
      this.coordenadas_linea = [];
    },
    RemoverLinea() {
      this.polyline.remove();
      this.MarcadorInicio.remove();
      this.MarcadorFinal.remove();
      this.cont_terc = 1;
    },
    InitSelectAnios() {
      $this = this;
      fetch("http://localhost:3978/api/map/lists_anio")
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response.resultado);
          $this.array_anios = response.resultado
          //$this.array_anios.push({"anio": 2017})
          //console.log($this.array_anios);
        });
    },
    SetearBosque(objeto) {
      $this.area_bosque = 0
      $this.area_sabana = 0
      $this.area_matorral = 0
      $this.area_pastizal = 0
      $this.area_centro_poblado = 0
      $this.area_cuerpo_agua = 0

      $this.array_poligono_bosque = [];

      $this._areaTT = 255761;

      $this = this;
      console.log(objeto);
      objet = objeto;
      proj4.defs([
        [
          "EPSG:32620",
          "+proj=utm +zone=20 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
        ],
        ["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"]
      ]);
      var source = new proj4.Proj("EPSG:32620");
      var source2 = new proj4.Proj("EPSG:4326");

      objet.forEach(function (element, index) {
        element.geom.coordinates[0][0].forEach(function (element, i) {
          let punto = element;
          //console.log(punto);
          let cordenadas = proj4(source, source2, punto);
          objet[index].geom.coordinates[0][0][i][0] = cordenadas[1];
          objet[index].geom.coordinates[0][0][i][1] = cordenadas[0];
        });
        if (
          element.id_subtipo_cobertura == 1 ||
          element.id_subtipo_cobertura == 2
        ) {
          //console.log(element.area);
          $this.area_bosque = $this.area_bosque + parseInt(element.area, 10);
          $this.polygon1 = L.polygon(element.geom.coordinates[0][0], {
            color: "green",
            fillOpacity: 1.0
          });
          $this.array_poligono_bosque.push($this.polygon1);
          let obb1 = {
            element: element,
            poligono: $this.polygon1
          };
          $this.array_propiedades_bosque.push(obb1);
        } else if (element.id_subtipo_cobertura == 3) {
          $this.area_sabana = $this.area_sabana + parseInt(element.area, 10);
          $this.polygon2 = L.polygon(element.geom.coordinates[0][0], {
            color: "yellow",
            fillOpacity: 1.0
          });
          $this.array_poligono_sabana.push($this.polygon2);
          let obb2 = {
            element: element,
            poligono: $this.polygon2
          };
          $this.array_propiedades_sabana.push(obb2);
        } else if (
          element.id_subtipo_cobertura == 4 ||
          element.id_subtipo_cobertura == 5
        ) {
          $this.area_matorral = $this.area_matorral + parseInt(element.area, 10);
          $this.polygon3 = L.polygon(element.geom.coordinates[0][0], {
            color: "#4D2FB3",
            fillOpacity: 1.0
          });
          $this.array_poligono_matorral.push($this.polygon3);
          let obb3 = {
            element: element,
            poligono: $this.polygon3
          };
          $this.array_propiedades_matorral.push(obb3);
        } else if (element.id_subtipo_cobertura == 6) {
          $this.area_pastizal = $this.area_pastizal + parseInt(element.area, 10);
          $this.polygon4 = L.polygon(element.geom.coordinates[0][0], {
            color: "#98DA49", //#462A9E,#372D30
            fillOpacity: 1.0
          });
          $this.array_poligono_pastizal.push($this.polygon4);
          let obb4 = {
            element: element,
            poligono: $this.polygon4
          };
          $this.array_propiedades_pastizal.push(obb4);
        } else if (element.id_subtipo_cobertura == 7) {
          $this.area_centro_poblado = $this.area_centro_poblado + parseInt(element.area, 10);
          $this.polygon5 = L.polygon(element.geom.coordinates[0][0], {
            color: "#B9770E", //#462A9E,#372D30
            fillOpacity: 1.0
          });
          $this.array_poligono_centro_poblado.push($this.polygon5);
          let obb5 = {
            element: element,
            poligono: $this.polygon5
          };
          $this.array_propiedades_centro_poblado.push(obb5);
        } else if (element.id_subtipo_cobertura == 8) {
          $this.area_cuerpo_agua = $this.area_cuerpo_agua + parseInt(element.area, 10);
          $this.polygon6 = L.polygon(element.geom.coordinates[0][0], {
            color: "#328BE0", //#462A9E,#372D30
            fillOpacity: 1.0
          });
          $this.array_poligono_cuerpo_agua.push($this.polygon6);
          let obb6 = {
            element: element,
            poligono: $this.polygon6
          };
          $this.array_propiedades_cuerpo_agua.push(obb6);
        }
        $this.contador++;
      });
      if ($this.contador == objet.length) {
        //let total_area=($this.area_bosque + $this.area_sabana + $this.area_matorral + $this.area_pastizal + $this.area_centro_poblado + $this.area_cuerpo_agua);
        //console.log(total_area);
        $this.Bosq = L.layerGroup($this.array_poligono_bosque);
        $this.Sabana = L.layerGroup($this.array_poligono_sabana);
        $this.Matorral = L.layerGroup($this.array_poligono_matorral);
        $this.Pastizal = L.layerGroup($this.array_poligono_pastizal);
        $this.CentroP = L.layerGroup($this.array_poligono_centro_poblado);
        $this.CuerpoA = L.layerGroup($this.array_poligono_cuerpo_agua);

        let Bosq = $this.Bosq;
        let Sabana = $this.Sabana;
        let Matorral = $this.Matorral;
        let Pastizal = $this.Pastizal;
        let CentroP = $this.CentroP;
        let CuerpoA = $this.CuerpoA;


        this.PruebaLayer = L.featureGroup().addTo(this.mymap);

        console.log($this.area_bosque)
        console.log($this._areaTT)

        let bosqu = Number((($this.area_bosque * 100) / $this._areaTT).toFixed(2));
        let keyBosq = "Bosque ( " + bosqu.toString() + " % )";

        let sab = Number((($this.area_sabana * 100) / $this._areaTT).toFixed(2));
        let keySab = "Sabana ( " + sab.toString() + " % )";

        let mat = Number((($this.area_matorral * 100) / $this._areaTT).toFixed(2));
        let keyMat = "Matorral ( " + mat.toString() + " % )";

        let past = Number((($this.area_pastizal * 100) / $this._areaTT).toFixed(2));
        let keyPast = "Pastizal ( " + past.toString() + " % )";

        let cp = Number((($this.area_centro_poblado * 100) / $this._areaTT).toFixed(2));
        let keyCP = "Centro Poblado ( " + cp.toString() + " % )";

        let ca = Number((($this.area_cuerpo_agua * 100) / $this._areaTT).toFixed(2));
        let keyCA = "Cuerpo de Agua ( " + ca.toString() + " % )";

        /*var overlayMaps = {
          "Bosque": Bosq,
          "Sabana": Sabana,
          "Matorral": Matorral,
          "Pastizal": Pastizal,
          "Centro Poblado": CentroP,
          "Cuerpo de Agua": CuerpoA
        };*/
        let overlayMaps = {};
        overlayMaps[keyBosq] = Bosq;
        overlayMaps[keySab] = Sabana;
        overlayMaps[keyMat] = Matorral;
        overlayMaps[keyPast] = Pastizal;
        overlayMaps[keyCP] = CentroP;
        overlayMaps[keyCA] = CuerpoA;

        if ($this.parte_accion == 0) {
          layerControl = L.control
            .layers(this.baseMaps, overlayMaps, {
              collapsed: false
            })
            .addTo(this.mymap);
          $this.BotonDinamico(false);
        } else {
          layerControl2 = L.control
            .layers(this.baseMaps, overlayMaps)
            .addTo(this.mymap2);
          $this.BotonDinamico(true);
        }
        $("#mostrar").modal("hide");

        $this.contador = 0;
      }
    },
    Bosque() {
      $this = this;
      fetch(
          "http://localhost:3978/api/map/lists_mapa_base/" + this.anio_consulta
        )
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          $this.SetearBosque(response.resultado);
        });
    },
    DataMapaBase(id_div) {
      fetch("http://localhost:3978/api/map/lists/")
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          //console.log(response);
          this.Mapear(response, id_div);
        });
    },
    Mapear(response, id_div) {
      $this = this;
      let obj = response.resultado;
      if (id_div == "mapid") {
        (proj1 =
          "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"),
        (proj2 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ");

        proj4.defs([
          [
            "EPSG:32620",
            "+proj=utm +zone=20 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
          ],
          ["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"]
        ]);
        var source = new proj4.Proj("EPSG:32620");
        var source2 = new proj4.Proj("EPSG:4326");
        let center = proj4(source, source2, [665188.5515, 815817.0982]);

        var mapaFondo = L.tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicjE4cmVuZGFsbCIsImEiOiJjajY3dnF2emgwOWpvMnFyeTFhbGhlYXJmIn0.8Ub2Bnq0kI9pNdiuan3sXw", {
            maxZoom: 28,
            id: "mapbox.streets",
            accessToken: "your.mapbox.access.token"
          }
        );

        /*var copia = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });*/

        obj.features.forEach(function (element, index) {
          element.geometry.coordinates[0][0].forEach(function (element, i) {
            let punto = element;
            let cordenadas = proj4(source, source2, punto);
            obj.features[index].geometry.coordinates[0][0][i][0] =
              cordenadas[1];
            obj.features[index].geometry.coordinates[0][0][i][1] =
              cordenadas[0];
          });

          var polygon = L.polygon(element.geometry.coordinates[0][0], {
            color: "white",
            fillOpacity: 1.0
          });
          $this.array_poligono_base.push(polygon);
          //$this._areaTT=$this._areaTT + element.area;
        });
        var cities = L.layerGroup($this.array_poligono_base);

        this.baseMaps = {
          "Capas de Estudio (2011)": mapaFondo
        };

        this.mymap = new L.map(id_div, {
          drawControl: true,
          minZoom: 0,
          maxZoom: 18,
          center: [center[1], center[0]],
          zoom: 9,
          layers: [mapaFondo, cities]
          //layers: [mapaFondo, cities, copia]
        });
        L.control.mousePosition().addTo(this.mymap);

        var ButtonInit = L.easyButton({
          states: [{
            stateName: "estado-activar", // name the state
            icon: "fas fa-layer-group star", // and define its properties
            title: "Activar Capas Por Año", // like its title
            onClick: function (btn, map) {
              // and its callback
              $this.parte_accion = 0;
              btn.state("estado_cancelar"); // change state on click!
              $("#mostrar").modal("show");
            }
          }]
        });
        ButtonInit.addTo(this.mymap);
      } else {
        (proj1 =
          "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"),
        (proj2 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ");

        proj4.defs([
          [
            "EPSG:32620",
            "+proj=utm +zone=20 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
          ],
          ["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"]
        ]);
        var source = new proj4.Proj("EPSG:32620");
        var source2 = new proj4.Proj("EPSG:4326");
        let center = proj4(source, source2, [665188.5515, 815817.0982]);

        var mapaFondo = L.tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicjE4cmVuZGFsbCIsImEiOiJjajY3dnF2emgwOWpvMnFyeTFhbGhlYXJmIn0.8Ub2Bnq0kI9pNdiuan3sXw", {
            maxZoom: 28,
            id: "mapbox.streets",
            accessToken: "your.mapbox.access.token"
          }
        );

        /*var copia = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });*/

        obj.features.forEach(function (element, index) {
          element.geometry.coordinates[0][0].forEach(function (element, i) {
            let punto = element;
            let cordenadas = proj4(source, source2, punto);
            obj.features[index].geometry.coordinates[0][0][i][0] =
              cordenadas[1];
            obj.features[index].geometry.coordinates[0][0][i][1] =
              cordenadas[0];
          });

          var polygon = L.polygon(element.geometry.coordinates[0][0], {
            color: "white",
            fillOpacity: 1.0
          });
          $this.array_poligono_base2.push(polygon);
        });
        var cities2 = L.layerGroup($this.array_poligono_base2);

        this.baseMaps = {
          "Capas de Estudio (2017)": mapaFondo
        };

        this.mymap2 = new L.map(id_div, {
          drawControl: true,
          minZoom: 0,
          maxZoom: 18,
          center: [center[1], center[0]],
          zoom: 9,
          layers: [mapaFondo, cities2]
          //layers: [mapaFondo, cities, copia]
        });
        L.control.mousePosition().addTo(this.mymap2);

        var ButtonInit2 = L.easyButton({
          states: [{
            stateName: "estado-activar", // name the state
            icon: "fas fa-layer-group star", // and define its properties
            title: "Activar Capas Por Año", // like its title
            onClick: function (btn, map) {
              // and its callback
              $this.parte_accion = 1;
              btn.state("estado_cancelar"); // change state on click!
              $("#mostrar").modal("show");
            }
          }]
        });
        ButtonInit2.addTo(this.mymap2);
      }

      //----------Coordenadas-------------
      this.Inicializar();
    },

    descriptionStyles: function (param) {
      if (param) {
        this.styleObject.width = "50%";
        (this.mostrado = true), this.DataMapaBase("map2");
      } else {
        this.styleObject.width = "100%";
        this.mostrado = false;
        this.mymap2 = null;
        $this.parte_accion = 0;
      }
    },

    BotonDinamico(lado) {

      $this = this;
      var stateChangingButton = L.easyButton({
        states: [{
            stateName: "estado-activar", // name the state
            icon: "fas fa-info star", // and define its properties
            title: "Activar Informacion Espacio Muestreo", // like its title
            onClick: function (btn, map) {
              // and its callback
              btn.state("estado_cancelar"); // change state on click!

              $this.InfoCapas();
              $this.Cancelado = false;
            }
          },
          {
            stateName: "estado_cancelar",
            icon: "fas fa-times star",
            title: "Desactivar Informacion Espacio Muestreo",
            onClick: function (btn, map) {
              btn.state("estado-activar");
              $this.RemoverInfo();
            }
          }
        ]
      });
      var distanciaBtn = L.easyButton({
        states: [{
            stateName: "estado-activar", // name the state
            icon: "fas fa-ruler tam", // and define its properties
            title: "Calculo De Distancia Entre Dos Puntos", // like its title
            onClick: function (btn, map) {
              btn.state("estado_cancelar"); // change state on click!
              $this.band_dist_pt = true;
            }
          },
          {
            stateName: "estado_cancelar",
            icon: "fas fa-times star",
            title: "Desactivar Calculo De Distancia Entre Dos Puntos",
            onClick: function (btn, map) {
              btn.state("estado-activar");
              $this.RemoverLinea();
              $this.Reseteo();
              $this.band_dist_pt = false;
              $this.cont_terc = 0;
            }
          }
        ]
      });

      var comparar = L.easyButton({
        states: [{
            stateName: "estado-activar", // name the state
            icon: "fas fa-not-equal tam", // and define its properties
            title: "Comparar Mapas", // like its title
            onClick: function (btn, map) {
              btn.state("estado_cancelar"); // change state on click!
              $this.descriptionStyles(true);
            }
          },
          {
            stateName: "estado_cancelar",
            icon: "fas fa-times star",
            title: "Desactivar Comparar Mapas",
            onClick: function (btn, map) {
              btn.state("estado-activar");
              $this.descriptionStyles(false);
            }
          }
        ]
      });

      var areas = L.easyButton({
        states: [{
          stateName: "estado-activar", // name the state
          icon: "fas fa-autoprefixer tam", // and define its properties
          title: "Informacion Areas", // like its title
          onClick: function (btn, map) {
            $this.InfoKmCuadrados();
          }
        }]
      });

      var importar = L.easyButton({
        states: [{
          stateName: "estado-activar", // name the state
          icon: "fas fa-upload tam", // and define its properties
          title: "Importar Archivo", // like its title
          onClick: function (btn, map) {
            $this.CargarModalImport();
          }
        }]
      });

      var exportar = L.easyButton({
        states: [{
          stateName: "estado-activar", // name the state
          icon: "fas fa-download tam", // and define its properties
          title: "Exportar Mapa", // like its title
          onClick: function (btn, map) {
            $this.Exportar();
          }
        }]
      });

      var mostrar_especie = L.easyButton({
        states: [{
          stateName: "estado-activar", // name the state
          icon: "fas fa-map-marker-alt tam", // and define its properties
          title: "Visualizar Especie", // like its title
          onClick: function (btn, map) {
            $this.Ver_especies();
          }
        }]
      });

      var espacioMuestreoBtn = L.easyButton({
        states: [{
            stateName: "estado-activar", // name the state
            icon: "fas fa-stop-circle tam", // and define its properties
            title: "Espacio Muestreo", // like its title
            onClick: function (btn, map) {
              btn.state("estado_cancelar"); // change state on click!
              $this.ConsultarEspacioMuestreo();
            }
          },
          {
            stateName: "estado_cancelar",
            icon: "fas fa-times star",
            title: "Desactivar Espacio Muestreo",
            onClick: function (btn, map) {
              btn.state("estado-activar");

            }
          }
        ]
      });



      if ($this.parte_accion == 0) {
        stateChangingButton.addTo(this.mymap);
        distanciaBtn.addTo(this.mymap);
        comparar.addTo(this.mymap);
        areas.addTo(this.mymap);
        importar.addTo(this.mymap);
        exportar.addTo(this.mymap);
        mostrar_especie.addTo(this.mymap);
        espacioMuestreoBtn.addTo(this.mymap);
      } else {
        //stateChangingButton.addTo(this.mymap2);
        //distanciaBtn.addTo(this.mymap2);
      }
    },

    ConsultarEspacioMuestreo() {
      $this = this;
      fetch("http://localhost:3978/api/tipo_muestreo/lists/")
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          $this.DibujarEspacioMuestreo(response.resultado);
        });
    },
    DibujarEspacioMuestreo(result) {
      var arrayParm = [];
      let compLat = [];
      console.log(result)
      for (var i = 0; i < result.length; i++) {
        $this.marker[i] = new L.marker([result[i].latitud, result[i].longitud])
          .bindPopup(result[i].cod_espacio_muestreo)
          .addTo(this.mymap);
        arrayParm.push(turf.point([result[i].latitud, result[i].longitud]))
        compLat.push(result[i].latitud);
        if (i + 1 == result.length) {
          $this.MasProximo(arrayParm, compLat);
        }
      }

    },
    MasProximo(collectionPoints, arr_lat) {
      $this = this;
      let targetPoint, nearest;

      for (var i = 0; i < collectionPoints.length; i++) {

        this.marker[i].on('click', function (e) {
          console.log(e)
          console.log(e.latlng.lat);
          console.log(e.latlng.lng);

          let auxColeccion = JSON.parse(JSON.stringify(collectionPoints));

          const isLargeNumber = (element) => element == e.latlng.lat;

          auxColeccion.splice(arr_lat.findIndex(isLargeNumber), 1);
          var points = turf.featureCollection(auxColeccion);

          targetPoint = turf.point([e.latlng.lat, e.latlng.lng], {
            "marker-color": "#0F0"
          });
          e.sourceTarget._icon.currentSrc = "file:///home/rendallrojas/Desarrollos_Node/TESIS/CARB/Librerias_Mapa/images/arbol.png"

          nearest = turf.nearestPoint(targetPoint, points);
          $this.MostrarP(nearest.properties.featureIndex, nearest.properties.distanceToPoint)


          console.log(targetPoint)
          console.log(points)
          console.log(nearest)



        });
      }

    },
    MostrarP(indice, distancia) {
      this.marker[indice].openPopup()
    },
    Ver_especies() {
      $("#ver-especies").modal("show");
      this.VerMarcadores();
    },
    VerMarcadores() {
      $this = this;
      fetch("http://localhost:3978/api/especief/lists")
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          $this.marcadores_flora = response.resultado;
          //console.log($this.array_anios);
        });
    },
    VerMarcadoresEspecieFlora() {
      //
      $this = this;
      fetch("http://localhost:3978/api/especief/listsrl/" + this.id_especie_fl)
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          $this.DibujarEspecies(response.resultado);
        });
    },
    DibujarEspecies(data) {
      console.log(data)
      for (var i = 0; i < data[0].Registros.length; i++) {
        console.log(i)
        if (data[0].Registros[i].Ejemplares.length > 0) {
          marker = new L.marker([data[0].Registros[i].Ejemplares[0].ubicacion_especie_flora.coordinates[0], data[0].Registros[i].Ejemplares[0].ubicacion_especie_flora.coordinates[1]])
            .bindPopup(data[0].nombre_especie)
            .addTo(this.mymap);
        }
      }
    },
    InfoKmCuadrados() {
      $("#mostrar-info").modal("show");
    },
    CargarModalImport() {
      $("#carga-info").modal("show");
    },
    Exportar() {
      this.PruebaLayer.addLayer($this.Bosq);
      this.PruebaLayer.addLayer($this.Sabana);
      this.PruebaLayer.addLayer($this.Matorral);
      this.PruebaLayer.addLayer($this.Pastizal);
      this.PruebaLayer.addLayer($this.CentroP);
      this.PruebaLayer.addLayer($this.CuerpoA);

      console.log(this.PruebaLayer.toGeoJSON());
      this.saveToFile(this.PruebaLayer.toGeoJSON(), 'dataMap');
    },
    saveToFile(content, filename) {
      var file = filename + '.geojson';
      saveAs(new File([JSON.stringify(content)], file, {
        type: "text/plain;charset=utf-8"
      }), file);

      this.PruebaLayer.clearLayers();
    },
    cargaFile() {
      /*shp("http://localhost:3978/images/ne_110m_admin_0_countries").then(function(geojson){
    		console.log(geojson)
    	});*/
      var geo = L.geoJson({
        features: []
      }, {
        onEachFeature: function popUp(f, l) {
          var out = [];
          if (f.properties) {
            for (var key in f.properties) {
              out.push(key + ": " + f.properties[key]);
            }
            l.bindPopup(out.join("<br />"));
          }
        }
      }).addTo(this.mymap);
      var base = 'http://localhost:3978/images/Regiones_Naturales_Venezuela';
      shp(base).then(function (data) {
        console.log(data);
        geo.addData(data);
      });
    },
    ResetInfoKmCuadrados() {
      if (this.nuevoLayer) {
        this.nuevoLayer.remove();
      }
    },
    onChange(event) {
      if (this.nuevoLayer) {
        this.nuevoLayer.remove();
      }
      let value = event.target.value;
      if (value == 1) {
        this.texto = "Bosque : " + this.area_bosque + " Km2";
        this.nuevoLayer = new L.LayerGroup(this.array_poligono_bosque);
      }
      if (value == 2) {
        this.texto = "Sabana : " + this.area_sabana + " Km2";
        this.nuevoLayer = new L.LayerGroup(this.array_poligono_sabana);
      }
      if (value == 3) {
        this.texto = "Matorral : " + this.area_matorral + " Km2";
        this.nuevoLayer = new L.LayerGroup(this.array_poligono_matorral);
      }
      if (value == 4) {
        this.texto = "Pastizal : " + this.area_pastizal + " Km2";
        this.nuevoLayer = new L.LayerGroup(this.array_poligono_pastizal);
      }
      if (value == 5) {
        this.texto = "Centro Poblado : " + this.area_centro_poblado + " Km2";
        this.nuevoLayer = new L.LayerGroup(this.array_poligono_centro_poblado);
      }
      if (value == 6) {
        this.texto = "Cuerpo de Agua : " + this.area_cuerpo_agua + " Km2";
        this.nuevoLayer = new L.LayerGroup(this.array_poligono_cuerpo_agua);
      }
      this.nuevoLayer.addTo(this.mymap);
      console.log(event.target.value)
    },

    RemoverInfo() {
      this.info.remove();
      $this.Cancelado = true;
    },
    Encontrar(layer_id, capa) {
      var arregloC;

      if (capa == 1) {
        arregloC = $this.array_propiedades_bosque;
      } else if (capa == 2) {
        arregloC = $this.array_propiedades_sabana;
      } else if (capa == 3) {
        arregloC = $this.array_propiedades_matorral;
      } else if (capa == 4) {
        arregloC = $this.array_propiedades_pastizal;
      } else if (capa == 5) {
        arregloC = $this.array_propiedades_centro_poblado;
      } else {
        arregloC = $this.array_propiedades_cuerpo_agua;
      }
      var encontrado = arregloC.find(function (elem) {
        return elem.poligono._leaflet_id == layer_id;
      });
      this.info.update(encontrado);
    },
    InfoCapas() {
      $this = this;

      this.info = L.control();
      this.info.onAdd = function (map) {
        this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
        this.update();
        return this._div;
      };
      this.info.update = function (props) {
        if (props) {
          console.log(props);
          let id_subtipo_cobertura = props.element.id_subtipo_cobertura;
          let Cobertura = [{
              id_subtipo_cobertura: 1,
              subtipo_cobertura: "Bosque de tierra firme",
              tipo_cobertura: "Bosque"
            },
            {
              id_subtipo_cobertura: 2,
              subtipo_cobertura: "Bosque de galeria",
              tipo_cobertura: "Bosque"
            },
            {
              id_subtipo_cobertura: 3,
              subtipo_cobertura: "Sabana",
              tipo_cobertura: "Sabana"
            },
            {
              id_subtipo_cobertura: 4,
              subtipo_cobertura: "Matorral alto",
              tipo_cobertura: "Matorral"
            },
            {
              id_subtipo_cobertura: 5,
              subtipo_cobertura: "Matorral alto",
              tipo_cobertura: "Matorral"
            },
            {
              id_subtipo_cobertura: 6,
              subtipo_cobertura: "Pastizal",
              tipo_cobertura: "Pastizal"
            },
            {
              id_subtipo_cobertura: 7,
              subtipo_cobertura: "Centro poblado",
              tipo_cobertura: "Centro poblado"
            },
            {
              id_subtipo_cobertura: 8,
              subtipo_cobertura: "Cuerpo de agua",
              tipo_cobertura: "Cuerpo de agua"
            }
          ];
          var data = Cobertura.find(function (item) {
            return item.id_subtipo_cobertura == id_subtipo_cobertura;
          });
          console.log(data);

          this._div.innerHTML = `
          <h4 ><strong>Informacion Poligono:</strong></h4>
            <p><strong>Año :</strong>  ${props.element.anio}</p>
            <p><strong>Tipo Cobertura :</strong>  ${data.tipo_cobertura}</p>
            <p><strong>Subtipo Cobertura :</strong>  ${data.subtipo_cobertura}</p>
            <p><strong>Area :</strong>  ${props.element.area}</p>
            <p><strong>Cover_I :</strong>  ${props.element.cover_i}</p>
            <p><strong>Paisaje :</strong>  ${props.element.paisaje}</p>
            <p><strong>Perimetro :</strong>  ${props.element.perimetro}</p>
            <p><strong>Tenencia :</strong>  ${props.element.tenencia}</p>
            <p><strong>Uso Dominante :</strong>  ${props.element.uso_dominante}</p>
          `;
        }
      };

      this.info.addTo(this.mymap);

      $this.Bosq.eachLayer(function (layer) {
        layer.interactive = true;
        layer.on("mouseover", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 0.2
            });
            $this.Encontrar(this._leaflet_id, 1);
          }
        });
        layer.on("mouseout", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 1.0
            });
          }
        });
      });
      $this.Sabana.eachLayer(function (layer) {
        layer.interactive = true;
        layer.on("mouseover", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 0.2
            });
            $this.Encontrar(this._leaflet_id, 2);
          }
        });
        layer.on("mouseout", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 1.0
            });
          }
        });
      });
      $this.Matorral.eachLayer(function (layer) {
        layer.interactive = true;
        layer.on("mouseover", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 0.2
            });
            $this.Encontrar(this._leaflet_id, 3);
          }
        });
        layer.on("mouseout", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 1.0
            });
          }
        });
      });
      $this.Pastizal.eachLayer(function (layer) {
        layer.interactive = true;
        layer.on("mouseover", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 0.2
            });
            $this.Encontrar(this._leaflet_id, 4);
          }
        });
        layer.on("mouseout", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 1.0
            });
          }
        });
      });
      $this.CentroP.eachLayer(function (layer) {
        layer.interactive = true;
        layer.on("mouseover", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 0.2
            });
            $this.Encontrar(this._leaflet_id, 5);
          }
        });
        layer.on("mouseout", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 1.0
            });
          }
        });
      });
      $this.CuerpoA.eachLayer(function (layer) {
        layer.interactive = true;
        layer.on("mouseover", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 0.2
            });
            $this.Encontrar(this._leaflet_id, 6);
          }
        });
        layer.on("mouseout", function () {
          if ($this.Cancelado == false) {
            this.setStyle({
              fillOpacity: 1.0
            });
          }
        });
      });
    }
  },

  computed: {}
});

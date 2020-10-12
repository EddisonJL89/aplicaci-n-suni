function listar_grupos_sede(sede_selector, grupo_selector, null_option) {
    /*
    Al cambiar la sede, genera el listado de grupos
    */
    $(grupo_selector).html('');
    if ($(sede_selector).val()) {
        $.get($(sede_selector).data('url'),
        {
            sede: $(sede_selector).val()
        },
        function (respuesta) {
            var options = '';
            if (null_option) {
                options += '<option value="">------</option>';
            }
            $.each(respuesta, function (index, grupo) {
                options += '<option value="'+grupo.id+'">'+grupo.numero+' - '+grupo.curso+'</option>';
            });
            $(grupo_selector).html(options).trigger('change');
        });
    }
}
//funcion listar sedes mediante cursos
function listar_sede_cursos(sede_selector, grupo_selector, null_option) {
    /*
    Al cambiar la sede, genera el listado de grupos
    */
  $(grupo_selector).html('');
    if ($(sede_selector).val()) {
        $.get($(sede_selector).data('url'),
        {
            grupo__curso: $(sede_selector).val()
        },
        function (respuesta) {
            var options = '';
            if (null_option) {
                options += '<option value="">------</option>';
            }
            //console.log(respuesta);
            var  nueva_sede=[];
            var  datos_sede=[];
            //console.log(unique);
            $.each(respuesta, function (index, grupo) {
              nueva_sede.push(grupo.sede_id);
              datos_sede.push(grupo.sede);

                //options += '<option value="'+grupo.sede_id+'">'+grupo.sede+'</option>';
            });
             var nuevas_sedes =Array.from(new Set(nueva_sede));
             var nuevos_datos_sedes = Array.from(new Set(datos_sede));
             for(var k=0;k<nuevas_sedes.length;k++){
                  console.log(nuevas_sedes[k] +" " + nuevos_datos_sedes[k]);
                    options += '<option value="'+nuevas_sedes[k]+'">'+nuevos_datos_sedes[k]+'</option>';
             }
            $(grupo_selector).html(options).trigger('change');
        });
    }
}
//fin funcion listar sede mediante cursos
function listar_curso_sede(sede_selector, grupo_selector, null_option) {
    /*
    Al cambiar la sede, genera el listado de grupos
    */
    $(grupo_selector).html('');
    if ($(sede_selector).val()) {
        $.get($(sede_selector).data('url'),
        {
            sede: $(sede_selector).val()
        },
        function (respuesta) {
            var options = '';
            if (null_option) {
                options += '<option value="">------</option>';
            }
            var  nuevo_curso=[];
            var  datos_curso=[];
            $.each(respuesta, function (index, grupo) {
              nuevo_curso.push(grupo.curso_id);
              datos_curso.push(grupo.curso);

            });
            var nuevos_cursos =Array.from(new Set(nuevo_curso));
            var nuevos_datos_cursos = Array.from(new Set(datos_curso));
            for(var k=0;k<nuevos_cursos.length;k++){
                  options += '<option value="'+nuevos_cursos[k]+'">'+nuevos_datos_cursos[k]+'</option>';
            }
            $(grupo_selector).html(options).trigger('change');
        });
    }
}
//fin fucion retornar curso mediante sedes
//funcion listar grupo` mediante cursos
function listar_grupo_cursos(sede_selector, grupo_selector, null_option) {
    /*
    Al cambiar la sede, genera el listado de grupos
    */
  $(grupo_selector).html('');
    if ($(sede_selector).val()) {
        $.get($(sede_selector).data('url'),
        {
            grupo__curso: $(sede_selector).val()
        },
        function (respuesta) {
            var options = '';
            if (null_option) {
                options += '<option value="">------</option>';
            }
            //console.log(respuesta);
            var  nuevo_grupo=[];
            var  datos_grupo=[];
            //console.log(unique);
            $.each(respuesta, function (index, grupo) {
              nuevo_grupo.push(grupo.grupo);
              datos_grupo.push(grupo.grupo_nombre);

                //options += '<option value="'+grupo.sede_id+'">'+grupo.sede+'</option>';
            });
             var nuevos_grupos =Array.from(new Set(nuevo_grupo));
             var nuevos_datos_grupos = Array.from(new Set(datos_grupo));
             console.log(nuevos_grupos);
             console.log(nuevos_datos_grupos);
             for(var k=0;k<nuevos_grupos.length;k++){
                  //console.log(nuevas_sedes[k] +" " + nuevos_datos_sedes[k]);
                    options += '<option value="'+nuevos_grupos[k]+'">'+nuevos_datos_grupos[k]+'</option>';
             }
            $(grupo_selector).html(options).trigger('change');
        });
    }
}
//listar asistencias
function listar_asistencias(sede_selector, grupo_selector,asistencia_selector ,null_option) {
    /*
    Al cambiar la sede, genera el listado de grupos
    */
    $(asistencia_selector).html('');
    if ($(sede_selector).val()) {
        $.get($(grupo_selector).data('url'),
        {
            grupo__sede: $(sede_selector).val(),
            grupo:$(grupo_selector).val()
        },
        function (respuesta) {
            var options = '';
            if (null_option) {
                options += '<option value="">------</option>';
            }
            $.each(respuesta, function (index, grupo) {
                options += '<option value="'+grupo.id+'">'+"A"+grupo.cr_asistencia+' - '+grupo.fecha+'</option>';
            });
            $(asistencia_selector).html(options).trigger('change');
        });
    }
}
//fin listar asistencias
function validar_udi_api(params) {
    if(validar_udi(params.udi)){
        $.get(params.url,
        {
            codigo: params.udi,
            fields: 'nombre'
        }, function (respuesta) {
            params.callback(respuesta);
        });
    }
}

(function( BuscadorSede, $, undefined ) {
    BuscadorSede.init = function () {
        var options = {
            valueNames: [ 'sede', 'capacitador']
        };
        var userList = new List('buscador', options);

        $('#id_capacitador').change(function () {
            var tr = $('.tr-sede');
            if ($(this).val() == '') {
                $(tr).show();
                return false;
            }
            for (var i = 0; i < tr.length; i++) {
                if($(tr[i]).data('capacitador-id') == $(this).val()) {
                    $(tr[i]).show();
                }
                else{
                    $(tr[i]).hide();
                }
            }
        })





    }
}( window.BuscadorSede = window.BuscadorSede || {}, jQuery ));

(function( SedeDetail, $, undefined ) {
    var crear_celda = function (asesoria) {
        var fila = $('<tr />');
        fila.append('<td><a href="#" class="editable" data-name="fecha" data-type="text" data-pk="'+asesoria.id+'" data-url="'+asesoria.url+'">' + asesoria.fecha + '</a></td>');
        fila.append('<td><a href="#" class="editable" data-name="hora_inicio" data-type="text" data-pk="'+asesoria.id+'" data-url="'+asesoria.url+'">' + asesoria.hora_inicio + '</a></td>');
        fila.append('<td><a href="#" class="editable" data-name="hora_fin" data-type="text" data-pk="'+asesoria.id+'" data-url="'+asesoria.url+'">' + asesoria.hora_fin + '</a></td>');
        fila.append('<td><a href="#" class="editable" data-name="observacion" data-type="text" data-pk="'+asesoria.id+'" data-url="'+asesoria.url+'">' + asesoria.observacion + '</a></td>');
        $('#asesoria-tabla-body').append(fila);
        activar_edicion();
    }

    var activar_edicion = function () {
        $('.editable').on('shown', function(e, editable) {
            $('.datepicker').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'es'
            });
        }).editable({
            ajaxOptions: {
                contentType: 'application/json',
                dataType: 'json',
                type: "PATCH",
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                }
            },
            params: function(params) {
                var obj = {};
                obj[params['name']] = params['value'];
                return JSON.stringify(obj);
            }
        });
    }

    SedeDetail.init = function () {

        activar_edicion();
        $('#asesoria-form').hide();
        $('#btn-asesoria').on('click', function () {
            $('#asesoria-form').toggle();
        });
        $('#asesoria-form').on('submit', function (e) {
            e.preventDefault();
            $.post($(this).attr('action'), $(this).serializeObject(), function (respuesta) {
                $('#asesoria-form')[0].reset();
                $('#asesoria-form').hide();
                crear_celda(respuesta);
            });
        });

        $('.eliminar-asesoria').on('click', function () {
            var boton = $(this);
            bootbox.confirm('¿Desea eliminar el período de asesoría?', function (result) {
                if(result){
                    $.ajax({
                        beforeSend: function(xhr, settings) {
                            xhr.setRequestHeader("X-CSRFToken", $("[name=csrfmiddlewaretoken]").val());
                        },
                        success: function (respuesta) {
                            $('#asesoria-'+boton.data('pk')).remove();
                        },
                        dataType: 'json',
                        type: 'DELETE',
                        url: boton.data('url')
                    });
                }
            });
        });

        /**/
        $('.eliminar-grupo').on('click', function () {
          var botonEliminar= $(this);
          bootbox.confirm('¿Desea eliminar el período de asesoría?', function (result) {
              if(result){
                  $.ajax({
                      beforeSend: function(xhr, settings) {
                          xhr.setRequestHeader("X-CSRFToken", $("[name=csrfmiddlewaretoken]").val());
                      },
                      success: function (respuesta) {
                      },
                      dataType: 'json',
                      type: "POST",
                      url: botonEliminar.data('ulr'),
                      data: {
                          primary_key:botonEliminar.data('grupo') ,
                          eliminar:1,

                      },
                  });
              }
          });
        });
        /**/


/*ajax*/
/*Obtener los datos para que se muestre en las lineas de tiempo*/
var cursos=[];
var mostrar_curso=[];
var contador_curso=0;
$.ajax({
  url:$('#linea').data("url"),
  dataType:'json',
  data:{
    'grupo__sede':$('#linea').data("sede"),
  },
  error:function(){
    console.log("Error");
  },
  success:function(data){

    for(k=0;k<data.length;k++){
      contador_curso++;
      try {
        if(data[k].grupo != data[k+1].grupo){
          /*Formato establecido para las lineas de tiempo*/
          /*[Id,Nombre,fecha_inicio,fecha_final]*/
          cursos=[data[(k+1)-(contador_curso)].grupo.toString(),data[(k+1)-(contador_curso)].curso,new Date(data[(k+1)-(contador_curso)].fecha),new Date(data[(k+1)-(contador_curso)].fecha_fin['fecha'])]
          mostrar_curso.push(cursos);
          contador_curso=0;
        }

      } catch (e) {
          cursos=[data[(k+1)-(contador_curso)].grupo.toString(),data[(k+1)-(contador_curso)].curso,new Date(data[(k+1)-(contador_curso)].fecha),new Date(data[(k+1)-(contador_curso)].fecha_fin['fecha'])]
          mostrar_curso.push(cursos);
          contador_curso=0;
      }

    }
    /*Grafica*/
    google.charts.load('current', {'packages':['timeline']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var container = document.getElementById('timeline');
      var chart = new google.visualization.Timeline(container);
      var dataTable = new google.visualization.DataTable();

      dataTable.addColumn({ type: 'string', id: 'President' });
      dataTable.addColumn({ type: 'string', id: 'Name' });
      dataTable.addColumn({ type: 'date', id: 'Start' });
      dataTable.addColumn({ type: 'date', id: 'End' });
      dataTable.addRows(mostrar_curso);
    var options = {
      timeline:{ showRowLabels: false},
      width:850

    };

      chart.draw(dataTable,options);
    }
    /*Fin grafica*/
  },
  type: 'GET'
}
);
/*fin ajax*/

    }
}( window.SedeDetail = window.SedeDetail || {}, jQuery ));


(function( GrupoDetail, $, undefined ) {
    var crear_grafico = function (contenedor) {
        var url = $(contenedor).data('url');
        var grupo_id = $(contenedor).data('grupo_id');

        $.get(url, {grupo: grupo_id, fields: 'cr_asistencia,asistentes'}, function (respuesta) {
            var asistencias_chart = new Chart(contenedor, {
                type: 'line',
                data: {
                    labels: respuesta.map(function (calendario) {return calendario.cr_asistencia}),
                    datasets: [{
                        label: "Asistentes",
                        data: respuesta.map(function (calendario) {return calendario.asistentes}),
                        borderColor: "#3e95cd",
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                beginAtZero:true
                            },
                            scaleSteps : 10,
                        }]
                    }
                }
            });
        })
    }

    var copiar_participantes = function () {
        var api_url = $('#copiar-form').prop('action');
        var grupo_id = $('#copiar-form #id_grupo').val();
        var total = $('.check-participante:checkbox:checked').length;
        var completados = 0;
        $('.check-participante:checkbox:checked').each(function () {
            var participante_id = $(this).val();
            $.ajax({
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                },
                data: {
                    grupo: grupo_id,
                    participante: participante_id
                },
                dataType: 'json',
                error: function (respuesta) {
                    completados += 1;
                    new Noty({
                        text: 'Error al asignar a ' + $('#td-nombre-'+participante_id).text() + ' ' + $('#td-apellido-'+participante_id).text() +'.',
                        type: 'error',
                        timeout: 2500,
                    }).show();
                    ocultar_copiar_form(total, completados);
                },
                url: api_url,
                success: function (respuesta) {
                    completados += 1;
                    new Noty({
                        text: 'Copiado con éxito',
                        type: 'success',
                        timeout: 1700,
                    }).show();
                    ocultar_copiar_form(total, completados);
                },
                type: 'POST'
            });
        })
    }

    var ocultar_copiar_form = function (total, completados) {
        if (completados >= total) {
            $('#copiar-form')[0].reset();
            $('.form-copiar').hide();
            $('.check-participante').prop('checked', false);
        }
    }

    GrupoDetail.init = function () {
        $('.editable').on('shown', function(e, editable) {
            $('.datepicker').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'es'
            });
        }).editable({
            ajaxOptions: {
                contentType: 'application/json',
                dataType: 'json',
                type: "PATCH",
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                }
            },
            params: function(params) {
                var obj = {};
                obj[params['name']] = params['value'];
                return JSON.stringify(obj);
            }
        });
        crear_grafico($("#grafico-asistencias"));
        $('.form-copiar').hide();
        $('#btn-select-all').click(function(){
            $('.check-participante').prop('checked',true);
        });
        $('#btn-select-none').click(function(){
            $('.check-participante:checkbox:checked').removeAttr('checked');
        });
        $('#btn-form-copiar').on('click', function () {
            $('.form-copiar').toggle();
        });
        $('#copiar-form').on('submit', function (e) {
            e.preventDefault();
            copiar_participantes();
        });
    }
}( window.GrupoDetail = window.GrupoDetail || {}, jQuery ));


(function( CalendarioCyD, $, undefined ) {
    var crear_cyd_calendario = function () {
        $('#cyd-calendario').fullCalendar({
            displayEventEnd: true,
            droppable: true,
            drop: function (date, jsEvent, ui, resourceId) {
                update_event({
                    url: $(this).data('url'),
                    id: $(this).data('id'),
                    fecha: date.year()+'-'+(date.month()+1)+'-'+date.date(),
                    hora_inicio: date.hour()+':'+date.minute(),
                    hora_fin: ''
                });
            },
            dayClick: function (date,calEvent, jsEvent, view){
              /*******Aca controla el dia *********/
              /**/
              bootbox.prompt({
                title: "Ingrese el recordatorio:",
                inputType: 'textarea',
                callback: function (result) {
                    console.log(result);
                    console.log( $('#cyd-calendario').data('url-recordatorio'))
                    if(result !=null){
                      $.ajax({
                        type: "POST",
                        url: $('#cyd-calendario').data('url-recordatorio'),
                        dataType: 'json',
                        data: {
                          csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
                          fecha:date.year()+'-'+(date.month()+1)+'-'+date.date(),
                          observacion :result,
                          capacitador:$('#cyd-calendario').data('codigo')
                        },
                        success: function (response) {
                          bootbox.alert({message: "<h2>Recordatorio creado correctarmente </h2>", className:"modal modal-success fade in"});
                        },
                        error: function (response) {
                          var mensaje = JSON.parse(response.responseText)
                          bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + mensaje['mensaje'], className:"modal modal-danger fade"});
                        }
                    });
                    }

                }
            });
              /**/
            },
            editable: true,
            eventClick: function (calEvent, jsEvent, view) {
                if (calEvent.tipo == 'c') {
                    var form = $('<form></form>');
                    form.append('<div class="form-group"><label for="hora_inicio_m">Hora de inicio</label><input type="text" class="form-control" id="hora_inicio_m" value="'+calEvent.start.hour()+':'+calEvent.start.minute()+'"></div>');
                    form.append('<div class="form-group"><label for="hora_fin_m">Hora de fin</label><input type="text" class="form-control" id="hora_fin_m" value="'+calEvent.end.hour()+':'+calEvent.end.minute()+'"></div>');
                    bootbox.dialog({
                        message: form,
                        buttons: [
                        {
                            label: 'Cancelar',
                            className: 'btn-danger'
                        },
                        {
                            label: 'Guardar',
                            className: 'btn-success',
                            callback: function () {
                                update_event({
                                    url: calEvent._url,
                                    id: calEvent._id,
                                    fecha: calEvent.start.year()+'-'+(calEvent.start.month()+1)+'-'+calEvent.start.date(),
                                    hora_inicio: $('#hora_inicio_m').val(),
                                    hora_fin: $('#hora_fin_m').val(),
                                });
                            }
                        }
                        ],
                    });
                }else{
                  console.log("otro codigo");
                }
            },
            eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
                update_event({
                    url: event._url,
                    id: event._id,
                    fecha: event.start.year()+'-'+(event.start.month()+1)+'-'+event.start.date(),
                    hora_inicio: event.start.hour()+':'+event.start.minute(),
                    hora_fin: event.end.hour()+':'+event.end.minute(),
                });
            },
            eventDurationEditable: true,
            eventRender: function (event, element) {
                element.qtip({
                    content: {
                        title: event.tip_title,
                        text: event.tip_text
                    },
                });
            },
            eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
                update_event({
                    url: event._url,
                    id: event._id,
                    fecha: event.start.year()+'-'+(event.start.month()+1)+'-'+event.start.date(),
                    hora_inicio: event.start.hour()+':'+event.start.minute(),
                    hora_fin: event.end.hour()+':'+event.end.minute(),
                });
            },
            eventSources: [

            {
                url: $('#cyd-calendario').data('url-cyd'),
                type: 'GET',
                cache: true,
                data: function () {
                    var params = {};
                    params['capacitador'] = $('#id_capacitador').val();
                    params['sede'] = $('#sede_form #id_sede').val();
                    return params;
                }
            },
            {
                url: $('#cyd-calendario').data('url-asesoria'),
                type: 'GET',
                cache: true,
                data: function () {
                    var params = {};
                    params['sede__capacitador'] = $('#id_capacitador').val();
                    params['sede'] = $('#sede_form #id_sede').val();
                    return params;
                },
                editable: false
            },
            {
                url:  $('#cyd-calendario').data('url-listarecordatorio'),
                type: 'GET',
                cache: true,
                data: function () {
                    var params = {};
                    params['capacitador'] = $('#cyd-calendario').data('codigo');
                    return params;
                }
            }
            ],
            firstDay: 0,
            header: {
                left: 'prev,next today,month,agendaDay',
                center: '',
                right: 'title'
            },
            navLinks: false,
        });
}
/** */
var crear_cyd_calendario_asesorias = function () {
    $('#cyd-calendario').fullCalendar({
        displayEventEnd: true,
        droppable: true,
        drop: function (date, jsEvent, ui, resourceId) {
            update_event({
                url: $(this).data('url'),
                id: $(this).data('id'),
                fecha: date.year()+'-'+(date.month()+1)+'-'+date.date(),
                hora_inicio: date.hour()+':'+date.minute(),
                hora_fin: ''
            });
        },
        editable: true,
        eventClick: function (calEvent, jsEvent, view) {
            if (calEvent.tipo == 'c') {
                var form = $('<form></form>');
                form.append('<div class="form-group"><label for="hora_inicio_m">Hora de inicio</label><input type="text" class="form-control" id="hora_inicio_m" value="'+calEvent.start.hour()+':'+calEvent.start.minute()+'"></div>');
                form.append('<div class="form-group"><label for="hora_fin_m">Hora de fin</label><input type="text" class="form-control" id="hora_fin_m" value="'+calEvent.end.hour()+':'+calEvent.end.minute()+'"></div>');
                bootbox.dialog({
                    message: form,
                    buttons: [
                    {
                        label: 'Cancelar',
                        className: 'btn-danger'
                    },
                    {
                        label: 'Guardar',
                        className: 'btn-success',
                        callback: function () {
                            update_event({
                                url: calEvent._url,
                                id: calEvent._id,
                                fecha: calEvent.start.year()+'-'+(calEvent.start.month()+1)+'-'+calEvent.start.date(),
                                hora_inicio: $('#hora_inicio_m').val(),
                                hora_fin: $('#hora_fin_m').val(),
                            });
                        }
                    }
                    ],
                });
            }
        },
        eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
            update_event({
                url: event._url,
                id: event._id,
                fecha: event.start.year()+'-'+(event.start.month()+1)+'-'+event.start.date(),
                hora_inicio: event.start.hour()+':'+event.start.minute(),
                hora_fin: event.end.hour()+':'+event.end.minute(),
            });
        },
        eventDurationEditable: true,
        eventRender: function (event, element) {
            element.qtip({
                content: {
                    title: event.tip_title,
                    text: event.tip_text
                },
            });
        },
        eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
            update_event({
                url: event._url,
                id: event._id,
                fecha: event.start.year()+'-'+(event.start.month()+1)+'-'+event.start.date(),
                hora_inicio: event.start.hour()+':'+event.start.minute(),
                hora_fin: event.end.hour()+':'+event.end.minute(),
            });
        },
        eventSources: [
        {
            url: $('#cyd-calendario').data('url-asesoria'),
            type: 'GET',
            cache: true,
            data: function () {
                var params = {};
                params['sede__capacitador'] = $('#id_capacitador').val();
                params['sede'] = $('#sede_form #id_sede').val();
                return params;
            },
            editable: false
        }
        ],
        firstDay: 0,
        header: {
            left: 'prev,next today,month,agendaDay',
            center: '',
            right: 'title'
        },
        navLinks: false,
    });
}
/** */


/** */
var crear_cyd_calendario_asistencia = function () {
    $('#cyd-calendario').fullCalendar({

        displayEventEnd: true,
        droppable: true,
        drop: function (date, jsEvent, ui, resourceId) {
            update_event({
                url: $(this).data('url'),
                id: $(this).data('id'),
                fecha: date.year()+'-'+(date.month()+1)+'-'+date.date(),
                hora_inicio: date.hour()+':'+date.minute(),
                hora_fin: ''
            });
        },
        editable: true,
        eventClick: function (calEvent, jsEvent, view) {

            if (calEvent.tipo == 'c') {
                var form = $('<form></form>');
                form.append('<div class="form-group"><label for="hora_inicio_m">Hora de inicio</label><input type="text" class="form-control" id="hora_inicio_m" value="'+calEvent.start.hour()+':'+calEvent.start.minute()+'"></div>');
                form.append('<div class="form-group"><label for="hora_fin_m">Hora de fin</label><input type="text" class="form-control" id="hora_fin_m" value="'+calEvent.end.hour()+':'+calEvent.end.minute()+'"></div>');
                bootbox.dialog({
                    message: form,
                    buttons: [
                    {
                        label: 'Cancelar',
                        className: 'btn-danger'
                    },
                    {
                        label: 'Guardar',
                        className: 'btn-success',
                        callback: function () {
                            update_event({
                                url: calEvent._url,
                                id: calEvent._id,
                                fecha: calEvent.start.year()+'-'+(calEvent.start.month()+1)+'-'+calEvent.start.date(),
                                hora_inicio: $('#hora_inicio_m').val(),
                                hora_fin: $('#hora_fin_m').val(),
                            });
                        }
                    }
                    ],
                });
            }else{
              console.log("dio click");
            }
        },
        eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
            update_event({
                url: event._url,
                id: event._id,
                fecha: event.start.year()+'-'+(event.start.month()+1)+'-'+event.start.date(),
                hora_inicio: event.start.hour()+':'+event.start.minute(),
                hora_fin: event.end.hour()+':'+event.end.minute(),
            });
        },
        eventDurationEditable: true,
        eventRender: function (event, element) {
            element.qtip({
                content: {
                    title: event.tip_title,
                    text: event.tip_text
                },
            });
        },
        eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
            update_event({
                url: event._url,
                id: event._id,
                fecha: event.start.year()+'-'+(event.start.month()+1)+'-'+event.start.date(),
                hora_inicio: event.start.hour()+':'+event.start.minute(),
                hora_fin: event.end.hour()+':'+event.end.minute(),
            });
        },
        eventSources: [
            {
                url: $('#cyd-calendario').data('url-cyd'),
                type: 'GET',
                cache: true,
                data: function () {
                    var params = {};
                    params['capacitador'] = $('#id_capacitador').val();
                    params['sede'] = $('#sede_form #id_sede').val();
                    return params;
                }
            }
        ],
        firstDay: 0,
        header: {
            left: 'prev,next today,month,agendaDay',
            center: '',
            right: 'title'
        },
        navLinks: false,
    });
}
/** */
function update_event(params) {
    $.ajax({
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", $("[name=csrfmiddlewaretoken]").val());
        },
        url: params.url,
        data: {
            csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            id: params.id,
            fecha: params.fecha,
            hora_inicio: params.hora_inicio,
            hora_fin: params.hora_fin
        },
        type: 'PATCH',
        success: function (calendario) {
            $('#drop-'+calendario.id).html('A'+calendario.cr_asistencia+' '+(calendario.fecha ? calendario.fecha : ''));
            $('#cyd-calendario').fullCalendar('refetchEvents');
            new Noty({
                text: 'Guardado con éxito',
                type: 'success',
                timeout: 2000,
                closeWith: ['click', 'button'],
            }).show();
        }
    })
}

function ini_events(ele) {
    ele.each(function () {
        var eventObject = {
            title: $.trim($(this).text())
        };

        $(this).data('eventObject', eventObject);

        $(this).draggable({
            zIndex: 1070,
            revert: true,
            revertDuration: 0
        });
    });
}

CalendarioCyD.init = function () {
   ini_events($('#asistencia_list div.external-event'));

    $('#sede_form #id_capacitador').on('change', function () {
        $.get($(this).data('url'), {capacitador: $(this).val()},
            function (respuesta) {
                var options = '<option></option>';
                $.each(respuesta, function (index, sede) {
                    options += '<option value="'+sede.id+'">'+sede.nombre+'</option>';
                });
                $('#sede_form #id_sede').html(options).trigger('change');
            });
    });

    $('#sede_form #id_sede').on('change', function () {
        $('#cyd-calendario').fullCalendar('refetchEvents');
    })

    $('#asistencia_form #id_sede').on('change', function () {
        $('#asistencia_form #id_grupo').html('');
        $('#asistencia_list').html('');
        if ($(this).val()) {
            $.get($(this).data('url'), {sede: $(this).val()},
                function (respuesta) {
                    var options = '';
                    $.each(respuesta, function (index, grupo) {
                        options += '<option value="'+grupo.id+'">'+grupo.numero+' - '+grupo.curso+'</option>';
                    });
                    $('#asistencia_form #id_grupo').html(options).trigger('change');
                });
        }
    });
    $('#asistencia_form #id_grupo').on('change', function () {
        $('#asistencia_list').html('');
        $.get($(this).data('url'), {grupo: $(this).val()},
            function (respuesta) {
                var eventos = [];
                $.each(respuesta, function (index, calendario) {
                    var event = $("<div />");
                    event.attr('id', 'drop-'+calendario.id);
                    event.attr('data-id', calendario.id);
                    event.attr('data-url', calendario.url);
                    event.addClass("external-event bg-aqua");
                    event.html('A'+calendario.cr_asistencia+' '+(calendario.fecha ? calendario.fecha : ''));
                    eventos.push(event);
                    ini_events(event);
                });
                $('#asistencia_list').html(eventos);
            });
    });
    if ($('#cyd-calendario').length) {
        crear_cyd_calendario();
       $('#id_tipo').change(function(){
       $('#cyd-calendario').fullCalendar('destroy');
         switch ($(this).val()) {
             case '0':
                crear_cyd_calendario();
                break;
             case '1':
                crear_cyd_calendario_asistencia();
             case '2':
                crear_cyd_calendario_asesorias();
                break;
             default:
                 console.log("No hay mas opciones");

         }
    });

    }
}
}( window.CalendarioCyD = window.CalendarioCyD || {}, jQuery ));

(function( ParticipanteCrear, $, undefined ) {
    ParticipanteCrear.init = function () {
        /*
        Al cambiar la sede, genera el listado de grupos
        */
        $('#form_participante #id_sede').on('change', function () {
            listar_grupos_sede('#form_participante #id_sede', '#form_participante #id_grupo');
        });

        /*
        Al cambiar el grupo, genera el listado de participantes
        */
        $('#form_participante #id_grupo').on('change', function () {
            $('#tbody-listado').html('');
            $.get($(this).data('url'),
            {
                asignaciones__grupo: $(this).val(),
                fields: 'nombre,apellido,escuela'
            },
            function (respuesta) {
                var filas = [];
                $.each(respuesta, function (index, participante) {
                    var fila = $('<tr />');
                    fila.append('<td>'+participante.nombre+'</td>');
                    fila.append('<td>'+participante.apellido+'</td>');
                    fila.append('<td><a href="'+participante.escuela.url+'">'+participante.escuela.nombre+'<br>'+participante.escuela.codigo+'</a></td>');
                    filas.push(fila);
                });
                $('#tbody-listado').html(filas);
            });
        });

        /*
        Valida que el UDI ingresado sea real
        */
        $('#form_participante #id_udi').on('input', function () {
            $('#escuela_label').html('Escuela no encontrada');
            $('#btn-crear').prop('disabled', true);
            validar_udi_api({
                url: $(this).data('url'),
                udi: $(this).val(),
                callback: function (respuesta) {
                    if (respuesta.length>0) {
                        $('#escuela_label').html(respuesta[0].nombre);
                        $('#btn-crear').prop('disabled', false);
                    }
                    else{
                        $('#escuela_label').html('Escuela no encontrada');
                        $('#btn-crear').prop('disabled', true);
                    }
                }
            })
        });

        $('#form_participante').submit(function (e) {
            e.preventDefault();
            $.ajax({
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $("[name=csrfmiddlewaretoken]").val());
                },
                data: JSON.stringify($(this).serializeObject()),
                error: function (respuesta) {
                    new Noty({
                        text: 'El dpi ya existe',
                        type: 'error',
                        timeout: 1500,
                    }).show();
                },
                success: function (respuesta) {
                    if(respuesta.status=="ok"){
                        $('#form_participante #id_grupo').trigger('change');
                        new Noty({
                            text: 'Creado con éxito',
                            type: 'success',
                            timeout: 1000,
                        }).show();
                        $('.form-reset').reset();
                    }
                    else{
                        bootbox.alert("Error desconocido.");
                    }
                },
                dataType: 'json',
                type: 'POST',
                url: $(this).attr('action')
            });
        });
    }
}( window.ParticipanteCrear = window.ParticipanteCrear || {}, jQuery ));

(function( ParticipanteImportar, $, undefined ) {
    var tabla_importar;
    var filas_borrar = [];
    var dpi_validator = function (dpi, callback) {
        if (dpi) {
            $.get(
                participante_api_list_url,
                {
                    dpi: dpi
                },
                function (respuesta) {
                    return respuesta.length > 0 ? callback(false) : callback(true);
                });
        }
    }

    var guardar_tabla = function () {
        var udi = $('#id_udi').val();
        var grupo = $('#id_grupo').val();
        var progress = 0;
        if (udi && grupo) {
            $.each(tabla_importar.getData(), function (index, fila) {
                if (fila[1] && fila[2] && fila[3] && fila[4]) {
                    try{
                        $.ajax({
                            beforeSend: function(xhr, settings) {
                                xhr.setRequestHeader("X-CSRFToken", $("[name=csrfmiddlewaretoken]").val());
                            },
                            data: JSON.stringify({
                                grupo: grupo,
                                udi: udi,
                                dpi: fila[0],
                                nombre: fila[1],
                                apellido: fila[2],
                                genero: fila[3],
                                rol: fila[4],
                                mail: fila[5],
                                tel_movil: fila[6],
                            }),
                            error: function (xhr, status, errorThrown) {
                                new Noty({
                                    text: 'Error al crear a ' + fila[1] + ' ' + fila[2],
                                    type: 'error',
                                    timeout: 3500,
                                }).show();
                                progress += 1;
                                notificar_fin(tabla_importar.countRows(), progress);
                            },
                            success: function (respuesta) {
                                if(respuesta.status=="ok"){
                                    progress += 1;
                                    filas_borrar.push(index + 1);
                                    notificar_fin(tabla_importar.countRows(), progress);
                                //tabla_importar.alter('remove_row', index);
                            }
                            else{
                                bootbox.alert("Error desconocido.");
                            }
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: participante_add_ajax_url
                    });
                    }
                    catch(err){
                        console.log('asd');
                    }
                }
                else{
                    progress += 1;
                }
            });
        }
    }

    var notificar_fin = function(length_all, progress) {
        if (length_all == progress) {
            new Noty({
                text: 'Proceso terminado. Creados ' + filas_borrar.length + ' participantes.',
                type: 'success',
                timeout: 1000,
            }).show();
            filas_borrar.sort(function(a, b){return b-a});
            $('#btn-crear').prop('disabled', false);
            filas_borrar = [];
            $('#id_grupo').trigger('change');
            Pace.stop();
            tabla_importar.updateSettings({
                data : []
            });
        }
    }

    ParticipanteImportar.init = function () {


        $('#form_participante #id_sede').on('change', function () {
            listar_grupos_sede('#form_participante #id_sede', '#form_participante #id_grupo');
        });

        var container = document.getElementById('tabla_importar');

        tabla_importar = new Handsontable(container, {
            colWidths: 178,
            colHeaders: ["DPI", "Nombre", "Apellido", "Género", "Rol", "Correo electrónico", "Teléfono"],
            columns: [
            {data: 'dpi', validator: dpi_validator, allowInvalid: true},
            {data: 'nombre'},
            {data: 'apellido'},
            {
                type: 'handsontable',
                strict: true,
                handsontable: {
                    autoColumnSize: true,
                    data: ['M', 'F']
                }
            },
            {
                type: 'handsontable',
                strict: true,
                handsontable: {
                    autoColumnSize: true,
                    data: rol_list,
                    getValue: function () {
                        var selection = this.getSelected();
                        return this.getSourceDataAtRow(selection[0]).id;
                    }
                }
            },
            {data: 'email'},
            {data: 'tel_movil'},
            ],
            minSpareRows: 1,
            startRows: 1,
            rowHeaders: true,
        });

        /*
        Al cambiar el grupo, genera el listado de participantes
        */
        $('#form_participante #id_grupo').on('change', function () {
            $('#tbody-listado').html('');
            $.get($(this).data('url'),
            {
                asignaciones__grupo: $(this).val(),
                fields: 'nombre,apellido,escuela'
            },
            function (respuesta) {
                var filas = [];
                $.each(respuesta, function (index, participante) {
                    var fila = $('<tr />');
                    fila.append('<td>'+participante.nombre+'</td>');
                    fila.append('<td>'+participante.apellido+'</td>');
                    fila.append('<td><a href="'+participante.escuela.url+'">'+participante.escuela.nombre+'<br>'+participante.escuela.codigo+'</a></td>');
                    filas.push(fila);
                });
                $('#tbody-listado').html(filas);
            });
        });

        /*
        Valida que el UDI ingresado sea real
        */
        $('#form_participante #id_udi').on('input', function () {
            $('#escuela_label').html('Escuela no encontrada');
            //$('#btn-crear').prop('disabled', true);
            validar_udi_api({
                url: $(this).data('url'),
                udi: $(this).val(),
                callback: function (respuesta) {
                    if (respuesta.length>0) {
                        $('#escuela_label').html(respuesta[0].nombre);
                        $('#btn-crear').prop('disabled', false);
                    }
                    else{
                        $('#escuela_label').html('Escuela no encontrada');
                        $('#btn-crear').prop('disabled', true);
                    }
                }
            })
        });

        $('#btn-crear').on('click', function () {
            $(this).prop('disabled', true);
            Pace.start();
            guardar_tabla();
        });

        $('#btn-clear').on('click', function () {
            tabla_importar.updateSettings({
                data : []
            });
        })
    }
}( window.ParticipanteImportar = window.ParticipanteImportar || {}, jQuery ));

(function( ParticipanteDetail, $, undefined ) {
    ParticipanteDetail.init = function () {
        $('.editable').editable({
            ajaxOptions: {
                contentType: 'application/json',
                dataType: 'json',
                type: "PATCH",
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                }
            },
            error: function (response, newValue) {
                var respuesta = JSON.parse(response.responseText);
                var respuestaText = '';
                $.each(respuesta, function (index, item) {
                    respuestaText += item[0];
                });
                return respuestaText;
            },
            mode: 'inline',
            params: function(params) {
                var obj = {};
                obj[params['name']] = params['value'];
                return JSON.stringify(obj);
            },
        });
    }
}( window.ParticipanteDetail = window.ParticipanteDetail || {}, jQuery ));

(function( ParticipanteBuscar, $, undefined ) {
    function buscar_info(){
        $.getJSON(
            $('#participante-buscar-form').prop('action'),
            {
                fields: 'id,nombre,apellido,escuela,url,asignaciones',
                asignaciones__grupo__sede__capacitador: $('#participante-buscar-form #id_capacitador').val(),
                asignaciones__grupo__sede: $('#participante-buscar-form #id_sede').val(),
                asignaciones__grupo: $('#participante-buscar-form #id_grupo').val(),
                escuela__codigo: $('#participante-buscar-form #id_udi').val(),
                escuela__municipio__departamento: $('#participante-buscar-form #id_departamento').val(),
                escuela__municipio: $('#participante-buscar-form #id_municipio').val(),
                activo:2
            },
            function(data){

                 $.each(data, function(i, item){
                    var td_participante = '';
                    td_participante += '<td><a href="'+item.url+'" class="btn btn-block">'+item.nombre+' '+item.apellido+'</a></td>';
                    td_participante += '<td>'+item.asignaciones.map(function (asignacion) {
                        return '<small class="badge bg-aqua">'+asignacion.grupo+'</small>';
                    }).join('<br />')+ '</td>';
                    td_participante += '<td><a href="'+item.escuela.url+'">'+item.escuela.nombre+'<br>'+item.escuela.codigo+'</a></td>';

                    if (permite_asignar) {
                        td_participante += '<td><button class="btn-asignar" data-pk="'+item.id+'">Asignar</button></td>';
                    }
                    td_participante += '<td> <a id="participante_id" data-id="'+item.id +'" class= "btn btn-danger btn-borrar" >Borrar participante</a> </td>';
                    $("#resultado-tbody").html(td_participante);
                 });

                //console.log(td_participante);

            });
    }
    var asignar_participante = function (participante_id) {
        var api_url = $('#participante-asignar-form').prop('action');
        var grupo_id = $('#participante-asignar-form #id_grupo').val();
        console.log(participante_id, grupo_id);
        if (grupo_id && participante_id) {
            $.ajax({
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                },
                data: {
                    grupo: grupo_id,
                    participante: participante_id
                },
                dataType: 'json',
                error: function (respuesta) {
                    new Noty({
                        text: 'Error al realizar la asignación',
                        type: 'error',
                        timeout: 2500,
                    }).show();
                },
                url: api_url,
                success: function (respuesta) {
                    new Noty({
                        text: 'Asignado con éxito',
                        type: 'success',
                        timeout: 1700,
                    }).show();
                    $('#id_nombre').autocomplete('search');
                },
                type: 'POST'
            });
        }
    }

    ParticipanteBuscar.init = function () {
        $('#id_nombre').autocomplete({
            minLength: 4,
            selectFirst: false,
            search: function (event, ui) {
                $('#resultado-tbody').html('');
            },
            source: function (term, callback) {
                $.getJSON(
                    $('#participante-buscar-form').prop('action'),
                    {
                        search: term.term,
                        fields: 'id,nombre,apellido,escuela,url,asignaciones',
                        asignaciones__grupo__sede__capacitador: $('#participante-buscar-form #id_capacitador').val(),
                        asignaciones__grupo__sede: $('#participante-buscar-form #id_sede').val(),
                        asignaciones__grupo: $('#participante-buscar-form #id_grupo').val(),
                        escuela__codigo: $('#participante-buscar-form #id_udi').val(),
                        escuela__municipio__departamento: $('#participante-buscar-form #id_departamento').val(),
                        escuela__municipio: $('#participante-buscar-form #id_municipio').val(),
                        activo:2
                    },
                    callback);
            }
        }).data('ui-autocomplete')._renderItem = function (ul, item) {
            return $('<tr >')
            .data('item.autocomplete', item)
            .append(function () {
                var td_participante = '';
                td_participante += '<td><a href="'+item.url+'" class="btn btn-block">'+item.nombre+' '+item.apellido+'</a></td>';
                td_participante += '<td>'+item.asignaciones.map(function (asignacion) {
                    return '<small class="badge bg-aqua">'+asignacion.grupo+'</small>';
                }).join('<br />')+ '</td>';
                td_participante += '<td><a href="'+item.escuela.url+'">'+item.escuela.nombre+'<br>'+item.escuela.codigo+'</a></td>';

                if (permite_asignar) {
                    td_participante += '<td><button class=" btn  btn-asignar btn-info" data-pk="'+item.id+'">Asignar</button></td>';
                }
                td_participante += '<td> <a id="participante_id" data-id="'+item.id +'" class= "btn btn-danger btn-borrar" >Borrar participante</a> </td>';
                return td_participante;
            })
            .appendTo($('#resultado-tbody'));
        };

        $('#participante-buscar-form #id_sede').on('change', function () {
            listar_grupos_sede('#participante-buscar-form #id_sede', '#participante-buscar-form #id_grupo', true);
            buscar_info();
        });
        $('#participante-buscar-form #id_grupo').on('change', function () {
            $('#id_nombre').autocomplete();
            buscar_info();
        });
        $('#participante-buscar-form #id_departamento').on('change', function () {
            listar_municipio_departamento('#participante-buscar-form #id_departamento', '#participante-buscar-form #id_municipio', true);
          buscar_info();
        });
        $('#participante-buscar-form #id_municipio').on('change', function () {
            $('#id_nombre').autocomplete('search');
            buscar_info();
        });
        $('#participante-buscar-form #id_udi').on('change', function () {
            buscar_info();
        });
        $('#participante-buscar-form #id_capacitador').on('change', function () {
            buscar_info();
        });
        $('#participante-asignar-form #id_sede').on('change', function () {
            listar_grupos_sede('#participante-asignar-form #id_sede', '#participante-asignar-form #id_grupo', true);
        });
        $(document).on("click", ".btn-asignar", function () {
            asignar_participante($(this).data('pk'));
        });
        $(document).on("click", "#participante_id", function () {
            var url_desactivar_persona = $("#resultado-tbody").data("url");
            var id_persona = $(this).data('id');
            bootbox.confirm({
                message: "¿Desea eliminar a este participante?",
                buttons: {
                  confirm: {
                    label: '<i class="fa fa-check"></i> Confirmar',
                    className: 'btn-success'
                  },
                  cancel: {
                    label: '<i class="fa fa-times"></i> Cancelar',
                    className: 'btn-danger'
                  }
                },
                callback: function (result) {
                  if(result == true){

                    $.ajax({
                      type: 'POST',
                      url: url_desactivar_persona,
                      dataType: 'json',
                      data: {
                        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
                        primary_key: id_persona
                      },
                      success: function (response) {
                        bootbox.alert({message: "<h2>Participante borrado exitosamente</h2>", className:"modal modal-success fade in"});
                      },
                      error: function (response) {

                        var jsonResponse = JSON.parse(response.responseText);
                        bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                      }
                    });

                  }else{
                      console.log("Fin del api");
                  }
                }
              });

        });
    }
}( window.ParticipanteBuscar = window.ParticipanteBuscar || {}, jQuery ));

(function(GrupoList, $, undefined){
    var grupo_informe = $("#grupo-list-form");
    var url_informe_grupo = $("#grupo-list").data("url");

    var tablaGrupo = $('#grupo-list').DataTable({
        buttons: ['excel', 'pdf', 'copy'],
        searching:true,
        paging:false,
        ordering:true,
        processing:true,
        destroy:true,
        ajax:{
          url:url_informe_grupo,
          dataSrc:'',
          cache:false,
          processing:true,
          data: function () {
            return $('#grupo-list-form').serializeObject(true);
          }
        },
        columns: [
          {data: "sede", render: function(data, type,full, meta){
              return '<a target=_blank href="'+full.urlgrupo+'">'+data+'</a>'
          }},
          {data: "numero"},
          {data: "curso"},
          {data: "particiapantes", render: function(data, type, full, meta){
              return full.asistencias.length;
          }},
          {data: "capacitador"},
          {data:"", render: function(data, type, full, meta){
              return "<a id='borrar_sede' data-sede='"+ full.id+"'class='btn btn-success btn-borrar'>Borrar Sede</a>";
          }}
        ]
    }).on('xhr.dt', function(e, settings, json, xhr) {
        $('#spinner').hide();
    });

    GrupoList.init = function () {
        $('#spinner').hide();
        grupo_informe.submit(function (e){
            e.preventDeault();
            $("spinner").show();
            tablaGrupo.clear().draw();
            tablaGrupo.ajax.reload();
        });

        $('#grupo-list-form #id_capacitador').on('change', function () {
            listar_sede_capacitador('#grupo-list-form #id_capacitador', '#grupo-list-form #id_sede', true);
        });

        let tablabodygrupo =  $('#grupo-list tbody');
        tablabodygrupo.on('click', '.btn-borrar', function(){
       /*Borrar Grupo */
        var id_grupo_desactivar = $('#borrar_sede').data("sede");
        var url_grupo_desactivar = $("#grupo-list").data("urldesactivar");
         bootbox.confirm({
           message: "¿Desea dar por terminado el grupo?",
           buttons: {
             confirm: {
               label: '<i class="fa fa-check"></i> Confirmar',
               className: 'btn-success'
             },
             cancel: {
               label: '<i class="fa fa-times"></i> Cancelar',
               className: 'btn-danger'
             }
           },
           callback: function (result) {
             if(result == true){
               /*CONSUMIR API*/
               $.ajax({
                 type: 'POST',
                 url: url_grupo_desactivar,
                 dataType: 'json',
                 data: {
                   csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
                   primary_key :id_grupo_desactivar
                 },
                 success: function (response) {
                   bootbox.alert({message: "<h2>Sede borrada correctamente</h2>", className:"modal modal-success fade in"});
                 },
                 error: function (response) {
                   var jsonResponse = JSON.parse(response.responseText);
                   bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                 }
               });
               /*FIN DE CONSUMO*/
             }else{
                 console.log("Fin del api");
             }
           }
         });
     /* */
     });
     //efecto casaca de grupos
     $('#grupo-list-form #id_curso').on('change', function () {
         listar_sede_cursos('#grupo-list-form #id_curso', '#grupo-list-form #id_sede');
     });
    }
}(window.GrupoList = window.GrupoList || {}, jQuery));

(function(SedeList, $, undefined){
    /*Creacion de reportes por filtro */
    var sede_informe = $("#sede-list-form");
    var url_informe_sede = $("#sede-list").data("url");

    var tablaSede = $('#sede-list').DataTable({
        dom: 'Bfrtip',
        destroy:true,
        buttons: ['excel', 'pdf', 'copy'],
        processing:true,
        searching:true,
        paging:false,
        ordering:true,
        deferLoading: [0],
        ajax:{
            url:url_informe_sede,
            dataSrc:'',
            cache:false,
            processing:true,
            data: function () {
              return $('#sede-list-form').serializeObject(true);
            }
        },
        columns: [
            {data: "escuela", render: function(data, type , full, meta){
                return "<a target=_blank href="+full.urlsede+" class='btn btn-block btn-success'><i class='fa fa-eye'></i> Detalle</a>"
            }},
            {data: "escuela", render: function(data, type , full, meta){
                return "<a target=_blank href="+full.urlescuela+">"+full.escuela+'</a>'
            }},
            {data: "departamento"},
            {data: "municipio"},
            {data: "tipo_sede", render: function(data, type , full, meta){
                if(full.tipo_sede =="B"){
                    return "<span class='label label-primary'>Beneficiada</span>";
                } else {
                    return "<span class='label label-danger'>No Beneficiada</span>";
                }
            }},
            {data: "grupos", render: function(data, type , full, meta){
                if(full.grupos ==0){
                    return "<span class='label label-danger' style='font-size: 12px;'>"+full.grupos+"</span>";
                } else {
                    return "<span class='label label-success' style='font-size: 12px;'>"+full.grupos+"</span>";
                }
            }},
            {data: "capacitador"},
            {data: "fecha_creacion"},
            {data:"", render: function(data, type, full, meta){
                return "<a id='borrar_sede' data-sede='"+ full.id+"' class='btn btn-danger btn-block btn-borrar'><i class='fa fa-trash'></i> Eliminar</a>";
            }}
        ]
    }).on('xhr.dt', function(e, settings, json, xhr) {
        $('#spinner').hide();
    });

    SedeList.init = function () {
        $('#spinner').hide();
        sede_informe.submit(function (e) {
            e.preventDefault();
            $("spinner").show();
            tablaSede.clear().draw();
            tablaSede.ajax.reload();
        });

        $('#sede-list-form #id_capacitador').on('change', function (e) {
            e.preventDefault();
            $("spinner").show();
            tablaSede.clear().draw();
            tablaSede.ajax.reload();
        });

        /** */
        let tablabodysede =  $('#sede-list tbody');
        tablabodysede.on('click', '.btn-borrar', function(){
          /*Borrar Sede */
            var id_sede_desactivar = $('#borrar_sede').data("sede");
            var url_sede_desactivar = $("#sede-list").data("urldesactivar");
            bootbox.confirm({
                message: "¿Desea dar por terminada la sede?",
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirmar',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancelar',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if(result == true){
                    /*CONSUMIR API*/
                        $.ajax({
                            type: 'POST',
                            url: url_sede_desactivar,
                            dataType: 'json',
                            data: {
                                csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
                                primary_key :id_sede_desactivar
                            },
                            success: function (response) {
                                bootbox.alert({message: "<h2>Sede borrada correctamente</h2>", className:"modal modal-success fade in"});
                                tablaSede.clear().draw();
                                tablaSede.ajax.reload();
                            },
                            error: function (response) {
                                var jsonResponse = JSON.parse(response.responseText);
                                bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                            }
                        });
                    /*FIN DE CONSUMO*/
                    }else{
                        console.log(url_sede_desactivar);
                    }
                }
            });
        });
    }
}(window.SedeList = window.SedeList || {}, jQuery));

class AgregarCurso{
    constructor(){
      var bandera_contador=0;
        var  contador_asistencia =4;
        var contador_hitos = 4;
        var nuevo2=0;
        var nuevo1=0;
        var cantidad = $('#id_asistencias-TOTAL_FORMS').val();
       for(var b=0;b<5;b++){
            $("#id_asistencias-"+b+"-modulo_num").val(b+1);
            $("#id_asistencias-"+b+"-modulo_num").hide();
        };
        for(var a=5;a<cantidad;a++){
            $("#asistencias-"+a+"-row").css("display","none");
            $("#asistencias-"+a+"-row").prop("required",true);
            $("#hitos-"+a+"-row").css("display","none");
            $("#id_asistencias-"+a+"-modulo_num").val(a+1);
            $("#id_asistencias-"+a+"-modulo_num").hide();
        }

        $("#mostrar_campo_hito").click(function(){
            contador_hitos++;
            $('#id_hitos-TOTAL_FORMS').val(contador_hitos);
             $("#hito_table").append("<tr><td><input type='text' id=id_hitos-"+contador_hitos+"-nombre name=hitos-"+contador_hitos+"-nombre /></td><td><input type='number' id=id_hitos-"+contador_hitos+"-punteo_max name=hitos-"+contador_hitos+"-punteo_max /></td></tr>");
            /*if(contador_hitos > (cantidad-1)){
                bootbox.alert("Ya no puede ingresar más asistencias");
                $("#mostrar_campo_hito" ).prop( "disabled", true );
            }else{
                $("#hitos-"+contador_hitos+"-row").removeAttr("style");;
            }*/
        });

        $("input").focusout(function(){
        AgregarCurso.suma_asistencia();
        AgregarCurso.suma_proyectos_ejercicios();
        //  console.log(nuevo1);
          //console.log(nuevo2);


            var total_asistencia = $('#nota_curso').text();
            var total_proyectos = $('#tareas_curso').text();
            var tota_punteo= (Number(total_asistencia) + Number(total_proyectos));
            $("#total_curso").text((Number(total_asistencia) + Number(total_proyectos)));
            if(tota_punteo>100){
              bootbox.alert("La nota total no puede ser mayor a 100 pts, revise las notas");
              $("#guardar_curso").prop( "disabled", true );
              $("#mostrar_campo" ).prop( "disabled", true );
              $("#mostrar_campo_hito" ).prop( "disabled", true );
            }else{
              $("#mostrar_campo" ).prop( "disabled", false );
              $("#mostrar_campo_hito" ).prop( "disabled", false );
              $("#guardar_curso").prop( "disabled", false );
            }
            /*if(total_asistencia>100){
                bootbox.alert("La nota total no puede ser mayor a 100 pts, revise las notas");
                $("#guardar_curso").prop( "disabled", true );
                $("#mostrar_campo" ).prop( "disabled", true );
                $("#mostrar_campo_hito" ).prop( "disabled", true );
            }else{
                $("#mostrar_campo" ).prop( "disabled", false );
                $("#mostrar_campo_hito" ).prop( "disabled", false );
                $("#guardar_curso").prop( "disabled", false );
            };
            if(total_proyectos>100){
                bootbox.alert("La nota total no puede ser mayor a 100 pts, revise las notas");
                $("#guardar_curso").prop( "disabled", true );
                $("#mostrar_campo_hito" ).prop( "disabled", true );
                  $("#guardar_curso").prop( "disabled", true );
            }else{
              $("#mostrar_campo" ).prop( "disabled", false );
              $("#mostrar_campo_hito" ).prop( "disabled", false );
              $("#guardar_curso").prop( "disabled", false );
            };*/
        });

        $("#id_nombre").keyup(function(){
                $("#nombre_curso").text($(this).val());
        });
          $("#mostrar_campo").click(function(){

            nuevo1=AgregarCurso.suma_asistencia();
            contador_asistencia++;
            $('#id_asistencias-TOTAL_FORMS').val(contador_asistencia);
             $("#asistencia_table").append("<tr><td>"+Number(contador_asistencia+1)+"</td><td><input type='number' id=id_asistencias-"+contador_asistencia+"-punteo_max name=asistencias-"+contador_asistencia+"-punteo_max /></td></tr>");
             //nuevo1 = nuevo1 + Number($("#id_asistencias-"+Number(contador_asistencia-1)+"-punteo_max").val());
             if(contador_asistencia>5){
               nuevo2= nuevo2+Number($("#id_asistencias-"+Number(contador_asistencia-1)+"-punteo_max").val());
               if(Number(nuevo2+nuevo1) > 100){
                   bootbox.alert("Ya no puede ingresar más asistencias que la nota ha superado los 100pts");
                   $("#mostrar_campo" ).prop( "disabled", true );
               }else{
                   $("#asistencias-"+contador_asistencia+"-row").removeAttr("style");
               }
             }else{
              nuevo2= nuevo2+Number($("#id_asistencias-"+Number(contador_asistencia)+"-punteo_max").val());
             }
            $("#nota_curso").text(Number(nuevo2+nuevo1));
            //console.log($("#id_asistencias-"+Number(contador_asistencia-1)+"-punteo_max").val());
            /*  contador_asistencia++;

              if(contador_asistencia > (cantidad-1)){
                  bootbox.alert("Ya no puede ingresar más asistencias");
                  $("#mostrar_campo" ).prop( "disabled", true );
              }else{
                  $("#asistencias-"+contador_asistencia+"-row").removeAttr("style");
              }*/




          });
          $("#guardar_curso").click(function(e){
              e.preventDefault();
              //alert("Esto es un contador"+contador_asistencia);
                //$("#tabla-curso").append("<tr hidden><td>cantidad</td><td><input type='number' id='cantidad_adicional' /></td></tr>");
                //$("#cantidad_adicional").val(contador_asistencia);
               //console.log($('#formulario-prueba').serializeObject(true));
                 var total_punteovalidar= Number($("#total_curso").text());
                 if($("#total_curso").text()==""){
                   bootbox.alert({message: "<h2>Ingrese el nombre del curso</h2>", className:"modal modal-warning fade in"});
                 }else  if($("#id_nota_aprobacion").val()==0){
                   bootbox.alert({message: "<h2>Ingrese la nota de aprobacion</h2>", className:"modal modal-warning fade in"});
                 }else  if($("#id_porcentaje").val()==0){
                   bootbox.alert({message: "<h2>Ingrese el porcentaje del curso</h2>", className:"modal modal-warning fade in"});
                 }else  if(total_punteovalidar==0){
                    bootbox.alert({message: "<h2>Ingrese una asistencias o una tarea</h2>", className:"modal modal-success fade in"});

                 }else{
                   /*CONSUMIR API*/
                   $.ajax({
                     beforeSend: function(xhr, settings) {
                         xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                     },
                     type: 'POST',
                     url:   $("#guardar_curso").data("url"),
                     dataType: 'json',
                     data:{
                       datos:$('#formulario-prueba').serializeObject(true),
                       cantidad_asistencia:contador_asistencia+1,
                       cantidad_hitos:contador_hitos+1
                     } ,
                     success: function (response) {
                       bootbox.alert({message: "<h2>Curso creado exitosamente</h2>", className:"modal modal-success fade in"});
                       location.href = '/cyd/curso/list/';
                     },
                     error: function (response) {
                       var jsonResponse = JSON.parse(response.responseText);
                       bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;Error al crear el curso!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                     }
                   });
                   /*FIN DE CONSUMO*/
                 }

          });



    }
    static suma_asistencia(){

        var cantidad_asistencia = $('#id_asistencias-TOTAL_FORMS').val();
      //  var cantidad_asistencia = contador_asistencia;
        var acumulador_asistencia =0;
        for(var a=0;a<cantidad_asistencia;a++){
            acumulador_asistencia= acumulador_asistencia + Number($("#id_asistencias-"+a+"-punteo_max").val());
        };
            $("#nota_curso").text(acumulador_asistencia);
        return acumulador_asistencia;



    };
    static suma_proyectos_ejercicios(){
        var cantidad_proyectos = $('#id_hitos-TOTAL_FORMS').val();
        var acumulador_proyectos =0;
        for(var a=0;a<cantidad_proyectos;a++){
            acumulador_proyectos= acumulador_proyectos + Number($("#id_hitos-"+a+"-punteo_max").val());
        }
        $("#tareas_curso").text(acumulador_proyectos);
    };

}

class CursoList{
    constructor(){
        $("#id_borrar_curso").click(function(){
           /** */

          var id_curso_desactivar = $('#id_borrar_curso').data("id");
          var url_curso_desactivar = $("#id_borrar_curso").data("url");
          var nombre = $("#id_borrar_curso").data("nombre");

           bootbox.confirm({
             message: "¿Desea dar por terminado el curso "+nombre+"?",
             buttons: {
               confirm: {
                 label: '<i class="fa fa-check"></i> Confirmar',
                 className: 'btn-success'
               },
               cancel: {
                 label: '<i class="fa fa-times"></i> Cancelar',
                 className: 'btn-danger'
               }
             },
             callback: function (result) {
               if(result == true){
                 /*CONSUMIR API*/
                 $.ajax({
                   type: 'POST',
                   url: url_curso_desactivar,
                   dataType: 'json',
                   data: {
                     csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
                     primary_key :id_curso_desactivar
                   },
                   success: function (response) {
                     bootbox.alert({message: "<h2>Curso borrado correctamente</h2>", className:"modal modal-success fade in"});
                     location.reload();
                   },
                   error: function (response) {
                     var jsonResponse = JSON.parse(response.responseText);
                     bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                   }
                 });
                 /*FIN DE CONSUMO*/
               }else{
                   console.log(url_curso_desactivar);
               }
             }
           });
           /***/
        });

    }
}
class ControlAcademicoGrupos{
    constructor(){
        var encabezado =['Asignacion','Curso','Grupo','Sede','Nombre','Apellido','Genero'];
        var hot;
        $('#control-academico-list-form').on('submit', function (e) {
            e.preventDefault();
            $("#guardar_tabla").show();
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                dataType: 'json',
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                },
                data:$(this).serialize(),
                success: function (response) {
                  $('#guardar_tabla').show();
                  bootbox.alert({message: "<h2>"+"Exito"+"</h2>", className:"modal modal-success fade in"});
                  for(var k=0;k<=response[0].asistencia.length-1;k++){
                      encabezado.push("Asistencia "+Number(k+1));
                  };
                  for(var j=0;j<=response[0].trabajos.length-1;j++){
                      encabezado.push(response[0].trabajos[j].cr_hito__nombre);
                };
                encabezado.push("Final");
                var matris = [];
                var matris2 =[];
                var nota_asitencia =0;
                var nota_trabajos =0;
                var resultado_final=0;
                for (var l=0; l<=response.length-1;l++){
                     matris.push(response[l].asignacion);
                     matris.push(response[l].curso);
                     matris.push(response[l].grupo);
                     matris.push(response[l].sede);
                     matris.push(response[l].nombre);
                     matris.push(response[l].apellido);
                     matris.push(response[l].genero);
                     for(var asi = 0; asi<=response[l].asistencia.length-1;asi++){
                        matris.push(response[l].asistencia[asi].nota);
                        nota_asitencia=nota_asitencia + response[l].asistencia[asi].nota;
                     }
                     for (var work = 0; work<response[l].trabajos.length;work++){
                        matris.push(response[l].trabajos[work].nota);
                        nota_trabajos=nota_trabajos + response[l].trabajos[work].nota;
                     }

                     resultado_final = (nota_asitencia + nota_trabajos)/(Number(response[l].asistencia.length + response[l].trabajos.length));
                     matris.push(resultado_final);
                     matris2.push(matris);
                     matris=[]
                     nota_asitencia=0;
                     nota_trabajos=0;

                }
                   /** */
          var container = document.getElementById('datosCurso');
            hot = new Handsontable(container, {
            data: matris2,
            columnSorting: true,
            rowHeaders: true,
            colHeaders: encabezado,
            filters: true,
            dropdownMenu: true,
            startCols: encabezado.length,
            removeRowPlugin: true,
            persistentState: true,
            afterSelection: afterSelection,
            cells: function (row, col, prop) {
                var cellProperties = {};
                if (col < 6) {
                    cellProperties.readOnly = true;
                }
                if(col == encabezado.length-1){
                    cellProperties.readOnly = true;
                }
                return cellProperties;
            }
          });
          hot.getPlugin('columnSorting').sort({column:0, sortOrder:'asc'});
          function afterSelection(rowId,colId, rowEndId, colEndId){
             var nuevaNota=0;
            var actualizarNotas= hot.getSourceDataAtRow(rowId);
            for(var k =3; k<=actualizarNotas.length-2;k++ ){
                nuevaNota = nuevaNota + Number(actualizarNotas[k])
            };
            hot.setDataAtCell(rowId,actualizarNotas.length-1,nuevaNota);
          };

        /** */
                },
                error: function (response) {
                  var jsonResponse = JSON.parse(response.responseText);
                  bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                }
              });
              encabezado =['Asignacion','Curso','Grupo','Sede','Nombre','Apellido','Genero'];
              hot.destroy();
        });


        /** */
        $("#guardar_tabla").click(function() {
            var  jsonObj = [];
            for(var k=0; k<=hot.getData.length-1;k++){
                var  prueba = {};
                for(var l=0;l<=hot.getData()[k].length-1;l++){
                    prueba[encabezado[l]] = hot.getData()[k][l];
                }
                jsonObj.push(prueba);
            };
            var data_send=JSON.stringify(jsonObj);
            $.ajax({
                type: 'POST',
                url: $('#datosCurso').data('url'),
                dataType: 'json',
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                },
                data:{datos:data_send},
                success: function (response) {

                  bootbox.alert({message: "<h2>"+"Exito"+"</h2>", className:"modal modal-success fade in"});
                },
                error: function (response) {
                  var jsonResponse = JSON.parse(response.responseText);
                  bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                }
              });


         });
        /** */


    };




}

class informeControlAcademico{
    constructor(){
        var tablaDispositivos;
        var contador =0;
        var asistencia = {};
        var tareas={};

        $('#controlacademico-list-form').submit(function (e) {
            e.preventDefault();
            var columnas = [
                {data: "numero",},
                {data: "nombre", className: "nowrap"},
                {data: "apellido", className: "nowrap"},
                {data: "dpi", className: "nowrap"},
                {data: "genero", className: "nowrap"},
                {data: "udi", className: "nowrap"},
                {data: "curso", className: "nowrap"},
                {data: "grupo", className: "nowrap", },

                ];
            //tablaDispositivos.destroy();
            //$("#controlacademico-table-search>thead>tr").remove();
            $.ajax({
                type: 'POST',
                url: $('#controlacademico-list-form').attr('action'),
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                },
                data:$('#controlacademico-list-form').serializeObject(true)
                ,
                success: function (response) {


                    //$("#controlacademico-table-search>thead>tr").append("<th>Asistencia" +1+"</th>");
                  for (var a = 1; a<=response[0].asistencia.length;a++){
                      $("#controlacademico-table-search>thead>tr").append("<th>Asistencia" +a+"</th>");
                      asistencia ={data:"asistencia."+String(a-1)+".nota"};
                      columnas.push(asistencia);
                  }
                  for (var b = 0; b<=response[0].trabajos.length-1;b++){
                    $("#controlacademico-table-search>thead>tr").append("<th>"+response[0].trabajos[b].cr_hito__nombre+"</th>");
                    tareas ={data:"trabajos."+b+".nota"};
                    columnas.push(tareas);
                }
                 /**/
             tablaDispositivos = $('#controlacademico-table-search').DataTable({
                dom: 'lfrtipB',
                destroy:true,
                buttons: ['excel', 'pdf'],
                processing: true,
                deferLoading: [0],
                ajax: {
                    type: 'POST',
                    url: $('#controlacademico-list-form').attr('action'),
                    deferRender: true,
                    dataSrc: '',
                    cache: true,
                    data: function (data,params) {
                        return $('#controlacademico-list-form').serializeObject(true);
                    }

                },
                columns: columnas
              });
             /**/

                },
                error: function (response) {
                  var jsonResponse = JSON.parse(response.responseText);
                  bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                }
              });



        });

        $('#id_curso').on('change', function () {
            contador = contador +1;
         if (contador>1){
           $("#controlacademico-table-search  thead th:eq(08)").remove();
           $("#controlacademico-table-search  thead th:eq(09)").remove();
            $("#controlacademico-table-search  thead th:eq(10)").remove();
            $("#controlacademico-table-search  thead th:eq(11)").remove();
            $("#controlacademico-table-search  thead th:eq(12)").remove();
            $("#controlacademico-table-search  thead th:eq(08)").remove();
            $("#controlacademico-table-search  thead th:eq(09)").remove();
            $("#controlacademico-table-search  thead th:eq(10)").remove();
            $("#controlacademico-table-search  thead th:eq(11)").remove();
            $("#controlacademico-table-search  thead th:eq(12)").remove();
            $("#controlacademico-table-search  thead th:eq(08)").remove();
            $("#controlacademico-table-search  thead th:eq(09)").remove();
            $("#controlacademico-table-search  thead th:eq(08)").remove();
            tablaDispositivos.clear().draw();
         };

        });
        //efecto casaca de grupos
        $('#controlacademico-list-form #id_curso').on('change', function () {
            listar_sede_cursos('#controlacademico-list-form #id_curso', '#controlacademico-list-form #id_sede');
        });
        $('#controlacademico-list-form #id_sede').on('change', function () {
            listar_grupos_sede('#controlacademico-list-form #id_sede', '#controlacademico-list-form #id_grupo');
        });

    }

}

class informeAsistencia{
    constructor(){
        var tablaDispositivos;
        var asistencia = {};
        var hora_inicio ={};
        var hora_fin ={}
        var fecha ={}
        var inasistencia={}
        var columnas = [
            {data: "grupo",},
            ];
        var label_grafica=[];
        var data_grafica=[];
        var data_inside_grafica=[];
        var datos=[]
        //iniciar efecto casacada
        $('#informeasistencia-list-form #id_sede').on('change', function () {
            listar_curso_sede('#informeasistencia-list-form #id_sede', '#informeasistencia-list-form #id_curso');
        });
        $('#informeasistencia-list-form #id_curso').on('change', function () {
            listar_grupo_cursos('#informeasistencia-list-form #id_curso', '#informeasistencia-list-form #id_grupo');
        });
        //fin inicio cascada

        $('#informeasistencia-list-form').submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: $('#informeasistencia-list-form').attr('action'),
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
                },
                data:$('#informeasistencia-list-form').serializeObject(true)
                ,
                success: function (response) {
                      for (var a = 1; a<= response[0].cantidad_asistencia;a++){
                      $("#asistencia-table-search>thead>tr").append("<th>Asistencia " +a+"</th>");
                      $("#asistencia-table-search>tfoot>tr").append("<th>Total:</th>");
                      asistencia ={data:"asistencia"+a,render: function(data, type, full, meta,row){
                          var nuevo = "full.fecha_asistencia"+meta.col;
                        return "<span class='label label-info'>Asistencia  </span>"+ data +"<br> <span class='label label-primary'>Fecha</span> "+eval("full.fecha_asistencia"+meta.col)+" "+"<br> <span class='label label-success'>Hora de inicio</span> "+eval("full.hora_inicio_asistencia"+meta.col)+" "+"<br> <span class='label label-warning'>Hora de Finalizacion</span> "+eval("full.hora_fin_asistencia"+meta.col);
                    }  };
                      columnas.push(asistencia);
                  };
                 /**/
             tablaDispositivos = $('#asistencia-table-search').DataTable({
                dom: 'lfrtipB',
                destroy:true,
                buttons: ['excel', 'pdf'],
                processing: true,
                deferLoading: [0],
                ajax: {
                    type: 'POST',
                    url: $('#informeasistencia-list-form').attr('action'),
                    deferRender: true,
                    dataSrc: '',
                    cache: true,
                    data: function (data,params) {
                        return $('#informeasistencia-list-form').serializeObject(true);
                    }

                },
                columns: columnas,
                "footerCallback": function(tfoot, data, start, end, display){


                    //print(numero);
                }
              });
             /**/
             /** Grafica*/

            for(var c=0;c<=response.length -1;c++){
                for(var k=1;k<=response[0].cantidad_asistencia;k++){
                    datos.push(eval("response[c].asistencia"+k));
                }
                data_grafica={
                    data:datos,
                    label:"Grupo"+(c+1),
                    borderColor:'#'+(Math.random()*0xFFFFFF<<0).toString(16),
                    fill:false,
                }
                data_inside_grafica.push(data_grafica);
                datos=[];
            };
            for(var b = 1;b<= response[0].cantidad_asistencia;b++){
                label_grafica.push("Asistencia"+b);
            };

            new Chart(document.getElementById("datosNuevos"), {
                type: 'line',
                data: {
                  labels:  label_grafica,
                  datasets:data_inside_grafica
                },
                options: {
                  title: {
                    display: true,
                    text: 'Tendencias de asistencias'
                  }
                }
              });



            /**grafica */

                },
                error: function (response) {
                  var jsonResponse = JSON.parse(response.responseText);
                  bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + jsonResponse["mensaje"], className:"modal modal-danger fade"});
                }
              });
        });


    }

}
class informeFinal{
  constructor(){
    $('#informefinal-list-form #id_sede').on('change', function () {
        listar_curso_sede('#informefinal-list-form #id_sede', '#informefinal-list-form #id_curso');
    });

    $('#informefinal-list-form').submit(function (e) {
        e.preventDefault();
         tablaDispositivos = $('#informefinal-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'POST',
                url: $('#informefinal-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function (data,params) {
                    return $('#informefinal-list-form').serializeObject(true);
                }

            },
            columns:[
                {data: "capacitador"},
                {data: "sede"},
                {data: "curso"},
                {data: "total_maestro"},
                {data: "total_hombre"},
                {data: "total_mujeres"},
                {data: "maestros_aprobados"},
                {data: "maestros_reprobados"},
                {data: "maestros_desertores"},
            ],
          });

          });

  }
}

class informeCapacitadores{
  constructor(){
    var total_grupos=0;
    var total_cursos=0;
    var total_asignaciones=0;
    var total_participantes=0;
    $('#informecapacitadores-list-form').submit(function (e) {
        e.preventDefault();
         tablaDispositivos = $('#informecapacitadores-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'POST',
                url: $('#informecapacitadores-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function (data,params) {
                    return $('#informecapacitadores-list-form').serializeObject(true);
                }

            },
            columns:[
                {data: "numero"},
                {data: "sede"},
                {data: "grupos"},
                {data: "curso"},
                {data: "asignaciones"},
                {data: "participantes"},
                {data: "invitada"},
            ],
            footerCallback: function( tfoot, data, start, end, display){
                for (var i in data){
                  total_grupos=total_grupos+data[i].grupos
                  total_cursos=total_cursos+data[i].curso
                  total_asignaciones=total_asignaciones+data[i].asignaciones
                  total_participantes=total_participantes+data[i].participantes
                  $(tfoot).find('th').eq(0).html( "TOTAL ");
                  $(tfoot).find('th').eq(1).html( "---");
                  $(tfoot).find('th').eq(2).html(total_grupos);
                  $(tfoot).find('th').eq(3).html(total_cursos);
                  $(tfoot).find('th').eq(4).html(total_asignaciones);
                  $(tfoot).find('th').eq(5).html(total_participantes);
                };
              }
          });

          });

  }
}
class informeEscuela{
  constructor(){
    var contador =0;
    var cantidad_hombres=0;
    var cantidad_mujeres=0;
    $('#informescuela-list-form').submit(function (e) {
        e.preventDefault();
         var tablaDispositivos = $('#informescuela-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'GET',
                url: $('#informescuela-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function (data,params) {
                          return $('#informescuela-list-form').serializeObject(true);
                }

            },
            columns:[
                {data: "id",render: function(data, type , full, meta){
                    contador = contador +1;
                    return "<a href="+full.url+">"+contador+"</a>";
                }},
                {data: "nombre"},
                {data: "apellido"},
                {data: "genero",render: function(data, type , full, meta){
                    if(full.genero==1){

                      return "Masculino";
                    }else{

                      return "Femenino";
                    }
                }},
            ],
            headerCallback:function (thead, data, start, end, display ){
              for(var i in data){
                console.log(data[i].escuela.nombre);
                $("#titulo_escuela").html(data[i].escuela.nombre);
                if(data[i].genero==1){
                    cantidad_hombres=cantidad_hombres+1;
                }else{
                  cantidad_mujeres=cantidad_mujeres+1;
                }
                $(thead).find('th').eq(0).html("CANTIDAD TOTAL :"+ (cantidad_hombres+cantidad_mujeres));
                $(thead).find('th').eq(1).html("HOMBRES :" + cantidad_hombres);
                $(thead).find('th').eq(2).html("MUJERES : " +cantidad_mujeres);

              };

            },

          });

          });

  }
}

class informeGrupo{
  constructor(){
    $('#informegrupos-list-form #id_sede').on('change', function () {
        listar_curso_sede('#informegrupos-list-form #id_sede', '#informegrupos-list-form #id_curso');
    });
    $('#informegrupos-list-form #id_curso').on('change', function () {
        listar_grupo_cursos('#informegrupos-list-form #id_curso', '#informegrupos-list-form #id_grupo');
    });
    $('#informegrupos-list-form').submit(function (e) {
        e.preventDefault();
         var tablaDispositivos = $('#informegrupo-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'POST',
                url: $('#informegrupos-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function (data,params) {
                    return $('#informegrupos-list-form').serializeObject(true);
                }

            },
            columns:[
                {data: "Numero",render: function(data, type , full, meta){
                    return "<a target='_blank' href="+full.url+">"+data+"</a>";
                }},
                {data: "Nombre"},
                {data: "Apellido"},
                {data: "Id"},
                {data: "Genero"},
                {data: "Correo"},
                {data: "Escuela"},
                {data: "Udi"},
                {data: "Etnia"},
                {data: "Curso"},
                {data: "Grupo"},
                {data: "Telefono"},
                {data: "Escolaridad"},
            ],
          });

          });

  }
}

class informeAsistenciaPeriodos{
  constructor(){
    //efecto cascada
   $('#informeasistenciaperiodo-list-form #id_sede').on('change', function () {
        listar_grupos_sede('#informeasistenciaperiodo-list-form #id_sede', '#informeasistenciaperiodo-list-form #id_grupo');

    });
    $('#informeasistenciaperiodo-list-form #id_grupo').on('change', function () {
         listar_asistencias('#informeasistenciaperiodo-list-form #id_sede','#informeasistenciaperiodo-list-form #id_grupo', '#informeasistenciaperiodo-list-form #id_asistencia');

     });
    //fin cascad`
    $('#informeasistenciaperiodo-list-form').submit(function (e) {
        e.preventDefault();
         var tablaDispositivos = $('#informeasistenciaperiodo-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'POST',
                url: $('#informeasistenciaperiodo-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function (data,params) {
                    return $('#informeasistenciaperiodo-list-form').serializeObject(true);
                }

            },
            columns:[
                {data: "Numero",render: function(data, type , full, meta){
                    return "<a target='_blank' href="+full.url+">"+data+"</a>";
                }},
                {data: "Nombre"},
                {data: "Apellido"},
                {data: "Escuela"},

            ],
          });

          });

  }
}

class informeEscuelaSede{
  constructor(){
    var total_hombres=0;
    var total_mujeres=0;
    var total_participantes=0;
    $('#informescuelasede-list-form').submit(function (e) {
        e.preventDefault();
         var tablaDispositivos = $('#informescuelasede-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'POST',
                url: $('#informescuelasede-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function (data,params) {
                    return $('#informescuelasede-list-form').serializeObject(true);
                }

            },
            columns:[
                {data: "Numero",render: function(data, type , full, meta){
                    return "<a target='_blank' href="+full.Url+">"+data+"</a>";
                }},
                {data: "Escuela"},
                {data: "Udi"},
                {data: "Hombres"},
                {data: "Mujeres"},
                {data: "Total"},

            ],
            footerCallback: function( tfoot, data, start, end, display){
                for (var i in data){
                  total_hombres=total_hombres+data[i].Hombres;
                  total_mujeres=total_mujeres+data[i].Mujeres;
                  total_participantes=total_participantes+data[i].Total;
                  $(tfoot).find('th').eq(0).html( "TOTAL ");
                  $(tfoot).find('th').eq(1).html(data.length);
                  $(tfoot).find('th').eq(2).html( "---");
                  $(tfoot).find('th').eq(3).html(total_hombres);
                  $(tfoot).find('th').eq(4).html(total_mujeres);
                  $(tfoot).find('th').eq(5).html(total_participantes);
                };
              }
          });

          });

  }
}
class informeListadoEscuela{
  constructor(){
    var total_hombres=0;
    var total_mujeres=0;
    var total_participantes=0;
    $('#informelistadoescuela-list-form #id_sede').on('change', function () {
         listar_grupos_sede('#informelistadoescuela-list-form #id_sede', '#informelistadoescuela-list-form #id_grupo');
         //console.log("ingreso");
     });
     $('#informelistadoescuela-list-form #id_grupo').on('change', function () {
          listar_asistencias('#informelistadoescuela-list-form #id_sede','#informelistadoescuela-list-form #id_grupo', '#informelistadoescuela-list-form #id_asistencia');

      });
      $('#informelistadoescuela-list-form').submit(function (e) {
              e.preventDefault();
           var tablaDispositivos = $('#informealistadoescuela-table-search').DataTable({
                dom: 'lfrtipB',
                destroy:true,
                buttons: ['excel', 'pdf'],
                processing: true,
                deferLoading: [0],
                ajax: {
                    type: 'POST',
                    url: $('#informelistadoescuela-list-form').attr('action'),
                    deferRender: true,
                    dataSrc: '',
                    cache: true,
                    data: function () {
                        return $('#informelistadoescuela-list-form').serializeObject();
                    }

                },
                columns:[
                    {data: "Numero",render: function(data, type , full, meta){
                        return "<a target='_blank' href="+full.Url+">"+data+"</a>";
                    }},
                    {data: "Escuela"},
                    {data: "Nombre"},
                    {data: "Apellido"},

                ]

              });

            });
      //  $('#informescuelalistado-list-form').submit(function (e) {
  /*  $('#informelistadoescuela-list-form').submit(function (e) {
          e.preventDefault();
          console.log( $('#informelistadoescuela-list-form').attr('action'));
          console.log( $('#informelistadoescuela-list-form').serializeObject());
       var tablaDispositivos = $('#informealistadoescuela-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'POST',
                url: $('#informelistadoescuela-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function () {
                    return $('#informelistadoescuela-list-form').serializeObject();
                }

            },
            columns:[
                {data: "Numero",render: function(data, type , full, meta){
                  console.log(data);
                    return "<a target='_blank' href="+full.Url+">"+data+"</a>";
                }},
                {data: "Escuela"},
                {data: "Udi"},
                {data: "Hombres"},
                {data: "Mujeres"},
                {data: "Total"},

            ],
            footerCallback: function( tfoot, data, start, end, display){
                for (var i in data){
                  total_hombres=total_hombres+data[i].Hombres;
                  total_mujeres=total_mujeres+data[i].Mujeres;
                  total_participantes=total_participantes+data[i].Total;
                  $(tfoot).find('th').eq(0).html( "TOTAL ");
                  $(tfoot).find('th').eq(1).html(data.length);
                  $(tfoot).find('th').eq(2).html( "---");
                  $(tfoot).find('th').eq(3).html(total_hombres);
                  $(tfoot).find('th').eq(4).html(total_mujeres);
                  $(tfoot).find('th').eq(5).html(total_participantes);
                };
              }
          });

        });*/

  }
}
class asistenciaWeb{
  constructor(){
    var urlAsignarAsignacion=$('#asistencia-web-table-search').data("urlasignar");
    //iniciar efecto casacada
    $('#asistencia-web-list-form #id_sede').on('change', function () {
        listar_curso_sede('#asistencia-web-list-form #id_sede', '#asistencia-web-list-form #id_curso');
    });
    $('#asistencia-web-list-form #id_curso').on('change', function () {
        listar_grupo_cursos('#asistencia-web-list-form #id_curso', '#asistencia-web-list-form #id_grupo');
    });
    $('#asistencia-web-list-form #id_grupo').on('change', function () {
         listar_asistencias('#asistencia-web-list-form #id_sede','#asistencia-web-list-form #id_grupo', '#asistencia-web-list-form  #id_asistencia');

     });
    //fin inicio cascada
    $('#asistencia-web-list-form').submit(function (e) {
        e.preventDefault();

        var tablaDispositivos = $('#asistencia-web-table-search').DataTable({
            dom: 'lfrtipB',
            destroy:true,
            buttons: ['excel', 'pdf'],
            processing: true,
            deferLoading: [0],
            ajax: {
                type: 'POST',
                url: $('#asistencia-web-list-form').attr('action'),
                deferRender: true,
                dataSrc: '',
                cache: true,
                data: function (data,params) {
                    return $('#asistencia-web-list-form').serializeObject(true);
                }

            },
            columns:[
                {data: "Numero"},
                {data: "Maestro"},
                {data: "Asistencia",render: function(data, type , full, meta){
                    if(full.Asistencia !=0){
                      return "<input checked type="+" checkbox" +" id="+" asistencia" +" name="+" vehicle"+full.Numero+">";
                    }else{
                      return "<input type="+" checkbox" +" id="+" asistencia" +" name="+" vehicle"+full.Numero+">";
                    }

                }},
            ],
            footerCallback: function( tfoot, data, start, end, display){
              }
          });
          /*Aprobar Dispositivo de desecho*/
          tablaDispositivos.on('click', '#asistencia', function () {
                  let data_fila = tablaDispositivos.row($(this).parents('tr')).data();
                  $.ajax({
                    type: "POST",
                    url: urlAsignarAsignacion,
                    dataType: 'json',
                    data: {
                      csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
                      datos:data_fila
                    },
                    success: function (response) {
                      bootbox.alert({message: "<h3><i class='fa fa-smile-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;COMPLETO</h3></br>", className:"modal modal-success fade"});
                      tablaDispositivos.ajax.reload();

                    },
                    error: function (response) {
                      var mensaje = JSON.parse(response.responseText)
                      bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + mensaje['mensaje'], className:"modal modal-danger fade"});
                    }
                });

                // tablaDispositivos.ajax.reload();
              });
              /**/
          });

  }
}
class crearGrupos{
  constructor(){
    $('#grupo-add-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url:$('#grupo-add-form').attr('action'),
          dataType: 'json',
          data:$('#grupo-add-form').serializeObject(true),
          success: function (response) {
            bootbox.alert({message: "<h3><i class='fa fa-smile-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;COMPLETO</h3></br>", className:"modal modal-success fade"});
            location.href = '/cyd/grupo/list/';
          },
          error: function (response) {
            var mensaje = JSON.parse(response.responseText)
            bootbox.alert({message: "<h3><i class='fa fa-frown-o' style='font-size: 45px;'></i>&nbsp;&nbsp;&nbsp;HA OCURRIDO UN ERROR!!</h3></br>" + mensaje['mensaje'], className:"modal modal-danger fade"});
          }
      });

    });

  }
}

class AsignacionGruposWeb{
  constructor(){
      var encabezado =['Nombre','Apellido','Genero','DPI','Rol','Mail','Telefono','Udi'];
      var hot;
      //efecto cascada
     $('#control-academico-list-form #id_sede').on('change', function () {
          listar_grupos_sede('#control-academico-list-form #id_sede', '#control-academico-list-form #id_grupo');

      });
      //fin cascad`
 $('#control-academico-list-form').on('submit', function (e) {
   e.preventDefault();

    var container = document.getElementById('datosCurso');
      hot = new Handsontable(container, {
      data: [{
    Nombre: 1,
    Apellido: 'EUR',
    Genero: 'EUR',
    DPI: 'Euro',
    Rol: 0.9033,
    Mail: 'EUR / USD',
    Telefono: '08/19/2019',
    Udi: 0.0026
  },],
      columnSorting: true,
      rowHeaders: true,
      colHeaders: encabezado,
      filters: true,
      dropdownMenu: true,
      startCols: encabezado.length,
      removeRowPlugin: true,
      persistentState: true,
      afterSelection: afterSelection,
      cells: function (row, col, prop) {
          var cellProperties = {};
          if (col < 6) {
              cellProperties.readOnly = true;
          }
          if(col == encabezado.length-1){
              cellProperties.readOnly = true;
          }
          return cellProperties;
      }
    });
    hot.getPlugin('columnSorting').sort({column:0, sortOrder:'asc'});
    function afterSelection(rowId,colId, rowEndId, colEndId){
       var nuevaNota=0;
      var actualizarNotas= hot.getSourceDataAtRow(rowId);
      for(var k =3; k<=actualizarNotas.length-2;k++ ){
          nuevaNota = nuevaNota + Number(actualizarNotas[k])
      };
      hot.setDataAtCell(rowId,actualizarNotas.length-1,nuevaNota);
    };
$('#guardar_tabla').show();
  /** */
});
  }
}

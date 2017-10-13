(function( PerfilEscuela, $, undefined ) {
    var crear_comentario = function (url, id_validacion, comentario) {
        var data = {
            "id_validacion": id_validacion,
            "comentario": comentario
        }
        $.post(url, JSON.stringify(data)).then(function (response) {
            var fecha = new Date(response.fecha);
            var td_data = $('<td></td>').text(fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear() + ", " + response.usuario);
            var td = $('<td></td>').text(response.comentario);
            var tr = $('<tr></tr>').append(td).append(td_data);
            $('#body-validacion-' + id_validacion).append(tr);
        }, function (response) {
            alert("Error al crear datos");
        });
    }

    var crear_monitoreo = function (url, comentario, equipamiento) {
        var data = {
            "comentario": comentario,
            "equipamiento": equipamiento
        }
        $.ajax({
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", $('input[name="csrfmiddlewaretoken"]').val());
            },
            url: url,
            data: data,
            type: 'post',
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta);
                var fecha = new Date(respuesta.fecha);
                var fecha_text = fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
                var btn = '<a href="'+respuesta.url+'" class="btn btn-xs btn-warning pull-right"><i class="fa fa-external-link p"></i></a>';
                var td_fecha = $('<td></td>').html(fecha_text+btn);
                var td_usuario = $('<td></td>').text(respuesta.creado_por);
                var td = $('<td></td>').text(respuesta.comentario);
                var tr = $('<tr></tr>').append(td).append(td_usuario).append(td_fecha);
                $('#body-monitoreo-' + respuesta.equipamiento).append(tr);
            }
        });
    }

    // Public
    PerfilEscuela.init = function () {
        $('#form-nueva-solicitud').hide();
        $('#form-nuevo-equipamiento').hide();
        $('#form-nueva-validacion').hide();
        $('#form-nueva-visita-kalite').hide();
        $('.comentario-btn').click(function () {
            var id_validacion = $(this).data('id');
            var url = $(this).data('url');
            bootbox.prompt({
                title: "Nuevo registro",
                inputType: 'textarea',
                callback: function (result) {
                    if (result) {
                        crear_comentario(url, id_validacion, result);
                    }
                    console.log(result + id_validacion);
                }
            });
        });

        $('.monitoreo-form').submit(function (e) {
            e.preventDefault();
            var url = $(this).prop('action');
            var equipamiento = $(this).data('equipamiento');
            bootbox.prompt({
                title: "Nuevo registro de monitoreo",
                inputType: 'textarea',
                callback: function (comentario) {
                    if (comentario) {
                        crear_monitoreo(url, comentario, equipamiento);
                    }
                }
            });
        })
    }   
}( window.PerfilEscuela = window.PerfilEscuela || {}, jQuery ));

(function( EscuelaBuscar, $, undefined ) {
    var tablaHabilitada = false;
    var tabla = $('#escuela-table').DataTable({
        dom: 'lfrtipB',
        buttons: ['excel','pdf'],
        processing: true,
        deferLoading: 0,
        ajax: {
            url: $('#escuela-list-form').attr('action'),
            type: "POST",
            deferRender: true,
            dataSrc: '',
            data: function () {
                return $('#escuela-list-form').serializeObject();
            }
        },
        preDrawCallback: function () {
            return tablaHabilitada;
        },
        columns: [
        {"data": "codigo"},
        {
            data: "nombre",
            render: function ( data, type, full, meta ) {
                return '<a href="' + full.escuela_url + '">' + data + '</a>';
            }
        },
        {"data": "direccion"},
        {"data": "departamento"},
        {"data": "municipio"},
        {"data": "sector"},
        {"data": "nivel"},
        {"data": "poblacion"},
        {
            data: "equipada",
            render: function (data) {
                return data ? 'Sí' : 'No';
            }
        },
        ]
    }).on('xhr.dt', function (e, settings, json, xhr) {
        $('#spinner').hide();
    });
    var filtro_list = [];

    // Public
    EscuelaBuscar.init = function () {
        $('#spinner').hide();
        $('#escuela-list-form').submit(function (e) {
            e.preventDefault();

            filtro_list = [];
            tabla.clear().draw();
            $('#spinner').show();
            $('#lista-filtros').empty();

            $("#escuela-list-form :input").not(':submit,:button,:hidden').each(function() {
                if($(this).val() != ""){
                    filtro_list.push($("label[for='"+$(this).attr('id')+"']").text());
                }
            });
            
            if (filtro_list.length > 0) {
                tablaHabilitada = true;
                $('#filtros-collapse').hide();
                $('#spinner').show();
                tabla.clear().draw();
                tabla.ajax.reload();
            }
            else{
                tablaHabilitada = false;
                $('#lista-filtros').append('<li>Seleccione al menos un filtro</li>');
                $('#filtros-collapse').show();
                $('#spinner').hide();
            }
        });
        $('#escuela-list-form #id_departamento').on('change', function () {
            listar_municipio_departamento('#escuela-list-form #id_departamento', '#escuela-list-form #id_municipio', true);
        });
    }   
}( window.EscuelaBuscar = window.EscuelaBuscar || {}, jQuery ));

(function( EscuelaContacto, $, undefined ) {
    // Public
    EscuelaContacto.init = function () {
        
    }   
}( window.EscuelaContacto = window.EscuelaContacto || {}, jQuery ));
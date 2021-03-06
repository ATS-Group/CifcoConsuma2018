//Menu movil

$('.hamburger').on('click', function(e) {
    $(this).toggleClass('is-active');
    $('.contain-menu').slideToggle('500');
});


//DataTables
$(document).ready(function() {

    var table = $('.table').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json",
        },
        "scrollX": true
    });

    /*
        //ocultar columna
        var column = $('.table').DataTable().column('1');

        column.visible(!column.visible());
    */
});


//Formulario - estilos

/**Que los estilos del select funcionen */
$(function() {
    $('.sel').each(function() {
        $(this).children('select').css('display', 'none');

        var $current = $(this);

        $(this).find('option').each(function(i) {
            if (i == 0) {
                $current.prepend($('<div>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__box')
                }));

                var placeholder = $(this).text();
                $current.prepend($('<span>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
                    text: placeholder,
                    'data-placeholder': placeholder
                }));

                return;
            }

            $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box__option'),
                text: $(this).text()
            }));
        });
    });

    $('.sel').click(function() {
        $(this).toggleClass('active');
    });

    $('.sel__box__option').click(function() {
        var txt = $(this).text();
        var index = $(this).index();

        $(this).siblings('.sel__box__option').removeClass('selected');
        $(this).addClass('selected');

        var $currentSel = $(this).closest('.sel');
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1);

        //Agregar codigo de pais segun sea el país
        var currentIndexCountry = $('.select.pais option:selected').val();
        var codPais = '';
        switch (currentIndexCountry) {
            case "1":
                codPais = "+503 ";
                break;
            case "2":
                codPais = "+502 ";
                break;
            case "3":
                codPais = "+505 ";
                break;
            case "4":
                codPais = "+504 ";
                break;
            case "5":
                codPais = "+506 ";
                break;
            case "6":
                codPais = "+507 ";
                break;
            default:
                codPais = "";
        }

        $('#form_ftel').attr("value", codPais);

    });

    /**Correcciones css */
    if ($('.select.pais option:selected').val() == 5) {
        $('span.sel__placeholder.sel__placeholderect1.pais').css("padding-right", "40px");
    }

    /**Validacion formulario */
    $('#fname_error_message').hide(); //Selecciona nombre
    $('#flname_error_message').hide(); //Selecciona apellido
    $('#ftel_error_message').hide(); //Selecciona telefono
    $('#fcountry_error_message').hide(); //selecciona pais
    $('#fcompany_error_message').hide(); //Selecciona empresa
    $('#femail_error_message').hide(); //Selecciona correo
    $('#fdocument_error_message').hide(); //Selecciona documento
    $('#fndocument_error_message').hide(); //Selecciona numero documento
    $('#fcategory_error_message').hide(); //Selecciona categoria
    $('#facces_error_message').hide(); //Selecciona tipo de acceso
    $('#fphoto_error_message').hide(); //Selecciona el subir foto

    var error_fname = false;
    var error_flname = false;
    var error_ftel = false;
    var error_fcountry = false;
    var error_fcompany = false;
    var error_fmail = false;
    var error_fdocument = false;
    var error_fndocument = false;
    var error_fphoto = false;

    //Eventos

    $('#form_fname').focusout(function() {
        check_fname();
    });
    $('#form_flname').focusout(function() {
        check_flname();
    });
    $('#form_ftel').focusout(function() {
        check_ftel();
    });
    $('.sel.pais').click(function() {
        check_fcountry();
    });
    $('#form_fcompany').focusout(function() {
        check_fcompany();
    });
    $('#form_femail').focusout(function() {
        check_femail();
    });
    $('.sel.documento').click(function() {
        check_fdocument();
    });
    $('#form_fndocument').focusout(function() {
        check_fndocument();
    });
    $('.form_fphoto').change(function() {
        check_fphoto();
    });

    //Funciones validadoras
    //Validar nombre 
    function check_fname() {
        var pattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
        var fname = $('#form_fname').val();
        if (pattern.test(fname) && fname !== '') {
            $("#fname_error_message").hide();
            $('#form_fname').css('border-bottom', '2px solid #2AAF74');
            $('#form_flname').css("margin-top", "auto");
        } else {
            $('#fname_error_message').html("Requerido. Escribe ambos nombres");
            $("#fname_error_message").show();
            $('#form_fname').css("border-bottom", "2px solid #dd3333");
            $('#form_flname').css("margin-top", "28px");
            error_fname = true;
        }
    }
    //Validar Ape   llido
    function check_flname() {
        var pattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
        var flname = $('#form_flname').val();
        if (pattern.test(flname) && flname !== '') {
            $("#flname_error_message").hide();
            $('#form_flname').css('border-bottom', '2px solid #2AAF74');
            $('#form_fname').css("margin-top", "auto");
        } else {
            $('#flname_error_message').html("Requerido. Escribe ambos apellidos");
            $("#flname_error_message").show();
            $('#form_flname').css("border-bottom", "2px solid #dd3333");
            $('#form_fname').css("margin-top", "28px");
            error_flname = true;
        }
    }
    //Validar pais
    function check_fcountry() {
        var currentIndex = $('.select.pais option:selected').val();
        if (currentIndex >= 1) {
            $("#fcountry_error_message").hide();
            $('.sel.pais').css('border-bottom', '2px solid #2AAF74');
            $('#form_ftel').css("margin-top", "auto");
        } else {
            $('#fcountry_error_message').html("Requerido. Elija su país");
            $("#fcountry_error_message").show();
            $('.sel.pais').css("border-bottom", "2px solid #dd3333");
            $('#form_ftel').css("margin-top", "28px");
            error_fcountry = true;
        }
    }
    //Validar telefono
    function check_ftel() {
        var currentIndexCountry = $('.select.pais option:selected').val();
        if (currentIndexCountry <= 6) {
            var pattern = /^([\+\d]{0,3}[\d \s]*[\d]{4}[\s]*([\d]{4}))$/;
        } else {
            var pattern = /^[0-9]{16}[-]$/;
        }

        var ftel = $('#form_ftel').val();
        if (pattern.test(ftel) && ftel !== '') {
            $("#ftel_error_message").hide();
            $('#form_ftel').css('border-bottom', '2px solid #2AAF74');
            $('.sel.pais').css("margin-top", "auto");
        } else {
            $('#ftel_error_message').html("Requerido. Formato de telefono valido");
            $("#ftel_error_message").show();
            $('#form_ftel').css("border-bottom", "2px solid #dd3333");
            $('.sel.pais').css("margin-top", "28px");
            error_ftel = true;
        }

    }

    //Validar empresa
    function check_fcompany() {
        var pattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;

        var fcompany = $('#form_fcompany').val();
        if (pattern.test(fcompany) && fcompany !== '') {
            $("#fcompany_error_message").hide();
            $('#form_fcompany').css('border-bottom', '2px solid #2AAF74');
        } else {
            $('#fcompany_error_message').html("Requerido. Ponga el nombre de la empresa");
            $("#fcompany_error_message").show();
            $('#form_fcompany').css("border-bottom", "2px solid #dd3333");
            error_fcompany = true;
        }
    }

    //Validación mail.
    function check_femail() {
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var fmail = $('#form_femail').val();
        if (pattern.test(fmail) && fmail !== '') {
            $("#femail_error_message").hide();
            $('#form_femail').css('border-bottom', '2px solid #2AAF74');
        } else {
            $('#femail_error_message').html("Requerido. Ingrese su correo electrónico");
            $("#femail_error_message").show();
            $('#form_femail').css("border-bottom", "2px solid #dd3333");
            error_fmail = true;
        }

    }

    function check_fdocument() {
        var currentIndexDocument = $('.select.document option:selected').val();
        if (currentIndexDocument >= 1) {
            $('#fdocument_error_message').hide();
            $('.sel.documento').css('border-bottom', '2px solid #2AAF74');
            $('#form_fndocument').css("margin-top", "auto");
        } else {
            $('#fdocument_error_message').html("Requerido. Elija un documento");
            $("#fdocument_error_message").show();
            $('.sel.documento').css("border-bottom", "2px solid #dd3333");
            $('#form_fndocument').css("margin-top", "28px");
            error_fdocument = true;
        }

    }

    function check_fndocument() {
        var currentIndexDocument = $('.select.document option:selected').val();
        if (currentIndexDocument == 1) {
            pattern = /^(([\d]{8}[-])*([\d]{1}))$/;
        } else {
            pattern = /^[0-9a-zA-Z]+$/;
        }

        var fndocument = $('#form_fndocument').val();
        if (pattern.test(fndocument) && fndocument !== '') {
            $("#fndocument_error_message").hide();
            $('#form_fndocument').css('border-bottom', '2px solid #2AAF74');
            $('.sel.documento').css("margin-top", "28px");
        } else {
            $('#fndocument_error_message').html("Requerido. Ingrese un número de documento valido");
            $("#fndocument_error_message").show();
            $('#form_fndocument').css("border-bottom", "2px solid #dd3333");
            $('.sel.documento').css("margin-top", "47px");
            error_fndocument = true;
        }
    }

    function check_fphoto() {
        var fphoto = $('.form_fphoto').val();

        if (fphoto !== "") {
            $("#fphoto_error_message").hide();
            $('.file-r').animate({
                backgroundColor: '#5f096c'
            }, 1500);
        } else {
            $('#fphoto_error_message').html("Requerido. Debe subir una foto. 2MB Máx.");
            $("#fphoto_error_message").show();
            $('.file-r').animate({
                backgroundColor: '#dd3333'
            }, 1500);
            error_fphoto = true;
        }
    }

    $('#form').submit(function(ev) {
        $('.nb-spinner').removeClass('hideThis');
        error_fname = false;
        error_flname = false;
        error_ftel = false;
        error_fcountry = false;
        error_fcompany = false;
        error_fmail = false;
        error_fdocument = false;
        error_fndocument = false;
        error_fphoto = false;

        check_fname();
        check_flname();
        check_ftel();
        check_fcountry();
        check_fcompany();
        check_femail();
        check_fdocument();
        check_fndocument();
        check_fphoto();

        if (error_fname == false && error_flname == false && error_ftel == false && error_fcountry == false && error_fcompany == false && error_fmail == false && error_fdocument == false && error_fndocument == false && error_fphoto == false) {
            $.ajax({
                type: $('#form').attr('method'),
                url: $('#form').attr('action'),
                data: $('#form').serialize(),
                success: function(data) {
                    $('.second-half').addClass('hideThis');
                    $('#mensaje').removeClass('hideThis');
                }
            });
            ev.preventDefault();
        } else {
            $('.nb-spinner').hide();
            $('.nb-spinner').addClass('hideThis');
            return false;
        }
    });



});
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
    var column = $('.table').DataTable().column('2');

    column.visible(!column.visible());
    */
});
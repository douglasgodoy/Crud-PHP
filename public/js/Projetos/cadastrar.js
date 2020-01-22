$('.corpo').addClass('d-flex');
$('#btnCadastrarProjeto').on('click', e => {
    e.preventDefault();
    const titulo = $('input[name="titulo"]').val();
    const techs = $('input[name="techs"]').val();
    const descricao = $('textarea[name="descricao"]').val();
    const print = $('input[name="print"]').val();
    const form = $('form').serializeArray();
    $('.dadosInc').addClass('d-none');

    if (!validaFormVazio(form, true, $('textarea[name="descricao"]'))) {
        $('.dadosInc').removeClass('d-none');
        return false;
    }

    $.ajax({
        url: Diretorio() + '/Projetos/cadastro',
        type: 'POST',
        dataType: 'JSON',
        data: {
            titulo,
            techs,
            descricao,
            print
        },
        beforeSend: function () {
        }
    }).done(function (data) {
        dispararAlerta(
            'Boa!',
            data.message,
            'green',
            'col-md-6 col-md-offset-3'
        );
        setTimeout(() => { window.location = '/crud/home/index' }, 1000);
    }).fail(function (error) {
        console.log(error);
    });
});

$('input[name="titulo"]').on('keypress', function () {
    $('#meuProjeto').html($(this).val());
});

const idProjeto = localStorage.getItem('edit');

if (idProjeto) {
    console.log('caiu');

    $('#btnEditarProjeto').removeClass('d-none');
    $('#btnCadastrarProjeto').addClass('d-none');
    let tituloOld = $('input[name="titulo"]');
    let techsOld = $('input[name="techs"]');
    let descOld = $('textarea[name="descricao"]');
    $.ajax({
        url: Diretorio() + '/Projetos/listEdit',
        type: 'POST',
        dataType: 'JSON',
        data: { id: idProjeto }
    }).done(function (data) {
        console.log(data);

        tituloOld.val(data[0].titulo);
        techsOld.val(data[0].techs);
        descOld.val(data[0].descricao);
    }).fail(function (erro) {
        console.log(erro);
    });
}

$('#btnEditarProjeto').on('click', function (e) {
    e.preventDefault();
    const img = $('input[name="print"]').val();
    const titulo = $('input[name="titulo"]').val();
    const techs = $('input[name="techs"]').val();
    const descricao = $('textarea[name="descricao"]').val();
    $.ajax({
        url: Diretorio() + '/Projetos/edit',
        type: 'POST',
        dataType: 'JSON',
        data: {
            titulo,
            techs,
            descricao,
            img,
            idProjeto
        },
    }).done(function (data) {

    }).fail(function () {

    }).always(function () {
    });
});

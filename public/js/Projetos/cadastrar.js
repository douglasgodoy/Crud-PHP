$('.corpo').addClass('d-flex');

$('#btnCadastrarProjeto').on('click', e => {
    e.preventDefault();
    $('.dadosInc').addClass('d-none');
    const form = $('form').serializeArray();

    if (!validaFormVazio(form, true, $('textarea[name="descricao"]'))) {
        $('.dadosInc').removeClass('d-none');
        return false;
    }

    cadastraProjeto();
});

$('input[name="titulo"]').on('keyup', function () {
    $('#meuProjeto').html($(this).val());
});

function insertDadosInput() {
    let tituloOld = $('input[name="titulo"]');
    let techsOld = $('input[name="techs"]');
    let descOld = $('textarea[name="descricao"]');
    $.ajax({
        url: Diretorio() + '/Projetos/listEdit',
        type: 'POST',
        dataType: 'JSON',
        data: { id: idProjeto }
    }).done(function (data) {
        tituloOld.val(data[0].titulo);
        techsOld.val(data[0].techs);
        descOld.val(data[0].descricao);
    }).fail(function (erro) {
        console.log(erro);
    });
}

function cadastraProjeto() {
    const titulo = $('input[name="titulo"]').val();
    const techs = $('input[name="techs"]').val();
    const descricao = $('textarea[name="descricao"]').val();
    const print = $('input[name="print"]').val();
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
}

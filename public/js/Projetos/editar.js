
const idProjeto = localStorage.getItem('edit');
if (idProjeto) {
    $('#btnEditarProjeto').removeClass('d-none');
    $('#btnCadastrarProjeto').addClass('d-none');
    insertDadosInput();
}

$('#btnEditarProjeto').on('click', function (e) {
    e.preventDefault();
    const form = $('form').serializeArray();

    if (!validaFormVazio(form, true, $('textarea[name="descricao"]'))) {
        $('.dadosInc').removeClass('d-none');
        return false;
    }

    EditaProjeto();
});

function EditaProjeto() {
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
        if (!data.erro) {
            dispararAlerta("Boa!", data.message, 'green');
            setTimeout(() => { window.location = '/crud/home/index'; }, 500);
        } else {
            dispararAlerta("Ops!", 'Você precisa alterar algum campo!', 'info');

        }
    }).fail(function (erro) {
        console.log(erro);
    });
}

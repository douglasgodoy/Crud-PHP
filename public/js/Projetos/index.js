localStorage.removeItem('edit');
localStorage.removeItem('delete');

$(document).ready(ajaxInicial());

function ajaxInicial() {
    $.ajax({
        url: Diretorio() + '/Projetos/listar',
        type: 'POST',
        dataType: 'JSON'
    }).done(function (proj) {
        listarProjetos(proj);
        $('#listagem').show(300);

    }).fail(function (erro) {
        console.log(erro);
    }).always(function () {
        $('a.edit').on('click', function () {
            let idProjeto = $(this).data('proj');
            localStorage.setItem('edit', idProjeto);
        });
    });
}

function listarProjetos(proj) {
    $.each(proj, (i, e) => {
        $('#listagem').append(`
            <div href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${e.titulo}</h5>
                    <small>${e.techs}</small>
                </div>
                <div class="d-flex justify-content-between align-items-end">
                    <p class="mb-1 text-break" style="max-width:38rem">${e.descricao}</p>
                    <div>
                        <a class="btn btn-info edit" href="/crud/Projetos/main/${e.idprojeto}" data-proj="${e.idprojeto}"><i class="far fa-edit"></i></a>
                        <button class="btn btn-danger delete" data-proj="${e.idprojeto}"><i class="fas fa-trash text-white"></i></button>
                    </div>
                </div>
            </div>
        `);
    });
}

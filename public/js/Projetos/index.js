localStorage.removeItem('edit');
localStorage.removeItem('delete');
$.ajax({
    url: Diretorio() + '/Projetos/listar',
    type: 'POST',
    dataType: 'JSON',

}).done(function (proj) {
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
                        <a class="btn btn-danger delete" data-proj="${e.idprojeto}"><i class="fas fa-trash"></i></a>
                    </div>
                </div>
            </div>
        `);
    });
}).fail(function (erro) {
    console.log(erro);
}).always(function () {
    $('a.edit').on('click', function () {
        let idProjeto = $(this).data('proj');
        console.log(idProjeto);
        localStorage.setItem('edit', idProjeto)
    });

})


$(document).on('click', 'button.delete', function () {
    deletarProjeto($(this));
});

function deletarProjeto(button) {
    const idProjeto = button.data('proj');
    $.ajax({
        url: Diretorio() + '/home/deletarProjeto',
        type: 'POST',
        dataType: 'JSON',
        data: { idProjeto },
    }).done(function (data) {
        const divCont = $('#listagem');
        divCont.hide(300, () => {
            divCont.attr('style', 'display:none');
            divCont.html('');
            ajaxInicial();
        });
    }).fail(function (erro) {
        console.log(erro);
    });
}

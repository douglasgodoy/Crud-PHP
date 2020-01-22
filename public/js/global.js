function Diretorio() {
    return $('footer').data("dir");
}

function dispararAlerta(titulo = '..', conteudo = '..', cor = 'dark', column = 'small') {
    $.confirm({
        // animation: 'scaleY',
        // closeAnimation: 'zoom',
        title: titulo,
        content: conteudo,
        type: cor,
        typeAnimated: true,
        columnClass: column,
        backgroundDismiss: true,
        draggable: true,
        buttons: {
            tryAgain: {
                text: 'Fechar',
                btnClass: 'btn-' + cor,
            },
        },
    });
}

function validaFormVazio(form, temSelect = false, select) {
    let erros = 0;
    if (temSelect) {
        if (select.prop('required')) {
            !select.val() ?
                (
                    select.addClass('is-invalid'),
                    select.removeClass('is-valid'),
                    erros++
                ) : (
                    select.removeClass('is-invalid'),
                    select.addClass('is-valid')
                );
        }
    }

    $.each(form, (i, val) => {
        const input = $(`input[name="${val.name}"]`);

        if (input.prop('required') && !input.val()) {
            input.addClass('is-invalid');
            erros++;
        } else {
            input.removeClass('is-invalid');
            !$('#cadastrar').hasClass('active') ?
                input.not($('#cadastrar input, #cadastrar select'))
                    .addClass('is-valid') :
                input.addClass('is-valid');
        }
    });
    return erros > 0 ? false : true;
}
$('#logoff').on('click', function () {
    $.ajax({
        url: Diretorio() + '/Login/logoff',
        type: 'POST',
        beforeSend: function () {
        }
    }).done(function (data) {
        setTimeout(() => { window.location = '/crud'; }, 300);
    }).fail(function () {
        console.log('algo deu errado, tente novamente!');
    }).always(function () {
    });
});

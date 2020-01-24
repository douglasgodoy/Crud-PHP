
$(document).on('click', '#btnCadastrar', function (e) {
    e.preventDefault();
    const email = $('input[name="email"]').val();
    const senha = $('input[name="password"]').val();
    const genero = $('select[name="genero"]').val();
    const github = $('input[name="githubUsername"]').val();
    const dtNasc = $('input[name="dtNasc"]').val();
    const form = $('form').serializeArray();
    const gen = $('#sexo');
    const url = Diretorio() + '/Cadastro/cadastrarUsuario';

    if (!validaFormVazio(form, true, gen)) return false;

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'JSON',
        data: {
            email: email,
            password: senha,
            dtNasc: dtNasc,
            sexo: genero,
            githubUsername: github
        },
        beforeSend: function () {
            $('.spinner').removeClass('d-none');
        }
    }).done(function (data) {
        $('.spinner').addClass('d-none');

        if (!data.erro) {
            $('#novoCadastro').trigger('click');
            $('#login').trigger('click');
        } else {
            dispararAlerta(
                `Ops..`,
                `${data.message}`,
                'red', 'col-md-6 col-md-offset-3'
            );
            $('#novoCadastro').trigger('click');
        }
    }).fail(function (error) {
        $('.spinner').addClass('d-none');
        console.log(error);
    });

    $('form *').hasClass('is-invalid') ?
        $('.dadosInc').removeClass('d-none') :
        $('.dadosInc').addClass('d-none');
});

$('#senhaConf, #senha').on('blur', function () {
    $('div.password span').addClass('d-none');
    const inputs = $('input[type="password"]');
    const validaInputVazio = inputs.serializeArray().find(input => input.value === '');

    const validaSenhaDif = validaInputVazio === undefined &&
        $(this).val() !== inputs.not($(this)).val();

    if (validaSenhaDif) {
        $('div.password span').removeClass('d-none');
        return false;
    }
});

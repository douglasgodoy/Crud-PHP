
btnCad.on('click', function (e) {
    e.preventDefault();
    const email = $('input[name="email"]').val();
    const senha = $('input[name="password"]').val();
    const genero = $('select[name="genero"]').val();
    const github = $('input[name="githubUsername"]').val();
    const dtNasc = $('input[name="dtNasc"]').val();
    const form = $('form').serializeArray();
    const gen = $('#sexo');
    const url = Diretorio() + '/Cadastro/cadastrarUsuario';

    if (validaFormVazio(form, true, gen)) {
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
            const dados = data.dadosGit;
            const isset = (dados !== null && dados !== undefined) && dados.length > 0;

            if (!data.erro) {
                const htmlCadSucess = `
                    <div class="d-flex justify-content-between">
                        <p>Cadastro realizado com Sucesso${isset ? ',' : ''}
                            <strong class="d-block">${isset ? data.dadosGit[0] : ''}!</strong>
                        </p >
                        <img
                            class="border-radius-50"
                            src="${isset ? data.dadosGit[1] : ''}"
                            style="max-width: 72px; max-height:72px"
                        />
                    </div>
                `;

                dispararAlerta(
                    "Boa!",
                    htmlCadSucess,
                    'green',
                    'col-md-6 col-md-offset-3'
                );

                $('#novoCadastro').trigger('click');
                setTimeout(() => { window.location = 'home'; }, 1500);
            } else {
                dispararAlerta(
                    `Ops..`,
                    `${data.message}`,
                    'red', 'col-md-6 col-md-offset-3'
                );
                $('#novoCadastro').trigger('click')
            }
        }).fail(function (error) {
            $('.spinner').addClass('d-none');
            console.log(error);
        });
    };

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

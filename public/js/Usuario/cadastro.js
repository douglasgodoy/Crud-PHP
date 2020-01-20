
const btnCad = $('#btnCadastrar');
$('#novoCadastro').on('click', function () {
    const divCad = $('#cadastrar');

    divCad.fadeToggle('fast', () => {

        if (divCad.attr('style') !== "") {

            $('#login').removeClass('d-none');
            btnCad.addClass('d-none');

            $('form input, form select')
                .not($(`input[name="email"],
                         input[name="password"]`))
                .attr('required', false);

            divCad.removeClass('active');
            $('#titulo span').html('login');
        } else {

            $('#login').addClass('d-none');
            btnCad.removeClass('d-none');

            $('form input, form select')
                .not($(`input[name="email"],
                         input[name="password"],
                          input[name="githubUsername"]`))
                .attr('required', true);

            $('#titulo span').html('cadastro');
            divCad.addClass('active');
        }
    });
});

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

    if (validaFormVazio(form, gen)) {
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
            console.log(data);
            console.log(data.dadosGit);
            $('.spinner').addClass('d-none');
            const html = `
                <div class="d-flex justify-content-between">
                    <p>Cadastro realizado com Sucesso${data.dadosGit[0] ? ',' : ''}
                        <strong class="d-block">${data.dadosGit[0] ? data.dadosGit[0] : ''}!</strong>
                    </p >
                    <img class="border-radius-50" src="${data.dadosGit[1] ? data.dadosGit[1] : ''}" style="max-width: 72px; max-height:72px">
                </div>
        `;

            if (!data.erro) {
                dispararAlerta(
                    "Boa!",
                    html,
                    'green',
                    'col-md-6 col-md-offset-3'
                );
            } else {
                dispararAlerta(`Ops..${data.message}`, '', 'red');
            }
        }).fail(function (error) {
            $('.spinner').addClass('d-none');
            console.log(error);
        });
    };
});

$('#senhaConf').on('blur', function () {
    if ($(this).val() !== $('#senha').val()) {

    }
});


const btnCad = $('#btnCadastrar');
$('#novoCadastro').on('click', function () {
    const divCad = $('#cadastrar');
    divCad.fadeToggle('fast', () => {
        if (divCad.attr('style') !== "") {
            $('#login').removeClass('d-none');
            btnCad.addClass('d-none');
            $('form input, form select')
                .not($('input[name="email"], input[name="password"]'))
                .attr('required', false);
            divCad.removeClass('active');
            $('#titulo span').html('login');
        } else {
            $('#login').addClass('d-none');
            btnCad.removeClass('d-none');
            $('form input, form select')
                .not($('input[name="email"], input[name="password"], input[name="githubUsername"]'))
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
    console.log(email, senha, genero, github);


    const url = Diretorio() + '/Cadastro/cadastrarUsuario';
    let form = $('form').serializeArray();
    const gen = $('#sexo');

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
            $('.spinner').addClass('d-none');
            if (!data.erro) {
                dispararAlerta("Boa!", 'Cadastro realizado com Sucesso ' + github + '!', 'green');
            } else {
                dispararAlerta(`Ops.. ${data.message}`, '', 'red');
            }
        }).fail(function (error) {
            $('.spinner').addClass('d-none');
            console.log(error);
        });
    };
});

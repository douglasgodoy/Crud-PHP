$('#login').on('click', (e) => {
    e.preventDefault();
    const email = $('input[name="email"]').val();
    const senha = $('input[name="password"]').val();
    const login = '/Login/validateLogin';
    const url = Diretorio() + login;
    const gen = $('#sexo');
    let form = $('form').serializeArray();


    if (validaFormVazio(form, gen)) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'JSON',
            data: {
                email: email,
                pass: senha
            },
            beforeSend: function () {
                $('.spinner').removeClass('d-none');
            }
        }).done(function (data) {

            $('.spinner').addClass('d-none');
            if (!data.erro) {
                dispararAlerta("Boa!", 'Login Validado com Sucesso!', 'green');
                setTimeout(() => { window.location = 'home/index'; }, 1500);
            } else {
                dispararAlerta(`Ops.. ${data.message}`, 'Seu Email ou Senha estão inválidos!', 'red');
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

        $('form *').not($(`input[name="email"],
                            input[name="password"],
                             option`)).val('');

        $('form *').not($('input[name="email"]'))
            .removeClass('is-valid is-invalid');
    });
});

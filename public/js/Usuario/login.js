$('#login').on('click', (e) => {
    e.preventDefault();
    const email = $('input[name="email"]').val();
    const senha = $('input[name="password"]').val();
    let login = '/Login/validateLogin';

    const url = Diretorio() + login;
    let form = $('form').serializeArray();
    const gen = $('#sexo');

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
            console.log(data);

            $('.spinner').addClass('d-none');
            if (!data.erro) {
                dispararAlerta("Boa!", 'Login Validado com Sucesso!', 'green');
            } else {
                dispararAlerta(`Ops.. ${data.message}`, 'Seu Email ou Senha estão inválidos!', 'red');
            }
        }).fail(function (error) {
            $('.spinner').addClass('d-none');
            console.log(error);
        });
    };
});


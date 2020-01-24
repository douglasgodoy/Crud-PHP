$(document).on('click', '#login', (e) => {
    e.preventDefault();
    const gen = $('#sexo');
    const form = $('form').serializeArray();
    if (!validaFormVazio(form, true, gen)) return false;
    validaLogin();
});

const btnCad = $('#btnCadastrar');
$('#divBotoes').prepend(btnLoginHtml());

$('#novoCadastro').on('click', function () {
    const issetBtnLogin = $('#login').length > 0;
    issetBtnLogin ?
        ($('#divBotoes').prepend(btnCadHtml()), $('#divBotoes #login').remove()) :
        ($('#divBotoes').prepend(btnLoginHtml()), $('#divBotoes #btnCadastrar').remove());
    configInputForm();
});

function configInputForm() {
    const divCad = $('#cadastrar');

    divCad.fadeToggle('fast', () => {

        if (divCad.attr('style') !== "") {

            $('form input, form select')
                .not($(`input[name="githubUsername"],
                         input[name="password"]`))
                .attr('required', false);

            divCad.removeClass('active');
            $('#titulo span').html('login');
        } else {
            $('form input, form select')
                .not($(`input[name="githubUsername"],
                         input[name="password"]`))
                .attr('required', true);

            $('#titulo span').html('cadastro');
            divCad.addClass('active');
        }

        $('form *').not($(`input[name="githubUsername"],
                            input[name="password"],
                             option`)).val('');

        $('form *').not($('input[name="githubUsername"]'))
            .removeClass('is-valid is-invalid');
    });
}

function validaLogin() {
    const url = Diretorio() + '/Login/validateLogin';
    const github = $('input[name="githubUsername"]').val();
    const senha = $('input[name="password"]').val();

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'JSON',
        data: {
            github,
            pass: senha
        },
        beforeSend: function () {
            $('.spinner').removeClass('d-none');
        }
    }).done(data => {
        $('.spinner').addClass('d-none');

        if (!data.erro) {
            dispararAlerta();
            setTimeout(() => { window.location = 'home/index'; }, 1500);
        } else {
            dispararAlerta(`Ops.. ${data.message}`, 'Seu Email ou Senha estão inválidos!', 'red');
        }
    }).fail(error => {
        $('.spinner').addClass('d-none');
        console.log(error);
    });


}

function btnCadHtml() {
    return `<button type="submit" id="btnCadastrar" class="btn btn-outline-dark">Cadastrar
                <div class="spinner-grow spinner-grow-sm d-none spinner" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </button>`;
}

function btnLoginHtml() {
    return `<button type="submit" id="login" class="btn btn-outline-dark">Entrar
                <div class="spinner-grow spinner-grow-sm d-none spinner" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </button>`;
}

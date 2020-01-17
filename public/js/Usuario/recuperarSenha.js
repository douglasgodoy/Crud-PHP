
$('#esqueceuSenha').on('click', function () {
    const html = `
        <form>
            <div class="form-group mb-0">
                <label>Digite seu endereço de e-mail</label>
                <input type="email" name="emailRecuperarSenha" placeholder="Seu E-mail" class="form-control" required />
            </div>
        </form>
    `;
    $.confirm({
        title: 'Recuperar senha',
        content: html,
        buttons: {
            formSubmit: {
                text: 'Enviar',
                btnClass: 'btn-blue',
                action: function () {
                    const email = $(this).find('input[name="emailRecuperarSenha"]').val();
                    if (!email) {
                        $.alert('Campo E-mail é necessário!');
                        return false;
                    }
                }
            },
            cancelar: function () { },
        },
        onContentReady: function () {
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });
        }
    });
});

$('input[name="emailRecuperarSenha"]').on('click', function () {
    // $.ajax({
    //     url: Diretorio() + 'Login/recuperarSenha',
    //     type: 'POST',
    //     dataType: 'JSON',
    //     data: ,
    //     beforeSend: function () {
    //     }
    // }).done(function (data) {

    // }).fail(function () {

    // }).always(function () {
    // });
});

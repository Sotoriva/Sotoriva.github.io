const menuLinks = document.querySelectorAll('.offcanvas-body .nav-link');

menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasMenu'));
        offcanvas.hide();
    });
});

document.querySelectorAll('.slider-container').forEach(container => {
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    const slider = container.querySelector('.slider');

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -450,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: 450,
            behavior: 'smooth'
        });
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;  // Se o mouse não estiver pressionado, não fazer nada
        e.preventDefault();   // Evita seleção de texto
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Multiplicador para velocidade do scroll
        slider.scrollLeft = scrollLeft - walk;
    });

});

window.onload = function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        emailjs.sendForm('service_cpqoxzv', 'contact_form_template', this)
            .then(() => {
                alert('Mensagem enviada com sucesso!');
                console.log('SUCCESS!');
            }, (error) => {
                alert('Falha ao enviar a mensagem. Erro: ' + error);
                console.log('FAILED...', error);
            });
    });
}

    (function () {
        emailjs.init({
            publicKey: "r3i_N6XZJstf1nuOG",
        });
    })();

$(document).ready(function () {

    // ===== Плавная прокрутка =====
    $('.nav__link, #btn-learn-more').on('click', function (e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target && target !== '#') {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 600);
        }
        // Закрытие меню
        $('#nav').removeClass('nav--open');
        $('#burger').removeClass('burger--active');
    });

    // ===== Бургер-меню под мобилки =====
    $('#burger').on('click', function () {
        $(this).toggleClass('burger--active');
        $('#nav').toggleClass('nav--open');
    });

    // ===== Каруселька =====
    const $track = $('#carousel-track');
    const $slides = $track.find('.carousel-slide');
    const $dotsContainer = $('#carousel-dots');
    const $prevBtn = $('#carousel-prev');
    const $nextBtn = $('#carousel-next');
    
    let currentIndex = 0;
    const totalSlides = $slides.length;
    let autoPlayInterval;

    for (let i = 0; i < totalSlides; i++) {
        $dotsContainer.append(`<button class="carousel-dot" data-index="${i}"></button>`);
    }
    const $dots = $dotsContainer.find('.carousel-dot');
    $dots.eq(0).addClass('active');

    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        currentIndex = index;
        
        $track.css('transform', `translateX(-${currentIndex * 100}%)`);
        $dots.removeClass('active').eq(currentIndex).addClass('active');
    }

    // Обработчики кнопок
    $prevBtn.on('click', function () {
        goToSlide(currentIndex - 1);
        resetAutoPlay();
    });

    $nextBtn.on('click', function () {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
    });

    // Обработчики точек
    $dots.on('click', function () {
        const index = parseInt($(this).data('index'));
        goToSlide(index);
        resetAutoPlay();
    });

    // Автопереключение
    function startAutoPlay() {
        autoPlayInterval = setInterval(function () {
            goToSlide(currentIndex + 1);
        }, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }


    // Останавливаем автопрокрутку при наведении
    $('#carousel').on('mouseenter', function () {
        clearInterval(autoPlayInterval);
    }).on('mouseleave', function () {
        startAutoPlay();
    });

    // Запускаем
    startAutoPlay();

    // ===== Кнопка Яндекс.Карт =====
    $('#btn-open-map').on('click', function () {
        window.open(
            'https://yandex.ru/maps/?ll=20.5142,54.7195&z=16&mode=search&text=Калининград, памятник сому',
            '_blank'
        );
    });

    // jQuery-баян
$('.accordion__header').on('click', function() {
    const $content = $(this).next('.accordion__content');
    const $arrow = $(this).find('.accordion__arrow');
    
    $content.slideToggle(400);
    $arrow.toggleClass('rotated');
    
    // Закрываем другие
    $('.accordion__content').not($content).slideUp(300);
    $('.accordion__arrow').not($arrow).removeClass('rotated');
});

    // =====Тень на шапке при прокрутке =====
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('#header').addClass('header--scrolled');
        } else {
            $('#header').removeClass('header--scrolled');
        }
    });

    $('#btn-feed').on('click', function() {
    const messages = [
        'Сом довольно шевелит усами! 🐟💦',
        'Ням-ням! Сом благодарен! 🐟❤️',
        'Сом сыт и счастлив! Он передаёт привет! 🐟👋',
        'Ого! Сом выпрыгнул от радости! 🐟✨'
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    $('#feeding-message')
        .text(randomMsg)
        .slideDown(300)
        .delay(2000)
        .slideUp(300);
    
    // Эффект пузырьков
    for (let i = 0; i < 5; i++) {
        $('<div class="bubble">🫧</div>')
            .css({
                position: 'absolute',
                left: Math.random() * 100 + '%',
                bottom: '0',
                animation: `rise ${1 + Math.random()}s ease-out`
            })
            .appendTo('#btn-feed')
            .fadeOut(1500, function() { $(this).remove(); });
    }
});
});
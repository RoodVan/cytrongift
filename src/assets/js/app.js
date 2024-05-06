/* Plugins                                        
--------------------------------------------------------*/
//= components/owl
//= components/tippy
//= components/confirm
//= components/ticker
//= components/imask
//= components/simplelightbox


/* Functions                                        
--------------------------------------------------------*/
//= components/popups
//= components/functions
//= components/dropdown
//= components/select


/* Onload DOM                                        
--------------------------------------------------------*/
$(function () {

    // Home menu
    $(".hamburger").on("click", function (e) {
        e.stopPropagation();
        $(".menu-side").addClass("menu-side--open");
        $('<div class="menu-over"/>').css("opacity", "1").appendTo("body");
    });
    $(".js-menu-close").on("click", function () {
        $(".menu-side").removeClass("menu-side--open");
        $('body').find(".menu-over").remove();
    });


    // Theme change
    const getModeTheme = localStorage.getItem('mode');
    if (getModeTheme && getModeTheme === 'dark') {
        $(".toggle-theme input").prop("checked", true);
        $("html").addClass("theme-dark");
    } else {
        $(".toggle-theme input").prop("checked", false);
        $("html").removeClass("theme-dark");
    }

    $(".toggle-theme__lab").on("click", function () {
        setTimeout(function () {
            $("html").toggleClass("theme-dark");

            if ($("html").hasClass('theme-dark')) {
                $(".toggle-theme input").prop("checked", true);
                return localStorage.setItem('mode', 'dark');
            }

            $(".toggle-theme input").prop("checked", false);
            localStorage.setItem('mode', 'light');
        }, 200);
    });


    // Ticker
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    if (mediaQuery.matches) {
        $('.ticker__list').marquee({delay: 3000, speed: .6667, timing:0});
    } else {
        $('.ticker__list').marquee({ direction: 'horizontal', delay: 0, timing: 40 });
    }
    // $(window).on("resize", debounce(function(){
    //     const mediaQuery = window.matchMedia('(max-width: 1024px)');
    //     if (mediaQuery.matches) {
    //         $('.ticker__list').marquee();
    //     } else {
    //         $('.ticker__list').marquee({ direction: 'horizontal', delay: 0, timing: 40 });
    //     }
    // }));


    //Copy text
    $("[data-copy]").on("click", function () {
        navigator.clipboard.writeText($($(this).attr("data-copy")).val())
            .then(() => {
                const instance = tippy(this);
                instance.setContent('Copied 👍');
                instance.show();
            });
    });


    // Rates calc
    $('[data-calc]').on('click', function (e) {
        e.preventDefault();
        if ($(window).width() <= 1024) {
            $('.hat__right').toggleClass('hat__right--calc');
            if ($('.hat__right').hasClass('hat__right--calc')) {
                goTo('.hat__right', 300);
            }
            return;
        }

        if ($('.hat__right').hasClass('hat__right--calc')) {
            $('.hat__right .exform').fadeOut('fast', function () {
                $('.hat__right .bg-cap').fadeIn('fast');
                $('.hat__right').removeClass('hat__right--calc');
            });
        } else {
            $('.hat__right .bg-cap').fadeOut('fast', function () {
                $('.hat__right .exform').fadeIn('fast');
                $('.hat__right').addClass('hat__right--calc');
            });
        }
    });

    $(".js-inp-calc").on("keyup", function(){
        let cf_1 = 95;
        let cf_2 = 0.000015;

        $("#cf_1").html( `${parseFloat($(this).val() * cf_1)}` );
        $("#cf_2").html( `${parseFloat($(this).val() * cf_2)}` );
    });


    // Inputs mask
    if (document.querySelector('[data-isnumber]')) {
        const dataNumber = document.querySelectorAll('[data-isnumber]');
        for (let i = 0; i < dataNumber.length; i++) {
            IMask(dataNumber[i], {
                mask: Number
            });
        }
    }
    if (document.querySelector('[data-isnumber-999]')) {
        const dataNumber999 = document.querySelectorAll('[data-isnumber-999]');
        for (let i = 0; i < dataNumber999.length; i++) {
            IMask(dataNumber999[i], {
                mask: Number,
                min: 1,
                max: 999
            });
        }
    }
    if (document.querySelector('[data-isphone]')) {
        const dataPhone = document.querySelectorAll('[data-isphone]');
        for (let i = 0; i < dataPhone.length; i++) {
            IMask(dataPhone[i], {
                mask: '{+}00000000000'
            });
        }
    }
    if (document.querySelector('[data-istg]')) {
        const dataTg= document.querySelectorAll('[data-istg]');
        for (let i = 0; i < dataTg.length; i++) {
            IMask(dataTg[i], {
                mask: '{@}*********************',
                from: 1,
                to: 90
            });
        }
    }


    // Rating stars render
    $(".js-stars").each(function () {
        renderStars.call($(this), $(this).attr("data-val"))
    });

    // Ratings action
    $(".rating__action input").each(function () {
        let val = $(this).val();
        const $wrap = $(this).parent(".rating__action");

        renderStars.call($wrap, val);

        $wrap.on("click", "i", function () {
            renderStars.call($wrap, $(this).index());
        });
    });


    // Rewviews Carousel
    if ($(".rwb-slide")) {
        $(".rwb-slide").addClass("owl-carousel").owlCarousel({
            items: 1,
            autoplay: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            loop: true,
            dots: true,
            dotsEach: true,
            dotsContainer: ".rwb__dots",
            slideBy: 1,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true,
                    loop: false,
                    autoplay: false,
                    navText: [
                        '<svg aria-label="' + 'Previous' + '"><use xlink:href="#ic-left"></use></svg>',
                        '<svg aria-label="' + 'Next' + '"><use xlink:href="#ic-right"></use></svg>'
                    ]
                },
                768: {
                    items: 1
                },
                1200: {
                    items: 2,
                }
            }
        });
    }


    // Question
    $(".question").on("click", ".question__title", function () {

        const item = $(this).parent(".question__item");

        if (item.hasClass("question__item--open")) {
            item.find(".question__txt").slideToggle("fast", function () {
                item.removeClass("question__item--open");
            });
            return;
        }

        // $(".question").find(".question__item").removeClass("question__item--open");
        // $(".question").find(".question__txt").hide("fast");

        item.find(".question__txt").slideToggle("fast", function () {
            item.addClass("question__item--open");
        });

    });


    // Langs
    const langsDropdown = new Dropdown(".langs");


    // Custom selects
    if ($('#nominal').length) {
        const selectNominal = new Eselect('#nominal', { search: true });
    }
    if ($('#giftCard').length) {
        const selectGiftCard = new Eselect('#giftCard', { search: true });
    }
    if ($('#scurr').length) {
        const selectGiftCard = new Eselect('#scurr', {});
    }
    if ($('.js-sel-card').length) {
        const selectCard = new Eselect('.js-sel-card', { height: '328px' });
    }
    if ($('.js-sel-country').length) {
        const selectCountry = new Eselect('.js-sel-country', { search: true });
    }
    if ($('.js-sel-category').length) {
        const selectCategory = new Eselect('.js-sel-category', { search: true });
    }
    if ($('.js-sel-subcategory').length) {
        const selectSubCategory = new Eselect('.js-sel-subcategory', { search: true });
    }
    if ($('.js-sel-balance').length) {
        const selectBalance = new Eselect('.js-sel-balance', { border: true });
    }
    if ($('.js-sel-paymethod').length) {
        const selectPayMethod = new Eselect('.js-sel-paymethod', { border: true });
    }
    if ($('.js-sel-countries').length) {
        const selectCountries = new Eselect('.js-sel-countries', { search: true });
    }

    // Timer account
    if ($('#atimer').length) {
        xtimer('#atimer', '2024-06-01 00:00:00', () => {
            console.log("end timer");
        });
    }


    // Password hide/show
    $(".sw-eye").on("click", function () {
        const input = $(this).closest("div").find("input");
        const type = input.attr("type");

        if (type == 'password') {
            input.attr("type", "text");
            $(this).find("use").attr("xlink:href", "#ic-eye-1");
        } else {
            input.attr("type", "password");
            $(this).find("use").attr("xlink:href", "#ic-eye-0");
        }
    });


    // Tippy tooltip
    tippy('[data-tippy-content]', {
        allowHTML: true,
        animation: 'scale',
        duration: 200
    });


    // Document outer click
    $(document).on("click", function (e) {
        const $target = $(e.target);

        // Menu
        if (!$target.closest(".menu-side").length && $(".menu-side").is(":visible") && !$target.hasClass("hamburger")) {
            $(".menu-side").removeClass("menu-side--open");
            $('body').find(".menu-over").remove();
        }

    });

    // Document keydown
    $(document).on("keydown", function (e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            // menu
            if ($(".menu-side").hasClass("menu-side--open") && $(".menu-side").is(":visible")) {
                $(".menu-side").removeClass("menu-side--open");
                $('body').find(".menu-over").remove();
            }
            // popups
            if ($(".popup").is(":visible")) {
                popup.close('#' + $(".popup:visible").attr("id"));
            }
        }
    });

});
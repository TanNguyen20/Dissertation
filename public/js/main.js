(function ($) {
    "use strict";
    $(document).ready(function () {
        // loader
        var loader = function () {
            setTimeout(function () {
                if ($('#loader').length > 0) {
                    $('#loader').removeClass('show');
                }
            }, 1);
        };
        loader();

        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
            return false;
        });


        // Sticky Navbar
        $(window).scroll(function () {
            if ($(this).scrollTop() > 90) {
                $('.nav-bar').addClass('nav-sticky');
                $('.carousel, .page-header').css("margin-top", "73px");
            } else {
                $('.nav-bar').removeClass('nav-sticky');
                $('.carousel, .page-header').css("margin-top", "0");
            }
        });


        // Dropdown on mouse hover
        $(document).ready(function () {
            function toggleNavbarMethod() {
                if ($(window).width() > 992) {
                    $('.navbar .dropdown').on('mouseover', function () {
                        $('.dropdown-toggle', this).trigger('click');
                    }).on('mouseout', function () {
                        $('.dropdown-toggle', this).trigger('click').blur();
                    });
                } else {
                    $('.navbar .dropdown').off('mouseover').off('mouseout');
                }
            }
            toggleNavbarMethod();
            $(window).resize(toggleNavbarMethod);
        });


        // Main carousel
        $(".carousel .owl-carousel").owlCarousel({
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            items: 1,
            smartSpeed: 300,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ]
        });


        // Facts counter
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });


        // Testimonials carousel
        $(".testimonials-carousel").owlCarousel({
            center: true,
            autoplay: true,
            smartSpeed: 2000,
            dots: true,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });


        // Related post carousel
        $(".related-slider").owlCarousel({
            autoplay: true,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });
    });
    
    
    var oldHref = document.location.href;
    var clicked = false;
    window.onload = function () {
        $('a').on('click', function () {
            clicked = true;
        });
        $('.logo').on('click', function () {    
            clicked = true;
        });
        var bodyList = document.documentElement;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    /* Changed pathname */
                    // loader
                    var loader = function () {
                        setTimeout(function () {
                            if ($('#loader').length > 0) {
                                $('#loader').removeClass('show');
                            }
                        }, 1);
                    };
                    loader();

                    // Main carousel
                    $(".carousel .owl-carousel").owlCarousel({
                        autoplay: true,
                        animateOut: 'fadeOut',
                        animateIn: 'fadeIn',
                        items: 1,
                        smartSpeed: 300,
                        dots: false,
                        loop: true,
                        nav: true,
                        navText: [
                            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                        ]
                    });


                    // Facts counter
                    $('[data-toggle="counter-up"]').counterUp({
                        delay: 10,
                        time: 2000
                    });


                    // Testimonials carousel
                    $(".testimonials-carousel").owlCarousel({
                        center: true,
                        autoplay: true,
                        smartSpeed: 2000,
                        dots: true,
                        loop: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                            576: {
                                items: 1
                            },
                            768: {
                                items: 2
                            },
                            992: {
                                items: 3
                            }
                        }
                    });


                    // Related post carousel
                    $(".related-slider").owlCarousel({
                        autoplay: true,
                        dots: false,
                        loop: true,
                        nav: true,
                        navText: [
                            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1
                            },
                            576: {
                                items: 1
                            },
                            768: {
                                items: 2
                            }
                        }
                    });
                    clicked = false;
                }
                else if(clicked) {
                    clicked = false;
                    var loader = function () {
                        setTimeout(function () {
                            if ($('#loader').length > 0) {
                                $('#loader').removeClass('show');
                            }
                        }, 1);
                    };
                    loader();

                    // Main carousel
                    $(".carousel .owl-carousel").owlCarousel({
                        autoplay: true,
                        animateOut: 'fadeOut',
                        animateIn: 'fadeIn',
                        items: 1,
                        smartSpeed: 300,
                        dots: false,
                        loop: true,
                        nav: true,
                        navText: [
                            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                        ]
                    });


                    // Facts counter
                    $('[data-toggle="counter-up"]').counterUp({
                        delay: 10,
                        time: 2000
                    });


                    // Testimonials carousel
                    $(".testimonials-carousel").owlCarousel({
                        center: true,
                        autoplay: true,
                        smartSpeed: 2000,
                        dots: true,
                        loop: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                            576: {
                                items: 1
                            },
                            768: {
                                items: 2
                            },
                            992: {
                                items: 3
                            }
                        }
                    });


                    // Related post carousel
                    $(".related-slider").owlCarousel({
                        autoplay: true,
                        dots: false,
                        loop: true,
                        nav: true,
                        navText: [
                            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 1
                            },
                            576: {
                                items: 1
                            },
                            768: {
                                items: 2
                            }
                        }
                    });
                }
            });
        });

        var config = {
            childList: true,
            subtree: true,
            attributes : true,
            characterData: true,
            attributeOldValue: true,
            characterDataOldValue: true,
            attributeFilter: ["style"]
        };

        observer.observe(bodyList, config);
    };
})(jQuery);


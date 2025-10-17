if(sessionStorage.getItem('loader')) {
    $('.preloader').hide()
}

sessionStorage.setItem('loader', true)

let captchaResponse = 0

function onCaptchaCompleted(token) {
    if (token) {
        captchaResponse = 1
    } 
}

$(window).on('load', () => {

    $('.preloader').delay(1500).fadeOut(600)
    const currentURL = window.location.href

    //________DAY-NIGHT_________    


    $('.header-switch__switch input').on('change', function() {
        if($(this).is(':checked')) {
            $('.header-switch__time').removeClass('active')
            $('.header-switch__night').addClass('active')
            $('.main-bg__night').css('opacity', '1')
        } else {
            $('.header-switch__time').removeClass('active')
            $('.header-switch__day').addClass('active')
            $('.main-bg__night').css('opacity', '0')
        }
    })


    //_______MOBILE MENU______


    $('.header-mobile').click(function() {
        $(this).toggleClass('active')
        $('.mobile-menu').slideToggle(400)
        $('.header-switch').toggleClass('hide')
    })

    $('.header-menu').click(function() {
        $('.mobile-menu').slideToggle(400)
        $('.header-switch').toggleClass('hide')
    })

    $('.mobile-menu__close').click(function() {
        $('.mobile-menu').slideToggle(400)
        $('.header-switch').toggleClass('hide')
    })

    $('.mobile-menu__list a').click(function(e) {
        e.preventDefault()
        let link = $(this).attr('href')
        $('.header-mobile').toggleClass('active')
        $('.mobile-menu').slideToggle(400)
        $('.header-switch').toggleClass('hide')
        window.scrollTo({top: $(link).offset().top - 50, behavior: 'smooth'})
    })


    //_______ABOUT__________


    let youtubeSrc = $('.about-popup iframe').data('src')

    $('.about__img').click(function() {
        $('.about-popup iframe').attr('src', youtubeSrc)
        $('.about-popup').fadeIn(600)
    })

    $('.about-popup').click(e => {
        let div = $('.about-popup iframe')
        if (!div.is(e.target) 
            && div.has(e.target).length === 0) { 
            $('.about-popup').fadeOut(600)
            $('.about-popup iframe').attr('src', '')
        }
    })

    //________PREYARD__________

    $('.stock-carousel').owlCarousel({
        items: 1,
        nav: false,
        dot: false,
        margin: 10,
        smartSpeed: 1000,
        loop: true,
        autoHeight: true,
    })

    //_______GENPLAN______

    $('.genplan-wrap').scrollLeft($(window).height()*.4)


    function mousemove(event) {
        var mouse_x = mouse_y = 0;
        if (document.attachEvent != null) {
            mouse_x = window.event.clientX;
            mouse_y = window.event.clientY;
        } else if (!document.attachEvent && document.addEventListener) {
            mouse_x = event.clientX;
            mouse_y = event.clientY;
        }

        $('.genplan-info').css('top', mouse_y+'px')
        $('.genplan-info').css('left', mouse_x+'px')
    }


    $('.genplan').mousemove(mousemove)


    $('.genplan-img svg path').mouseenter(function() {
        $('.genplan-info').css({
            opacity: '1',
            visibility: 'visible'
        })


        $('.genplan-info__number span').text($(this).data('number'))
        $('.genplan-info__flats span').text($(this).data('flats')) 

    })

    $('.genplan-img svg path').mouseleave(function() {
        $('.genplan-info').css({
            opacity: '0',
            visibility: 'hidden'
        })
    })


    //_______PREYARD______

    
    $('.preyard-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: false,
        smartSpeed: 1000,
        autoWidth: true,
    })


    $('.preyard-arrows .arrow-left').click(() => {
        $('.preyard-slider').trigger('prev.owl.carousel', [1000]);
    })
    
    $('.preyard-arrows .arrow-right').click(() => {
        $('.preyard-slider').trigger('next.owl.carousel', [1000]);  
    })
    

    //_______PLANS______

    let showPlan = index => {
        $('.plans-thumbs li').removeClass('current')
        $('.plans-thumbs li').eq(index).addClass('current')
        let src = $('.plans-thumbs .current img').attr('src')
        $('.plans-main img').attr('src', src)
    }

    showPlan(0)

    $('.plans-thumbs li').click(function() {
        let index = $(this).index()
        showPlan(index)
    })


    //_______COUNTER ANIMATION______


    let showCounter = true;
    $(window).on('scroll load resize', function () {
        if (!showCounter) return false; 
        let w_top = $(window).scrollTop(); 
        if (w_top >= $('.developer').offset().top - $(window).height()/2) {
            
            $('.developer-numbers__number span').each(function() {
                $(this).prop("col",0).animate({
                    counter: $(this).text()},{
                    duration: 4000,
                    easing: 'swing',
                    step:function(now){
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            showCounter = false;
        }


        //__________LAZY_____________


        $('.lazy').each(function() {
            if(w_top >= $(this).offset().top - $(window).height()*2) {
                $(this).attr('src', $(this).data('src'))
                $(this).removeClass('lazy')
            }
        })
 
    }); 
    

    //_________TIMELINE_____________

    let carouselInit = () => {
        $('.timeline-popup__carousel').owlCarousel({
            dots: false,
            nav: false,
            loop: true,
            smartSpeed: 1000,
            items: 1,
            margin: 20,
        })
        $('.timeline-popup__carousel').removeClass('owl-hidden')
    }

    

    $('.timeline-popup .arrow-left').click(() => {
        $('.timeline-popup__carousel').trigger('prev.owl.carousel')
    })
    
    $('.timeline-popup .arrow-right').click(() => {
        $('.timeline-popup__carousel').trigger('next.owl.carousel') 
    })


    $('.timeline-item').click(function() {
        $('.timeline-popup__carousel').trigger('destroy.owl.carousel')
        $('.timeline-popup').fadeIn(600)
        let images = $(this).data('slider').split(',')
        images = images.map(item => item.trim())
        $('.timeline-popup__carousel').html('')
        images.forEach(item => {
            if(item) {
                $('.timeline-popup__carousel').append(`
                <div class="timeline-popup__item">
                    <img src="${item}" alt="timeline">
                </div>
                `)
            }
        })
        carouselInit()
    })


    $('.timeline-popup__close').click(function() {
        $('.timeline-popup').fadeOut(600)
    })


    $('.timeline-choose__item').click(function() {
        let index = $(this).index()
        $('.timeline-choose__item').removeClass('current')
        $(this).addClass('current')
        $('.timeline-tab').removeClass('current')
        $('.timeline-tab').eq(index).addClass('current')
    })


    //__________MAP_____________

    $('body').append(`<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>`)


    setTimeout(() => {

    ymaps.ready(mapStart);
        function mapStart() {
            var map = new ymaps.Map("map", {
                center: [41.27917721816494, 69.30654054602785],
                zoom: 11,
            }, {
                searchControlProvider: 'yandex#search'
            });

            map.geoObjects
            .add(new ymaps.Placemark([41.291665332732045, 69.28042981719217], {
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/img/marker.svg',
                iconImageSize: [34, 41],
            }))


            map.geoObjects
            .add(new ymaps.Placemark([41.255930823165095, 69.35766737301245], {
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/img/marker.svg',
                iconImageSize: [34, 41],
            }))


            // map.geoObjects
            // .add(new ymaps.Placemark([41.35185749325768, 69.25883853939597], {
            // }, {
            //     iconLayout: 'default#image',
            //     iconImageHref: '/img/marker.svg',
            //     iconImageSize: [34, 41],
            // }))


            // map.geoObjects
            // .add(new ymaps.Placemark([41.32482145447368, 69.41424428835043], {
            // }, {
            //     iconLayout: 'default#image',
            //     iconImageHref: '/img/marker.svg',
            //     iconImageSize: [34, 41],
            // }))


    
            map.panes.get('ground').getElement().style.filter = 'grayscale(100%)';
        }

    }, 1000)


    
    //__________WOW____________


    new WOW({
        offset: 50,
        mobile: false, 
    }).init();


    $('.form__tel').inputmask("+\\9\\98999999999")


    $('.form_name').on('keydown', function(e) {
        const key = e.key;
        if (!/^[a-zA-Zа-яА-Я\s]*$/.test(key)) {
            e.preventDefault();
        }
    })

    let pattern = new RegExp(`^[0-9-+\\s()]*$`)


    
    //_____________LIVE_________________


    $('.live-open').click(e => {
        e.preventDefault()
        $('.live').fadeIn(600); 
    })

    $('.live').click(e => {
        let div = $(".live-content")
        if (!div.is(e.target) 
            && div.has(e.target).length === 0) { 
            $('.live').fadeOut(600); 
        }
    })


    //________REVIEWS___________



    $('.reviews-slider').owlCarousel({
        dots: false,
        nav: false,
        smartSpeed: 700,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                margin: 0,
                autoWidth: true
            },

            700: {
                items: 2,
            },

            900: {
                items: 3,
            },


            1200: {
                items: 4,
            },
        }
    })


    $('.reviews-arrows .arrow-left').click(() => {
        $('.reviews-slider').trigger('prev.owl.carousel', [700]);
    })

    $('.reviews-arrows .arrow-right').click(() => {
        $('.reviews-slider').trigger('next.owl.carousel', [700]);
    })

    $('.reviews-item iframe').each(function () {
        let src = $(this).attr('data-src')
        $(this).attr('src', src)
    })


    //_____________FEEDBACK_________________


    $('.feedback-open').click(e => {
        e.preventDefault()
        $('.feedback').fadeIn(600); 
    })


    $('.feedback-done .feedback-form__btn').click(e => {
        e.preventDefault()
        $('.feedback').fadeOut(600); 
        history.pushState(null, null, currentURL)
    })



    $('.feedback').click(e => {
        let div = $(".feedback-content");
        if (!div.is(e.target) 
            && div.has(e.target).length === 0) { 
            $('.feedback').fadeOut(600); 
            history.pushState(null, null, currentURL)
        }
    })

    //_____________FORM SEND__________

    let currentUrl = window.location.search
    let urlParams = new URLSearchParams(currentUrl)
    let utmSource = urlParams.get('utm_source') || ''
    let utmMedium = urlParams.get('utm_medium') || ''
    let utmCampaign = urlParams.get('utm_campaign') || ''
    let utmTerm = urlParams.get('utm_term') || ''
    let utmContent = urlParams.get('utm_content') || ''
    let utm = `utm_source: ${utmSource}, utm_medium: ${utmMedium}, utm_campaign: ${utmCampaign}, utm_term: ${utmTerm}, utm_content: ${utmContent}`

    let utmForTg = utmSource ? `UTM: ${utm}` : ''
    let utmForTable = utmSource ? utm : ''



    let token = ''
    let chatId = ''
    let lang = $('html').attr('lang')
    let project = 'NRG QORASUV'
    let GOOGLE_TABLE = ''
    const newURL = currentURL + "#success"


    let formSend = ($name, $phone) => {
        if (pattern.test($phone.val())) {
            $(this).find('.btn').addClass('disabled')

            // let text = `**Форма обратной связи**%0AИмя: ${$name.val()}%0AТелефон: ${$phone.val()}%0AПроект: ${project}%0AЯзык: ${lang}%0A ${utmForTg}`
            // fetch('https://api.telegram.org/bot' + token + '/sendMessage?chat_id='+ chatId + 'parse_mode=html&text=' + text ).then(response => {
            //     if(response.status == 200 || response.status == 201) {
            //         $('.feedback').fadeIn()
            //         $('.feedback-wrap').hide()
            //         $('.feedback-done').show()
            //         $name.val('')
            //         $phone.val('')
            //         $('.form .btn').removeClass('disabled')
            //         history.pushState(null, null, newURL)
            //     }
            // })

            // let user = {
            //     "Имя": $name.val(),
            //     "Телефон": $phone.val(),
            //     "Проект": project,
            //     "Язык": lang,
            //     "UTM": utmForTable,
            // }

            // $.post({
            //     url: GOOGLE_TABLE,
            //     data: user,
            // })

            let data = {
                clientName: $name.val(),
                clientPhoneNumber: $phone.val(),
                regionName: "Tashkent",
                siteApplicationType: "callBack",
                url: currentURL,
                department: "CC",
                attractionChannel: "site",
                priority: 10,
                businessId: 2
            };

            fetch('https://apigw.bi.group/sales-crm/integration/siteApplications', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic bnJnX3NpdGU6UX01Mk8jWjlGWTFseCRhJUo=',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                $('.feedback').fadeIn();
                $('.feedback-wrap').hide();
                $('.feedback-done').show();
                $name.val('');
                $phone.val('');
                $('.form .btn').removeClass('disabled');
                history.pushState(null, null, newURL);
            })
            .catch(error => {
                console.error('Error:', error);
                $('.form .btn').removeClass('disabled');
            });
        } else {
            $phone.addClass('error')
        }
    } 


    $('.feedback-form').on('submit', e => {
        e.preventDefault()
        $('.feedback-wrap .feedback-form__btn').addClass('btn-disabled')
        let $name = $('.feedback-form__name')
        let $tel = $('.feedback-form__tel')


        if(!captchaResponse) {
            $('.feedback .recaptcha-text').show()
            $('.feedback-wrap .feedback-form__btn').removeClass('btn-disabled')
        } else {
            if (pattern.test($tel.val())) {
                formSend($name, $tel)
            } else {
                $('.feedback-form__tel').addClass('error')
                $('.feedback-wrap .feedback-form__btn').removeClass('btn-disabled')
            }
        }

    })


    

    $('.consult-form').on('submit', e => {
        e.preventDefault()
        $('.consult-form__btn').addClass('btn-disabled')
        let $name = $('.consult-form__name')
        let $tel = $('.consult-form__tel')
        
        if(!captchaResponse) {
            $('.consult-form .recaptcha-text').show()
            $('.consult-form__btn').removeClass('btn-disabled')
        } else {
            if (pattern.test($tel.val())) {
                formSend($name, $tel)
                $('.consult-form .recaptcha-text').hide()
                $('.consult-form__tel').removeClass('error')
            } else {
                $('.consult-form__tel').addClass('error')
                $('.consult-form__btn').removeClass('btn-disabled')
            }
            
        }

       
    })


})

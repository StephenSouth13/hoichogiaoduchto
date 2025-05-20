

  (function() {
    "use strict";


    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', aosInit);

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });

    /**
     * Initiate Pure Counter
     */
    new PureCounter();

    /**
     * Frequently Asked Questions Toggle
     */
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });

    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }

    window.addEventListener("load", initSwiper);

    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener('load', function(e) {
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash);
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });

    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

  })();
  /*Chuyển đổi ngôn ngữ */
  let currentLanguage = 'en'; // Default language

  function toggleLanguage() {
    const languageButton = document.getElementById("language-button");
    if (languageButton.innerText === "English US") {
        languageButton.innerText = "Tiếng Việt";
    } else {
        languageButton.innerText = "English US";
    }
    // Điều chỉnh lớp CSS để tạo hiệu ứng chuyển động mượt mà
  }

  function changeLanguage(vn) {
      // Your existing language change logic
      // For example, using Google Translate or any other method
  }
  try {
    $('.js-datepicker').daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        "autoUpdateInput": false,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    var myCalendar = $('.js-datepicker');
    var isClick = 0;

    $(window).on('click',function(){
        isClick = 0;
    });

    $(myCalendar).on('apply.daterangepicker',function(ev, picker){
        isClick = 0;
        $(this).val(picker.startDate.format('DD/MM/YYYY'));

    });

    $('.js-btn-calendar').on('click',function(e){
        e.stopPropagation();

        if(isClick === 1) isClick = 0;
        else if(isClick === 0) isClick = 1;

        if (isClick === 1) {
            myCalendar.focus();
        }
    });

    $(myCalendar).on('click',function(e){
        e.stopPropagation();
        isClick = 1;
    });

    $('.daterangepicker').on('click',function(e){
        e.stopPropagation();
    });


  } catch(er) {console.log(er);}
  /*[ Select 2 Config ]
    ===========================================================*/

  try {
    var selectSimple = $('.js-select-simple');

    selectSimple.each(function () {
        var that = $(this);
        var selectBox = that.find('select');
        var selectDropdown = that.find('.select-dropdown');
        selectBox.select2({
            dropdownParent: selectDropdown
        });
    });

  } catch (err) {
    console.log(err);
  }
  // script.js
  const track = document.querySelector('.carousel-track');
  const images = document.querySelectorAll('.carousel-track img');

  // Sao chép ảnh để tạo hiệu ứng cuộn vô tận
  images.forEach(img => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
  });
// Xử lý sự kiện khi người dùng nhấn nút gửi câu hỏi
document.getElementById('chat-submit').addEventListener('click', function() {
    var userMessage = document.getElementById('user-input').value;

    if (userMessage.trim() !== "") {
        // Hiển thị tin nhắn người dùng
        var userDiv = document.createElement("div");
        userDiv.classList.add("user-message");
        userDiv.innerHTML = userMessage;
        document.getElementById('chat-box').appendChild(userDiv);

        // Gửi câu hỏi tới backend (chat-backend.php)
        fetch('chat-backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            // Xử lý và hiển thị phản hồi từ ChatGPT
            var botDiv = document.createElement("div");
            botDiv.classList.add("bot-message");
            botDiv.innerHTML = data.reply; // Hiển thị câu trả lời từ ChatGPT
            document.getElementById('chat-box').appendChild(botDiv);

            // Cuộn xuống cuối cùng để hiển thị câu trả lời mới
            document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }
});

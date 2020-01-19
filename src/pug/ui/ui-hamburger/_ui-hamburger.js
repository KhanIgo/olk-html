const ham = document.querySelector('.js-ham'),
      hamCallback = function(e) {
          e.preventDefault();
          this.classList.toggle("is-active");
      };

ham.addEventListener('click', hamCallback);
// // Menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  const $navbarMenu = document.querySelector('.navbar-menu'); 

  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });

  // Add click event on each menu item
  const $menuItems = Array.prototype.slice.call(document.querySelectorAll('.navbar-menu .navbar-item'), 0); 

  $menuItems.forEach(item => {
    item.addEventListener('click', () => {
      $navbarBurgers.forEach(el => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.remove('is-active');
        $target.classList.remove('is-active');
      });
    });
  });

  // Add click event on document
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar-burger') && !event.target.closest('.navbar-menu')) {
      $navbarBurgers.forEach(el => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.remove('is-active');
        $target.classList.remove('is-active');
      });
    }
  });
});

  // Hero text rotate 
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
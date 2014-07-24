
  function Spinning(container) {
    this.container = $(container);
    this.icons = this.container.children();
    this.spinnings = [];
  }

  
  Spinning.prototype.render = function() {
    this._init();
    this.container.css('background', 'none');
    this.icons.show();
    this._spin();
  }

  Spinning.prototype._init2 = function() {
    var spinnings = this.spinnings;

    $(this.icons).each(function(n) {
      var startDeg = random(360);
      var node = $(this);
      var timer;

      node.css({
        top: random(40),
        left: n * 50 + random(10),
        zIndex: 1000
      }).hover(
          function() {
            node.fadeTo(250, 1)
                .css('zIndex', 1001)
                .css('transform', 'rotate(0deg)');

          },
          function() {
            node.fadeTo(250, .6).css('zIndex', 1000);
            timer && clearTimeout(timer);
            timer = setTimeout(spin, Math.ceil(random(5000)));
          }
      );

      function spin() {
        node.css('transform', 'rotate(' + startDeg + 'deg)');
      }

      spinnings[n] = spin;
    })

    return this;
  }

  Spinning.prototype._init = function() {
    var spinnings = this.spinnings;

    $(this.icons).each(function(n) {
      var startDeg = random(360);
      var node = $(this);
      var timer;

      node.css({
        top: random(40),
        left: n * 50 + random(10),
        zIndex: 1000
      }).hover(
          function() {
            node.addClass('animated bounceOutLeft');


            node.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
              node.removeClass('bounceOutLeft');
              node.addClass('bounceInRight');
            });

/*            node.fadeTo(250, 1)
                .css('zIndex', 1001)
                .css('transform', 'rotate(0deg)');
*/
          },
          function() {
/*            node.fadeTo(250, .6).css('zIndex', 1000);
            timer && clearTimeout(timer);
            timer = setTimeout(spin, Math.ceil(random(5000)));
*/
          }
      );


      function spin() {
        node.css('transform', 'rotate(' + startDeg + 'deg)');
      }
      

      spinnings[n] = spin;
    })

    return this;
  }

  Spinning.prototype._spin = function() {

    $(this.spinnings).each(function(i, fn) {
      setTimeout(fn, Math.ceil(random(3000)));
    });

    return this;
  }

  // -------------------------------------------
/*  Spinning.prototype.chaos = function(node) {
    var startDeg = 400;
    node.css('transform', 'rotate(' + startDeg + 'deg)');
  }
*/

  Spinning.prototype.home = function(node) {
    node.fadeTo(250, 1).css('zIndex', 1001).css('transform', 'rotate(0deg)');
    
    var timer;
    timer && clearTimeout(timer);
    timer = setTimeout(chaos, 5000);
    
    
    function chaos() {
        var startDeg = 400;
        node.css('transform', 'rotate(' + startDeg + 'deg)');
    }

  }


  function random(x) { return Math.random() * x };

  // main
  var s = new Spinning('#container');
  s.render();

  window.addEventListener('load', function() {
  	//var textInput = document.querySelector('input');
  
  	FastClick.attach(document.body);
  	Array.prototype.forEach.call(document.getElementsByClassName('test'), function(testEl) {
  		testEl.addEventListener('click', function() {
  		  
  		  s.home($(this));
  		  //alert("click");
  			//textInput.focus();
  		}, false)
  	});
  }, false);

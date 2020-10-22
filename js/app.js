
$(document).ready(function () {

  let a = false;


  // helper functions 

  // chnage the color to pry color for the navbar  
  let change_btn_color_pry = function () {
    $(".navbarsize-c ").addClass("navbarsize-c-add");
    $(".navbarsize-c .btn-light").addClass("btn-primary");
    $(".navbarsize-c .btn-light").removeClass("btn-light");
    $(".navbarsize-c .nav-c-bg").slideDown(200);
  }


  // change the color for the button to light for the navbar 
  let change_btn_color_lit = function () {
    $(".navbarsize-c").removeClass("navbarsize-c-add");
    $(".navbarsize-c .btn-primary").addClass("btn-light");
    $(".navbarsize-c .btn-primary").removeClass("btn-primary");
    $(".navbarsize-c .nav-c-bg").slideUp(200);
  }


  // Move prgoress bar
  let progress_move = (now = 0, IDname, delay) => {

    let progressBar = $(IDname + " .progress-bar");

    if (now == progressBar.attr("aria-valuemin")) { // TODO: check later  

      let id = setInterval(frame, delay);

      function frame() {
        if (now >= progressBar.attr("aria-valuemax")) {
          clearInterval(id);
          now = progressBar.attr("aria-valuemin");
        } else {
          now++;
          progressBar.css("width", now + "%");
          progressBar.attr("aria-valuenow", now);
        }

      }
    }
  }

  let slideShow = () => {

    // init run 
    progress_move(0, "#slide_bar", 10);
    let n = 1;
    let slides = $(".son-block .slide");
    let boxs = $(".anything .box");
    $(".son-block #slide_" + n).addClass("show");
    $(".anything #box_" + n).addClass("highlight");


    // runs every 10s 
    let ref = setInterval(function () {
      // get the values for the progress bar to check 
      let progressBar = $("#slide_bar .progress-bar");
      if (progressBar.attr("aria-valuenow") == progressBar.attr("aria-valuemax")) { // check if it is done 
        progress_move(0, "#slide_bar", 10) // run again
        slides.removeClass("show");
        boxs.removeClass("highlight");
        n++;
        $(".son-block #slide_" + n).addClass("show");
        $(".anything #box_" + n).addClass("highlight");

        if (n == slides.length /2 ) {
          n = 0
        }
      }
    }, 1000);


    boxs.on("click", function () {
      clearInterval(ref);
      let traget = $(this).attr("data-target");
      slides.removeClass("show");
      boxs.removeClass("highlight");
      $(".son-block #" + traget).addClass("show");
      $(this).addClass("highlight");

    });

  }


  // Event listners


  // on scroll event listner 
  $(window).on('scroll', function () {
    let scroll = $(window).scrollTop();
    if (!a) {
      if (scroll >= 50) {
        change_btn_color_pry();
      } else {
        change_btn_color_lit();
      }
    }
  });

  // on show collapse navbar menu
  $('.collapse.navbar-collapse').on('show.bs.collapse', function () {
    let burger = $('.navbar-toggler').find("span i");
    a = true;
    burger.removeClass("fas");
    burger.removeClass("fa-bars");
    burger.addClass('far');
    burger.addClass('fa-window-close');
    change_btn_color_pry();
  });

  // on hide event listner 
  $('.collapse.navbar-collapse').on('hide.bs.collapse', function () {
    let burger = $('.navbar-toggler').find("span i");
    a = false;
    burger.addClass("fas");
    burger.addClass("fa-bars");
    burger.removeClass('far');
    burger.removeClass('fa-window-close');
    change_btn_color_lit();
  });

  // calling init functions
  slideShow();

});

//@codekit-prepend "transition.js"
//@codekit-prepend "zoom.min.js"
//@codekit-prepend "macy.min.js"
//@codekit-prepend "fluid-vid.js"
//@codekit-prepend "audio-player.js"

$(function(){

	var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	isMobile = true;
}

var main = $('main.theme');
var site_logo = $('header.theme img');
var disableParents = $('#config_theme').css('padding-left') == "1px";

if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)  { 
	$('body').addClass('safari');
}

$('.site_title i').wrap('<i></i>');
$('.site_title > i').each(function(){
	var $this = $(this).children();
	$this.clone().insertAfter($this);
});

	// Scroll Advisor
	$(window).one('load',function() {
		$('.theme_scroll_btn').addClass('show');
	});

	// Scroll Advisor
	$(window).one('scroll',function() {
		$('.theme_scroll_btn').removeClass('show');
	});

	// Video / Embed Video Banner
	var ua = window.navigator.userAgent;
	var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
	var webkit = !!ua.match(/WebKit/i);
	var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
	var localHost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

	// Load Res Tools

	if ($('#config_theme').css('padding-right') == "1px") {
		if (main.find('audio').length) {
			$('audio').audioPlayer();
		}
		if (main.find('iframe').length) {
			main.fitVids();
		}
	}

	// Conditional autoplay video banner
	$('#theme_input').has('video').show();

	// Banner Parallax
	var parallax_obj = $('.figure_cropping .parallax');

	if(parallax_obj.css('z-index') != '2'){
		var scroll = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(callback){ window.setTimeout(callback, 1000/60) };

		var lastPosition = -1;

		function loop(){
			if (lastPosition == window.pageYOffset) {
				scroll(loop);
				return false;
			} else lastPosition = window.pageYOffset;

			if ($(window).scrollTop() < 1300) {
				var top = window.pageYOffset;
				parallax_obj.css('transform','translateY('+(0+(top*.5))+'px)');
				$('.social_icons').css('transform','translateY('+(top*.15)+'px)');
			}
			scroll( loop );
		}
		loop();
	}
	var baseurl = site_logo.parent().attr('data-baseurl');
	if(site_logo.parent().attr('data-baseurl') != ''){
		site_logo.addClass('brand_link');
	}
	site_logo.on('click', function(){
		window.location.href = baseurl;
	});

	// Sticky

	var wrapper = $('body');

	$(window).scroll(function(){
		var h = wrapper.height();
		var y = $(window).scrollTop();
		if( y > (h*.1) && y < (h*.99) ){
			wrapper.addClass('nav_sticky');
		} else {
			wrapper.removeClass('nav_sticky');
		}
	});

	// Logo above Site Title
	if($('header.theme > img').css('z-index') == '2'){
		$('header.theme > img').insertAfter('header.theme');
	}

	// Insert Depth section into banner, below site title
	$('.aspen-header').insertAfter('.site_title');
	
	// Split Aside Layout
	if($('aside.theme .col_b').css('z-index') == '2'){
		$('.aspen-sidebar').appendTo('aside .col_a');
	};

	if($('aside.theme .col_b img').css('z-index') == '2'){
		$('aside .col_b img').appendTo('aside .col_a');
	};
	

	// Hook for hi-res image conversion
	$('img[alt*="2x"]').each(function(){
		$(this).addClass('hi_res');
	});

	// Social vert accent logic
	if($('aside.theme').height() > 300){
		$('.social_icons').addClass('vert_break');
	}

	// Video trigger for banner
	if($('.figure-container video').length){
		$('.figure-container').addClass('video').find('img').remove();
	}
	
	// Hoook for sub page parent arrows
	$('nav > ul > li > a + ul').prev().addClass('arrow');

	// Import Social Icons
	$('a.social-import').each(function(){
		$(this).wrap('<li>').parent().appendTo('.social_icons ul');
	});

	$('.social_icons').children().clone().appendTo('footer.theme .float_right');

	// Nav Mobile Action
	$('.nav_btn').on('click',function(){
		$('body').addClass('nav_show');
	});

	// Nav Mobile Close 
	$('.nav_close').on('click',function(){
		$('body').removeClass('nav_show');
	});

	// Nav Mobile Close 
	$('nav.theme').on('mouseenter',function(){
		$('body').addClass('nav_show_hov');
	}).on('mouseleave',function(){
		$('body').removeClass('nav_show_hov');
	});;

	// Reformat external links
	$('a[rel="external"]').attr('target', '_blank');

	// Format: Photo Album - Empty
	if (!main.find('.album-title').text().trim().length){
		main.find('.album-title').remove();
	}

	if (!main.find('.album-description').text().trim().length){
		main.find('.album-description').remove();
	}

	// Format: Breadcrumb
	if($('.breadcrumb li').children().length > 2){
		$('.breadcrumb li').first().hide();
	}

	// Blog grid
	$('.blog-entry').wrapAll('<div class="ncd-blog-wrapper"><div class="ncd-blog"></div></div>')
	

	// Format: Blog Page
	$('.blog-entry + .blog-entry').prepend('<hr style>');
	$('#blog-categories').prepend('<span class="sub-title"><i class="social-bars"></i></span><br>');
	$('#blog-archives').prepend('<span class="sub-title"><i class="social-cal"></i></span><br>');
	$('.blog-tag-cloud').prepend('<span class="sub-title"><i class="social-tag"></i></span><br>');
	$('#blog-rss-feeds').prepend('<span class="sub-title"><i class="social-rss"></i></span><br>');

	// Format: File Sharing
	$('.filesharing-item + .filesharing-item').before('<hr style>');

	// Navigation Menu Core Logic
	$('nav.theme > ul > li').has('>ul').addClass('li_parent');

	if(disableParents){
		$('nav.theme > ul > li').on('click',function(){
			$('nav.theme > ul > li').removeClass('clicked');
			$(this).addClass('clicked');
		}).on('mouseout',function(){
			if($(window).width < 770){
				$(this).removeClass('clicked');
			}
		});
	}

	$('nav.theme > ul > li.li_parent > a').on('click',function(){

		if(subOpen && disableParents == false){
			window.location = $(this).attr('href');
		}

		var sub = $(this).next(),
		$this = $(this),
		subOpen = sub.hasClass('opened'),
		subVis_1stSub = sub.is(':visible') && sub.parent().parent('ul').prev().is('div'),
		subVis_2ndSub = sub.parents('ul').is(':visible') && !sub.parent().parent('ul').prev().is('div'),
		closeSubsnotThis = function(){
			$this.parent().parent().not('ul.opened').find('ul').removeClass('opened').slideUp(250);
		},
		closeSubs = function(){
			nav.find('ul ul').removeClass('opened').slideUp(250);
			nav.find('li').removeClass('current_dot');
			nav.find('a').removeClass('opened');
		};
		closeThisSub = function(){
			sub.slideUp(250).removeClass('opened').prev().removeClass('opened').parent().removeClass('current_dot');
		};
		openThisSub = function(){
			sub.slideDown(250).addClass('opened').prev().addClass('opened').parent().addClass('current_dot');
		};

		subVis_2ndSub ? closeSubsnotThis() : closeSubs();

		if(subOpen && disableParents == false){
			window.location = $(this).attr('href')
		}else if(subOpen){
			closeThisSub()
			return false;
		}else{
			subVis_1stSub ? closeThisSub() : openThisSub()
			return false;
		}
	});

	// Photo Album Zoom

	$('.album-wrapper').addClass('cf').find('img').each(function(){
		var src = $(this).attr('src');
		$(this).closest('.thumbnail-wrap').attr('style','');
		$(this).unwrap().unwrap().attr('data-action','zoom').removeAttr('height').removeAttr('width').attr('src',src.replace('thumb','full'));
	});
	$('.thumbnail-wrap').on('click',function(){
		$('.thumbnail-wrap').not(this).addClass('hide');
		$(this).removeClass('hide');
	});

	$('.album-title').wrapInner('<h5></h5>');

	$( window ).on('load',function() {
		
		setTimeout(function(){ $('body').addClass('theme_loaded'); }, 1000);
		Macy.init({
			container: '.album-wrapper',
			trueOrder: false,
			waitForImages: false,
			margin: 30,
			columns: 4,
			breakAt: {
				1200: 3,
				940: 2,
			}
		});
	});
});
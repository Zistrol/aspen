<?php
	// Start session.
	session_start();
	
	// Set a key, checked in mailer, prevents against spammers trying to hijack the mailer.
	$security_token = $_SESSION['security_token'] = uniqid(rand());
	
	if ( ! isset($_SESSION['formMessage'])) {
		$_SESSION['formMessage'] = 'Fill in the form below to send me an email.';	
	}
	
	if ( ! isset($_SESSION['formFooter'])) {
		$_SESSION['formFooter'] = ' ';
	}
	
	if ( ! isset($_SESSION['form'])) {
		$_SESSION['form'] = array();
	}
	
	function check($field, $type = '', $value = '') {
		$string = "";
		if (isset($_SESSION['form'][$field])) {
			switch($type) {
				case 'checkbox':
					$string = 'checked="checked"';
					break;
				case 'radio':
					if($_SESSION['form'][$field] === $value) {
						$string = 'checked="checked"';
					}
					break;
				case 'select':
					if($_SESSION['form'][$field] === $value) {
						$string = 'selected="selected"';
					}
					break;
				default:
					$string = $_SESSION['form'][$field];
			}
		}
		return $string;
	}
?><!doctype html>  
<html lang="en">
<head>

	<!-- Aspen 2.0.0 -->

	
<meta http-equiv="cache-control" content="public">

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TV9QTQ7');</script>


<!-- Google Analytics for Fastspring Store - Docs: https://fastspring.com/docs/google-universal-analytics/ -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-93623912-1', 'auto');
  ga('require', 'linker');
  ga('linker:autoLink', ['realmac.onfastspring.com','realmac.test.onfastspring.com']);
  ga('send', 'pageview');
</script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-78367919-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-78367919-2');
</script>

<!-- FastSpring Popup Store-->
<script 
    id="fsc-api"
    src="https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.8.5/fastspring-builder.min.js"
    type="text/javascript"
    data-popup-closed="onFSPopupClosed"
    data-storefront="realmac.onfastspring.com/popup-products">
</script>

<!-- FastSpring redirect after purchase -->
<script>
    function onFSPopupClosed(orderReference) {
      if (orderReference)
      {
           console.log(orderReference.reference);
           fastspring.builder.reset();
           window.location.replace("http://www.realmacsoftware.com/store/thanks/?orderId=" + orderReference.reference);
      } else {
           console.log("no order ID");
          }
    }
</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="robots" content="index, follow" />
		<meta name="generator" content="RapidWeaver" />
		
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="baseurl" content="https://www.realmacsoftware.com/rapidweaver/addons/aspen/">
	<title>Contact Form - Aspen RapidWeaver 8 Theme</title>
	<link rel="stylesheet" type="text/css" media="all" href="../../rw_common/themes/aspen/consolidated-7.css?rwcache=650592735" />
		
	
	
	
	
	
</head>
<body>
  <div class="figure_bg">
    <div class="figure_cropping">
      <div class="figure-container parallax">
        <div id="theme_input"></div>
        <img src="../../rw_common/images/feature.jpg" alt="Aspen Contact Form">
      </div>
    </div><!-- Figure Crop -->
    <figure class="theme max_width_wrap">
      <header class="theme cf" data-baseurl="https://www.realmacsoftware.com/rapidweaver/addons/aspen/">
        <img src="../../rw_common/images/realmac-logo-white.png" width="382" height="110" alt="Realmac Software Logo"/>
        <div class="nav_btn offest"></div>
        <div class="nav_expand">
          <div class="nav_close">+</div>
          <nav class="theme offest cf">
            <ul class="theme cf"><li><a href="../../" rel="">Features</a></li><li><a href="../../tools/" rel="">Tools</a><ul class="theme cf"><li><a href="../../tools/autoplay-video/" rel="">Autoplay Banner</a></li><li><a href="../../tools/google-fonts/" rel="">Top 20 Google Fonts</a></li><li><a href="../../tools/rapidweaver-online-store/" rel="">Online Store</a></li><li><a href="../../tools/audio-video-player/" rel="">Audio & Video Players</a></li><li><a href="../../tools/social-icons/" rel="">Social Icons</a></li><li><a href="../../tools/theme-styles/" rel="">Theme Styles</a></li></ul></li><li class="currentParent"><a href="../../pages/" rel="">Built-in Pages</a><ul class="theme cf"><li><a href="../../pages/blog/" rel="">Blog</a></li><li><a href="../../pages/photos/" rel="">Photo Album</a></li><li><a  class="current" href="./" rel="">Contact Form</a></li><li><a href="../../pages/downloads/" rel="">File Sharing</a></li></ul></li><li><a href="https://www.realmacsoftware.com/store/" rel="">BUY NOW</a></li></ul>
          </nav>
        </div>
        <div class="float_right contact_info">
          <ul>
            <li class="special-li">
              Aspen Theme
              <a class="cartloom-viewcart">
                <span class="cartloom-cart-count">0</span>
                <span class="social-bag"></span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <section class="main_heading offest cf">
        <h1 class="site_title"><i>Contact</i> <i>Form</i></h1>
        <div class="heading_break">
          
          <div class="social_icons">
            <ul>
            </ul>
          </div>
          <span class="theme_scroll_btn">
            <a href="#">
              <span class="mouse">
                <span>
                </span>
              </span>
            </a>
          </span>
        </div>
      </section>
    </figure>
  </div>
  <aside class="theme max_width_wrap cf">
    <div class="col_a"></div>
    <div class="col_b">
      <div class="inner_content">
        <h2 class="site_slogan"></h2>
        The Contact Form page type lets visitors send messages and attachments to you via an easy-to-use form. You can completely customise the page to your specific requirements, including the use of checkboxes, radio buttons, text fields, pop-up menus and more.
      </div>
    </div>
  </aside>
  <div class="break_degree"><div></div></div>
  <main class="theme cf">
    <div class="max_width_wrap_content">
      
<div class="message-text"><?php echo $_SESSION['formMessage']; unset($_SESSION['formMessage']); ?></div><br />

<form class="rw-contact-form" action="./files/mailer.php" method="post" enctype="multipart/form-data">
	 <div>
		<label>Your Name</label> *<br />
		<input class="form-input-field" type="text" value="<?php echo check('element0'); ?>" name="form[element0]" size="40"/><br /><br />

		<label>Your Email</label> *<br />
		<input class="form-input-field" type="text" value="<?php echo check('element1'); ?>" name="form[element1]" size="40"/><br /><br />

		<label>Subject</label> *<br />
		<input class="form-input-field" type="text" value="<?php echo check('element2'); ?>" name="form[element2]" size="40"/><br /><br />

		<label>Message</label> *<br />
		<textarea class="form-input-field" name="form[element3]" rows="8" cols="38"><?php echo check('element3'); ?></textarea><br /><br />

		<div style="display: none;">
			<label>Spam Protection: Please don't fill this in:</label>
			<textarea name="comment" rows="1" cols="1"></textarea>
		</div>
		<input type="hidden" name="form_token" value="<?php echo $security_token; ?>" />
		
		<input class="form-input-button" type="submit" name="submitButton" value="Submit" />
	</div>
</form>

<br />
<div class="form-footer"><?php echo $_SESSION['formFooter']; unset($_SESSION['formFooter']); ?></div><br />

<?php unset($_SESSION['form']); ?>

      
    </div>
  </main>
  <footer class="theme max_width_wrap_content cf">
    <div class="float_left">Aspen Theme</div>
    <div class="float_right"></div>
  </footer>
  <div id="config_theme"></div>
  <script>window.jQuery || document.write('<script src="../../rw_common/themes/aspen/assets/js/jquery.js">\x3C/script>')</script>
  <script type="text/javascript" src="../../rw_common/themes/aspen/assets/js/function-min.js"></script>
<a href="https://twitter.com/realmacsoftware" class="social-import social-twitter"></a>
<a href="https://www.instagram.com/realmacsoftware/" class="social-import social-instagram"></a>
<a href="https://www.youtube.com/c/realmacsoftware/" class="social-import social-youtube"></a></body>
</html>
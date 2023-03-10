/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);


/**
 * zoom.js - It's the best way to zoom an image
 * @version v0.0.2
 * @link https://github.com/fat/zoom.js
 * @license MIT
 */

+function(t){"use strict";function o(){this._activeZoom=this._initialScrollPosition=this._initialTouchPosition=this._touchMoveListener=null,this._$document=t(document),this._$window=t(window),this._$body=t(document.body),this._boundClick=t.proxy(this._clickHandler,this)}function i(o){this._fullHeight=this._fullWidth=this._overlay=this._targetImageWrap=null,this._targetImage=o,this._$body=t(document.body)}o.prototype.listen=function(){this._$body.on("click",'[data-action="zoom"]',t.proxy(this._zoom,this))},o.prototype._zoom=function(o){var e=o.target;if(e&&"IMG"==e.tagName&&!this._$body.hasClass("zoom-overlay-open"))return o.metaKey||o.ctrlKey?window.open(o.target.getAttribute("data-original")||o.target.src,"_blank"):void(e.width>=t(window).width()-i.OFFSET||(this._activeZoomClose(!0),this._activeZoom=new i(e),this._activeZoom.zoomImage(),this._$window.on("scroll.zoom",t.proxy(this._scrollHandler,this)),this._$document.on("keyup.zoom",t.proxy(this._keyHandler,this)),this._$document.on("touchstart.zoom",t.proxy(this._touchStart,this)),document.addEventListener?document.addEventListener("click",this._boundClick,!0):document.attachEvent("onclick",this._boundClick,!0),"bubbles"in o?o.bubbles&&o.stopPropagation():o.cancelBubble=!0))},o.prototype._activeZoomClose=function(t){this._activeZoom&&(t?this._activeZoom.dispose():this._activeZoom.close(),this._$window.off(".zoom"),this._$document.off(".zoom"),document.removeEventListener("click",this._boundClick,!0),this._activeZoom=null)},o.prototype._scrollHandler=function(o){null===this._initialScrollPosition&&(this._initialScrollPosition=t(window).scrollTop());var i=this._initialScrollPosition-t(window).scrollTop();Math.abs(i)>=40&&this._activeZoomClose()},o.prototype._keyHandler=function(t){27==t.keyCode&&this._activeZoomClose()},o.prototype._clickHandler=function(t){t.preventDefault?t.preventDefault():event.returnValue=!1,"bubbles"in t?t.bubbles&&t.stopPropagation():t.cancelBubble=!0,this._activeZoomClose()},o.prototype._touchStart=function(o){this._initialTouchPosition=o.touches[0].pageY,t(o.target).on("touchmove.zoom",t.proxy(this._touchMove,this))},o.prototype._touchMove=function(o){Math.abs(o.touches[0].pageY-this._initialTouchPosition)>10&&(this._activeZoomClose(),t(o.target).off("touchmove.zoom"))},i.OFFSET=80,i._MAX_WIDTH=2560,i._MAX_HEIGHT=4096,i.prototype.zoomImage=function(){var o=document.createElement("img");o.onload=t.proxy(function(){this._fullHeight=Number(o.height),this._fullWidth=Number(o.width),this._zoomOriginal()},this),o.src=this._targetImage.src},i.prototype._zoomOriginal=function(){this._targetImageWrap=document.createElement("div"),this._targetImageWrap.className="zoom-img-wrap",this._targetImage.parentNode.insertBefore(this._targetImageWrap,this._targetImage),this._targetImageWrap.appendChild(this._targetImage),t(this._targetImage).addClass("zoom-img").attr("data-action","zoom-out"),this._overlay=document.createElement("div"),this._overlay.className="zoom-overlay",document.body.appendChild(this._overlay),this._calculateZoom(),this._triggerAnimation()},i.prototype._calculateZoom=function(){this._targetImage.offsetWidth;var o=this._fullWidth,e=this._fullHeight,a=(t(window).scrollTop(),o/this._targetImage.width),s=t(window).height()-i.OFFSET,r=t(window).width()-i.OFFSET,n=o/e,h=r/s;this._imgScaleFactor=r>o&&s>e?a:h>n?s/e*a:r/o*a},i.prototype._triggerAnimation=function(){this._targetImage.offsetWidth;var o=t(this._targetImage).offset(),i=t(window).scrollTop(),e=i+t(window).height()/2,a=t(window).width()/2,s=o.top+this._targetImage.height/2,r=o.left+this._targetImage.width/2;this._translateY=e-s,this._translateX=a-r;var n="scale("+this._imgScaleFactor+")",h="translate("+this._translateX+"px, "+this._translateY+"px)";t.support.transition&&(h+=" translateZ(0)"),t(this._targetImage).css({"-webkit-transform":n,"-ms-transform":n,transform:n}),t(this._targetImageWrap).css({"-webkit-transform":h,"-ms-transform":h,transform:h}),this._$body.addClass("zoom-overlay-open")},i.prototype.close=function(){return this._$body.removeClass("zoom-overlay-open").addClass("zoom-overlay-transitioning"),t(this._targetImage).css({"-webkit-transform":"","-ms-transform":"",transform:""}),t(this._targetImageWrap).css({"-webkit-transform":"","-ms-transform":"",transform:""}),t.support.transition?void t(this._targetImage).one(t.support.transition.end,t.proxy(this.dispose,this)).emulateTransitionEnd(300):this.dispose()},i.prototype.dispose=function(){this._targetImageWrap&&this._targetImageWrap.parentNode&&(t(this._targetImage).removeClass("zoom-img").attr("data-action","zoom"),this._targetImageWrap.parentNode.replaceChild(this._targetImage,this._targetImageWrap),this._overlay.parentNode.removeChild(this._overlay),this._$body.removeClass("zoom-overlay-transitioning"))},t(function(){(new o).listen()})}(jQuery);

/*!
 * Macy.js v1.1.2 - Macy is a lightweight, dependency free, masonry layout library
 * Author: Copyright (c) Big Bite Creative <@bigbitecreative> <http://bigbitecreative.com>
 * Url: http://macyjs.com/
 * License: MIT
 */
!function(n,e){"function"==typeof define&&define.amd?define([],function(){return e()}):"object"==typeof exports?module.exports=e():n.Macy=e()}(this,function(){"use strict";var n=function(e){var t,r={},o=1,i=function(e){for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&("[object Object]"===Object.prototype.toString.call(e[t])?r[t]=n(r[t],e[t]):r[t]=e[t])};for(i(arguments[0]),o=1;o<arguments.length;o++){var u=arguments[o];i(u)}return r},e={};e.VERSION="1.1.2",e.settings={};var t,r,o={columns:3,margin:2,trueOrder:!0,waitForImages:!1},i={options:{}},u=function(){var n,e=document.body.clientWidth;for(var t in i.options.breakAt)if(t>e){n=i.options.breakAt[t];break}return n||(n=i.options.columns),n},a=function(n){n="undefined"!=typeof n?n:!0;var e,t=u();return n?1===t?"100%":(e=(t-1)*i.options.margin/t,"calc("+100/t+"% - "+e+"px)"):100/t},c=function(){var n=a();I(i.elements,function(e,t){t.style.width=n,t.style.position="absolute"})},f=function(n){var e,t,r=u(),o=0;return n++,1===n?0:(e=(i.options.margin-(r-1)*i.options.margin/r)*(n-1),o+=a(!1)*(n-1),t="calc("+o+"% + "+e+"px)")},s=function(n,e,t){var r,o=0;if(0===n)return 0;for(var u=0;n>u;u++)r=parseInt(h(i.elements[t[u]],"height").replace("px",""),10),o+=isNaN(r)?0:r+i.options.margin;return o},l=function(n){var e=0,t=[],r=[],o=[];I(i.elements,function(o){e++,e>n&&(e=1,t.push(r),r=[]),r.push(o)}),t.push(r);for(var u=0,a=t.length;a>u;u++)for(var c=t[u],f=0,s=c.length;s>f;f++)o[f]="undefined"==typeof o[f]?[]:o[f],o[f].push(c[f]);i.rows=o,p(!1)},v=function(n){for(var e=i.elements,t=[],r=[],o=0;n>o;o++)t[o]=[];for(var u=0;u<e.length;u++)r.push(u);for(var a=0,c=r.length;c>a;a++){var f=d(t);t[f]="undefined"==typeof t[f]?[]:t[f],t[f].push(r[a])}i.rows=t,p(!0)},p=function(n){n=n||!1;for(var e=i.elements,t=i.rows,r=0,o=t.length;o>r;r++)for(var u=n?w(t[r]):t[r],a=0,c=u.length;c>a;a++){var l,v;l=f(r),v=s(a,r,u,n),e[u[a]].style.top=v+"px",e[u[a]].style.left=l}},d=function(n){for(var e,t,r,o,u=0,a=0,c=n.length;c>a;a++){for(var f=0;f<n[a].length;f++)o=parseInt(h(i.elements[n[a][f]],"height").replace("px",""),10),u+=isNaN(o)?0:o;r=t,t=void 0===t?u:t>u?u:t,(void 0===r||r>t)&&(e=a),u=0}return e},h=function(n,e){return window.getComputedStyle(n,null).getPropertyValue(e)},g=function(){for(var n=i.rows,e=0,t=0,r=0,o=n.length;o>r;r++){for(var u=0;u<n[r].length;u++)t+=parseInt(h(i.elements[n[r][u]],"height").replace("px",""),10),t+=0!==u?i.options.margin:0;e=t>e?t:e,t=0}return e},m=function(){var n=u();return 1===n?(i.container.style.height="auto",void I(i.elements,function(n,e){e.removeAttribute("style")})):(c(),i.elements=i.container.children,i.options.trueOrder?(l(n),void y()):(v(n),void y()))},y=function(){i.container.style.height=g()+"px"},w=function(n){for(var e=n,t=e.length-1,r=0;t>r;r++)for(var o=0;t>o;o++)if(e[o]>e[o+1]){var i=e[o];e[o]=e[o+1],e[o+1]=i}return e},b=function(n){return document.querySelector(n)},x=function(n){for(var e=document.querySelectorAll(n),t=[],r=e.length-1;r>=0;r--)null!==e[r].offsetParent&&t.unshift(e[r]);return t},I=function(n,e){for(var t=0,r=n.length;r>t;t++)e(t,n[t])},O=function(n,e){n=n||!1,e=e||!1,"function"==typeof n&&n(),r>=t&&"function"==typeof e&&e()},A=function(){I(i.container.children,function(n,e){e.removeAttribute("style")}),i.container.removeAttribute("style"),window.removeEventListener("resize",m)},j=function(n,e){var o=x("img");t=o.length-1,r=0,I(o,function(o,i){return i.complete?(r++,void O(n,e)):(i.addEventListener("load",function(){r++,O(n,e)}),void i.addEventListener("error",function(){t--,O(n,e)}))})};return e.init=function(e){return e.container&&(i.container=b(e.container),i.container)?(delete e.container,i.options=n(o,e),window.addEventListener("resize",m),i.container.style.position="relative",i.elements=i.container.children,i.options.waitForImages?void j(null,function(){m()}):(m(),void j(function(){m()}))):void 0},e.recalculate=m,e.onImageLoad=j,e.remove=A,e});

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
  
  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;
  
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*
  By Osvaldas Valutis, www.osvaldas.info
  Available for use under the MIT License
*/

(function(e,t,n,r){var i="ontouchstart"in t,s=i?"touchstart":"mousedown",o=i?"touchmove":"mousemove",u=i?"touchend":"mouseup",a=i?"touchcancel":"mouseup",f=function(e){var t=e/3600,n=Math.floor(t),r=e%3600/60,i=Math.floor(r),s=Math.ceil(e%3600%60);if(s>59){s=0;i=Math.ceil(r)}if(i>59){i=0;n=Math.ceil(t)}return(n==0?"":n>0&&n.toString().length<2?"0"+n+":":n+":")+(i.toString().length<2?"0"+i:i)+":"+(s.toString().length<2?"0"+s:s)},l=function(e){var t=n.createElement("audio");return!!(t.canPlayType&&t.canPlayType("audio/"+e.split(".").pop().toLowerCase()+";").replace(/no/,""))};e.fn.audioPlayer=function(t){var t=e.extend({classPrefix:"audioplayer",strPlay:"Play",strPause:"Pause",strVolume:"Volume"},t),n={},r={playPause:"playpause",playing:"playing",stopped:"stopped",time:"time",timeCurrent:"time-current",timeDuration:"time-duration",bar:"bar",barLoaded:"bar-loaded",barPlayed:"bar-played",volume:"volume",volumeButton:"volume-button",volumeAdjust:"volume-adjust",noVolume:"novolume",muted:"muted",mini:"mini"};for(var u in r)n[u]=t.classPrefix+"-"+r[u];this.each(function(){if(e(this).prop("tagName").toLowerCase()!="audio")return false;var r=e(this),u=r.attr("src"),c=r.get(0).getAttribute("autoplay"),c=c===""||c==="autoplay"?true:false,h=r.get(0).getAttribute("loop"),h=h===""||h==="loop"?true:false,p=false;if(typeof u==="undefined"){r.find("source").each(function(){u=e(this).attr("src");if(typeof u!=="undefined"&&l(u)){p=true;return false}})}else if(l(u))p=true;var d=e('<div class="'+t.classPrefix+'">'+(p?e("<div>").append(r.eq(0).clone()).html():'<embed src="'+u+'" width="0" height="0" volume="100" autostart="'+c.toString()+'" loop="'+h.toString()+'" />')+'<div class="'+n.playPause+'" title="'+t.strPlay+'"><a href="#">'+t.strPlay+"</a></div></div>"),v=p?d.find("audio"):d.find("embed"),v=v.get(0);if(p){d.find("audio").css({width:0,height:0,visibility:"hidden"});d.append('<div class="'+n.time+" "+n.timeCurrent+'"></div><div class="'+n.bar+'"><div class="'+n.barLoaded+'"></div><div class="'+n.barPlayed+'"></div></div><div class="'+n.time+" "+n.timeDuration+'"></div><div class="'+n.volume+'"><div class="'+n.volumeButton+'" title="'+t.strVolume+'"><a href="#">'+t.strVolume+'</a></div><div class="'+n.volumeAdjust+'"><div><div></div></div></div></div>');var m=d.find("."+n.bar),g=d.find("."+n.barPlayed),y=d.find("."+n.barLoaded),b=d.find("."+n.timeCurrent),w=d.find("."+n.timeDuration),E=d.find("."+n.volumeButton),S=d.find("."+n.volumeAdjust+" > div"),x=0,T=function(e){theRealEvent=i?e.originalEvent.touches[0]:e;v.currentTime=Math.round(v.duration*(theRealEvent.pageX-m.offset().left)/m.width())},N=function(e){theRealEvent=i?e.originalEvent.touches[0]:e;v.volume=Math.abs((theRealEvent.pageY-(S.offset().top+S.height()))/S.height())},C=function(){var e=setInterval(function(){if(v.buffered.length<1)return true;y.width(v.buffered.end(0)/v.duration*100+"%");if(Math.floor(v.buffered.end(0))>=Math.floor(v.duration))clearInterval(e)},100)};var k=v.volume,L=v.volume=.111;if(Math.round(v.volume*1e3)/1e3==L)v.volume=k;else d.addClass(n.noVolume);w.html("???");b.html(f(0));v.addEventListener("loadeddata",function(){C();w.html(e.isNumeric(v.duration)?f(v.duration):"???");S.find("div").height(v.volume*100+"%");x=v.volume});v.addEventListener("timeupdate",function(){b.html(f(v.currentTime));g.width(v.currentTime/v.duration*100+"%")});v.addEventListener("volumechange",function(){S.find("div").height(v.volume*100+"%");if(v.volume>0&&d.hasClass(n.muted))d.removeClass(n.muted);if(v.volume<=0&&!d.hasClass(n.muted))d.addClass(n.muted)});v.addEventListener("ended",function(){d.removeClass(n.playing).addClass(n.stopped)});m.on(s,function(e){T(e);m.on(o,function(e){T(e)})}).on(a,function(){m.unbind(o)});E.on("click",function(){if(d.hasClass(n.muted)){d.removeClass(n.muted);v.volume=x}else{d.addClass(n.muted);x=v.volume;v.volume=0}return false});S.on(s,function(e){N(e);S.on(o,function(e){N(e)})}).on(a,function(){S.unbind(o)})}else d.addClass(n.mini);d.addClass(c?n.playing:n.stopped);d.find("."+n.playPause).on("click",function(){if(d.hasClass(n.playing)){e(this).attr("title",t.strPlay).find("a").html(t.strPlay);d.removeClass(n.playing).addClass(n.stopped);p?v.pause():v.Stop()}else{e(this).attr("title",t.strPause).find("a").html(t.strPause);d.addClass(n.playing).removeClass(n.stopped);p?v.play():v.Play()}return false});r.replaceWith(d)});return this}})(jQuery,window,document)

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
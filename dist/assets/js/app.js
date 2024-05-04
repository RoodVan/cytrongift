/* Plugins                                        
--------------------------------------------------------*/
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
/**
 * @popperjs/core v2.11.6 - MIT License
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(){var e=navigator.userAgentData;return null!=e&&e.brands?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function c(){return!/^((?!chrome|android).)*safari/i.test(f())}function p(e,o,i){void 0===o&&(o=!1),void 0===i&&(i=!1);var a=e.getBoundingClientRect(),f=1,p=1;o&&r(e)&&(f=e.offsetWidth>0&&s(a.width)/e.offsetWidth||1,p=e.offsetHeight>0&&s(a.height)/e.offsetHeight||1);var u=(n(e)?t(e):window).visualViewport,l=!c()&&i,d=(a.left+(l&&u?u.offsetLeft:0))/f,h=(a.top+(l&&u?u.offsetTop:0))/p,m=a.width/f,v=a.height/p;return{width:m,height:v,top:h,right:d+m,bottom:h+v,left:d,x:d,y:h}}function u(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function l(e){return e?(e.nodeName||"").toLowerCase():null}function d(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function h(e){return p(d(e)).left+u(e).scrollLeft}function m(e){return t(e).getComputedStyle(e)}function v(e){var t=m(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function y(e,n,o){void 0===o&&(o=!1);var i,a,f=r(n),c=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),m=d(n),y=p(e,c,o),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(f||!f&&!o)&&(("body"!==l(n)||v(m))&&(g=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:u(i)),r(n)?((b=p(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):m&&(b.x=h(m))),{x:y.left+g.scrollLeft-b.x,y:y.top+g.scrollTop-b.y,width:y.width,height:y.height}}function g(e){var t=p(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function b(e){return"html"===l(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||d(e)}function w(e){return["html","body","#document"].indexOf(l(e))>=0?e.ownerDocument.body:r(e)&&v(e)?e:w(b(e))}function x(e,n){var r;void 0===n&&(n=[]);var o=w(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],v(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(x(b(s)))}function O(e){return["table","td","th"].indexOf(l(e))>=0}function j(e){return r(e)&&"fixed"!==m(e).position?e.offsetParent:null}function E(e){for(var n=t(e),i=j(e);i&&O(i)&&"static"===m(i).position;)i=j(i);return i&&("html"===l(i)||"body"===l(i)&&"static"===m(i).position)?n:i||function(e){var t=/firefox/i.test(f());if(/Trident/i.test(f())&&r(e)&&"fixed"===m(e).position)return null;var n=b(e);for(o(n)&&(n=n.host);r(n)&&["html","body"].indexOf(l(n))<0;){var i=m(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||t&&"filter"===i.willChange||t&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(e)||n}var D="top",A="bottom",L="right",P="left",M="auto",k=[D,A,L,P],W="start",B="end",H="viewport",T="popper",R=k.reduce((function(e,t){return e.concat([t+"-"+W,t+"-"+B])}),[]),S=[].concat(k,[M]).reduce((function(e,t){return e.concat([t,t+"-"+W,t+"-"+B])}),[]),V=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function q(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function C(e){return e.split("-")[0]}function N(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function I(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function _(e,r,o){return r===H?I(function(e,n){var r=t(e),o=d(e),i=r.visualViewport,a=o.clientWidth,s=o.clientHeight,f=0,p=0;if(i){a=i.width,s=i.height;var u=c();(u||!u&&"fixed"===n)&&(f=i.offsetLeft,p=i.offsetTop)}return{width:a,height:s,x:f+h(e),y:p}}(e,o)):n(r)?function(e,t){var n=p(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(r,o):I(function(e){var t,n=d(e),r=u(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+h(e),c=-r.scrollTop;return"rtl"===m(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:c}}(d(e)))}function F(e,t,o,s){var f="clippingParents"===t?function(e){var t=x(b(e)),o=["absolute","fixed"].indexOf(m(e).position)>=0&&r(e)?E(e):e;return n(o)?t.filter((function(e){return n(e)&&N(e,o)&&"body"!==l(e)})):[]}(e):[].concat(t),c=[].concat(f,[o]),p=c[0],u=c.reduce((function(t,n){var r=_(e,n,s);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),_(e,p,s));return u.width=u.right-u.left,u.height=u.bottom-u.top,u.x=u.left,u.y=u.top,u}function U(e){return e.split("-")[1]}function z(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function X(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?C(o):null,a=o?U(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case D:t={x:s,y:n.y-r.height};break;case A:t={x:s,y:n.y+n.height};break;case L:t={x:n.x+n.width,y:f};break;case P:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?z(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case W:t[c]=t[c]-(n[p]/2-r[p]/2);break;case B:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function G(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function J(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.strategy,s=void 0===a?e.strategy:a,f=r.boundary,c=void 0===f?"clippingParents":f,u=r.rootBoundary,l=void 0===u?H:u,h=r.elementContext,m=void 0===h?T:h,v=r.altBoundary,y=void 0!==v&&v,g=r.padding,b=void 0===g?0:g,w=Y("number"!=typeof b?b:G(b,k)),x=m===T?"reference":T,O=e.rects.popper,j=e.elements[y?x:m],E=F(n(j)?j:j.contextElement||d(e.elements.popper),c,l,s),P=p(e.elements.reference),M=X({reference:P,element:O,strategy:"absolute",placement:i}),W=I(Object.assign({},O,M)),B=m===T?W:P,R={top:E.top-B.top+w.top,bottom:B.bottom-E.bottom+w.bottom,left:E.left-B.left+w.left,right:B.right-E.right+w.right},S=e.modifiersData.offset;if(m===T&&S){var V=S[i];Object.keys(R).forEach((function(e){var t=[L,A].indexOf(e)>=0?1:-1,n=[D,A].indexOf(e)>=0?"y":"x";R[e]+=V[n]*t}))}return R}var K={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Z(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?K:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},K,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,u={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?x(e):e.contextElement?x(e.contextElement):[],popper:x(t)};var s,p,d=function(e){var t=q(e);return V.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),p=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:u,options:r}),a=function(){};c.push(i||a)}})),u.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(Q(t,n)){f.rects={reference:y(t,E(n),"fixed"===f.options.strategy),popper:g(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:u})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){u.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),p=!0}};if(!Q(e,t))return u;function l(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(r).then((function(e){!p&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var $={passive:!0};var ee={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,$)})),f&&c.addEventListener("resize",r.update,$),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,$)})),f&&c.removeEventListener("resize",r.update,$)}},data:{}};var te={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=X({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ne={top:"auto",right:"auto",bottom:"auto",left:"auto"};function re(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,h=e.isFixed,v=f.x,y=void 0===v?0:v,g=f.y,b=void 0===g?0:g,w="function"==typeof l?l({x:y,y:b}):{x:y,y:b};y=w.x,b=w.y;var x=f.hasOwnProperty("x"),O=f.hasOwnProperty("y"),j=P,M=D,k=window;if(u){var W=E(r),H="clientHeight",T="clientWidth";if(W===t(r)&&"static"!==m(W=d(r)).position&&"absolute"===c&&(H="scrollHeight",T="scrollWidth"),W=W,i===D||(i===P||i===L)&&a===B)M=A,b-=(h&&W===k&&k.visualViewport?k.visualViewport.height:W[H])-o.height,b*=p?1:-1;if(i===P||(i===D||i===A)&&a===B)j=L,y-=(h&&W===k&&k.visualViewport?k.visualViewport.width:W[T])-o.width,y*=p?1:-1}var R,S=Object.assign({position:c},u&&ne),V=!0===l?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:s(t*r)/r||0,y:s(n*r)/r||0}}({x:y,y:b}):{x:y,y:b};return y=V.x,b=V.y,p?Object.assign({},S,((R={})[M]=O?"0":"",R[j]=x?"0":"",R.transform=(k.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",R)):Object.assign({},S,((n={})[M]=O?b+"px":"",n[j]=x?y+"px":"",n.transform="",n))}var oe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:C(t.placement),variation:U(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,re(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,re(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var ie={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&l(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&l(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};var ae={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=S.reduce((function(e,n){return e[n]=function(e,t,n){var r=C(e),o=[P,D].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,L].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},se={left:"right",right:"left",bottom:"top",top:"bottom"};function fe(e){return e.replace(/left|right|bottom|top/g,(function(e){return se[e]}))}var ce={start:"end",end:"start"};function pe(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function ue(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?S:f,p=U(r),u=p?s?R:R.filter((function(e){return U(e)===p})):k,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=J(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[C(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var le={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=t.options.placement,y=C(v),g=f||(y===v||!h?[fe(v)]:function(e){if(C(e)===M)return[];var t=fe(e);return[pe(e),t,pe(t)]}(v)),b=[v].concat(g).reduce((function(e,n){return e.concat(C(n)===M?ue(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,j=!0,E=b[0],k=0;k<b.length;k++){var B=b[k],H=C(B),T=U(B)===W,R=[D,A].indexOf(H)>=0,S=R?"width":"height",V=J(t,{placement:B,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),q=R?T?L:P:T?A:D;w[S]>x[S]&&(q=fe(q));var N=fe(q),I=[];if(i&&I.push(V[H]<=0),s&&I.push(V[q]<=0,V[N]<=0),I.every((function(e){return e}))){E=B,j=!1;break}O.set(B,I)}if(j)for(var _=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},F=h?3:1;F>0;F--){if("break"===_(F))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function de(e,t,n){return i(e,a(t,n))}var he={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.padding,h=n.tether,m=void 0===h||h,v=n.tetherOffset,y=void 0===v?0:v,b=J(t,{boundary:p,rootBoundary:u,padding:d,altBoundary:l}),w=C(t.placement),x=U(t.placement),O=!x,j=z(w),M="x"===j?"y":"x",k=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,T="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof T?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0};if(k){if(s){var q,N="y"===j?D:P,I="y"===j?A:L,_="y"===j?"height":"width",F=k[j],X=F+b[N],Y=F-b[I],G=m?-H[_]/2:0,K=x===W?B[_]:H[_],Q=x===W?-H[_]:-B[_],Z=t.elements.arrow,$=m&&Z?g(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[N],ne=ee[I],re=de(0,B[_],$[_]),oe=O?B[_]/2-G-re-te-R.mainAxis:K-re-te-R.mainAxis,ie=O?-B[_]/2+G+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ae=t.elements.arrow&&E(t.elements.arrow),se=ae?"y"===j?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==S?void 0:S[j])?q:0,ce=F+ie-fe,pe=de(m?a(X,F+oe-fe-se):X,F,m?i(Y,ce):Y);k[j]=pe,V[j]=pe-F}if(c){var ue,le="x"===j?D:P,he="x"===j?A:L,me=k[M],ve="y"===M?"height":"width",ye=me+b[le],ge=me-b[he],be=-1!==[D,P].indexOf(w),we=null!=(ue=null==S?void 0:S[M])?ue:0,xe=be?ye:me-B[ve]-H[ve]-we+R.altAxis,Oe=be?me+B[ve]+H[ve]-we-R.altAxis:ge,je=m&&be?function(e,t,n){var r=de(e,t,n);return r>n?n:r}(xe,me,Oe):de(m?xe:ye,me,m?Oe:ge);k[M]=je,V[M]=je-me}t.modifiersData[r]=V}},requiresIfExists:["offset"]};var me={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=C(n.placement),f=z(s),c=[P,L].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:G(e,k))}(o.padding,n),u=g(i),l="y"===f?D:P,d="y"===f?A:L,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],m=a[f]-n.rects.reference[f],v=E(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=h/2-m/2,w=p[l],x=y-u[c]-p[d],O=y/2-u[c]/2+b,j=de(w,O,x),M=f;n.modifiersData[r]=((t={})[M]=j,t.centerOffset=j-O,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&N(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ve(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[D,L,A,P].some((function(t){return e[t]>=0}))}var ge={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=J(t,{elementContext:"reference"}),s=J(t,{altBoundary:!0}),f=ve(a,r),c=ve(s,o,i),p=ye(f),u=ye(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},be=Z({defaultModifiers:[ee,te,oe,ie]}),we=[ee,te,oe,ie,ae,le,he,me,ge],xe=Z({defaultModifiers:we});e.applyStyles=ie,e.arrow=me,e.computeStyles=oe,e.createPopper=xe,e.createPopperLite=be,e.defaultModifiers=we,e.detectOverflow=J,e.eventListeners=ee,e.flip=le,e.hide=ge,e.offset=ae,e.popperGenerator=Z,e.popperOffsets=te,e.preventOverflow=he,Object.defineProperty(e,"__esModule",{value:!0})}));

/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/

(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory(require('@popperjs/core')):typeof define==='function'&&define.amd?define(['@popperjs/core'],factory):(global=global||self,global.tippy=factory(global.Popper));}(this,(function(core){'use strict';var css=".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#121620;box-shadow: 15px 15px 30px rgba(14, 12, 12, 0.1);color:#FEFEFE;border-radius:10px;font-size:13px;line-height:20px;padding:15px 20px;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-8px;left:0;border-width:9px 9px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-8px;left:0;border-width:0 9px 9px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:9px 0 9px 9px;border-left-color:initial;right:-8px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-8px;border-width:9px 9px 9px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:18px;height:18px;color:#121620}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;z-index:1}";function injectCSS(css){var style=document.createElement('style');style.textContent=css;style.setAttribute('data-tippy-stylesheet','');var head=document.head;var firstStyleOrLinkTag=document.querySelector('head>style,head>link');if(firstStyleOrLinkTag){head.insertBefore(style,firstStyleOrLinkTag);}else{head.appendChild(style);}}
var isBrowser=typeof window!=='undefined'&&typeof document!=='undefined';var isIE11=isBrowser?!!window.msCrypto:false;var ROUND_ARROW='<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';var BOX_CLASS="tippy-box";var CONTENT_CLASS="tippy-content";var BACKDROP_CLASS="tippy-backdrop";var ARROW_CLASS="tippy-arrow";var SVG_ARROW_CLASS="tippy-svg-arrow";var TOUCH_OPTIONS={passive:true,capture:true};var TIPPY_DEFAULT_APPEND_TO=function TIPPY_DEFAULT_APPEND_TO(){return document.body;};function hasOwnProperty(obj,key){return{}.hasOwnProperty.call(obj,key);}
function getValueAtIndexOrReturn(value,index,defaultValue){if(Array.isArray(value)){var v=value[index];return v==null?Array.isArray(defaultValue)?defaultValue[index]:defaultValue:v;}
return value;}
function isType(value,type){var str={}.toString.call(value);return str.indexOf('[object')===0&&str.indexOf(type+"]")>-1;}
function invokeWithArgsOrReturn(value,args){return typeof value==='function'?value.apply(void 0,args):value;}
function debounce(fn,ms){if(ms===0){return fn;}
var timeout;return function(arg){clearTimeout(timeout);timeout=setTimeout(function(){fn(arg);},ms);};}
function removeProperties(obj,keys){var clone=Object.assign({},obj);keys.forEach(function(key){delete clone[key];});return clone;}
function splitBySpaces(value){return value.split(/\s+/).filter(Boolean);}
function normalizeToArray(value){return[].concat(value);}
function pushIfUnique(arr,value){if(arr.indexOf(value)===-1){arr.push(value);}}
function unique(arr){return arr.filter(function(item,index){return arr.indexOf(item)===index;});}
function getBasePlacement(placement){return placement.split('-')[0];}
function arrayFrom(value){return[].slice.call(value);}
function removeUndefinedProps(obj){return Object.keys(obj).reduce(function(acc,key){if(obj[key]!==undefined){acc[key]=obj[key];}
return acc;},{});}
function div(){return document.createElement('div');}
function isElement(value){return['Element','Fragment'].some(function(type){return isType(value,type);});}
function isNodeList(value){return isType(value,'NodeList');}
function isMouseEvent(value){return isType(value,'MouseEvent');}
function isReferenceElement(value){return!!(value&&value._tippy&&value._tippy.reference===value);}
function getArrayOfElements(value){if(isElement(value)){return[value];}
if(isNodeList(value)){return arrayFrom(value);}
if(Array.isArray(value)){return value;}
return arrayFrom(document.querySelectorAll(value));}
function setTransitionDuration(els,value){els.forEach(function(el){if(el){el.style.transitionDuration=value+"ms";}});}
function setVisibilityState(els,state){els.forEach(function(el){if(el){el.setAttribute('data-state',state);}});}
function getOwnerDocument(elementOrElements){var _element$ownerDocumen;var _normalizeToArray=normalizeToArray(elementOrElements),element=_normalizeToArray[0];return element!=null&&(_element$ownerDocumen=element.ownerDocument)!=null&&_element$ownerDocumen.body?element.ownerDocument:document;}
function isCursorOutsideInteractiveBorder(popperTreeData,event){var clientX=event.clientX,clientY=event.clientY;return popperTreeData.every(function(_ref){var popperRect=_ref.popperRect,popperState=_ref.popperState,props=_ref.props;var interactiveBorder=props.interactiveBorder;var basePlacement=getBasePlacement(popperState.placement);var offsetData=popperState.modifiersData.offset;if(!offsetData){return true;}
var topDistance=basePlacement==='bottom'?offsetData.top.y:0;var bottomDistance=basePlacement==='top'?offsetData.bottom.y:0;var leftDistance=basePlacement==='right'?offsetData.left.x:0;var rightDistance=basePlacement==='left'?offsetData.right.x:0;var exceedsTop=popperRect.top-clientY+topDistance>interactiveBorder;var exceedsBottom=clientY-popperRect.bottom-bottomDistance>interactiveBorder;var exceedsLeft=popperRect.left-clientX+leftDistance>interactiveBorder;var exceedsRight=clientX-popperRect.right-rightDistance>interactiveBorder;return exceedsTop||exceedsBottom||exceedsLeft||exceedsRight;});}
function updateTransitionEndListener(box,action,listener){var method=action+"EventListener";['transitionend','webkitTransitionEnd'].forEach(function(event){box[method](event,listener);});}
function actualContains(parent,child){var target=child;while(target){var _target$getRootNode;if(parent.contains(target)){return true;}
target=target.getRootNode==null?void 0:(_target$getRootNode=target.getRootNode())==null?void 0:_target$getRootNode.host;}
return false;}
var currentInput={isTouch:false};var lastMouseMoveTime=0;function onDocumentTouchStart(){if(currentInput.isTouch){return;}
currentInput.isTouch=true;if(window.performance){document.addEventListener('mousemove',onDocumentMouseMove);}}
function onDocumentMouseMove(){var now=performance.now();if(now-lastMouseMoveTime<20){currentInput.isTouch=false;document.removeEventListener('mousemove',onDocumentMouseMove);}
lastMouseMoveTime=now;}
function onWindowBlur(){var activeElement=document.activeElement;if(isReferenceElement(activeElement)){var instance=activeElement._tippy;if(activeElement.blur&&!instance.state.isVisible){activeElement.blur();}}}
function bindGlobalEventListeners(){document.addEventListener('touchstart',onDocumentTouchStart,TOUCH_OPTIONS);window.addEventListener('blur',onWindowBlur);}
function createMemoryLeakWarning(method){var txt=method==='destroy'?'n already-':' ';return[method+"() was called on a"+txt+"destroyed instance. This is a no-op but",'indicates a potential memory leak.'].join(' ');}
function clean(value){var spacesAndTabs=/[ \t]{2,}/g;var lineStartWithSpaces=/^[ \t]*/gm;return value.replace(spacesAndTabs,' ').replace(lineStartWithSpaces,'').trim();}
function getDevMessage(message){return clean("\n  %ctippy.js\n\n  %c"+clean(message)+"\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");}
function getFormattedMessage(message){return[getDevMessage(message),'color: #00C584; font-size: 1.3em; font-weight: bold;','line-height: 1.5','color: #a6a095;'];}
var visitedMessages;{resetVisitedMessages();}
function resetVisitedMessages(){visitedMessages=new Set();}
function warnWhen(condition,message){if(condition&&!visitedMessages.has(message)){var _console;visitedMessages.add(message);(_console=console).warn.apply(_console,getFormattedMessage(message));}}
function errorWhen(condition,message){if(condition&&!visitedMessages.has(message)){var _console2;visitedMessages.add(message);(_console2=console).error.apply(_console2,getFormattedMessage(message));}}
function validateTargets(targets){var didPassFalsyValue=!targets;var didPassPlainObject=Object.prototype.toString.call(targets)==='[object Object]'&&!targets.addEventListener;errorWhen(didPassFalsyValue,['tippy() was passed','`'+String(targets)+'`','as its targets (first) argument. Valid types are: String, Element,','Element[], or NodeList.'].join(' '));errorWhen(didPassPlainObject,['tippy() was passed a plain object which is not supported as an argument','for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));}
var pluginProps={animateFill:false,followCursor:false,inlinePositioning:false,sticky:false};var renderProps={allowHTML:false,animation:'fade',arrow:true,content:'',inertia:false,maxWidth:350,role:'tooltip',theme:'',zIndex:9999};var defaultProps=Object.assign({appendTo:TIPPY_DEFAULT_APPEND_TO,aria:{content:'auto',expanded:'auto'},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:true,ignoreAttributes:false,interactive:false,interactiveBorder:2,interactiveDebounce:0,moveTransition:'',offset:[0,10],onAfterUpdate:function onAfterUpdate(){},onBeforeUpdate:function onBeforeUpdate(){},onCreate:function onCreate(){},onDestroy:function onDestroy(){},onHidden:function onHidden(){},onHide:function onHide(){},onMount:function onMount(){},onShow:function onShow(){},onShown:function onShown(){},onTrigger:function onTrigger(){},onUntrigger:function onUntrigger(){},onClickOutside:function onClickOutside(){},placement:'top',plugins:[],popperOptions:{},render:null,showOnCreate:false,touch:true,trigger:'mouseenter focus',triggerTarget:null},pluginProps,renderProps);var defaultKeys=Object.keys(defaultProps);var setDefaultProps=function setDefaultProps(partialProps){{validateProps(partialProps,[]);}
var keys=Object.keys(partialProps);keys.forEach(function(key){defaultProps[key]=partialProps[key];});};function getExtendedPassedProps(passedProps){var plugins=passedProps.plugins||[];var pluginProps=plugins.reduce(function(acc,plugin){var name=plugin.name,defaultValue=plugin.defaultValue;if(name){var _name;acc[name]=passedProps[name]!==undefined?passedProps[name]:(_name=defaultProps[name])!=null?_name:defaultValue;}
return acc;},{});return Object.assign({},passedProps,pluginProps);}
function getDataAttributeProps(reference,plugins){var propKeys=plugins?Object.keys(getExtendedPassedProps(Object.assign({},defaultProps,{plugins:plugins}))):defaultKeys;var props=propKeys.reduce(function(acc,key){var valueAsString=(reference.getAttribute("data-tippy-"+key)||'').trim();if(!valueAsString){return acc;}
if(key==='content'){acc[key]=valueAsString;}else{try{acc[key]=JSON.parse(valueAsString);}catch(e){acc[key]=valueAsString;}}
return acc;},{});return props;}
function evaluateProps(reference,props){var out=Object.assign({},props,{content:invokeWithArgsOrReturn(props.content,[reference])},props.ignoreAttributes?{}:getDataAttributeProps(reference,props.plugins));out.aria=Object.assign({},defaultProps.aria,out.aria);out.aria={expanded:out.aria.expanded==='auto'?props.interactive:out.aria.expanded,content:out.aria.content==='auto'?props.interactive?null:'describedby':out.aria.content};return out;}
function validateProps(partialProps,plugins){if(partialProps===void 0){partialProps={};}
if(plugins===void 0){plugins=[];}
var keys=Object.keys(partialProps);keys.forEach(function(prop){var nonPluginProps=removeProperties(defaultProps,Object.keys(pluginProps));var didPassUnknownProp=!hasOwnProperty(nonPluginProps,prop);if(didPassUnknownProp){didPassUnknownProp=plugins.filter(function(plugin){return plugin.name===prop;}).length===0;}
warnWhen(didPassUnknownProp,["`"+prop+"`","is not a valid prop. You may have spelled it incorrectly, or if it's",'a plugin, forgot to pass it in an array as props.plugins.','\n\n','All props: https://atomiks.github.io/tippyjs/v6/all-props/\n','Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));});}
var innerHTML=function innerHTML(){return'innerHTML';};function dangerouslySetInnerHTML(element,html){element[innerHTML()]=html;}
function createArrowElement(value){var arrow=div();if(value===true){arrow.className=ARROW_CLASS;}else{arrow.className=SVG_ARROW_CLASS;if(isElement(value)){arrow.appendChild(value);}else{dangerouslySetInnerHTML(arrow,value);}}
return arrow;}
function setContent(content,props){if(isElement(props.content)){dangerouslySetInnerHTML(content,'');content.appendChild(props.content);}else if(typeof props.content!=='function'){if(props.allowHTML){dangerouslySetInnerHTML(content,props.content);}else{content.textContent=props.content;}}}
function getChildren(popper){var box=popper.firstElementChild;var boxChildren=arrayFrom(box.children);return{box:box,content:boxChildren.find(function(node){return node.classList.contains(CONTENT_CLASS);}),arrow:boxChildren.find(function(node){return node.classList.contains(ARROW_CLASS)||node.classList.contains(SVG_ARROW_CLASS);}),backdrop:boxChildren.find(function(node){return node.classList.contains(BACKDROP_CLASS);})};}
function render(instance){var popper=div();var box=div();box.className=BOX_CLASS;box.setAttribute('data-state','hidden');box.setAttribute('tabindex','-1');var content=div();content.className=CONTENT_CLASS;content.setAttribute('data-state','hidden');setContent(content,instance.props);popper.appendChild(box);box.appendChild(content);onUpdate(instance.props,instance.props);function onUpdate(prevProps,nextProps){var _getChildren=getChildren(popper),box=_getChildren.box,content=_getChildren.content,arrow=_getChildren.arrow;if(nextProps.theme){box.setAttribute('data-theme',nextProps.theme);}else{box.removeAttribute('data-theme');}
if(typeof nextProps.animation==='string'){box.setAttribute('data-animation',nextProps.animation);}else{box.removeAttribute('data-animation');}
if(nextProps.inertia){box.setAttribute('data-inertia','');}else{box.removeAttribute('data-inertia');}
box.style.maxWidth=typeof nextProps.maxWidth==='number'?nextProps.maxWidth+"px":nextProps.maxWidth;if(nextProps.role){box.setAttribute('role',nextProps.role);}else{box.removeAttribute('role');}
if(prevProps.content!==nextProps.content||prevProps.allowHTML!==nextProps.allowHTML){setContent(content,instance.props);}
if(nextProps.arrow){if(!arrow){box.appendChild(createArrowElement(nextProps.arrow));}else if(prevProps.arrow!==nextProps.arrow){box.removeChild(arrow);box.appendChild(createArrowElement(nextProps.arrow));}}else if(arrow){box.removeChild(arrow);}}
return{popper:popper,onUpdate:onUpdate};}
render.$$tippy=true;var idCounter=1;var mouseMoveListeners=[];var mountedInstances=[];function createTippy(reference,passedProps){var props=evaluateProps(reference,Object.assign({},defaultProps,getExtendedPassedProps(removeUndefinedProps(passedProps))));var showTimeout;var hideTimeout;var scheduleHideAnimationFrame;var isVisibleFromClick=false;var didHideDueToDocumentMouseDown=false;var didTouchMove=false;var ignoreOnFirstUpdate=false;var lastTriggerEvent;var currentTransitionEndListener;var onFirstUpdate;var listeners=[];var debouncedOnMouseMove=debounce(onMouseMove,props.interactiveDebounce);var currentTarget;var id=idCounter++;var popperInstance=null;var plugins=unique(props.plugins);var state={isEnabled:true,isVisible:false,isDestroyed:false,isMounted:false,isShown:false};var instance={id:id,reference:reference,popper:div(),popperInstance:popperInstance,props:props,state:state,plugins:plugins,clearDelayTimeouts:clearDelayTimeouts,setProps:setProps,setContent:setContent,show:show,hide:hide,hideWithInteractivity:hideWithInteractivity,enable:enable,disable:disable,unmount:unmount,destroy:destroy};if(!props.render){{errorWhen(true,'render() function has not been supplied.');}
return instance;}
var _props$render=props.render(instance),popper=_props$render.popper,onUpdate=_props$render.onUpdate;popper.setAttribute('data-tippy-root','');popper.id="tippy-"+instance.id;instance.popper=popper;reference._tippy=instance;popper._tippy=instance;var pluginsHooks=plugins.map(function(plugin){return plugin.fn(instance);});var hasAriaExpanded=reference.hasAttribute('aria-expanded');addListeners();handleAriaExpandedAttribute();handleStyles();invokeHook('onCreate',[instance]);if(props.showOnCreate){scheduleShow();}
popper.addEventListener('mouseenter',function(){if(instance.props.interactive&&instance.state.isVisible){instance.clearDelayTimeouts();}});popper.addEventListener('mouseleave',function(){if(instance.props.interactive&&instance.props.trigger.indexOf('mouseenter')>=0){getDocument().addEventListener('mousemove',debouncedOnMouseMove);}});return instance;function getNormalizedTouchSettings(){var touch=instance.props.touch;return Array.isArray(touch)?touch:[touch,0];}
function getIsCustomTouchBehavior(){return getNormalizedTouchSettings()[0]==='hold';}
function getIsDefaultRenderFn(){var _instance$props$rende;return!!((_instance$props$rende=instance.props.render)!=null&&_instance$props$rende.$$tippy);}
function getCurrentTarget(){return currentTarget||reference;}
function getDocument(){var parent=getCurrentTarget().parentNode;return parent?getOwnerDocument(parent):document;}
function getDefaultTemplateChildren(){return getChildren(popper);}
function getDelay(isShow){if(instance.state.isMounted&&!instance.state.isVisible||currentInput.isTouch||lastTriggerEvent&&lastTriggerEvent.type==='focus'){return 0;}
return getValueAtIndexOrReturn(instance.props.delay,isShow?0:1,defaultProps.delay);}
function handleStyles(fromHide){if(fromHide===void 0){fromHide=false;}
popper.style.pointerEvents=instance.props.interactive&&!fromHide?'':'none';popper.style.zIndex=""+instance.props.zIndex;}
function invokeHook(hook,args,shouldInvokePropsHook){if(shouldInvokePropsHook===void 0){shouldInvokePropsHook=true;}
pluginsHooks.forEach(function(pluginHooks){if(pluginHooks[hook]){pluginHooks[hook].apply(pluginHooks,args);}});if(shouldInvokePropsHook){var _instance$props;(_instance$props=instance.props)[hook].apply(_instance$props,args);}}
function handleAriaContentAttribute(){var aria=instance.props.aria;if(!aria.content){return;}
var attr="aria-"+aria.content;var id=popper.id;var nodes=normalizeToArray(instance.props.triggerTarget||reference);nodes.forEach(function(node){var currentValue=node.getAttribute(attr);if(instance.state.isVisible){node.setAttribute(attr,currentValue?currentValue+" "+id:id);}else{var nextValue=currentValue&&currentValue.replace(id,'').trim();if(nextValue){node.setAttribute(attr,nextValue);}else{node.removeAttribute(attr);}}});}
function handleAriaExpandedAttribute(){if(hasAriaExpanded||!instance.props.aria.expanded){return;}
var nodes=normalizeToArray(instance.props.triggerTarget||reference);nodes.forEach(function(node){if(instance.props.interactive){node.setAttribute('aria-expanded',instance.state.isVisible&&node===getCurrentTarget()?'true':'false');}else{node.removeAttribute('aria-expanded');}});}
function cleanupInteractiveMouseListeners(){getDocument().removeEventListener('mousemove',debouncedOnMouseMove);mouseMoveListeners=mouseMoveListeners.filter(function(listener){return listener!==debouncedOnMouseMove;});}
function onDocumentPress(event){if(currentInput.isTouch){if(didTouchMove||event.type==='mousedown'){return;}}
var actualTarget=event.composedPath&&event.composedPath()[0]||event.target;if(instance.props.interactive&&actualContains(popper,actualTarget)){return;}
if(normalizeToArray(instance.props.triggerTarget||reference).some(function(el){return actualContains(el,actualTarget);})){if(currentInput.isTouch){return;}
if(instance.state.isVisible&&instance.props.trigger.indexOf('click')>=0){return;}}else{invokeHook('onClickOutside',[instance,event]);}
if(instance.props.hideOnClick===true){instance.clearDelayTimeouts();instance.hide();didHideDueToDocumentMouseDown=true;setTimeout(function(){didHideDueToDocumentMouseDown=false;});if(!instance.state.isMounted){removeDocumentPress();}}}
function onTouchMove(){didTouchMove=true;}
function onTouchStart(){didTouchMove=false;}
function addDocumentPress(){var doc=getDocument();doc.addEventListener('mousedown',onDocumentPress,true);doc.addEventListener('touchend',onDocumentPress,TOUCH_OPTIONS);doc.addEventListener('touchstart',onTouchStart,TOUCH_OPTIONS);doc.addEventListener('touchmove',onTouchMove,TOUCH_OPTIONS);}
function removeDocumentPress(){var doc=getDocument();doc.removeEventListener('mousedown',onDocumentPress,true);doc.removeEventListener('touchend',onDocumentPress,TOUCH_OPTIONS);doc.removeEventListener('touchstart',onTouchStart,TOUCH_OPTIONS);doc.removeEventListener('touchmove',onTouchMove,TOUCH_OPTIONS);}
function onTransitionedOut(duration,callback){onTransitionEnd(duration,function(){if(!instance.state.isVisible&&popper.parentNode&&popper.parentNode.contains(popper)){callback();}});}
function onTransitionedIn(duration,callback){onTransitionEnd(duration,callback);}
function onTransitionEnd(duration,callback){var box=getDefaultTemplateChildren().box;function listener(event){if(event.target===box){updateTransitionEndListener(box,'remove',listener);callback();}}
if(duration===0){return callback();}
updateTransitionEndListener(box,'remove',currentTransitionEndListener);updateTransitionEndListener(box,'add',listener);currentTransitionEndListener=listener;}
function on(eventType,handler,options){if(options===void 0){options=false;}
var nodes=normalizeToArray(instance.props.triggerTarget||reference);nodes.forEach(function(node){node.addEventListener(eventType,handler,options);listeners.push({node:node,eventType:eventType,handler:handler,options:options});});}
function addListeners(){if(getIsCustomTouchBehavior()){on('touchstart',onTrigger,{passive:true});on('touchend',onMouseLeave,{passive:true});}
splitBySpaces(instance.props.trigger).forEach(function(eventType){if(eventType==='manual'){return;}
on(eventType,onTrigger);switch(eventType){case'mouseenter':on('mouseleave',onMouseLeave);break;case'focus':on(isIE11?'focusout':'blur',onBlurOrFocusOut);break;case'focusin':on('focusout',onBlurOrFocusOut);break;}});}
function removeListeners(){listeners.forEach(function(_ref){var node=_ref.node,eventType=_ref.eventType,handler=_ref.handler,options=_ref.options;node.removeEventListener(eventType,handler,options);});listeners=[];}
function onTrigger(event){var _lastTriggerEvent;var shouldScheduleClickHide=false;if(!instance.state.isEnabled||isEventListenerStopped(event)||didHideDueToDocumentMouseDown){return;}
var wasFocused=((_lastTriggerEvent=lastTriggerEvent)==null?void 0:_lastTriggerEvent.type)==='focus';lastTriggerEvent=event;currentTarget=event.currentTarget;handleAriaExpandedAttribute();if(!instance.state.isVisible&&isMouseEvent(event)){mouseMoveListeners.forEach(function(listener){return listener(event);});}
if(event.type==='click'&&(instance.props.trigger.indexOf('mouseenter')<0||isVisibleFromClick)&&instance.props.hideOnClick!==false&&instance.state.isVisible){shouldScheduleClickHide=true;}else{scheduleShow(event);}
if(event.type==='click'){isVisibleFromClick=!shouldScheduleClickHide;}
if(shouldScheduleClickHide&&!wasFocused){scheduleHide(event);}}
function onMouseMove(event){var target=event.target;var isCursorOverReferenceOrPopper=getCurrentTarget().contains(target)||popper.contains(target);if(event.type==='mousemove'&&isCursorOverReferenceOrPopper){return;}
var popperTreeData=getNestedPopperTree().concat(popper).map(function(popper){var _instance$popperInsta;var instance=popper._tippy;var state=(_instance$popperInsta=instance.popperInstance)==null?void 0:_instance$popperInsta.state;if(state){return{popperRect:popper.getBoundingClientRect(),popperState:state,props:props};}
return null;}).filter(Boolean);if(isCursorOutsideInteractiveBorder(popperTreeData,event)){cleanupInteractiveMouseListeners();scheduleHide(event);}}
function onMouseLeave(event){var shouldBail=isEventListenerStopped(event)||instance.props.trigger.indexOf('click')>=0&&isVisibleFromClick;if(shouldBail){return;}
if(instance.props.interactive){instance.hideWithInteractivity(event);return;}
scheduleHide(event);}
function onBlurOrFocusOut(event){if(instance.props.trigger.indexOf('focusin')<0&&event.target!==getCurrentTarget()){return;}
if(instance.props.interactive&&event.relatedTarget&&popper.contains(event.relatedTarget)){return;}
scheduleHide(event);}
function isEventListenerStopped(event){return currentInput.isTouch?getIsCustomTouchBehavior()!==event.type.indexOf('touch')>=0:false;}
function createPopperInstance(){destroyPopperInstance();var _instance$props2=instance.props,popperOptions=_instance$props2.popperOptions,placement=_instance$props2.placement,offset=_instance$props2.offset,getReferenceClientRect=_instance$props2.getReferenceClientRect,moveTransition=_instance$props2.moveTransition;var arrow=getIsDefaultRenderFn()?getChildren(popper).arrow:null;var computedReference=getReferenceClientRect?{getBoundingClientRect:getReferenceClientRect,contextElement:getReferenceClientRect.contextElement||getCurrentTarget()}:reference;var tippyModifier={name:'$$tippy',enabled:true,phase:'beforeWrite',requires:['computeStyles'],fn:function fn(_ref2){var state=_ref2.state;if(getIsDefaultRenderFn()){var _getDefaultTemplateCh=getDefaultTemplateChildren(),box=_getDefaultTemplateCh.box;['placement','reference-hidden','escaped'].forEach(function(attr){if(attr==='placement'){box.setAttribute('data-placement',state.placement);}else{if(state.attributes.popper["data-popper-"+attr]){box.setAttribute("data-"+attr,'');}else{box.removeAttribute("data-"+attr);}}});state.attributes.popper={};}}};var modifiers=[{name:'offset',options:{offset:offset}},{name:'preventOverflow',options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:'flip',options:{padding:5}},{name:'computeStyles',options:{adaptive:!moveTransition}},tippyModifier];if(getIsDefaultRenderFn()&&arrow){modifiers.push({name:'arrow',options:{element:arrow,padding:3}});}
modifiers.push.apply(modifiers,(popperOptions==null?void 0:popperOptions.modifiers)||[]);instance.popperInstance=core.createPopper(computedReference,popper,Object.assign({},popperOptions,{placement:placement,onFirstUpdate:onFirstUpdate,modifiers:modifiers}));}
function destroyPopperInstance(){if(instance.popperInstance){instance.popperInstance.destroy();instance.popperInstance=null;}}
function mount(){var appendTo=instance.props.appendTo;var parentNode;var node=getCurrentTarget();if(instance.props.interactive&&appendTo===TIPPY_DEFAULT_APPEND_TO||appendTo==='parent'){parentNode=node.parentNode;}else{parentNode=invokeWithArgsOrReturn(appendTo,[node]);}
if(!parentNode.contains(popper)){parentNode.appendChild(popper);}
instance.state.isMounted=true;createPopperInstance();{warnWhen(instance.props.interactive&&appendTo===defaultProps.appendTo&&node.nextElementSibling!==popper,['Interactive tippy element may not be accessible via keyboard','navigation because it is not directly after the reference element','in the DOM source order.','\n\n','Using a wrapper <div> or <span> tag around the reference element','solves this by creating a new parentNode context.','\n\n','Specifying `appendTo: document.body` silences this warning, but it','assumes you are using a focus management solution to handle','keyboard navigation.','\n\n','See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));}}
function getNestedPopperTree(){return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));}
function scheduleShow(event){instance.clearDelayTimeouts();if(event){invokeHook('onTrigger',[instance,event]);}
addDocumentPress();var delay=getDelay(true);var _getNormalizedTouchSe=getNormalizedTouchSettings(),touchValue=_getNormalizedTouchSe[0],touchDelay=_getNormalizedTouchSe[1];if(currentInput.isTouch&&touchValue==='hold'&&touchDelay){delay=touchDelay;}
if(delay){showTimeout=setTimeout(function(){instance.show();},delay);}else{instance.show();}}
function scheduleHide(event){instance.clearDelayTimeouts();invokeHook('onUntrigger',[instance,event]);if(!instance.state.isVisible){removeDocumentPress();return;}
if(instance.props.trigger.indexOf('mouseenter')>=0&&instance.props.trigger.indexOf('click')>=0&&['mouseleave','mousemove'].indexOf(event.type)>=0&&isVisibleFromClick){return;}
var delay=getDelay(false);if(delay){hideTimeout=setTimeout(function(){if(instance.state.isVisible){instance.hide();}},delay);}else{scheduleHideAnimationFrame=requestAnimationFrame(function(){instance.hide();});}}
function enable(){instance.state.isEnabled=true;}
function disable(){instance.hide();instance.state.isEnabled=false;}
function clearDelayTimeouts(){clearTimeout(showTimeout);clearTimeout(hideTimeout);cancelAnimationFrame(scheduleHideAnimationFrame);}
function setProps(partialProps){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('setProps'));}
if(instance.state.isDestroyed){return;}
invokeHook('onBeforeUpdate',[instance,partialProps]);removeListeners();var prevProps=instance.props;var nextProps=evaluateProps(reference,Object.assign({},prevProps,removeUndefinedProps(partialProps),{ignoreAttributes:true}));instance.props=nextProps;addListeners();if(prevProps.interactiveDebounce!==nextProps.interactiveDebounce){cleanupInteractiveMouseListeners();debouncedOnMouseMove=debounce(onMouseMove,nextProps.interactiveDebounce);}
if(prevProps.triggerTarget&&!nextProps.triggerTarget){normalizeToArray(prevProps.triggerTarget).forEach(function(node){node.removeAttribute('aria-expanded');});}else if(nextProps.triggerTarget){reference.removeAttribute('aria-expanded');}
handleAriaExpandedAttribute();handleStyles();if(onUpdate){onUpdate(prevProps,nextProps);}
if(instance.popperInstance){createPopperInstance();getNestedPopperTree().forEach(function(nestedPopper){requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);});}
invokeHook('onAfterUpdate',[instance,partialProps]);}
function setContent(content){instance.setProps({content:content});}
function show(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('show'));}
var isAlreadyVisible=instance.state.isVisible;var isDestroyed=instance.state.isDestroyed;var isDisabled=!instance.state.isEnabled;var isTouchAndTouchDisabled=currentInput.isTouch&&!instance.props.touch;var duration=getValueAtIndexOrReturn(instance.props.duration,0,defaultProps.duration);if(isAlreadyVisible||isDestroyed||isDisabled||isTouchAndTouchDisabled){return;}
if(getCurrentTarget().hasAttribute('disabled')){return;}
invokeHook('onShow',[instance],false);if(instance.props.onShow(instance)===false){return;}
instance.state.isVisible=true;if(getIsDefaultRenderFn()){popper.style.visibility='visible';}
handleStyles();addDocumentPress();if(!instance.state.isMounted){popper.style.transition='none';}
if(getIsDefaultRenderFn()){var _getDefaultTemplateCh2=getDefaultTemplateChildren(),box=_getDefaultTemplateCh2.box,content=_getDefaultTemplateCh2.content;setTransitionDuration([box,content],0);}
onFirstUpdate=function onFirstUpdate(){var _instance$popperInsta2;if(!instance.state.isVisible||ignoreOnFirstUpdate){return;}
ignoreOnFirstUpdate=true;void popper.offsetHeight;popper.style.transition=instance.props.moveTransition;if(getIsDefaultRenderFn()&&instance.props.animation){var _getDefaultTemplateCh3=getDefaultTemplateChildren(),_box=_getDefaultTemplateCh3.box,_content=_getDefaultTemplateCh3.content;setTransitionDuration([_box,_content],duration);setVisibilityState([_box,_content],'visible');}
handleAriaContentAttribute();handleAriaExpandedAttribute();pushIfUnique(mountedInstances,instance);(_instance$popperInsta2=instance.popperInstance)==null?void 0:_instance$popperInsta2.forceUpdate();invokeHook('onMount',[instance]);if(instance.props.animation&&getIsDefaultRenderFn()){onTransitionedIn(duration,function(){instance.state.isShown=true;invokeHook('onShown',[instance]);});}};mount();}
function hide(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('hide'));}
var isAlreadyHidden=!instance.state.isVisible;var isDestroyed=instance.state.isDestroyed;var isDisabled=!instance.state.isEnabled;var duration=getValueAtIndexOrReturn(instance.props.duration,1,defaultProps.duration);if(isAlreadyHidden||isDestroyed||isDisabled){return;}
invokeHook('onHide',[instance],false);if(instance.props.onHide(instance)===false){return;}
instance.state.isVisible=false;instance.state.isShown=false;ignoreOnFirstUpdate=false;isVisibleFromClick=false;if(getIsDefaultRenderFn()){popper.style.visibility='hidden';}
cleanupInteractiveMouseListeners();removeDocumentPress();handleStyles(true);if(getIsDefaultRenderFn()){var _getDefaultTemplateCh4=getDefaultTemplateChildren(),box=_getDefaultTemplateCh4.box,content=_getDefaultTemplateCh4.content;if(instance.props.animation){setTransitionDuration([box,content],duration);setVisibilityState([box,content],'hidden');}}
handleAriaContentAttribute();handleAriaExpandedAttribute();if(instance.props.animation){if(getIsDefaultRenderFn()){onTransitionedOut(duration,instance.unmount);}}else{instance.unmount();}}
function hideWithInteractivity(event){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('hideWithInteractivity'));}
getDocument().addEventListener('mousemove',debouncedOnMouseMove);pushIfUnique(mouseMoveListeners,debouncedOnMouseMove);debouncedOnMouseMove(event);}
function unmount(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('unmount'));}
if(instance.state.isVisible){instance.hide();}
if(!instance.state.isMounted){return;}
destroyPopperInstance();getNestedPopperTree().forEach(function(nestedPopper){nestedPopper._tippy.unmount();});if(popper.parentNode){popper.parentNode.removeChild(popper);}
mountedInstances=mountedInstances.filter(function(i){return i!==instance;});instance.state.isMounted=false;invokeHook('onHidden',[instance]);}
function destroy(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('destroy'));}
if(instance.state.isDestroyed){return;}
instance.clearDelayTimeouts();instance.unmount();removeListeners();delete reference._tippy;instance.state.isDestroyed=true;invokeHook('onDestroy',[instance]);}}
function tippy(targets,optionalProps){if(optionalProps===void 0){optionalProps={};}
var plugins=defaultProps.plugins.concat(optionalProps.plugins||[]);{validateTargets(targets);validateProps(optionalProps,plugins);}
bindGlobalEventListeners();var passedProps=Object.assign({},optionalProps,{plugins:plugins});var elements=getArrayOfElements(targets);{var isSingleContentElement=isElement(passedProps.content);var isMoreThanOneReferenceElement=elements.length>1;warnWhen(isSingleContentElement&&isMoreThanOneReferenceElement,['tippy() was passed an Element as the `content` prop, but more than','one tippy instance was created by this invocation. This means the','content element will only be appended to the last tippy instance.','\n\n','Instead, pass the .innerHTML of the element, or use a function that','returns a cloned version of the element instead.','\n\n','1) content: element.innerHTML\n','2) content: () => element.cloneNode(true)'].join(' '));}
var instances=elements.reduce(function(acc,reference){var instance=reference&&createTippy(reference,passedProps);if(instance){acc.push(instance);}
return acc;},[]);return isElement(targets)?instances[0]:instances;}
tippy.defaultProps=defaultProps;tippy.setDefaultProps=setDefaultProps;tippy.currentInput=currentInput;var hideAll=function hideAll(_temp){var _ref=_temp===void 0?{}:_temp,excludedReferenceOrInstance=_ref.exclude,duration=_ref.duration;mountedInstances.forEach(function(instance){var isExcluded=false;if(excludedReferenceOrInstance){isExcluded=isReferenceElement(excludedReferenceOrInstance)?instance.reference===excludedReferenceOrInstance:instance.popper===excludedReferenceOrInstance.popper;}
if(!isExcluded){var originalDuration=instance.props.duration;instance.setProps({duration:duration});instance.hide();if(!instance.state.isDestroyed){instance.setProps({duration:originalDuration});}}});};var applyStylesModifier=Object.assign({},core.applyStyles,{effect:function effect(_ref){var state=_ref.state;var initialStyles={popper:{position:state.options.strategy,left:'0',top:'0',margin:'0'},arrow:{position:'absolute'},reference:{}};Object.assign(state.elements.popper.style,initialStyles.popper);state.styles=initialStyles;if(state.elements.arrow){Object.assign(state.elements.arrow.style,initialStyles.arrow);}}});var createSingleton=function createSingleton(tippyInstances,optionalProps){var _optionalProps$popper;if(optionalProps===void 0){optionalProps={};}
{errorWhen(!Array.isArray(tippyInstances),['The first argument passed to createSingleton() must be an array of','tippy instances. The passed value was',String(tippyInstances)].join(' '));}
var individualInstances=tippyInstances;var references=[];var triggerTargets=[];var currentTarget;var overrides=optionalProps.overrides;var interceptSetPropsCleanups=[];var shownOnCreate=false;function setTriggerTargets(){triggerTargets=individualInstances.map(function(instance){return normalizeToArray(instance.props.triggerTarget||instance.reference);}).reduce(function(acc,item){return acc.concat(item);},[]);}
function setReferences(){references=individualInstances.map(function(instance){return instance.reference;});}
function enableInstances(isEnabled){individualInstances.forEach(function(instance){if(isEnabled){instance.enable();}else{instance.disable();}});}
function interceptSetProps(singleton){return individualInstances.map(function(instance){var originalSetProps=instance.setProps;instance.setProps=function(props){originalSetProps(props);if(instance.reference===currentTarget){singleton.setProps(props);}};return function(){instance.setProps=originalSetProps;};});}
function prepareInstance(singleton,target){var index=triggerTargets.indexOf(target);if(target===currentTarget){return;}
currentTarget=target;var overrideProps=(overrides||[]).concat('content').reduce(function(acc,prop){acc[prop]=individualInstances[index].props[prop];return acc;},{});singleton.setProps(Object.assign({},overrideProps,{getReferenceClientRect:typeof overrideProps.getReferenceClientRect==='function'?overrideProps.getReferenceClientRect:function(){var _references$index;return(_references$index=references[index])==null?void 0:_references$index.getBoundingClientRect();}}));}
enableInstances(false);setReferences();setTriggerTargets();var plugin={fn:function fn(){return{onDestroy:function onDestroy(){enableInstances(true);},onHidden:function onHidden(){currentTarget=null;},onClickOutside:function onClickOutside(instance){if(instance.props.showOnCreate&&!shownOnCreate){shownOnCreate=true;currentTarget=null;}},onShow:function onShow(instance){if(instance.props.showOnCreate&&!shownOnCreate){shownOnCreate=true;prepareInstance(instance,references[0]);}},onTrigger:function onTrigger(instance,event){prepareInstance(instance,event.currentTarget);}};}};var singleton=tippy(div(),Object.assign({},removeProperties(optionalProps,['overrides']),{plugins:[plugin].concat(optionalProps.plugins||[]),triggerTarget:triggerTargets,popperOptions:Object.assign({},optionalProps.popperOptions,{modifiers:[].concat(((_optionalProps$popper=optionalProps.popperOptions)==null?void 0:_optionalProps$popper.modifiers)||[],[applyStylesModifier])})}));var originalShow=singleton.show;singleton.show=function(target){originalShow();if(!currentTarget&&target==null){return prepareInstance(singleton,references[0]);}
if(currentTarget&&target==null){return;}
if(typeof target==='number'){return references[target]&&prepareInstance(singleton,references[target]);}
if(individualInstances.indexOf(target)>=0){var ref=target.reference;return prepareInstance(singleton,ref);}
if(references.indexOf(target)>=0){return prepareInstance(singleton,target);}};singleton.showNext=function(){var first=references[0];if(!currentTarget){return singleton.show(0);}
var index=references.indexOf(currentTarget);singleton.show(references[index+1]||first);};singleton.showPrevious=function(){var last=references[references.length-1];if(!currentTarget){return singleton.show(last);}
var index=references.indexOf(currentTarget);var target=references[index-1]||last;singleton.show(target);};var originalSetProps=singleton.setProps;singleton.setProps=function(props){overrides=props.overrides||overrides;originalSetProps(props);};singleton.setInstances=function(nextInstances){enableInstances(true);interceptSetPropsCleanups.forEach(function(fn){return fn();});individualInstances=nextInstances;enableInstances(false);setReferences();setTriggerTargets();interceptSetPropsCleanups=interceptSetProps(singleton);singleton.setProps({triggerTarget:triggerTargets});};interceptSetPropsCleanups=interceptSetProps(singleton);return singleton;};var BUBBLING_EVENTS_MAP={mouseover:'mouseenter',focusin:'focus',click:'click'};function delegate(targets,props){{errorWhen(!(props&&props.target),['You must specity a `target` prop indicating a CSS selector string matching','the target elements that should receive a tippy.'].join(' '));}
var listeners=[];var childTippyInstances=[];var disabled=false;var target=props.target;var nativeProps=removeProperties(props,['target']);var parentProps=Object.assign({},nativeProps,{trigger:'manual',touch:false});var childProps=Object.assign({touch:defaultProps.touch},nativeProps,{showOnCreate:true});var returnValue=tippy(targets,parentProps);var normalizedReturnValue=normalizeToArray(returnValue);function onTrigger(event){if(!event.target||disabled){return;}
var targetNode=event.target.closest(target);if(!targetNode){return;}
var trigger=targetNode.getAttribute('data-tippy-trigger')||props.trigger||defaultProps.trigger;if(targetNode._tippy){return;}
if(event.type==='touchstart'&&typeof childProps.touch==='boolean'){return;}
if(event.type!=='touchstart'&&trigger.indexOf(BUBBLING_EVENTS_MAP[event.type])<0){return;}
var instance=tippy(targetNode,childProps);if(instance){childTippyInstances=childTippyInstances.concat(instance);}}
function on(node,eventType,handler,options){if(options===void 0){options=false;}
node.addEventListener(eventType,handler,options);listeners.push({node:node,eventType:eventType,handler:handler,options:options});}
function addEventListeners(instance){var reference=instance.reference;on(reference,'touchstart',onTrigger,TOUCH_OPTIONS);on(reference,'mouseover',onTrigger);on(reference,'focusin',onTrigger);on(reference,'click',onTrigger);}
function removeEventListeners(){listeners.forEach(function(_ref){var node=_ref.node,eventType=_ref.eventType,handler=_ref.handler,options=_ref.options;node.removeEventListener(eventType,handler,options);});listeners=[];}
function applyMutations(instance){var originalDestroy=instance.destroy;var originalEnable=instance.enable;var originalDisable=instance.disable;instance.destroy=function(shouldDestroyChildInstances){if(shouldDestroyChildInstances===void 0){shouldDestroyChildInstances=true;}
if(shouldDestroyChildInstances){childTippyInstances.forEach(function(instance){instance.destroy();});}
childTippyInstances=[];removeEventListeners();originalDestroy();};instance.enable=function(){originalEnable();childTippyInstances.forEach(function(instance){return instance.enable();});disabled=false;};instance.disable=function(){originalDisable();childTippyInstances.forEach(function(instance){return instance.disable();});disabled=true;};addEventListeners(instance);}
normalizedReturnValue.forEach(applyMutations);return returnValue;}
var animateFill={name:'animateFill',defaultValue:false,fn:function fn(instance){var _instance$props$rende;if(!((_instance$props$rende=instance.props.render)!=null&&_instance$props$rende.$$tippy)){{errorWhen(instance.props.animateFill,'The `animateFill` plugin requires the default render function.');}
return{};}
var _getChildren=getChildren(instance.popper),box=_getChildren.box,content=_getChildren.content;var backdrop=instance.props.animateFill?createBackdropElement():null;return{onCreate:function onCreate(){if(backdrop){box.insertBefore(backdrop,box.firstElementChild);box.setAttribute('data-animatefill','');box.style.overflow='hidden';instance.setProps({arrow:false,animation:'shift-away'});}},onMount:function onMount(){if(backdrop){var transitionDuration=box.style.transitionDuration;var duration=Number(transitionDuration.replace('ms',''));content.style.transitionDelay=Math.round(duration/10)+"ms";backdrop.style.transitionDuration=transitionDuration;setVisibilityState([backdrop],'visible');}},onShow:function onShow(){if(backdrop){backdrop.style.transitionDuration='0ms';}},onHide:function onHide(){if(backdrop){setVisibilityState([backdrop],'hidden');}}};}};function createBackdropElement(){var backdrop=div();backdrop.className=BACKDROP_CLASS;setVisibilityState([backdrop],'hidden');return backdrop;}
var mouseCoords={clientX:0,clientY:0};var activeInstances=[];function storeMouseCoords(_ref){var clientX=_ref.clientX,clientY=_ref.clientY;mouseCoords={clientX:clientX,clientY:clientY};}
function addMouseCoordsListener(doc){doc.addEventListener('mousemove',storeMouseCoords);}
function removeMouseCoordsListener(doc){doc.removeEventListener('mousemove',storeMouseCoords);}
var followCursor={name:'followCursor',defaultValue:false,fn:function fn(instance){var reference=instance.reference;var doc=getOwnerDocument(instance.props.triggerTarget||reference);var isInternalUpdate=false;var wasFocusEvent=false;var isUnmounted=true;var prevProps=instance.props;function getIsInitialBehavior(){return instance.props.followCursor==='initial'&&instance.state.isVisible;}
function addListener(){doc.addEventListener('mousemove',onMouseMove);}
function removeListener(){doc.removeEventListener('mousemove',onMouseMove);}
function unsetGetReferenceClientRect(){isInternalUpdate=true;instance.setProps({getReferenceClientRect:null});isInternalUpdate=false;}
function onMouseMove(event){var isCursorOverReference=event.target?reference.contains(event.target):true;var followCursor=instance.props.followCursor;var clientX=event.clientX,clientY=event.clientY;var rect=reference.getBoundingClientRect();var relativeX=clientX-rect.left;var relativeY=clientY-rect.top;if(isCursorOverReference||!instance.props.interactive){instance.setProps({getReferenceClientRect:function getReferenceClientRect(){var rect=reference.getBoundingClientRect();var x=clientX;var y=clientY;if(followCursor==='initial'){x=rect.left+relativeX;y=rect.top+relativeY;}
var top=followCursor==='horizontal'?rect.top:y;var right=followCursor==='vertical'?rect.right:x;var bottom=followCursor==='horizontal'?rect.bottom:y;var left=followCursor==='vertical'?rect.left:x;return{width:right-left,height:bottom-top,top:top,right:right,bottom:bottom,left:left};}});}}
function create(){if(instance.props.followCursor){activeInstances.push({instance:instance,doc:doc});addMouseCoordsListener(doc);}}
function destroy(){activeInstances=activeInstances.filter(function(data){return data.instance!==instance;});if(activeInstances.filter(function(data){return data.doc===doc;}).length===0){removeMouseCoordsListener(doc);}}
return{onCreate:create,onDestroy:destroy,onBeforeUpdate:function onBeforeUpdate(){prevProps=instance.props;},onAfterUpdate:function onAfterUpdate(_,_ref2){var followCursor=_ref2.followCursor;if(isInternalUpdate){return;}
if(followCursor!==undefined&&prevProps.followCursor!==followCursor){destroy();if(followCursor){create();if(instance.state.isMounted&&!wasFocusEvent&&!getIsInitialBehavior()){addListener();}}else{removeListener();unsetGetReferenceClientRect();}}},onMount:function onMount(){if(instance.props.followCursor&&!wasFocusEvent){if(isUnmounted){onMouseMove(mouseCoords);isUnmounted=false;}
if(!getIsInitialBehavior()){addListener();}}},onTrigger:function onTrigger(_,event){if(isMouseEvent(event)){mouseCoords={clientX:event.clientX,clientY:event.clientY};}
wasFocusEvent=event.type==='focus';},onHidden:function onHidden(){if(instance.props.followCursor){unsetGetReferenceClientRect();removeListener();isUnmounted=true;}}};}};function getProps(props,modifier){var _props$popperOptions;return{popperOptions:Object.assign({},props.popperOptions,{modifiers:[].concat((((_props$popperOptions=props.popperOptions)==null?void 0:_props$popperOptions.modifiers)||[]).filter(function(_ref){var name=_ref.name;return name!==modifier.name;}),[modifier])})};}
var inlinePositioning={name:'inlinePositioning',defaultValue:false,fn:function fn(instance){var reference=instance.reference;function isEnabled(){return!!instance.props.inlinePositioning;}
var placement;var cursorRectIndex=-1;var isInternalUpdate=false;var triedPlacements=[];var modifier={name:'tippyInlinePositioning',enabled:true,phase:'afterWrite',fn:function fn(_ref2){var state=_ref2.state;if(isEnabled()){if(triedPlacements.indexOf(state.placement)!==-1){triedPlacements=[];}
if(placement!==state.placement&&triedPlacements.indexOf(state.placement)===-1){triedPlacements.push(state.placement);instance.setProps({getReferenceClientRect:function getReferenceClientRect(){return _getReferenceClientRect(state.placement);}});}
placement=state.placement;}}};function _getReferenceClientRect(placement){return getInlineBoundingClientRect(getBasePlacement(placement),reference.getBoundingClientRect(),arrayFrom(reference.getClientRects()),cursorRectIndex);}
function setInternalProps(partialProps){isInternalUpdate=true;instance.setProps(partialProps);isInternalUpdate=false;}
function addModifier(){if(!isInternalUpdate){setInternalProps(getProps(instance.props,modifier));}}
return{onCreate:addModifier,onAfterUpdate:addModifier,onTrigger:function onTrigger(_,event){if(isMouseEvent(event)){var rects=arrayFrom(instance.reference.getClientRects());var cursorRect=rects.find(function(rect){return rect.left-2<=event.clientX&&rect.right+2>=event.clientX&&rect.top-2<=event.clientY&&rect.bottom+2>=event.clientY;});var index=rects.indexOf(cursorRect);cursorRectIndex=index>-1?index:cursorRectIndex;}},onHidden:function onHidden(){cursorRectIndex=-1;}};}};function getInlineBoundingClientRect(currentBasePlacement,boundingRect,clientRects,cursorRectIndex){if(clientRects.length<2||currentBasePlacement===null){return boundingRect;}
if(clientRects.length===2&&cursorRectIndex>=0&&clientRects[0].left>clientRects[1].right){return clientRects[cursorRectIndex]||boundingRect;}
switch(currentBasePlacement){case'top':case'bottom':{var firstRect=clientRects[0];var lastRect=clientRects[clientRects.length-1];var isTop=currentBasePlacement==='top';var top=firstRect.top;var bottom=lastRect.bottom;var left=isTop?firstRect.left:lastRect.left;var right=isTop?firstRect.right:lastRect.right;var width=right-left;var height=bottom-top;return{top:top,bottom:bottom,left:left,right:right,width:width,height:height};}
case'left':case'right':{var minLeft=Math.min.apply(Math,clientRects.map(function(rects){return rects.left;}));var maxRight=Math.max.apply(Math,clientRects.map(function(rects){return rects.right;}));var measureRects=clientRects.filter(function(rect){return currentBasePlacement==='left'?rect.left===minLeft:rect.right===maxRight;});var _top=measureRects[0].top;var _bottom=measureRects[measureRects.length-1].bottom;var _left=minLeft;var _right=maxRight;var _width=_right-_left;var _height=_bottom-_top;return{top:_top,bottom:_bottom,left:_left,right:_right,width:_width,height:_height};}
default:{return boundingRect;}}}
var sticky={name:'sticky',defaultValue:false,fn:function fn(instance){var reference=instance.reference,popper=instance.popper;function getReference(){return instance.popperInstance?instance.popperInstance.state.elements.reference:reference;}
function shouldCheck(value){return instance.props.sticky===true||instance.props.sticky===value;}
var prevRefRect=null;var prevPopRect=null;function updatePosition(){var currentRefRect=shouldCheck('reference')?getReference().getBoundingClientRect():null;var currentPopRect=shouldCheck('popper')?popper.getBoundingClientRect():null;if(currentRefRect&&areRectsDifferent(prevRefRect,currentRefRect)||currentPopRect&&areRectsDifferent(prevPopRect,currentPopRect)){if(instance.popperInstance){instance.popperInstance.update();}}
prevRefRect=currentRefRect;prevPopRect=currentPopRect;if(instance.state.isMounted){requestAnimationFrame(updatePosition);}}
return{onMount:function onMount(){if(instance.props.sticky){updatePosition();}}};}};function areRectsDifferent(rectA,rectB){if(rectA&&rectB){return rectA.top!==rectB.top||rectA.right!==rectB.right||rectA.bottom!==rectB.bottom||rectA.left!==rectB.left;}
return true;}
if(isBrowser){injectCSS(css);}
tippy.setDefaultProps({plugins:[animateFill,followCursor,inlinePositioning,sticky],render:render});tippy.createSingleton=createSingleton;tippy.delegate=delegate;tippy.hideAll=hideAll;tippy.roundArrow=ROUND_ARROW;return tippy;})));
/*!
 * jquery-confirm v3.3.4 (http://craftpip.github.io/jquery-confirm/)
 * Author: Boniface Pereira
 * Website: www.craftpip.com
 * Contact: hey@craftpip.com
 *
 * Copyright 2013-2019 jquery-confirm
 * Licensed under MIT (https://github.com/craftpip/jquery-confirm/blob/master/LICENSE)
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(i,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(i)),t(n),n}:t(jQuery)}((function(t){"use strict";var i=window;t.fn.confirm=function(n,o){return void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1}),t(this).each((function(){var o=t(this);o.attr("jc-attached")||(o.on("click",(function(e){e.preventDefault();var s=t.extend({},n);if(o.attr("data-title")&&(s.title=o.attr("data-title")),o.attr("data-content")&&(s.content=o.attr("data-content")),void 0===s.buttons&&(s.buttons={}),s.$target=o,o.attr("href")&&0===Object.keys(s.buttons).length){var a=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{}),c=Object.keys(a)[0];s.buttons=a,s.buttons[c].action=function(){location.href=o.attr("href")}}s.closeIcon=!1;t.confirm(s)})),o.attr("jc-attached",!0))})),t(this)},t.confirm=function(n,o){void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1});var e=!(!1===n.buttons);if("object"!=typeof n.buttons&&(n.buttons={}),0===Object.keys(n.buttons).length&&e){var s=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{});n.buttons=s}return i.jconfirm(n)},t.alert=function(n,o){void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1});var e=!(!1===n.buttons);if("object"!=typeof n.buttons&&(n.buttons={}),0===Object.keys(n.buttons).length&&e){var s=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{}),a=Object.keys(s)[0];n.buttons[a]=s[a]}return i.jconfirm(n)},t.dialog=function(t,n){return void 0===t&&(t={}),"string"==typeof t&&(t={content:t,title:n||!1,closeIcon:function(){}}),t.buttons={},void 0===t.closeIcon&&(t.closeIcon=function(){}),t.confirmKeys=[13],i.jconfirm(t)},i.jconfirm=function(n){void 0===n&&(n={});var o=t.extend(!0,{},i.jconfirm.pluginDefaults);i.jconfirm.defaults&&(o=t.extend(!0,o,i.jconfirm.defaults)),o=t.extend(!0,{},o,n);var e=new i.Jconfirm(o);return i.jconfirm.instances.push(e),e},i.Jconfirm=function(i){t.extend(this,i),this._init()},i.Jconfirm.prototype={_init:function(){var n=this;i.jconfirm.instances.length||(i.jconfirm.lastFocused=t("body").find(":focus")),this._id=Math.round(99999*Math.random()),this.contentParsed=t(document.createElement("div")),this.lazyOpen||setTimeout((function(){n.open()}),0)},_buildHTML:function(){var i=this;this._parseAnimation(this.animation,"o"),this._parseAnimation(this.closeAnimation,"c"),this._parseBgDismissAnimation(this.backgroundDismissAnimation),this._parseColumnClass(this.columnClass),this._parseTheme(this.theme),this._parseType(this.type);var n=t(this.template);n.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(this.typeParsed),this.typeAnimated&&n.find(".jconfirm-box").addClass("jconfirm-type-animated"),this.useBootstrap?(n.find(".jc-bs3-row").addClass(this.bootstrapClasses.row),n.find(".jc-bs3-row").addClass("justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-lg-center"),n.find(".jconfirm-box-container").addClass(this.columnClassParsed),this.containerFluid?n.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid):n.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)):n.find(".jconfirm-box").css("width",this.boxWidth),this.titleClass&&n.find(".jconfirm-title-c").addClass(this.titleClass),n.addClass(this.themeParsed);var o="jconfirm-box"+this._id;n.find(".jconfirm-box").attr("aria-labelledby",o).attr("tabindex",-1),n.find(".jconfirm-content").attr("id",o),null!==this.bgOpacity&&n.find(".jconfirm-bg").css("opacity",this.bgOpacity),this.rtl&&n.addClass("jconfirm-rtl"),this.$el=n.appendTo(this.container),this.$jconfirmBoxContainer=this.$el.find(".jconfirm-box-container"),this.$jconfirmBox=this.$body=this.$el.find(".jconfirm-box"),this.$jconfirmBg=this.$el.find(".jconfirm-bg"),this.$title=this.$el.find(".jconfirm-title"),this.$titleContainer=this.$el.find(".jconfirm-title-c"),this.$content=this.$el.find("div.jconfirm-content"),this.$contentPane=this.$el.find(".jconfirm-content-pane"),this.$icon=this.$el.find(".jconfirm-icon-c"),this.$closeIcon=this.$el.find(".jconfirm-closeIcon"),this.$holder=this.$el.find(".jconfirm-holder"),this.$btnc=this.$el.find(".jconfirm-buttons"),this.$scrollPane=this.$el.find(".jconfirm-scrollpane"),i.setStartingPoint(),this._contentReady=t.Deferred(),this._modalReady=t.Deferred(),this.$holder.css({"padding-top":this.offsetTop,"padding-bottom":this.offsetBottom}),this.setTitle(),this.setIcon(),this._setButtons(),this._parseContent(),this.initDraggable(),this.isAjax&&this.showLoading(!1),t.when(this._contentReady,this._modalReady).then((function(){i.isAjaxLoading?setTimeout((function(){i.isAjaxLoading=!1,i.setContent(),i.setTitle(),i.setIcon(),setTimeout((function(){i.hideLoading(!1),i._updateContentMaxHeight()}),100),"function"==typeof i.onContentReady&&i.onContentReady()}),50):(i._updateContentMaxHeight(),i.setTitle(),i.setIcon(),"function"==typeof i.onContentReady&&i.onContentReady()),i.autoClose&&i._startCountDown()})).then((function(){i._watchContent()})),"none"===this.animation&&(this.animationSpeed=1,this.animationBounce=1),this.$body.css(this._getCSS(this.animationSpeed,this.animationBounce)),this.$contentPane.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBg.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBoxContainer.css(this._getCSS(this.animationSpeed,1))},_typePrefix:"jconfirm-type-",typeParsed:"",_parseType:function(t){this.typeParsed=this._typePrefix+t},setType:function(t){var i=this.typeParsed;this._parseType(t),this.$jconfirmBox.removeClass(i).addClass(this.typeParsed)},themeParsed:"",_themePrefix:"jconfirm-",setTheme:function(t){var i=this.theme;this.theme=t||this.theme,this._parseTheme(this.theme),i&&this.$el.removeClass(i),this.$el.addClass(this.themeParsed),this.theme=t},_parseTheme:function(i){var n=this;i=i.split(","),t.each(i,(function(o,e){-1===e.indexOf(n._themePrefix)&&(i[o]=n._themePrefix+t.trim(e))})),this.themeParsed=i.join(" ").toLowerCase()},backgroundDismissAnimationParsed:"",_bgDismissPrefix:"jconfirm-hilight-",_parseBgDismissAnimation:function(i){var n=i.split(","),o=this;t.each(n,(function(i,e){-1===e.indexOf(o._bgDismissPrefix)&&(n[i]=o._bgDismissPrefix+t.trim(e))})),this.backgroundDismissAnimationParsed=n.join(" ").toLowerCase()},animationParsed:"",closeAnimationParsed:"",_animationPrefix:"jconfirm-animation-",setAnimation:function(t){this.animation=t||this.animation,this._parseAnimation(this.animation,"o")},_parseAnimation:function(i,n){n=n||"o";var o=i.split(","),e=this;t.each(o,(function(i,n){-1===n.indexOf(e._animationPrefix)&&(o[i]=e._animationPrefix+t.trim(n))}));var s=o.join(" ").toLowerCase();return"o"===n?this.animationParsed=s:this.closeAnimationParsed=s,s},setCloseAnimation:function(t){this.closeAnimation=t||this.closeAnimation,this._parseAnimation(this.closeAnimation,"c")},setAnimationSpeed:function(t){this.animationSpeed=t||this.animationSpeed},columnClassParsed:"",setColumnClass:function(t){this.useBootstrap&&(this.columnClass=t||this.columnClass,this._parseColumnClass(this.columnClass),this.$jconfirmBoxContainer.addClass(this.columnClassParsed))},_updateContentMaxHeight:function(){var i=t(window).height()-(this.$jconfirmBox.outerHeight()-this.$contentPane.outerHeight())-(this.offsetTop+this.offsetBottom);this.$contentPane.css({"max-height":i+"px"})},setBoxWidth:function(t){this.useBootstrap||(this.boxWidth=t,this.$jconfirmBox.css("width",t))},_parseColumnClass:function(t){var i;switch(t=t.toLowerCase()){case"xl":case"xlarge":i="col-md-12";break;case"l":case"large":i="col-md-8 col-md-offset-2";break;case"m":case"medium":i="col-md-6 col-md-offset-3";break;case"s":case"small":i="col-md-4 col-md-offset-4";break;case"xs":case"xsmall":i="col-md-2 col-md-offset-5";break;default:i=t}this.columnClassParsed=i},initDraggable:function(){var i=this,n=this.$titleContainer;this.resetDrag(),this.draggable&&(n.on("mousedown",(function(t){n.addClass("jconfirm-hand"),i.mouseX=t.clientX,i.mouseY=t.clientY,i.isDrag=!0})),t(window).on("mousemove."+this._id,(function(t){i.isDrag&&(i.movingX=t.clientX-i.mouseX+i.initialX,i.movingY=t.clientY-i.mouseY+i.initialY,i.setDrag())})),t(window).on("mouseup."+this._id,(function(){n.removeClass("jconfirm-hand"),i.isDrag&&(i.isDrag=!1,i.initialX=i.movingX,i.initialY=i.movingY)})))},resetDrag:function(){this.isDrag=!1,this.initialX=0,this.initialY=0,this.movingX=0,this.movingY=0,this.mouseX=0,this.mouseY=0,this.$jconfirmBoxContainer.css("transform","translate(0px, 0px)")},setDrag:function(){if(this.draggable){this.alignMiddle=!1;var i=this.$jconfirmBox.outerWidth(),n=this.$jconfirmBox.outerHeight(),o=t(window).width(),e=t(window).height(),s=this;if(s.movingX%1==0||s.movingY%1==0){if(s.dragWindowBorder){var a=o/2-i/2,c=e/2-n/2;c-=s.dragWindowGap,(a-=s.dragWindowGap)+s.movingX<0?s.movingX=-a:a-s.movingX<0&&(s.movingX=a),c+s.movingY<0?s.movingY=-c:c-s.movingY<0&&(s.movingY=c)}s.$jconfirmBoxContainer.css("transform","translate("+s.movingX+"px, "+s.movingY+"px)")}}},_scrollTop:function(){if("undefined"!=typeof pageYOffset)return pageYOffset;var t=document.body,i=document.documentElement;return(i=i.clientHeight?i:t).scrollTop},_watchContent:function(){var i=this;this._timer&&clearInterval(this._timer);var n=0;this._timer=setInterval((function(){if(i.smoothContent){var o=i.$content.outerHeight()||0;o!==n&&(n=o);var e=t(window).height();i.offsetTop+i.offsetBottom+i.$jconfirmBox.height()-i.$contentPane.height()+i.$content.height()<e?i.$contentPane.addClass("no-scroll"):i.$contentPane.removeClass("no-scroll")}}),this.watchInterval)},_overflowClass:"jconfirm-overflow",_hilightAnimating:!1,highlight:function(){this.hiLightModal()},hiLightModal:function(){var t=this;if(!this._hilightAnimating){t.$body.addClass("hilight");var i=parseFloat(t.$body.css("animation-duration"))||2;this._hilightAnimating=!0,setTimeout((function(){t._hilightAnimating=!1,t.$body.removeClass("hilight")}),1e3*i)}},_bindEvents:function(){var i=this;this.boxClicked=!1,this.$scrollPane.click((function(t){if(!i.boxClicked){var n,o=!1,e=!1;if("string"==typeof(n="function"==typeof i.backgroundDismiss?i.backgroundDismiss():i.backgroundDismiss)&&void 0!==i.buttons[n]?(o=n,e=!1):e=void 0===n||!0==!!n,o){var s=i.buttons[o].action.apply(i);e=void 0===s||!!s}e?i.close():i.hiLightModal()}i.boxClicked=!1})),this.$jconfirmBox.click((function(t){i.boxClicked=!0}));var n=!1;t(window).on("jcKeyDown."+i._id,(function(t){n||(n=!0)})),t(window).on("keyup."+i._id,(function(t){n&&(i.reactOnKey(t),n=!1)})),t(window).on("resize."+this._id,(function(){i._updateContentMaxHeight(),setTimeout((function(){i.resetDrag()}),100)}))},_cubic_bezier:"0.36, 0.55, 0.19",_getCSS:function(t,i){return{"-webkit-transition-duration":t/1e3+"s","transition-duration":t/1e3+"s","-webkit-transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")","transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")"}},_setButtons:function(){var i=this,n=0;if("object"!=typeof this.buttons&&(this.buttons={}),t.each(this.buttons,(function(o,e){n+=1,"function"==typeof e&&(i.buttons[o]=e={action:e}),i.buttons[o].text=e.text||o,i.buttons[o].btnClass=e.btnClass||"btn-default",i.buttons[o].action=e.action||function(){},i.buttons[o].keys=e.keys||[],i.buttons[o].isHidden=e.isHidden||!1,i.buttons[o].isDisabled=e.isDisabled||!1,t.each(i.buttons[o].keys,(function(t,n){i.buttons[o].keys[t]=n.toLowerCase()}));var s=t('<button type="button" class="btn"></button>').html(i.buttons[o].text).addClass(i.buttons[o].btnClass).prop("disabled",i.buttons[o].isDisabled).css("display",i.buttons[o].isHidden?"none":"").click((function(t){t.preventDefault();var n=i.buttons[o].action.apply(i,[i.buttons[o]]);i.onAction.apply(i,[o,i.buttons[o]]),i._stopCountDown(),(void 0===n||n)&&i.close()}));i.buttons[o].el=s,i.buttons[o].setText=function(t){s.html(t)},i.buttons[o].addClass=function(t){s.addClass(t)},i.buttons[o].removeClass=function(t){s.removeClass(t)},i.buttons[o].disable=function(){i.buttons[o].isDisabled=!0,s.prop("disabled",!0)},i.buttons[o].enable=function(){i.buttons[o].isDisabled=!1,s.prop("disabled",!1)},i.buttons[o].show=function(){i.buttons[o].isHidden=!1,s.css("display","")},i.buttons[o].hide=function(){i.buttons[o].isHidden=!0,s.css("display","none")},i["$_"+o]=i["$$"+o]=s,i.$btnc.append(s)})),0===n&&this.$btnc.hide(),null===this.closeIcon&&0===n&&(this.closeIcon=!0),this.closeIcon){if(this.closeIconClass){var o='<i class="'+this.closeIconClass+'"></i>';this.$closeIcon.html(o)}this.$closeIcon.click((function(t){t.preventDefault();var n,o=!1,e=!1;if("string"==typeof(n="function"==typeof i.closeIcon?i.closeIcon():i.closeIcon)&&void 0!==i.buttons[n]?(o=n,e=!1):e=void 0===n||!0==!!n,o){var s=i.buttons[o].action.apply(i);e=void 0===s||!!s}e&&i.close()})),this.$closeIcon.show()}else this.$closeIcon.hide()},setTitle:function(t,i){if(i=i||!1,void 0!==t)if("string"==typeof t)this.title=t;else if("function"==typeof t){t.promise;var n=t();this.title="string"==typeof n&&n}else this.title=!1;this.isAjaxLoading&&!i||(this.$title.html(this.title||""),this.updateTitleContainer())},setIcon:function(t,i){if(i=i||!1,void 0!==t)if("string"==typeof t)this.icon=t;else if("function"==typeof t){var n=t();this.icon="string"==typeof n&&n}else this.icon=!1;this.isAjaxLoading&&!i||(this.$icon.html(this.icon?this.icon:""),this.updateTitleContainer())},updateTitleContainer:function(){this.title||this.icon?this.$titleContainer.show():this.$titleContainer.hide()},setContentPrepend:function(t,i){t&&this.contentParsed.prepend(t)},setContentAppend:function(t){t&&this.contentParsed.append(t)},setContent:function(t,i){i=!!i;var n=this;t&&this.contentParsed.html("").append(t),this.isAjaxLoading&&!i||(this.$content.html(""),this.$content.append(this.contentParsed),setTimeout((function(){n.$body.find("input[autofocus]:visible:first").focus()}),100))},loadingSpinner:!1,showLoading:function(t){this.loadingSpinner=!0,this.$jconfirmBox.addClass("loading"),t&&this.$btnc.find("button").prop("disabled",!0)},hideLoading:function(t){this.loadingSpinner=!1,this.$jconfirmBox.removeClass("loading"),t&&this.$btnc.find("button").prop("disabled",!1)},ajaxResponse:!1,contentParsed:"",isAjax:!1,isAjaxLoading:!1,_parseContent:function(){var i=this,n="&nbsp;";if("function"==typeof this.content){var o=this.content.apply(this);"string"==typeof o?this.content=o:"object"==typeof o&&"function"==typeof o.always?(this.isAjax=!0,this.isAjaxLoading=!0,o.always((function(t,n,o){i.ajaxResponse={data:t,status:n,xhr:o},i._contentReady.resolve(t,n,o),"function"==typeof i.contentLoaded&&i.contentLoaded(t,n,o)})),this.content=n):this.content=n}if("string"==typeof this.content&&"url:"===this.content.substr(0,4).toLowerCase()){this.isAjax=!0,this.isAjaxLoading=!0;var e=this.content.substring(4,this.content.length);t.get(e).done((function(t){i.contentParsed.html(t)})).always((function(t,n,o){i.ajaxResponse={data:t,status:n,xhr:o},i._contentReady.resolve(t,n,o),"function"==typeof i.contentLoaded&&i.contentLoaded(t,n,o)}))}this.content||(this.content=n),this.isAjax||(this.contentParsed.html(this.content),this.setContent(),i._contentReady.resolve())},_stopCountDown:function(){clearInterval(this.autoCloseInterval),this.$cd&&this.$cd.remove()},_startCountDown:function(){var i=this,n=this.autoClose.split("|");if(2!==n.length)return!1;var o=n[0],e=parseInt(n[1]);if(void 0===this.buttons[o])return!1;var s=Math.ceil(e/1e3);this.$cd=t('<span class="countdown"> ('+s+")</span>").appendTo(this["$_"+o]),this.autoCloseInterval=setInterval((function(){i.$cd.html(" ("+(s-=1)+") "),s<=0&&(i["$$"+o].trigger("click"),i._stopCountDown())}),1e3)},_getKey:function(t){switch(t){case 192:return"tilde";case 13:return"enter";case 16:return"shift";case 9:return"tab";case 20:return"capslock";case 17:return"ctrl";case 91:return"win";case 18:return"alt";case 27:return"esc";case 32:return"space"}var i=String.fromCharCode(t);return!!/^[A-z0-9]+$/.test(i)&&i.toLowerCase()},reactOnKey:function(i){var n=this,o=t(".jconfirm");if(o.eq(o.length-1)[0]!==this.$el[0])return!1;var e=i.which;if(this.$content.find(":input").is(":focus")&&/13|32/.test(e))return!1;var s=this._getKey(e);if("esc"===s&&this.escapeKey)if(!0===this.escapeKey)this.$scrollPane.trigger("click");else if("string"==typeof this.escapeKey||"function"==typeof this.escapeKey){var a;(a="function"==typeof this.escapeKey?this.escapeKey():this.escapeKey)&&(void 0===this.buttons[a]||this["$_"+a].trigger("click"))}t.each(this.buttons,(function(t,i){-1!==i.keys.indexOf(s)&&n["$_"+t].trigger("click")}))},setDialogCenter:function(){},_unwatchContent:function(){clearInterval(this._timer)},close:function(n){var o=this;return"function"==typeof this.onClose&&this.onClose(n),this._unwatchContent(),t(window).unbind("resize."+this._id),t(window).unbind("keyup."+this._id),t(window).unbind("jcKeyDown."+this._id),this.draggable&&(t(window).unbind("mousemove."+this._id),t(window).unbind("mouseup."+this._id),this.$titleContainer.unbind("mousedown")),o.$el.removeClass(o.loadedClass),t("body").removeClass("jconfirm-no-scroll-"+o._id),o.$jconfirmBoxContainer.removeClass("jconfirm-no-transition"),setTimeout((function(){o.$body.addClass(o.closeAnimationParsed),o.$jconfirmBg.addClass("jconfirm-bg-h");var n="none"===o.closeAnimation?1:o.animationSpeed;setTimeout((function(){o.$el.remove();i.jconfirm.instances;for(var n=i.jconfirm.instances.length-1;n>=0;n--)i.jconfirm.instances[n]._id===o._id&&i.jconfirm.instances.splice(n,1);if(!i.jconfirm.instances.length&&o.scrollToPreviousElement&&i.jconfirm.lastFocused&&i.jconfirm.lastFocused.length&&t.contains(document,i.jconfirm.lastFocused[0])){var e=i.jconfirm.lastFocused;if(o.scrollToPreviousElementAnimate){var s=t(window).scrollTop(),a=i.jconfirm.lastFocused.offset().top,c=t(window).height();if(a>s&&a<s+c)e.focus();else{var r=a-Math.round(c/3);t("html, body").animate({scrollTop:r},o.animationSpeed,"swing",(function(){e.focus()}))}}else e.focus();i.jconfirm.lastFocused=!1}"function"==typeof o.onDestroy&&o.onDestroy()}),.4*n)}),50),!0},open:function(){return!this.isOpen()&&(this._buildHTML(),this._bindEvents(),this._open(),!0)},setStartingPoint:function(){var n=!1;if(!0!==this.animateFromElement&&this.animateFromElement)n=this.animateFromElement,i.jconfirm.lastClicked=!1;else{if(!i.jconfirm.lastClicked||!0!==this.animateFromElement)return!1;n=i.jconfirm.lastClicked,i.jconfirm.lastClicked=!1}if(!n)return!1;var o=n.offset(),e=n.outerHeight()/2,s=n.outerWidth()/2;e-=this.$jconfirmBox.outerHeight()/2,s-=this.$jconfirmBox.outerWidth()/2;var a=o.top+e;a-=this._scrollTop();var c=o.left+s,r=t(window).height()/2,l=t(window).width()/2;if(a-=r-this.$jconfirmBox.outerHeight()/2,c-=l-this.$jconfirmBox.outerWidth()/2,Math.abs(a)>r||Math.abs(c)>l)return!1;this.$jconfirmBoxContainer.css("transform","translate("+c+"px, "+a+"px)")},_open:function(){var t=this;"function"==typeof t.onOpenBefore&&t.onOpenBefore(),this.$body.removeClass(this.animationParsed),this.$jconfirmBg.removeClass("jconfirm-bg-h"),this.$body.focus(),t.$jconfirmBoxContainer.css("transform","translate(0px, 0px)"),setTimeout((function(){t.$body.css(t._getCSS(t.animationSpeed,1)),t.$body.css({"transition-property":t.$body.css("transition-property")+", margin"}),t.$jconfirmBoxContainer.addClass("jconfirm-no-transition"),t._modalReady.resolve(),"function"==typeof t.onOpen&&t.onOpen(),t.$el.addClass(t.loadedClass)}),this.animationSpeed)},loadedClass:"jconfirm-open",isClosed:function(){return!this.$el||0===this.$el.parent().length},isOpen:function(){return!this.isClosed()},toggle:function(){this.isOpen()?this.close():this.open()}},i.jconfirm.instances=[],i.jconfirm.lastFocused=!1,i.jconfirm.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jconfirm-row"><div class="jconfirm-cell"><div class="jconfirm-holder"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container jconfirm-animated"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div></div></div></div>',title:"Hello",titleClass:"",type:"default",typeAnimated:!0,draggable:!0,dragWindowGap:15,dragWindowBorder:!0,animateFromElement:!0,alignMiddle:!0,smoothContent:!0,content:"Are you sure to continue?",buttons:{},defaultButtons:{ok:{action:function(){}},close:{action:function(){}}},contentLoaded:function(){},icon:"",lazyOpen:!1,bgOpacity:null,theme:"light",animation:"scale",closeAnimation:"scale",animationSpeed:400,animationBounce:1,escapeKey:!0,rtl:!1,container:"body",containerFluid:!1,backgroundDismiss:!1,backgroundDismissAnimation:"shake",autoClose:!1,closeIcon:null,closeIconClass:!1,watchInterval:100,columnClass:"col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",boxWidth:"50%",scrollToPreviousElement:!0,scrollToPreviousElementAnimate:!0,useBootstrap:!0,offsetTop:40,offsetBottom:40,bootstrapClasses:{container:"container",containerFluid:"container-fluid",row:"row"},onContentReady:function(){},onOpenBefore:function(){},onOpen:function(){},onClose:function(){},onDestroy:function(){},onAction:function(){}};var n=!1;t(window).on("keydown",(function(i){if(!n){var o=!1;t(i.target).closest(".jconfirm-box").length&&(o=!0),o&&t(window).trigger("jcKeyDown"),n=!0}})),t(window).on("keyup",(function(){n=!1})),i.jconfirm.lastClicked=!1,t(document).on("mousedown","button, a, [jc-source]",(function(){i.jconfirm.lastClicked=t(this)}))}));
/*
 * @name pluginName
 * @Rely jQuery v1.7+
 * @License MIT
 *
 * github resource repository:
 *   https://github.com/repar
 *
 * usage as:
 * m1. $.fn.pluginName({...}); 
 * m2. $(...).pluginName({...});
 *
 * author: repar
 * website: http://www.56hm.com
 * email: 47558328@qq.com,  yy47558328@sina.com
 * qq: 47558328
 */
;(function($, window, document, undefined){

  // Create the defaults once
  var pluginName = "marquee",

  defaults = {
     enable : true,  //plug-in is enabled
     direction: 'vertical',   //运动方向.  vertical : horizontal
     itemSelecter : 'div',  //子节点选择器
     delay: 3000,  //动画渲染延迟时间
     speed: 1,  //动画渲染距离.
     timing: 1, //动画渲染速率.
     mouse: true //鼠标移入停止动画

  };


  function Widget(element, options) {
      this.element = element;
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.version = 'v1.0.0';

      
      this.$element = $(this.element);
      this.$wrapper = this.$element.parent();
      this.$items = this.$element.children(this.settings.itemSelecter);


      this.next = 0;
      this.timeoutHandle;
      this.intervalHandle

      if(!this.settings.enable)return; //检测插件是否开启.
      this.init();
  }


  Widget.prototype = {

     init:function(){

          var that = this;

         //子节点占用总高度.
          var totalSize = 0;

          $.each(this.$items, function(index, element){

              totalSize += that.isHorizontal() 
                          ? parseInt($(element).outerWidth())
                          : parseInt($(element).outerHeight());

          }); 
          
          //父节点实际高度
          var elmentTotalSize = this.isHorizontal()
             ? this.$element.outerWidth
             : this.$element.outerHeight;

          //判断子节点总高度是否大于父节点高度, 否则插件停止运行.
          if(totalSize < elmentTotalSize)return;

          //设置动画渲染所需的CSS样式.
          this.$wrapper.css({
               
             // position : 'relative',
              overflow : 'hidden'

          });

          this.$element.css({

               position : 'absolute',
               transform: `translate3d(0,0,0)`
              //  top : 0,
              //  left: 0

          });

          this.$element.css(this.isHorizontal() ? 'width' : 'height', '1000%');


          //克隆子节点.
          this.cloneAllItems();

          //鼠标监听
          if(this.settings.mouse)
                   this.addHoverEvent(this);

          this.timer(this);

          
     },

     /**
       * 计时器.
       */
      timer : function(that){

          this.timeoutHandle = setTimeout(function(){that.play(that)}, this.settings.delay);

      },


      /**
       * 播放.
       */
      play : function(that){


         this.clearTimeout();

          var target = 0;

          for(var i = 0; i <= this.next; i++){
               
               target -= this.isHorizontal()
                  ? parseInt($(this.$items.get(this.next)).outerWidth())
                  : parseInt($(this.$items.get(this.next)).outerHeight());
                  

          }

          this.intervalHandle = setInterval(function(){that.animate(target)},this.settings.timing);
      },


      /**
       * 动画渲染.
       */
      animate : function(target){

          var matrix = this.$element.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
          var x = matrix[12] || matrix[4];
          var y = matrix[13] || matrix[5];

          var mark = 'transform';//this.isHorizontal() ? 'left' : 'top';

          //var present =  parseInt(this.$element.css(mark));

          var present =  this.isHorizontal() ? x : y;

          var xyz = this.isHorizontal() ? `translate3d(${target},0,0)` : `translate3d(0,${target},0)`;


          if(present > target)
          {
              if(present - this.settings.speed <= target)
              {
                  this.isHorizontal()
                  ? this.$element.css(mark, `translate3d(${target}px,0,0)`)
                  : this.$element.css(mark, `translate3d(0,${target}px,0)`);
              
              }else
                    this.isHorizontal()
                    ? this.$element.css(mark, `translate3d(${present - this.settings.speed}px,0,0)`)
                    : this.$element.css(mark, `translate3d(0,${present - this.settings.speed}px,0)`);

          }else{


              this.clearInterval();

              if(this.next + 1 < this.$items.length){
                   
                   this.next++;
                  
              }else{

                  this.next = 0;
                  this.$element.css(mark,`translate3d(0,0,0)`);
                  
              }
              this.timer(this);
          }

      },


      isHorizontal : function(){

          return this.settings.direction == 'horizontal';
      },

      /**
       * 克隆子节点
       */
      cloneAllItems: function(){

          this.$element.append(this.$items.clone());
      },



      /**
       * 取消时钟队列.
       */
      clearTimeout : function(){
          
          clearTimeout(this.timeoutHandle);
      },

      /**
       * 取消定时器队列.
       */
      clearInterval : function(){
          
          clearInterval(this.intervalHandle);
      },
      
      /**
       * 暂停动画渲染.
       * @return {[type]} [description]
       */
      addHoverEvent : function(that){

        this.$wrapper.on('mouseenter', function(){                
          that.clearInterval()
          that.clearTimeout();
        });

        this.$wrapper.on('mouseleave', function(){                
          that.play(that);
        });

          // this.$wrapper
          //   .mouseenter(function(){
                 
          //        that.clearInterval()
          //        that.clearTimeout();

          //   })
          //   .mouseleave(function(){

          //        that.play(that);

          //   });
      }



  }//prototype
  

  $.fn[pluginName] = function(options) {

      // chain jQuery functions
      return this.each(function() {
          if (!$.data(this, "plugin_" + pluginName)) {
              $.data(this, "plugin_" + pluginName, new Widget(this, options));
          }
      });

  };

})(jQuery, window, document);
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).IMask={})}(this,(function(t){"use strict";function e(t){return"string"==typeof t||t instanceof String}function s(t){var e;return"object"==typeof t&&null!=t&&"Object"===(null==t||null==(e=t.constructor)?void 0:e.name)}function i(t,e){return Array.isArray(e)?i(t,((t,s)=>e.includes(s))):Object.entries(t).reduce(((t,s)=>{let[i,a]=s;return e(a,i)&&(t[i]=a),t}),{})}const a={NONE:"NONE",LEFT:"LEFT",FORCE_LEFT:"FORCE_LEFT",RIGHT:"RIGHT",FORCE_RIGHT:"FORCE_RIGHT"};function u(t){switch(t){case a.LEFT:return a.FORCE_LEFT;case a.RIGHT:return a.FORCE_RIGHT;default:return t}}function n(t){return t.replace(/([.*+?^=!:${}()|[\]/\\])/g,"\\$1")}function r(t,e){if(e===t)return!0;const s=Array.isArray(e),i=Array.isArray(t);let a;if(s&&i){if(e.length!=t.length)return!1;for(a=0;a<e.length;a++)if(!r(e[a],t[a]))return!1;return!0}if(s!=i)return!1;if(e&&t&&"object"==typeof e&&"object"==typeof t){const s=e instanceof Date,i=t instanceof Date;if(s&&i)return e.getTime()==t.getTime();if(s!=i)return!1;const u=e instanceof RegExp,n=t instanceof RegExp;if(u&&n)return e.toString()==t.toString();if(u!=n)return!1;const h=Object.keys(e);for(a=0;a<h.length;a++)if(!Object.prototype.hasOwnProperty.call(t,h[a]))return!1;for(a=0;a<h.length;a++)if(!r(t[h[a]],e[h[a]]))return!1;return!0}return!(!e||!t||"function"!=typeof e||"function"!=typeof t)&&e.toString()===t.toString()}class h{constructor(t){for(Object.assign(this,t);this.value.slice(0,this.startChangePos)!==this.oldValue.slice(0,this.startChangePos);)--this.oldSelection.start;if(this.insertedCount)for(;this.value.slice(this.cursorPos)!==this.oldValue.slice(this.oldSelection.end);)this.value.length-this.cursorPos<this.oldValue.length-this.oldSelection.end?++this.oldSelection.end:++this.cursorPos}get startChangePos(){return Math.min(this.cursorPos,this.oldSelection.start)}get insertedCount(){return this.cursorPos-this.startChangePos}get inserted(){return this.value.substr(this.startChangePos,this.insertedCount)}get removedCount(){return Math.max(this.oldSelection.end-this.startChangePos||this.oldValue.length-this.value.length,0)}get removed(){return this.oldValue.substr(this.startChangePos,this.removedCount)}get head(){return this.value.substring(0,this.startChangePos)}get tail(){return this.value.substring(this.startChangePos+this.insertedCount)}get removeDirection(){return!this.removedCount||this.insertedCount?a.NONE:this.oldSelection.end!==this.cursorPos&&this.oldSelection.start!==this.cursorPos||this.oldSelection.end!==this.oldSelection.start?a.LEFT:a.RIGHT}}function o(t,e){return new o.InputMask(t,e)}function l(t){if(null==t)throw new Error("mask property should be defined");return t instanceof RegExp?o.MaskedRegExp:e(t)?o.MaskedPattern:t===Date?o.MaskedDate:t===Number?o.MaskedNumber:Array.isArray(t)||t===Array?o.MaskedDynamic:o.Masked&&t.prototype instanceof o.Masked?t:o.Masked&&t instanceof o.Masked?t.constructor:t instanceof Function?o.MaskedFunction:(console.warn("Mask not found for mask",t),o.Masked)}function p(t){if(!t)throw new Error("Options in not defined");if(o.Masked){if(t.prototype instanceof o.Masked)return{mask:t};const{mask:e,...a}=t instanceof o.Masked?{mask:t}:s(t)&&t.mask instanceof o.Masked?t:{};if(e){const t=e.mask;return{...i(e,((t,e)=>!e.startsWith("_"))),mask:e.constructor,_mask:t,...a}}}return s(t)?{...t}:{mask:t}}function d(t){if(o.Masked&&t instanceof o.Masked)return t;const e=p(t),s=l(e.mask);if(!s)throw new Error("Masked class is not found for provided mask "+e.mask+", appropriate module needs to be imported manually before creating mask.");return e.mask===s&&delete e.mask,e._mask&&(e.mask=e._mask,delete e._mask),new s(e)}o.createMask=d;class c{get selectionStart(){let t;try{t=this._unsafeSelectionStart}catch{}return null!=t?t:this.value.length}get selectionEnd(){let t;try{t=this._unsafeSelectionEnd}catch{}return null!=t?t:this.value.length}select(t,e){if(null!=t&&null!=e&&(t!==this.selectionStart||e!==this.selectionEnd))try{this._unsafeSelect(t,e)}catch{}}get isActive(){return!1}}o.MaskElement=c;class g extends c{constructor(t){super(),this.input=t,this._onKeydown=this._onKeydown.bind(this),this._onInput=this._onInput.bind(this),this._onBeforeinput=this._onBeforeinput.bind(this),this._onCompositionEnd=this._onCompositionEnd.bind(this)}get rootElement(){var t,e,s;return null!=(t=null==(e=(s=this.input).getRootNode)?void 0:e.call(s))?t:document}get isActive(){return this.input===this.rootElement.activeElement}bindEvents(t){this.input.addEventListener("keydown",this._onKeydown),this.input.addEventListener("input",this._onInput),this.input.addEventListener("beforeinput",this._onBeforeinput),this.input.addEventListener("compositionend",this._onCompositionEnd),this.input.addEventListener("drop",t.drop),this.input.addEventListener("click",t.click),this.input.addEventListener("focus",t.focus),this.input.addEventListener("blur",t.commit),this._handlers=t}_onKeydown(t){return this._handlers.redo&&(90===t.keyCode&&t.shiftKey&&(t.metaKey||t.ctrlKey)||89===t.keyCode&&t.ctrlKey)?(t.preventDefault(),this._handlers.redo(t)):this._handlers.undo&&90===t.keyCode&&(t.metaKey||t.ctrlKey)?(t.preventDefault(),this._handlers.undo(t)):void(t.isComposing||this._handlers.selectionChange(t))}_onBeforeinput(t){return"historyUndo"===t.inputType&&this._handlers.undo?(t.preventDefault(),this._handlers.undo(t)):"historyRedo"===t.inputType&&this._handlers.redo?(t.preventDefault(),this._handlers.redo(t)):void 0}_onCompositionEnd(t){this._handlers.input(t)}_onInput(t){t.isComposing||this._handlers.input(t)}unbindEvents(){this.input.removeEventListener("keydown",this._onKeydown),this.input.removeEventListener("input",this._onInput),this.input.removeEventListener("beforeinput",this._onBeforeinput),this.input.removeEventListener("compositionend",this._onCompositionEnd),this.input.removeEventListener("drop",this._handlers.drop),this.input.removeEventListener("click",this._handlers.click),this.input.removeEventListener("focus",this._handlers.focus),this.input.removeEventListener("blur",this._handlers.commit),this._handlers={}}}o.HTMLMaskElement=g;class k extends g{constructor(t){super(t),this.input=t}get _unsafeSelectionStart(){return null!=this.input.selectionStart?this.input.selectionStart:this.value.length}get _unsafeSelectionEnd(){return this.input.selectionEnd}_unsafeSelect(t,e){this.input.setSelectionRange(t,e)}get value(){return this.input.value}set value(t){this.input.value=t}}o.HTMLMaskElement=g;class m extends g{get _unsafeSelectionStart(){const t=this.rootElement,e=t.getSelection&&t.getSelection(),s=e&&e.anchorOffset,i=e&&e.focusOffset;return null==i||null==s||s<i?s:i}get _unsafeSelectionEnd(){const t=this.rootElement,e=t.getSelection&&t.getSelection(),s=e&&e.anchorOffset,i=e&&e.focusOffset;return null==i||null==s||s>i?s:i}_unsafeSelect(t,e){if(!this.rootElement.createRange)return;const s=this.rootElement.createRange();s.setStart(this.input.firstChild||this.input,t),s.setEnd(this.input.lastChild||this.input,e);const i=this.rootElement,a=i.getSelection&&i.getSelection();a&&(a.removeAllRanges(),a.addRange(s))}get value(){return this.input.textContent||""}set value(t){this.input.textContent=t}}o.HTMLContenteditableMaskElement=m;class _{constructor(){this.states=[],this.currentIndex=0}get currentState(){return this.states[this.currentIndex]}get isEmpty(){return 0===this.states.length}push(t){this.currentIndex<this.states.length-1&&(this.states.length=this.currentIndex+1),this.states.push(t),this.states.length>_.MAX_LENGTH&&this.states.shift(),this.currentIndex=this.states.length-1}go(t){return this.currentIndex=Math.min(Math.max(this.currentIndex+t,0),this.states.length-1),this.currentState}undo(){return this.go(-1)}redo(){return this.go(1)}clear(){this.states.length=0,this.currentIndex=0}}_.MAX_LENGTH=100;class f{constructor(t,e){this.el=t instanceof c?t:t.isContentEditable&&"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName?new m(t):new k(t),this.masked=d(e),this._listeners={},this._value="",this._unmaskedValue="",this._rawInputValue="",this.history=new _,this._saveSelection=this._saveSelection.bind(this),this._onInput=this._onInput.bind(this),this._onChange=this._onChange.bind(this),this._onDrop=this._onDrop.bind(this),this._onFocus=this._onFocus.bind(this),this._onClick=this._onClick.bind(this),this._onUndo=this._onUndo.bind(this),this._onRedo=this._onRedo.bind(this),this.alignCursor=this.alignCursor.bind(this),this.alignCursorFriendly=this.alignCursorFriendly.bind(this),this._bindEvents(),this._onChange()}maskEquals(t){var e;return null==t||(null==(e=this.masked)?void 0:e.maskEquals(t))}get mask(){return this.masked.mask}set mask(t){if(this.maskEquals(t))return;if(!(t instanceof o.Masked)&&this.masked.constructor===l(t))return void this.masked.updateOptions({mask:t});const e=t instanceof o.Masked?t:d({mask:t});e.unmaskedValue=this.masked.unmaskedValue,this.masked=e}get value(){return this._value}set value(t){this.value!==t&&(this.masked.value=t,this.updateControl("auto"))}get unmaskedValue(){return this._unmaskedValue}set unmaskedValue(t){this.unmaskedValue!==t&&(this.masked.unmaskedValue=t,this.updateControl("auto"))}get rawInputValue(){return this._rawInputValue}set rawInputValue(t){this.rawInputValue!==t&&(this.masked.rawInputValue=t,this.updateControl(),this.alignCursor())}get typedValue(){return this.masked.typedValue}set typedValue(t){this.masked.typedValueEquals(t)||(this.masked.typedValue=t,this.updateControl("auto"))}get displayValue(){return this.masked.displayValue}_bindEvents(){this.el.bindEvents({selectionChange:this._saveSelection,input:this._onInput,drop:this._onDrop,click:this._onClick,focus:this._onFocus,commit:this._onChange,undo:this._onUndo,redo:this._onRedo})}_unbindEvents(){this.el&&this.el.unbindEvents()}_fireEvent(t,e){const s=this._listeners[t];s&&s.forEach((t=>t(e)))}get selectionStart(){return this._cursorChanging?this._changingCursorPos:this.el.selectionStart}get cursorPos(){return this._cursorChanging?this._changingCursorPos:this.el.selectionEnd}set cursorPos(t){this.el&&this.el.isActive&&(this.el.select(t,t),this._saveSelection())}_saveSelection(){this.displayValue!==this.el.value&&console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."),this._selection={start:this.selectionStart,end:this.cursorPos}}updateValue(){this.masked.value=this.el.value,this._value=this.masked.value,this._unmaskedValue=this.masked.unmaskedValue,this._rawInputValue=this.masked.rawInputValue}updateControl(t){const e=this.masked.unmaskedValue,s=this.masked.value,i=this.masked.rawInputValue,a=this.displayValue,u=this.unmaskedValue!==e||this.value!==s||this._rawInputValue!==i;this._unmaskedValue=e,this._value=s,this._rawInputValue=i,this.el.value!==a&&(this.el.value=a),"auto"===t?this.alignCursor():null!=t&&(this.cursorPos=t),u&&this._fireChangeEvents(),this._historyChanging||!u&&!this.history.isEmpty||this.history.push({unmaskedValue:e,selection:{start:this.selectionStart,end:this.cursorPos}})}updateOptions(t){const{mask:e,...s}=t,i=!this.maskEquals(e),a=this.masked.optionsIsChanged(s);i&&(this.mask=e),a&&this.masked.updateOptions(s),(i||a)&&this.updateControl()}updateCursor(t){null!=t&&(this.cursorPos=t,this._delayUpdateCursor(t))}_delayUpdateCursor(t){this._abortUpdateCursor(),this._changingCursorPos=t,this._cursorChanging=setTimeout((()=>{this.el&&(this.cursorPos=this._changingCursorPos,this._abortUpdateCursor())}),10)}_fireChangeEvents(){this._fireEvent("accept",this._inputEvent),this.masked.isComplete&&this._fireEvent("complete",this._inputEvent)}_abortUpdateCursor(){this._cursorChanging&&(clearTimeout(this._cursorChanging),delete this._cursorChanging)}alignCursor(){this.cursorPos=this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos,a.LEFT))}alignCursorFriendly(){this.selectionStart===this.cursorPos&&this.alignCursor()}on(t,e){return this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e),this}off(t,e){if(!this._listeners[t])return this;if(!e)return delete this._listeners[t],this;const s=this._listeners[t].indexOf(e);return s>=0&&this._listeners[t].splice(s,1),this}_onInput(t){this._inputEvent=t,this._abortUpdateCursor();const e=new h({value:this.el.value,cursorPos:this.cursorPos,oldValue:this.displayValue,oldSelection:this._selection}),s=this.masked.rawInputValue,i=this.masked.splice(e.startChangePos,e.removed.length,e.inserted,e.removeDirection,{input:!0,raw:!0}).offset,u=s===this.masked.rawInputValue?e.removeDirection:a.NONE;let n=this.masked.nearestInputPos(e.startChangePos+i,u);u!==a.NONE&&(n=this.masked.nearestInputPos(n,a.NONE)),this.updateControl(n),delete this._inputEvent}_onChange(){this.displayValue!==this.el.value&&this.updateValue(),this.masked.doCommit(),this.updateControl(),this._saveSelection()}_onDrop(t){t.preventDefault(),t.stopPropagation()}_onFocus(t){this.alignCursorFriendly()}_onClick(t){this.alignCursorFriendly()}_onUndo(){this._applyHistoryState(this.history.undo())}_onRedo(){this._applyHistoryState(this.history.redo())}_applyHistoryState(t){t&&(this._historyChanging=!0,this.unmaskedValue=t.unmaskedValue,this.el.select(t.selection.start,t.selection.end),this._saveSelection(),this._historyChanging=!1)}destroy(){this._unbindEvents(),this._listeners.length=0,delete this.el}}o.InputMask=f;class v{static normalize(t){return Array.isArray(t)?t:[t,new v]}constructor(t){Object.assign(this,{inserted:"",rawInserted:"",tailShift:0,skip:!1},t)}aggregate(t){return this.inserted+=t.inserted,this.rawInserted+=t.rawInserted,this.tailShift+=t.tailShift,this.skip=this.skip||t.skip,this}get offset(){return this.tailShift+this.inserted.length}get consumed(){return Boolean(this.rawInserted)||this.skip}equals(t){return this.inserted===t.inserted&&this.tailShift===t.tailShift&&this.rawInserted===t.rawInserted&&this.skip===t.skip}}o.ChangeDetails=v;class E{constructor(t,e,s){void 0===t&&(t=""),void 0===e&&(e=0),this.value=t,this.from=e,this.stop=s}toString(){return this.value}extend(t){this.value+=String(t)}appendTo(t){return t.append(this.toString(),{tail:!0}).aggregate(t._appendPlaceholder())}get state(){return{value:this.value,from:this.from,stop:this.stop}}set state(t){Object.assign(this,t)}unshift(t){if(!this.value.length||null!=t&&this.from>=t)return"";const e=this.value[0];return this.value=this.value.slice(1),e}shift(){if(!this.value.length)return"";const t=this.value[this.value.length-1];return this.value=this.value.slice(0,-1),t}}class C{constructor(t){this._value="",this._update({...C.DEFAULTS,...t}),this._initialized=!0}updateOptions(t){this.optionsIsChanged(t)&&this.withValueRefresh(this._update.bind(this,t))}_update(t){Object.assign(this,t)}get state(){return{_value:this.value,_rawInputValue:this.rawInputValue}}set state(t){this._value=t._value}reset(){this._value=""}get value(){return this._value}set value(t){this.resolve(t,{input:!0})}resolve(t,e){void 0===e&&(e={input:!0}),this.reset(),this.append(t,e,""),this.doCommit()}get unmaskedValue(){return this.value}set unmaskedValue(t){this.resolve(t,{})}get typedValue(){return this.parse?this.parse(this.value,this):this.unmaskedValue}set typedValue(t){this.format?this.value=this.format(t,this):this.unmaskedValue=String(t)}get rawInputValue(){return this.extractInput(0,this.displayValue.length,{raw:!0})}set rawInputValue(t){this.resolve(t,{raw:!0})}get displayValue(){return this.value}get isComplete(){return!0}get isFilled(){return this.isComplete}nearestInputPos(t,e){return t}totalInputPositions(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),Math.min(this.displayValue.length,e-t)}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),this.displayValue.slice(t,e)}extractTail(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),new E(this.extractInput(t,e),t)}appendTail(t){return e(t)&&(t=new E(String(t))),t.appendTo(this)}_appendCharRaw(t,e){return t?(this._value+=t,new v({inserted:t,rawInserted:t})):new v}_appendChar(t,e,s){void 0===e&&(e={});const i=this.state;let a;if([t,a]=this.doPrepareChar(t,e),t&&(a=a.aggregate(this._appendCharRaw(t,e)),!a.rawInserted&&"pad"===this.autofix)){const s=this.state;this.state=i;let u=this.pad(e);const n=this._appendCharRaw(t,e);u=u.aggregate(n),n.rawInserted||u.equals(a)?a=u:this.state=s}if(a.inserted){let t,u=!1!==this.doValidate(e);if(u&&null!=s){const e=this.state;if(!0===this.overwrite){t=s.state;for(let t=0;t<a.rawInserted.length;++t)s.unshift(this.displayValue.length-a.tailShift)}let i=this.appendTail(s);if(u=i.rawInserted.length===s.toString().length,!(u&&i.inserted||"shift"!==this.overwrite)){this.state=e,t=s.state;for(let t=0;t<a.rawInserted.length;++t)s.shift();i=this.appendTail(s),u=i.rawInserted.length===s.toString().length}u&&i.inserted&&(this.state=e)}u||(a=new v,this.state=i,s&&t&&(s.state=t))}return a}_appendPlaceholder(){return new v}_appendEager(){return new v}append(t,s,i){if(!e(t))throw new Error("value should be string");const a=e(i)?new E(String(i)):i;let u;null!=s&&s.tail&&(s._beforeTailState=this.state),[t,u]=this.doPrepare(t,s);for(let e=0;e<t.length;++e){const i=this._appendChar(t[e],s,a);if(!i.rawInserted&&!this.doSkipInvalid(t[e],s,a))break;u.aggregate(i)}return(!0===this.eager||"append"===this.eager)&&null!=s&&s.input&&t&&u.aggregate(this._appendEager()),null!=a&&(u.tailShift+=this.appendTail(a).tailShift),u}remove(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),this._value=this.displayValue.slice(0,t)+this.displayValue.slice(e),new v}withValueRefresh(t){if(this._refreshing||!this._initialized)return t();this._refreshing=!0;const e=this.rawInputValue,s=this.value,i=t();return this.rawInputValue=e,this.value&&this.value!==s&&0===s.indexOf(this.value)&&(this.append(s.slice(this.displayValue.length),{},""),this.doCommit()),delete this._refreshing,i}runIsolated(t){if(this._isolated||!this._initialized)return t(this);this._isolated=!0;const e=this.state,s=t(this);return this.state=e,delete this._isolated,s}doSkipInvalid(t,e,s){return Boolean(this.skipInvalid)}doPrepare(t,e){return void 0===e&&(e={}),v.normalize(this.prepare?this.prepare(t,this,e):t)}doPrepareChar(t,e){return void 0===e&&(e={}),v.normalize(this.prepareChar?this.prepareChar(t,this,e):t)}doValidate(t){return(!this.validate||this.validate(this.value,this,t))&&(!this.parent||this.parent.doValidate(t))}doCommit(){this.commit&&this.commit(this.value,this)}splice(t,e,s,i,n){void 0===s&&(s=""),void 0===i&&(i=a.NONE),void 0===n&&(n={input:!0});const r=t+e,h=this.extractTail(r),o=!0===this.eager||"remove"===this.eager;let l;o&&(i=u(i),l=this.extractInput(0,r,{raw:!0}));let p=t;const d=new v;if(i!==a.NONE&&(p=this.nearestInputPos(t,e>1&&0!==t&&!o?a.NONE:i),d.tailShift=p-t),d.aggregate(this.remove(p)),o&&i!==a.NONE&&l===this.rawInputValue)if(i===a.FORCE_LEFT){let t;for(;l===this.rawInputValue&&(t=this.displayValue.length);)d.aggregate(new v({tailShift:-1})).aggregate(this.remove(t-1))}else i===a.FORCE_RIGHT&&h.unshift();return d.aggregate(this.append(s,n,h))}maskEquals(t){return this.mask===t}optionsIsChanged(t){return!r(this,t)}typedValueEquals(t){const e=this.typedValue;return t===e||C.EMPTY_VALUES.includes(t)&&C.EMPTY_VALUES.includes(e)||!!this.format&&this.format(t,this)===this.format(this.typedValue,this)}pad(t){return new v}}C.DEFAULTS={skipInvalid:!0},C.EMPTY_VALUES=[void 0,null,""],o.Masked=C;class A{constructor(t,e){void 0===t&&(t=[]),void 0===e&&(e=0),this.chunks=t,this.from=e}toString(){return this.chunks.map(String).join("")}extend(t){if(!String(t))return;t=e(t)?new E(String(t)):t;const s=this.chunks[this.chunks.length-1],i=s&&(s.stop===t.stop||null==t.stop)&&t.from===s.from+s.toString().length;if(t instanceof E)i?s.extend(t.toString()):this.chunks.push(t);else if(t instanceof A){if(null==t.stop){let e;for(;t.chunks.length&&null==t.chunks[0].stop;)e=t.chunks.shift(),e.from+=t.from,this.extend(e)}t.toString()&&(t.stop=t.blockIndex,this.chunks.push(t))}}appendTo(t){if(!(t instanceof o.MaskedPattern)){return new E(this.toString()).appendTo(t)}const e=new v;for(let s=0;s<this.chunks.length;++s){const i=this.chunks[s],a=t._mapPosToBlock(t.displayValue.length),u=i.stop;let n;if(null!=u&&(!a||a.index<=u)&&((i instanceof A||t._stops.indexOf(u)>=0)&&e.aggregate(t._appendPlaceholder(u)),n=i instanceof A&&t._blocks[u]),n){const s=n.appendTail(i);e.aggregate(s);const a=i.toString().slice(s.rawInserted.length);a&&e.aggregate(t.append(a,{tail:!0}))}else e.aggregate(t.append(i.toString(),{tail:!0}))}return e}get state(){return{chunks:this.chunks.map((t=>t.state)),from:this.from,stop:this.stop,blockIndex:this.blockIndex}}set state(t){const{chunks:e,...s}=t;Object.assign(this,s),this.chunks=e.map((t=>{const e="chunks"in t?new A:new E;return e.state=t,e}))}unshift(t){if(!this.chunks.length||null!=t&&this.from>=t)return"";const e=null!=t?t-this.from:t;let s=0;for(;s<this.chunks.length;){const t=this.chunks[s],i=t.unshift(e);if(t.toString()){if(!i)break;++s}else this.chunks.splice(s,1);if(i)return i}return""}shift(){if(!this.chunks.length)return"";let t=this.chunks.length-1;for(;0<=t;){const e=this.chunks[t],s=e.shift();if(e.toString()){if(!s)break;--t}else this.chunks.splice(t,1);if(s)return s}return""}}class F{constructor(t,e){this.masked=t,this._log=[];const{offset:s,index:i}=t._mapPosToBlock(e)||(e<0?{index:0,offset:0}:{index:this.masked._blocks.length,offset:0});this.offset=s,this.index=i,this.ok=!1}get block(){return this.masked._blocks[this.index]}get pos(){return this.masked._blockStartPos(this.index)+this.offset}get state(){return{index:this.index,offset:this.offset,ok:this.ok}}set state(t){Object.assign(this,t)}pushState(){this._log.push(this.state)}popState(){const t=this._log.pop();return t&&(this.state=t),t}bindBlock(){this.block||(this.index<0&&(this.index=0,this.offset=0),this.index>=this.masked._blocks.length&&(this.index=this.masked._blocks.length-1,this.offset=this.block.displayValue.length))}_pushLeft(t){for(this.pushState(),this.bindBlock();0<=this.index;--this.index,this.offset=(null==(e=this.block)?void 0:e.displayValue.length)||0){var e;if(t())return this.ok=!0}return this.ok=!1}_pushRight(t){for(this.pushState(),this.bindBlock();this.index<this.masked._blocks.length;++this.index,this.offset=0)if(t())return this.ok=!0;return this.ok=!1}pushLeftBeforeFilled(){return this._pushLeft((()=>{if(!this.block.isFixed&&this.block.value)return this.offset=this.block.nearestInputPos(this.offset,a.FORCE_LEFT),0!==this.offset||void 0}))}pushLeftBeforeInput(){return this._pushLeft((()=>{if(!this.block.isFixed)return this.offset=this.block.nearestInputPos(this.offset,a.LEFT),!0}))}pushLeftBeforeRequired(){return this._pushLeft((()=>{if(!(this.block.isFixed||this.block.isOptional&&!this.block.value))return this.offset=this.block.nearestInputPos(this.offset,a.LEFT),!0}))}pushRightBeforeFilled(){return this._pushRight((()=>{if(!this.block.isFixed&&this.block.value)return this.offset=this.block.nearestInputPos(this.offset,a.FORCE_RIGHT),this.offset!==this.block.value.length||void 0}))}pushRightBeforeInput(){return this._pushRight((()=>{if(!this.block.isFixed)return this.offset=this.block.nearestInputPos(this.offset,a.NONE),!0}))}pushRightBeforeRequired(){return this._pushRight((()=>{if(!(this.block.isFixed||this.block.isOptional&&!this.block.value))return this.offset=this.block.nearestInputPos(this.offset,a.NONE),!0}))}}class x{constructor(t){Object.assign(this,t),this._value="",this.isFixed=!0}get value(){return this._value}get unmaskedValue(){return this.isUnmasking?this.value:""}get rawInputValue(){return this._isRawInput?this.value:""}get displayValue(){return this.value}reset(){this._isRawInput=!1,this._value=""}remove(t,e){return void 0===t&&(t=0),void 0===e&&(e=this._value.length),this._value=this._value.slice(0,t)+this._value.slice(e),this._value||(this._isRawInput=!1),new v}nearestInputPos(t,e){void 0===e&&(e=a.NONE);const s=this._value.length;switch(e){case a.LEFT:case a.FORCE_LEFT:return 0;default:return s}}totalInputPositions(t,e){return void 0===t&&(t=0),void 0===e&&(e=this._value.length),this._isRawInput?e-t:0}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this._value.length),void 0===s&&(s={}),s.raw&&this._isRawInput&&this._value.slice(t,e)||""}get isComplete(){return!0}get isFilled(){return Boolean(this._value)}_appendChar(t,e){if(void 0===e&&(e={}),this.isFilled)return new v;const s=!0===this.eager||"append"===this.eager,i=this.char===t&&(this.isUnmasking||e.input||e.raw)&&(!e.raw||!s)&&!e.tail,a=new v({inserted:this.char,rawInserted:i?this.char:""});return this._value=this.char,this._isRawInput=i&&(e.raw||e.input),a}_appendEager(){return this._appendChar(this.char,{tail:!0})}_appendPlaceholder(){const t=new v;return this.isFilled||(this._value=t.inserted=this.char),t}extractTail(){return new E("")}appendTail(t){return e(t)&&(t=new E(String(t))),t.appendTo(this)}append(t,e,s){const i=this._appendChar(t[0],e);return null!=s&&(i.tailShift+=this.appendTail(s).tailShift),i}doCommit(){}get state(){return{_value:this._value,_rawInputValue:this.rawInputValue}}set state(t){this._value=t._value,this._isRawInput=Boolean(t._rawInputValue)}pad(t){return this._appendPlaceholder()}}class S{constructor(t){const{parent:e,isOptional:s,placeholderChar:i,displayChar:a,lazy:u,eager:n,...r}=t;this.masked=d(r),Object.assign(this,{parent:e,isOptional:s,placeholderChar:i,displayChar:a,lazy:u,eager:n})}reset(){this.isFilled=!1,this.masked.reset()}remove(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.value.length),0===t&&e>=1?(this.isFilled=!1,this.masked.remove(t,e)):new v}get value(){return this.masked.value||(this.isFilled&&!this.isOptional?this.placeholderChar:"")}get unmaskedValue(){return this.masked.unmaskedValue}get rawInputValue(){return this.masked.rawInputValue}get displayValue(){return this.masked.value&&this.displayChar||this.value}get isComplete(){return Boolean(this.masked.value)||this.isOptional}_appendChar(t,e){if(void 0===e&&(e={}),this.isFilled)return new v;const s=this.masked.state;let i=this.masked._appendChar(t,this.currentMaskFlags(e));return i.inserted&&!1===this.doValidate(e)&&(i=new v,this.masked.state=s),i.inserted||this.isOptional||this.lazy||e.input||(i.inserted=this.placeholderChar),i.skip=!i.inserted&&!this.isOptional,this.isFilled=Boolean(i.inserted),i}append(t,e,s){return this.masked.append(t,this.currentMaskFlags(e),s)}_appendPlaceholder(){return this.isFilled||this.isOptional?new v:(this.isFilled=!0,new v({inserted:this.placeholderChar}))}_appendEager(){return new v}extractTail(t,e){return this.masked.extractTail(t,e)}appendTail(t){return this.masked.appendTail(t)}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this.value.length),this.masked.extractInput(t,e,s)}nearestInputPos(t,e){void 0===e&&(e=a.NONE);const s=this.value.length,i=Math.min(Math.max(t,0),s);switch(e){case a.LEFT:case a.FORCE_LEFT:return this.isComplete?i:0;case a.RIGHT:case a.FORCE_RIGHT:return this.isComplete?i:s;default:return i}}totalInputPositions(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.value.length),this.value.slice(t,e).length}doValidate(t){return this.masked.doValidate(this.currentMaskFlags(t))&&(!this.parent||this.parent.doValidate(this.currentMaskFlags(t)))}doCommit(){this.masked.doCommit()}get state(){return{_value:this.value,_rawInputValue:this.rawInputValue,masked:this.masked.state,isFilled:this.isFilled}}set state(t){this.masked.state=t.masked,this.isFilled=t.isFilled}currentMaskFlags(t){var e;return{...t,_beforeTailState:(null==t||null==(e=t._beforeTailState)?void 0:e.masked)||(null==t?void 0:t._beforeTailState)}}pad(t){return new v}}S.DEFAULT_DEFINITIONS={0:/\d/,a:/[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,"*":/./};class B extends C{updateOptions(t){super.updateOptions(t)}_update(t){const e=t.mask;e&&(t.validate=t=>t.search(e)>=0),super._update(t)}}o.MaskedRegExp=B;class b extends C{constructor(t){super({...b.DEFAULTS,...t,definitions:Object.assign({},S.DEFAULT_DEFINITIONS,null==t?void 0:t.definitions)})}updateOptions(t){super.updateOptions(t)}_update(t){t.definitions=Object.assign({},this.definitions,t.definitions),super._update(t),this._rebuildMask()}_rebuildMask(){const t=this.definitions;this._blocks=[],this.exposeBlock=void 0,this._stops=[],this._maskedBlocks={};const e=this.mask;if(!e||!t)return;let s=!1,i=!1;for(let a=0;a<e.length;++a){if(this.blocks){const t=e.slice(a),s=Object.keys(this.blocks).filter((e=>0===t.indexOf(e)));s.sort(((t,e)=>e.length-t.length));const i=s[0];if(i){const{expose:t,repeat:e,...s}=p(this.blocks[i]),u={lazy:this.lazy,eager:this.eager,placeholderChar:this.placeholderChar,displayChar:this.displayChar,overwrite:this.overwrite,autofix:this.autofix,...s,repeat:e,parent:this},n=null!=e?new o.RepeatBlock(u):d(u);n&&(this._blocks.push(n),t&&(this.exposeBlock=n),this._maskedBlocks[i]||(this._maskedBlocks[i]=[]),this._maskedBlocks[i].push(this._blocks.length-1)),a+=i.length-1;continue}}let u=e[a],n=u in t;if(u===b.STOP_CHAR){this._stops.push(this._blocks.length);continue}if("{"===u||"}"===u){s=!s;continue}if("["===u||"]"===u){i=!i;continue}if(u===b.ESCAPE_CHAR){if(++a,u=e[a],!u)break;n=!1}const r=n?new S({isOptional:i,lazy:this.lazy,eager:this.eager,placeholderChar:this.placeholderChar,displayChar:this.displayChar,...p(t[u]),parent:this}):new x({char:u,eager:this.eager,isUnmasking:s});this._blocks.push(r)}}get state(){return{...super.state,_blocks:this._blocks.map((t=>t.state))}}set state(t){if(!t)return void this.reset();const{_blocks:e,...s}=t;this._blocks.forEach(((t,s)=>t.state=e[s])),super.state=s}reset(){super.reset(),this._blocks.forEach((t=>t.reset()))}get isComplete(){return this.exposeBlock?this.exposeBlock.isComplete:this._blocks.every((t=>t.isComplete))}get isFilled(){return this._blocks.every((t=>t.isFilled))}get isFixed(){return this._blocks.every((t=>t.isFixed))}get isOptional(){return this._blocks.every((t=>t.isOptional))}doCommit(){this._blocks.forEach((t=>t.doCommit())),super.doCommit()}get unmaskedValue(){return this.exposeBlock?this.exposeBlock.unmaskedValue:this._blocks.reduce(((t,e)=>t+e.unmaskedValue),"")}set unmaskedValue(t){if(this.exposeBlock){const e=this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock))+this.exposeBlock.displayValue.length);this.exposeBlock.unmaskedValue=t,this.appendTail(e),this.doCommit()}else super.unmaskedValue=t}get value(){return this.exposeBlock?this.exposeBlock.value:this._blocks.reduce(((t,e)=>t+e.value),"")}set value(t){if(this.exposeBlock){const e=this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock))+this.exposeBlock.displayValue.length);this.exposeBlock.value=t,this.appendTail(e),this.doCommit()}else super.value=t}get typedValue(){return this.exposeBlock?this.exposeBlock.typedValue:super.typedValue}set typedValue(t){if(this.exposeBlock){const e=this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock))+this.exposeBlock.displayValue.length);this.exposeBlock.typedValue=t,this.appendTail(e),this.doCommit()}else super.typedValue=t}get displayValue(){return this._blocks.reduce(((t,e)=>t+e.displayValue),"")}appendTail(t){return super.appendTail(t).aggregate(this._appendPlaceholder())}_appendEager(){var t;const e=new v;let s=null==(t=this._mapPosToBlock(this.displayValue.length))?void 0:t.index;if(null==s)return e;this._blocks[s].isFilled&&++s;for(let t=s;t<this._blocks.length;++t){const s=this._blocks[t]._appendEager();if(!s.inserted)break;e.aggregate(s)}return e}_appendCharRaw(t,e){void 0===e&&(e={});const s=this._mapPosToBlock(this.displayValue.length),i=new v;if(!s)return i;for(let u,n=s.index;u=this._blocks[n];++n){var a;const s=u._appendChar(t,{...e,_beforeTailState:null==(a=e._beforeTailState)||null==(a=a._blocks)?void 0:a[n]});if(i.aggregate(s),s.consumed)break}return i}extractTail(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);const s=new A;return t===e||this._forEachBlocksInRange(t,e,((t,e,i,a)=>{const u=t.extractTail(i,a);u.stop=this._findStopBefore(e),u.from=this._blockStartPos(e),u instanceof A&&(u.blockIndex=e),s.extend(u)})),s}extractInput(t,e,s){if(void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),void 0===s&&(s={}),t===e)return"";let i="";return this._forEachBlocksInRange(t,e,((t,e,a,u)=>{i+=t.extractInput(a,u,s)})),i}_findStopBefore(t){let e;for(let s=0;s<this._stops.length;++s){const i=this._stops[s];if(!(i<=t))break;e=i}return e}_appendPlaceholder(t){const e=new v;if(this.lazy&&null==t)return e;const s=this._mapPosToBlock(this.displayValue.length);if(!s)return e;const i=s.index,a=null!=t?t:this._blocks.length;return this._blocks.slice(i,a).forEach((s=>{var i;s.lazy&&null==t||e.aggregate(s._appendPlaceholder(null==(i=s._blocks)?void 0:i.length))})),e}_mapPosToBlock(t){let e="";for(let s=0;s<this._blocks.length;++s){const i=this._blocks[s],a=e.length;if(e+=i.displayValue,t<=e.length)return{index:s,offset:t-a}}}_blockStartPos(t){return this._blocks.slice(0,t).reduce(((t,e)=>t+e.displayValue.length),0)}_forEachBlocksInRange(t,e,s){void 0===e&&(e=this.displayValue.length);const i=this._mapPosToBlock(t);if(i){const t=this._mapPosToBlock(e),a=t&&i.index===t.index,u=i.offset,n=t&&a?t.offset:this._blocks[i.index].displayValue.length;if(s(this._blocks[i.index],i.index,u,n),t&&!a){for(let e=i.index+1;e<t.index;++e)s(this._blocks[e],e,0,this._blocks[e].displayValue.length);s(this._blocks[t.index],t.index,0,t.offset)}}}remove(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);const s=super.remove(t,e);return this._forEachBlocksInRange(t,e,((t,e,i,a)=>{s.aggregate(t.remove(i,a))})),s}nearestInputPos(t,e){if(void 0===e&&(e=a.NONE),!this._blocks.length)return 0;const s=new F(this,t);if(e===a.NONE)return s.pushRightBeforeInput()?s.pos:(s.popState(),s.pushLeftBeforeInput()?s.pos:this.displayValue.length);if(e===a.LEFT||e===a.FORCE_LEFT){if(e===a.LEFT){if(s.pushRightBeforeFilled(),s.ok&&s.pos===t)return t;s.popState()}if(s.pushLeftBeforeInput(),s.pushLeftBeforeRequired(),s.pushLeftBeforeFilled(),e===a.LEFT){if(s.pushRightBeforeInput(),s.pushRightBeforeRequired(),s.ok&&s.pos<=t)return s.pos;if(s.popState(),s.ok&&s.pos<=t)return s.pos;s.popState()}return s.ok?s.pos:e===a.FORCE_LEFT?0:(s.popState(),s.ok?s.pos:(s.popState(),s.ok?s.pos:0))}return e===a.RIGHT||e===a.FORCE_RIGHT?(s.pushRightBeforeInput(),s.pushRightBeforeRequired(),s.pushRightBeforeFilled()?s.pos:e===a.FORCE_RIGHT?this.displayValue.length:(s.popState(),s.ok?s.pos:(s.popState(),s.ok?s.pos:this.nearestInputPos(t,a.LEFT)))):t}totalInputPositions(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);let s=0;return this._forEachBlocksInRange(t,e,((t,e,i,a)=>{s+=t.totalInputPositions(i,a)})),s}maskedBlock(t){return this.maskedBlocks(t)[0]}maskedBlocks(t){const e=this._maskedBlocks[t];return e?e.map((t=>this._blocks[t])):[]}pad(t){const e=new v;return this._forEachBlocksInRange(0,this.displayValue.length,(s=>e.aggregate(s.pad(t)))),e}}b.DEFAULTS={...C.DEFAULTS,lazy:!0,placeholderChar:"_"},b.STOP_CHAR="`",b.ESCAPE_CHAR="\\",b.InputDefinition=S,b.FixedDefinition=x,o.MaskedPattern=b;class D extends b{get _matchFrom(){return this.maxLength-String(this.from).length}constructor(t){super(t)}updateOptions(t){super.updateOptions(t)}_update(t){const{to:e=this.to||0,from:s=this.from||0,maxLength:i=this.maxLength||0,autofix:a=this.autofix,...u}=t;this.to=e,this.from=s,this.maxLength=Math.max(String(e).length,i),this.autofix=a;const n=String(this.from).padStart(this.maxLength,"0"),r=String(this.to).padStart(this.maxLength,"0");let h=0;for(;h<r.length&&r[h]===n[h];)++h;u.mask=r.slice(0,h).replace(/0/g,"\\0")+"0".repeat(this.maxLength-h),super._update(u)}get isComplete(){return super.isComplete&&Boolean(this.value)}boundaries(t){let e="",s="";const[,i,a]=t.match(/^(\D*)(\d*)(\D*)/)||[];return a&&(e="0".repeat(i.length)+a,s="9".repeat(i.length)+a),e=e.padEnd(this.maxLength,"0"),s=s.padEnd(this.maxLength,"9"),[e,s]}doPrepareChar(t,e){let s;return void 0===e&&(e={}),[t,s]=super.doPrepareChar(t.replace(/\D/g,""),e),t||(s.skip=!this.isComplete),[t,s]}_appendCharRaw(t,e){if(void 0===e&&(e={}),!this.autofix||this.value.length+1>this.maxLength)return super._appendCharRaw(t,e);const s=String(this.from).padStart(this.maxLength,"0"),i=String(this.to).padStart(this.maxLength,"0"),[a,u]=this.boundaries(this.value+t);return Number(u)<this.from?super._appendCharRaw(s[this.value.length],e):Number(a)>this.to?!e.tail&&"pad"===this.autofix&&this.value.length+1<this.maxLength?super._appendCharRaw(s[this.value.length],e).aggregate(this._appendCharRaw(t,e)):super._appendCharRaw(i[this.value.length],e):super._appendCharRaw(t,e)}doValidate(t){const e=this.value;if(-1===e.search(/[^0]/)&&e.length<=this._matchFrom)return!0;const[s,i]=this.boundaries(e);return this.from<=Number(i)&&Number(s)<=this.to&&super.doValidate(t)}pad(t){const e=new v;if(this.value.length===this.maxLength)return e;const s=this.value,i=this.maxLength-this.value.length;if(i){this.reset();for(let s=0;s<i;++s)e.aggregate(super._appendCharRaw("0",t));s.split("").forEach((t=>this._appendCharRaw(t)))}return e}}o.MaskedRange=D;class y extends b{static extractPatternOptions(t){const{mask:s,pattern:i,...a}=t;return{...a,mask:e(s)?s:i}}constructor(t){super(y.extractPatternOptions({...y.DEFAULTS,...t}))}updateOptions(t){super.updateOptions(t)}_update(t){const{mask:s,pattern:i,blocks:a,...u}={...y.DEFAULTS,...t},n=Object.assign({},y.GET_DEFAULT_BLOCKS());t.min&&(n.Y.from=t.min.getFullYear()),t.max&&(n.Y.to=t.max.getFullYear()),t.min&&t.max&&n.Y.from===n.Y.to&&(n.m.from=t.min.getMonth()+1,n.m.to=t.max.getMonth()+1,n.m.from===n.m.to&&(n.d.from=t.min.getDate(),n.d.to=t.max.getDate())),Object.assign(n,this.blocks,a),super._update({...u,mask:e(s)?s:i,blocks:n})}doValidate(t){const e=this.date;return super.doValidate(t)&&(!this.isComplete||this.isDateExist(this.value)&&null!=e&&(null==this.min||this.min<=e)&&(null==this.max||e<=this.max))}isDateExist(t){return this.format(this.parse(t,this),this).indexOf(t)>=0}get date(){return this.typedValue}set date(t){this.typedValue=t}get typedValue(){return this.isComplete?super.typedValue:null}set typedValue(t){super.typedValue=t}maskEquals(t){return t===Date||super.maskEquals(t)}optionsIsChanged(t){return super.optionsIsChanged(y.extractPatternOptions(t))}}y.GET_DEFAULT_BLOCKS=()=>({d:{mask:D,from:1,to:31,maxLength:2},m:{mask:D,from:1,to:12,maxLength:2},Y:{mask:D,from:1900,to:9999}}),y.DEFAULTS={...b.DEFAULTS,mask:Date,pattern:"d{.}`m{.}`Y",format:(t,e)=>{if(!t)return"";return[String(t.getDate()).padStart(2,"0"),String(t.getMonth()+1).padStart(2,"0"),t.getFullYear()].join(".")},parse:(t,e)=>{const[s,i,a]=t.split(".").map(Number);return new Date(a,i-1,s)}},o.MaskedDate=y;class M extends C{constructor(t){super({...M.DEFAULTS,...t}),this.currentMask=void 0}updateOptions(t){super.updateOptions(t)}_update(t){super._update(t),"mask"in t&&(this.exposeMask=void 0,this.compiledMasks=Array.isArray(t.mask)?t.mask.map((t=>{const{expose:e,...s}=p(t),i=d({overwrite:this._overwrite,eager:this._eager,skipInvalid:this._skipInvalid,...s});return e&&(this.exposeMask=i),i})):[])}_appendCharRaw(t,e){void 0===e&&(e={});const s=this._applyDispatch(t,e);return this.currentMask&&s.aggregate(this.currentMask._appendChar(t,this.currentMaskFlags(e))),s}_applyDispatch(t,e,s){void 0===t&&(t=""),void 0===e&&(e={}),void 0===s&&(s="");const i=e.tail&&null!=e._beforeTailState?e._beforeTailState._value:this.value,a=this.rawInputValue,u=e.tail&&null!=e._beforeTailState?e._beforeTailState._rawInputValue:a,n=a.slice(u.length),r=this.currentMask,h=new v,o=null==r?void 0:r.state;return this.currentMask=this.doDispatch(t,{...e},s),this.currentMask&&(this.currentMask!==r?(this.currentMask.reset(),u&&(this.currentMask.append(u,{raw:!0}),h.tailShift=this.currentMask.value.length-i.length),n&&(h.tailShift+=this.currentMask.append(n,{raw:!0,tail:!0}).tailShift)):o&&(this.currentMask.state=o)),h}_appendPlaceholder(){const t=this._applyDispatch();return this.currentMask&&t.aggregate(this.currentMask._appendPlaceholder()),t}_appendEager(){const t=this._applyDispatch();return this.currentMask&&t.aggregate(this.currentMask._appendEager()),t}appendTail(t){const e=new v;return t&&e.aggregate(this._applyDispatch("",{},t)),e.aggregate(this.currentMask?this.currentMask.appendTail(t):super.appendTail(t))}currentMaskFlags(t){var e,s;return{...t,_beforeTailState:(null==(e=t._beforeTailState)?void 0:e.currentMaskRef)===this.currentMask&&(null==(s=t._beforeTailState)?void 0:s.currentMask)||t._beforeTailState}}doDispatch(t,e,s){return void 0===e&&(e={}),void 0===s&&(s=""),this.dispatch(t,this,e,s)}doValidate(t){return super.doValidate(t)&&(!this.currentMask||this.currentMask.doValidate(this.currentMaskFlags(t)))}doPrepare(t,e){void 0===e&&(e={});let[s,i]=super.doPrepare(t,e);if(this.currentMask){let t;[s,t]=super.doPrepare(s,this.currentMaskFlags(e)),i=i.aggregate(t)}return[s,i]}doPrepareChar(t,e){void 0===e&&(e={});let[s,i]=super.doPrepareChar(t,e);if(this.currentMask){let t;[s,t]=super.doPrepareChar(s,this.currentMaskFlags(e)),i=i.aggregate(t)}return[s,i]}reset(){var t;null==(t=this.currentMask)||t.reset(),this.compiledMasks.forEach((t=>t.reset()))}get value(){return this.exposeMask?this.exposeMask.value:this.currentMask?this.currentMask.value:""}set value(t){this.exposeMask?(this.exposeMask.value=t,this.currentMask=this.exposeMask,this._applyDispatch()):super.value=t}get unmaskedValue(){return this.exposeMask?this.exposeMask.unmaskedValue:this.currentMask?this.currentMask.unmaskedValue:""}set unmaskedValue(t){this.exposeMask?(this.exposeMask.unmaskedValue=t,this.currentMask=this.exposeMask,this._applyDispatch()):super.unmaskedValue=t}get typedValue(){return this.exposeMask?this.exposeMask.typedValue:this.currentMask?this.currentMask.typedValue:""}set typedValue(t){if(this.exposeMask)return this.exposeMask.typedValue=t,this.currentMask=this.exposeMask,void this._applyDispatch();let e=String(t);this.currentMask&&(this.currentMask.typedValue=t,e=this.currentMask.unmaskedValue),this.unmaskedValue=e}get displayValue(){return this.currentMask?this.currentMask.displayValue:""}get isComplete(){var t;return Boolean(null==(t=this.currentMask)?void 0:t.isComplete)}get isFilled(){var t;return Boolean(null==(t=this.currentMask)?void 0:t.isFilled)}remove(t,e){const s=new v;return this.currentMask&&s.aggregate(this.currentMask.remove(t,e)).aggregate(this._applyDispatch()),s}get state(){var t;return{...super.state,_rawInputValue:this.rawInputValue,compiledMasks:this.compiledMasks.map((t=>t.state)),currentMaskRef:this.currentMask,currentMask:null==(t=this.currentMask)?void 0:t.state}}set state(t){const{compiledMasks:e,currentMaskRef:s,currentMask:i,...a}=t;e&&this.compiledMasks.forEach(((t,s)=>t.state=e[s])),null!=s&&(this.currentMask=s,this.currentMask.state=i),super.state=a}extractInput(t,e,s){return this.currentMask?this.currentMask.extractInput(t,e,s):""}extractTail(t,e){return this.currentMask?this.currentMask.extractTail(t,e):super.extractTail(t,e)}doCommit(){this.currentMask&&this.currentMask.doCommit(),super.doCommit()}nearestInputPos(t,e){return this.currentMask?this.currentMask.nearestInputPos(t,e):super.nearestInputPos(t,e)}get overwrite(){return this.currentMask?this.currentMask.overwrite:this._overwrite}set overwrite(t){this._overwrite=t}get eager(){return this.currentMask?this.currentMask.eager:this._eager}set eager(t){this._eager=t}get skipInvalid(){return this.currentMask?this.currentMask.skipInvalid:this._skipInvalid}set skipInvalid(t){this._skipInvalid=t}get autofix(){return this.currentMask?this.currentMask.autofix:this._autofix}set autofix(t){this._autofix=t}maskEquals(t){return Array.isArray(t)?this.compiledMasks.every(((e,s)=>{if(!t[s])return;const{mask:i,...a}=t[s];return r(e,a)&&e.maskEquals(i)})):super.maskEquals(t)}typedValueEquals(t){var e;return Boolean(null==(e=this.currentMask)?void 0:e.typedValueEquals(t))}}M.DEFAULTS={...C.DEFAULTS,dispatch:(t,e,s,i)=>{if(!e.compiledMasks.length)return;const u=e.rawInputValue,n=e.compiledMasks.map(((n,r)=>{const h=e.currentMask===n,o=h?n.displayValue.length:n.nearestInputPos(n.displayValue.length,a.FORCE_LEFT);return n.rawInputValue!==u?(n.reset(),n.append(u,{raw:!0})):h||n.remove(o),n.append(t,e.currentMaskFlags(s)),n.appendTail(i),{index:r,weight:n.rawInputValue.length,totalInputPositions:n.totalInputPositions(0,Math.max(o,n.nearestInputPos(n.displayValue.length,a.FORCE_LEFT)))}}));return n.sort(((t,e)=>e.weight-t.weight||e.totalInputPositions-t.totalInputPositions)),e.compiledMasks[n[0].index]}},o.MaskedDynamic=M;class I extends b{constructor(t){super({...I.DEFAULTS,...t})}updateOptions(t){super.updateOptions(t)}_update(t){const{enum:e,...s}=t;if(e){const t=e.map((t=>t.length)),i=Math.min(...t),a=Math.max(...t)-i;s.mask="*".repeat(i),a&&(s.mask+="["+"*".repeat(a)+"]"),this.enum=e}super._update(s)}_appendCharRaw(t,e){void 0===e&&(e={});const s=Math.min(this.nearestInputPos(0,a.FORCE_RIGHT),this.value.length),i=this.enum.filter((e=>this.matchValue(e,this.unmaskedValue+t,s)));if(i.length){1===i.length&&this._forEachBlocksInRange(0,this.value.length,((t,s)=>{const a=i[0][s];s>=this.value.length||a===t.value||(t.reset(),t._appendChar(a,e))}));const t=super._appendCharRaw(i[0][this.value.length],e);return 1===i.length&&i[0].slice(this.unmaskedValue.length).split("").forEach((e=>t.aggregate(super._appendCharRaw(e)))),t}return new v({skip:!this.isComplete})}extractTail(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),new E("",t)}remove(t,e){if(void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),t===e)return new v;const s=Math.min(super.nearestInputPos(0,a.FORCE_RIGHT),this.value.length);let i;for(i=t;i>=0;--i){if(this.enum.filter((t=>this.matchValue(t,this.value.slice(s,i),s))).length>1)break}const u=super.remove(i,e);return u.tailShift+=i-t,u}get isComplete(){return this.enum.indexOf(this.value)>=0}}I.DEFAULTS={...b.DEFAULTS,matchValue:(t,e,s)=>t.indexOf(e,s)===s},o.MaskedEnum=I;class V extends C{updateOptions(t){super.updateOptions(t)}_update(t){super._update({...t,validate:t.mask})}}var T;o.MaskedFunction=V;class w extends C{constructor(t){super({...w.DEFAULTS,...t})}updateOptions(t){super.updateOptions(t)}_update(t){super._update(t),this._updateRegExps()}_updateRegExps(){const t="^"+(this.allowNegative?"[+|\\-]?":""),e=(this.scale?"("+n(this.radix)+"\\d{0,"+this.scale+"})?":"")+"$";this._numberRegExp=new RegExp(t+"\\d*"+e),this._mapToRadixRegExp=new RegExp("["+this.mapToRadix.map(n).join("")+"]","g"),this._thousandsSeparatorRegExp=new RegExp(n(this.thousandsSeparator),"g")}_removeThousandsSeparators(t){return t.replace(this._thousandsSeparatorRegExp,"")}_insertThousandsSeparators(t){const e=t.split(this.radix);return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,this.thousandsSeparator),e.join(this.radix)}doPrepareChar(t,e){void 0===e&&(e={});const[s,i]=super.doPrepareChar(this._removeThousandsSeparators(this.scale&&this.mapToRadix.length&&(e.input&&e.raw||!e.input&&!e.raw)?t.replace(this._mapToRadixRegExp,this.radix):t),e);return t&&!s&&(i.skip=!0),!s||this.allowPositive||this.value||"-"===s||i.aggregate(this._appendChar("-")),[s,i]}_separatorsCount(t,e){void 0===e&&(e=!1);let s=0;for(let i=0;i<t;++i)this._value.indexOf(this.thousandsSeparator,i)===i&&(++s,e&&(t+=this.thousandsSeparator.length));return s}_separatorsCountFromSlice(t){return void 0===t&&(t=this._value),this._separatorsCount(this._removeThousandsSeparators(t).length,!0)}extractInput(t,e,s){return void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),[t,e]=this._adjustRangeWithSeparators(t,e),this._removeThousandsSeparators(super.extractInput(t,e,s))}_appendCharRaw(t,e){void 0===e&&(e={});const s=e.tail&&e._beforeTailState?e._beforeTailState._value:this._value,i=this._separatorsCountFromSlice(s);this._value=this._removeThousandsSeparators(this.value);const a=this._value;this._value+=t;const u=this.number;let n,r=!isNaN(u),h=!1;if(r){let t;null!=this.min&&this.min<0&&this.number<this.min&&(t=this.min),null!=this.max&&this.max>0&&this.number>this.max&&(t=this.max),null!=t&&(this.autofix?(this._value=this.format(t,this).replace(w.UNMASKED_RADIX,this.radix),h||(h=a===this._value&&!e.tail)):r=!1),r&&(r=Boolean(this._value.match(this._numberRegExp)))}r?n=new v({inserted:this._value.slice(a.length),rawInserted:h?"":t,skip:h}):(this._value=a,n=new v),this._value=this._insertThousandsSeparators(this._value);const o=e.tail&&e._beforeTailState?e._beforeTailState._value:this._value,l=this._separatorsCountFromSlice(o);return n.tailShift+=(l-i)*this.thousandsSeparator.length,n}_findSeparatorAround(t){if(this.thousandsSeparator){const e=t-this.thousandsSeparator.length+1,s=this.value.indexOf(this.thousandsSeparator,e);if(s<=t)return s}return-1}_adjustRangeWithSeparators(t,e){const s=this._findSeparatorAround(t);s>=0&&(t=s);const i=this._findSeparatorAround(e);return i>=0&&(e=i+this.thousandsSeparator.length),[t,e]}remove(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length),[t,e]=this._adjustRangeWithSeparators(t,e);const s=this.value.slice(0,t),i=this.value.slice(e),a=this._separatorsCount(s.length);this._value=this._insertThousandsSeparators(this._removeThousandsSeparators(s+i));const u=this._separatorsCountFromSlice(s);return new v({tailShift:(u-a)*this.thousandsSeparator.length})}nearestInputPos(t,e){if(!this.thousandsSeparator)return t;switch(e){case a.NONE:case a.LEFT:case a.FORCE_LEFT:{const s=this._findSeparatorAround(t-1);if(s>=0){const i=s+this.thousandsSeparator.length;if(t<i||this.value.length<=i||e===a.FORCE_LEFT)return s}break}case a.RIGHT:case a.FORCE_RIGHT:{const e=this._findSeparatorAround(t);if(e>=0)return e+this.thousandsSeparator.length}}return t}doCommit(){if(this.value){const t=this.number;let e=t;null!=this.min&&(e=Math.max(e,this.min)),null!=this.max&&(e=Math.min(e,this.max)),e!==t&&(this.unmaskedValue=this.format(e,this));let s=this.value;this.normalizeZeros&&(s=this._normalizeZeros(s)),this.padFractionalZeros&&this.scale>0&&(s=this._padFractionalZeros(s)),this._value=s}super.doCommit()}_normalizeZeros(t){const e=this._removeThousandsSeparators(t).split(this.radix);return e[0]=e[0].replace(/^(\D*)(0*)(\d*)/,((t,e,s,i)=>e+i)),t.length&&!/\d$/.test(e[0])&&(e[0]=e[0]+"0"),e.length>1&&(e[1]=e[1].replace(/0*$/,""),e[1].length||(e.length=1)),this._insertThousandsSeparators(e.join(this.radix))}_padFractionalZeros(t){if(!t)return t;const e=t.split(this.radix);return e.length<2&&e.push(""),e[1]=e[1].padEnd(this.scale,"0"),e.join(this.radix)}doSkipInvalid(t,e,s){void 0===e&&(e={});const i=0===this.scale&&t!==this.thousandsSeparator&&(t===this.radix||t===w.UNMASKED_RADIX||this.mapToRadix.includes(t));return super.doSkipInvalid(t,e,s)&&!i}get unmaskedValue(){return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix,w.UNMASKED_RADIX)}set unmaskedValue(t){super.unmaskedValue=t}get typedValue(){return this.parse(this.unmaskedValue,this)}set typedValue(t){this.rawInputValue=this.format(t,this).replace(w.UNMASKED_RADIX,this.radix)}get number(){return this.typedValue}set number(t){this.typedValue=t}get allowNegative(){return null!=this.min&&this.min<0||null!=this.max&&this.max<0}get allowPositive(){return null!=this.min&&this.min>0||null!=this.max&&this.max>0}typedValueEquals(t){return(super.typedValueEquals(t)||w.EMPTY_VALUES.includes(t)&&w.EMPTY_VALUES.includes(this.typedValue))&&!(0===t&&""===this.value)}}T=w,w.UNMASKED_RADIX=".",w.EMPTY_VALUES=[...C.EMPTY_VALUES,0],w.DEFAULTS={...C.DEFAULTS,mask:Number,radix:",",thousandsSeparator:"",mapToRadix:[T.UNMASKED_RADIX],min:Number.MIN_SAFE_INTEGER,max:Number.MAX_SAFE_INTEGER,scale:2,normalizeZeros:!0,padFractionalZeros:!1,parse:Number,format:t=>t.toLocaleString("en-US",{useGrouping:!1,maximumFractionDigits:20})},o.MaskedNumber=w;const R={MASKED:"value",UNMASKED:"unmaskedValue",TYPED:"typedValue"};function P(t,e,s){void 0===e&&(e=R.MASKED),void 0===s&&(s=R.MASKED);const i=d(t);return t=>i.runIsolated((i=>(i[e]=t,i[s])))}function O(t,e,s,i){return P(e,s,i)(t)}o.PIPE_TYPE=R,o.createPipe=P,o.pipe=O;class L extends b{get repeatFrom(){var t;return null!=(t=Array.isArray(this.repeat)?this.repeat[0]:this.repeat===1/0?0:this.repeat)?t:0}get repeatTo(){var t;return null!=(t=Array.isArray(this.repeat)?this.repeat[1]:this.repeat)?t:1/0}constructor(t){super(t)}updateOptions(t){super.updateOptions(t)}_update(t){var e,s,i;const{repeat:a,...u}=p(t);this._blockOpts=Object.assign({},this._blockOpts,u);const n=d(this._blockOpts);this.repeat=null!=(e=null!=(s=null!=a?a:n.repeat)?s:this.repeat)?e:1/0,super._update({mask:"m".repeat(Math.max(this.repeatTo===1/0&&(null==(i=this._blocks)?void 0:i.length)||0,this.repeatFrom)),blocks:{m:n},eager:n.eager,overwrite:n.overwrite,skipInvalid:n.skipInvalid,lazy:n.lazy,placeholderChar:n.placeholderChar,displayChar:n.displayChar})}_allocateBlock(t){return t<this._blocks.length?this._blocks[t]:this.repeatTo===1/0||this._blocks.length<this.repeatTo?(this._blocks.push(d(this._blockOpts)),this.mask+="m",this._blocks[this._blocks.length-1]):void 0}_appendCharRaw(t,e){void 0===e&&(e={});const s=new v;for(let r,h,o=null!=(i=null==(a=this._mapPosToBlock(this.displayValue.length))?void 0:a.index)?i:Math.max(this._blocks.length-1,0);r=null!=(u=this._blocks[o])?u:h=!h&&this._allocateBlock(o);++o){var i,a,u,n;const l=r._appendChar(t,{...e,_beforeTailState:null==(n=e._beforeTailState)||null==(n=n._blocks)?void 0:n[o]});if(l.skip&&h){this._blocks.pop(),this.mask=this.mask.slice(1);break}if(s.aggregate(l),l.consumed)break}return s}_trimEmptyTail(t,e){var s,i;void 0===t&&(t=0);const a=Math.max((null==(s=this._mapPosToBlock(t))?void 0:s.index)||0,this.repeatFrom,0);let u;null!=e&&(u=null==(i=this._mapPosToBlock(e))?void 0:i.index),null==u&&(u=this._blocks.length-1);let n=0;for(let t=u;a<=t&&!this._blocks[t].unmaskedValue;--t,++n);n&&(this._blocks.splice(u-n+1,n),this.mask=this.mask.slice(n))}reset(){super.reset(),this._trimEmptyTail()}remove(t,e){void 0===t&&(t=0),void 0===e&&(e=this.displayValue.length);const s=super.remove(t,e);return this._trimEmptyTail(t,e),s}totalInputPositions(t,e){return void 0===t&&(t=0),null==e&&this.repeatTo===1/0?1/0:super.totalInputPositions(t,e)}get state(){return super.state}set state(t){this._blocks.length=t._blocks.length,this.mask=this.mask.slice(0,this._blocks.length),super.state=t}}o.RepeatBlock=L;try{globalThis.IMask=o}catch{}t.ChangeDetails=v,t.ChunksTailDetails=A,t.DIRECTION=a,t.HTMLContenteditableMaskElement=m,t.HTMLInputMaskElement=k,t.HTMLMaskElement=g,t.InputMask=f,t.MaskElement=c,t.Masked=C,t.MaskedDate=y,t.MaskedDynamic=M,t.MaskedEnum=I,t.MaskedFunction=V,t.MaskedNumber=w,t.MaskedPattern=b,t.MaskedRange=D,t.MaskedRegExp=B,t.PIPE_TYPE=R,t.PatternFixedDefinition=x,t.PatternInputDefinition=S,t.RepeatBlock=L,t.createMask=d,t.createPipe=P,t.default=o,t.forceDirection=u,t.normalizeOpts=p,t.pipe=O,Object.defineProperty(t,"__esModule",{value:!0})}));


/* Functions                                        
--------------------------------------------------------*/
//Debounce
function debounce(func) {
	let timer;
	return function (event) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(func, 200, event);
	};
}

//Popup
const popup = new Popup();
function Popup(){
	
	if(!(this instanceof Popup)) { return new Popup(); }
	
	const wWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
	const wHeight = window.innerHeight > 0 ? window.innerHeight : screen.height;
	const scrollSize = wWidth - $("body").width();

    const overlay = `<div class="popups-overlay"></div>`;
	
	this.open = function(id, ovr = false){
        $(".popup").hide();

        if(!$(document.body).find('.popups-overlay').length){
            $(document.body).append(overlay);        
        }

        const $overlay = $(document.body).find('.popups-overlay');

		$(`${id} .popup__container`).css("transform","translate(-50%,-400%)");
		
		$(id).fadeIn(1, function(){
			let popupHeight = parseInt( $(`${id} .popup__container`).innerHeight() + 50);
			
			$overlay.css({ "opacity": "1", "min-height": popupHeight + "px" });
						
			if( (wWidth <= 992) || (popupHeight > wHeight) ){
				$(`${id} .popup__container`).css({ "transform":"translate(-50%,0%)", "top": "80px" });
			} else {
				$(`${id} .popup__container`).css("transform","translate(-50%,-50%)");
			}
			
			$("body").css({"overflow": "hidden", "margin-right": scrollSize + "px"});
            $(".wrapper").css({"filter":"blur(10px)"});
		});
		
		$(window).on("resize", debounce(
			function() {
				let w = window.innerWidth > 0 ? window.innerWidth : screen.width;
				let h = window.innerHeight > 0 ? window.innerHeight : screen.height;
				let ph = $(`${id} .popup__container`).innerHeight();
				
				if( (w <= 992) || (ph > h) ){
					$(document.body).find(`${id} .popup__container`).css({ "transform":"translate(-50%,0%)", "top": "30px" });
				} else {
					$(document.body).find(`${id} .popup__container`).css({ "transform":"translate(-50%,-50%)", "top": "50%" });
				}		
			}
		));	
	}	

	this.close = function(id){
		$(`${id} .popup__container`).css("transform","translate(-50%, -400%)");
		$(document.body).find('.popups-overlay').css("opacity","0");
		
		setTimeout(function(){
			$(id).hide(0);
			$("body").css({"overflow": "", "margin-right":"0"});
            $(".wrapper").css({"filter":"none"});
            $(document.body).find('.popups-overlay').remove();
			$(`${id} .popup__container`).attr("style", "");
		}, 500);
	}
}
$(function () {

    const ticker = (target, margin = 0) => {

        let $target = $(target),
            $inner = $target.children(),
            containerWidth = 0,
            left = 0,
            width = 0;
      
        const size = () => {
      
          containerWidth = $target.width();
          left = containerWidth;
      
          $target.find('.ticker__item').each(function() {
      
            width = width + $(this).outerWidth() + margin;
      
          });
      
        };
        size();
      
        let tick = () => {
      
          if (--left < -width) {
      
            left = containerWidth;
      
          }
      
          $inner.css({
            'transform': 'translateX(' + left + 'px)'
          });
      
          setTimeout(tick, 16);
      
        };
      
        tick();
      
      };
      //ticker('#js-ticker', 30);

});

// Rating stars render
function renderStars(count = 1) {
    const maxCount = 5;
    const starOn = "ic-star1";
    const starOff = "ic-star0";
    let html = "";

    for (let i = 1; i <= maxCount; i++) {
        html += i <= count ? `<svg class="${starOn}"><use xlink:href="#${starOn}"></use></svg>`
            : `<svg class="${starOff}"><use xlink:href="#${starOff}"></use></svg>`;
    }

    this.find("svg").remove();
    this.find("input").val(count);
    this.append(html)
}

// Correct_layout
function correct_layout(str, rev) {
    var replacer = {
        'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г',
        'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы',
        'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
        ';': 'ж', '\'': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и',
        'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.', '`': 'ё'
    };
    if (rev) {
        var rev_replacer = {};
        for (var key in replacer) rev_replacer[replacer[key]] = key;
        replacer = rev_replacer;
    }
    return str.replace(/./g, function (found) {
        if (replacer[found]) return replacer[found];
        return found;
    });
}

// Translit
function translit(str, replacer) {

    if (str == '') return '';

    if (replacer == 'ru') {
        replacer = {
            'zh': 'ж', 'eo': 'ё', 'ts': 'ц', 'sh': 'ш', 'shch': 'щ', 'ch': 'ч', 'je': 'е',
            'yu': 'ю', 'ya': 'я', 'th': 'ф|т|з', 'ee': 'и',
            'a': 'а', 'b': 'б', 'c': 'с|ц|к', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е|э', 'z': 'з',
            'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'r': 'р',
            's': 'с', 't': 'т', 'u': 'у', 'f': 'ф', 'h': 'х', 'y': 'й|и', 'i': 'и', 'w': 'в',
            'q': 'к', 'x': 'кс'
        };
    }
    else if (replacer == 'en') {
        replacer = {
            'кс': 'x',
            'а': 'a', 'б': 'b', 'в': 'v|w', 'г': 'g', 'д': 'd', 'е': 'e|a', 'з': 'z|th|s', 'и': 'i|e',
            'й': 'j|i|y', 'к': 'k|q|c', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
            'с': 's', 'т': 't', 'у': 'u', 'ф': 'f|th', 'х': 'h', 'ц': 'c', 'ы': 'y', 'э': 'e|a',
            'ш': 'sh', 'я': 'ya', 'ё': 'e|yo', 'ж': 'zh', 'ю': 'yu|u', 'ч': 'ch', 'щ': 'shch'
        };
    }


    var template = '';
    for (var key in replacer) template += (template !== '' ? '|' : '') + key;
    var replacer_reg = new RegExp(template, 'g');

    var variants = [str];
    var i = 0;
    while (true) {
        if (variants[i] !== undefined) {
            variants[i] = variants[i].replace(replacer_reg, function (key) {
                var synonyms = replacer[key].split('|');
                for (var j = 0; j < synonyms.length; j++) {
                    if (j == synonyms.length - 1) return synonyms[j];
                    variants.push(variants[i].replace(new RegExp(key, 'g'), synonyms[j]));
                }
            });
        }
        i++;
        if (i == variants.length) break;
    }
    return variants;
}

// Example Loading
function exampleLoading(selector) {
    $(selector).addClass("loading");

    setTimeout(function(){
        $(selector).removeClass("loading");
    }, 3000)
}

// Drag And Drop
(function(){
    const dragAndDrop = document.querySelector('.dragdrop');       
    if(!dragAndDrop) return;

    const trigger = dragAndDrop.querySelector('.dragdrop__trigger'),
        imagesList = dragAndDrop.parentNode.querySelector('.dragdrop__list'),       
        types = ['image/jpeg', 'image/png', 'image/gif'],
        input = dragAndDrop.querySelector('.dragdrop__input');
    let imagesForUpload = [];

    const imageListRender = () => {
        let html = "";

        for (let i = 0;  i < imagesForUpload.length; i++) {
            let imageTmpUrl = URL.createObjectURL(imagesForUpload[i]);
            html += `<li class="dragdrop__item" data-id="${i}">
                    <img src="${imageTmpUrl}" alt="">
                    <span class="dragdrop__del">
                        <svg>
                            <use xlink:href="#ic-remove"></use>
                        </svg>
                    </span>
                </li>`;
        }

        imagesList.innerHTML = html;
        let delLinks = imagesList.querySelectorAll('.dragdrop__del');

        for(let key = 0; key < delLinks.length; key++) {
            delLinks[key].addEventListener('click', (e) => {
                e.preventDefault();
                let li = e.target.closest('.dragdrop__item');
                let id = li.dataset.id;
                li.remove();
                imagesForUpload.splice(id, 1);
            });
        }

    }

    trigger.addEventListener('click', (e) => {
        input.click();
        input.onchange = (e) => {
            let files = e.target.files;

            if( dragAndDrop.classList.contains('dragdrop--disable') ) {
                imagesForUpload = [];
            }

            for(let i = 0; i < files.length; i++) {
                if (!types.includes(files[i].type)) {
                    continue;
                }   
                imagesForUpload.push(files[i]);
            }
            imageListRender(files);
        }
    });

    // disable drag and drop
    if( !dragAndDrop.classList.contains('dragdrop--disable') ) {

        trigger.addEventListener('dragenter', (e) => {
            e.preventDefault()
            dragAndDrop.classList.add('dragdrop--active');
        });
        trigger.addEventListener('dragleave', (e) => {
            e.preventDefault()
            dragAndDrop.classList.remove('dragdrop--active');
        });
        trigger.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        trigger.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            for(let i = 0; i < files.length; i++) {
                if (!types.includes(files[i].type)) {
                    continue;
                }   
                imagesForUpload.push(files[i]);
            }
            imageListRender(files);
            dragAndDrop.classList.remove('dragdrop--active');
        });

    }

    // const uploadImages = () => {
    //     let formData = new FormData();
    
    //     imagesForUpload.forEach((image, key) => {
    //         formData.append(key, image);
    //     })
    
    //     fetch('upload.php', {
    //         method: "POST",
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.status) {
    //                 alert('Файлы успешно загружены')
    //             }
    //         })
    // }
    
})();

// AlertX
function xconfirm(ititle, icontent, type, fn1, fn2){
	
	const width = ($(window).width() > 860) ? '400' : '90%';
	let btns = {};
    let icon = '';
	
	fn1 = fn1 || function(){};
	fn2 = fn2 || function(){};

    switch (type) {
        case 'info':
            btns = {
                OK: {
                    btnClass: 'btn--blue',
                    action: fn1
                }
            };
            icon = `<svg class="ic-info"><use xlink:href="#ic-info"></use></svg>`;
            break;
        case 'error':
            btns = {
                OK: {
                    btnClass: 'btn--red',
                    action: fn1
                }
            };
            icon = `<svg class="ic-error"><use xlink:href="#ic-warning"></use></svg>`;
            break;
        case 'success':
            btns = {
                OK: {
                    btnClass: 'btn--green',
                    action: fn1
                }
            };
            icon = `<svg class="ic-success"><use xlink:href="#ic-success"></use></svg>`;
            break;
        case 'delete':
            btns = {
                Delete: {
                    btnClass: 'btn--red',
                    action: fn1
                },
                Cancel: {
                    btnClass: 'btn--grayline',
                    action: fn2
                }
            };
            icon = `<svg class="ic-delete"><use xlink:href="#ic-warning"></use></svg>`;
            break;            

        default:
            btns = false;
            icon = `<svg class="ic-success"><use xlink:href="#ic-success"></use></svg>`;
            break;
    }
	
	$.confirm({
		boxWidth: width,
		useBootstrap: false,
		theme: 'xconfirm',
	    title: ititle,
        icon: icon,
	    content: icontent,
    	closeIcon: true,
		draggable: true,
	    buttons: btns
	});
}

// Countdown
function xtimer(id, deadline, cb) {
	
	function addZero(num){
		if(num <= 9) {
			return "0" + num;
		} else {
			return num;
		}
	}
	
	function timeRemaining(endtime){
		const t = Date.parse(endtime) - Date.parse(new Date()),
			  seconds = Math.floor( (t/1000) % 60 ),
			  minutes = Math.floor( (t/1000/60) % 60 ),
			  hours   = Math.floor( (t/(1000 * 60 * 60)) % 24 ),
			  //hours   = Math.floor( (t/(1000 * 60 * 60))),
			  days    = Math.floor( t/(1000 * 60 * 60 * 24) );
			  
		return {
			'total' : t,
			'days'	: days,
			'hours'	: hours,
			'minutes' : minutes,
			'seconds' : seconds
		}
	}	  
	
	function setClock(selector, endtime){
		const timer = document.querySelector(selector),
		  days 	= timer.querySelector("[data-days]"),
		  hours = timer.querySelector("[data-hours]"),
		  minutes = timer.querySelector("[data-minutes]"),
		  seconds = timer.querySelector("[data-seconds]"),
		  timerInterval = setInterval(updateClock, 1000);
		  
		updateClock();	
		
		function updateClock(){
			const t = timeRemaining(endtime);
			
			if(days){
				days.textContent = addZero(t.days);
			}
			if(hours){
				hours.textContent = addZero(t.hours);
			}
			if(minutes){
				minutes.textContent = addZero(t.minutes);
			}
			if(seconds){
				seconds.textContent = addZero(t.seconds);
			}	
							
			if(t.total <= 0) {
				if(days){
					days.textContent = "00";
				}
				if(hours){
					hours.textContent = "00";
				}
				if(minutes){
					minutes.textContent = "00";
				}
				if(seconds){
					seconds.textContent = "00";
				}	
				
				clearInterval(timerInterval);	
				
				if (cb && typeof cb === 'function') {
				 	cb();
				}			
			}
								
		}	  
		
	}
	
	setClock(id, deadline);
}

// Go to
function goTo(line, t) {
	t = (t == undefined)  ? 100 : t;
	$('html, body').animate({
		scrollTop: $(line).offset().top-t
	}, 500);
}

// Transactions getTDetails
function getTDetails(type, id) {

    const $popup = $('#popup__details');
    if(!$popup) return;
    
    let html = "";

    const sellData = [
        {
          "img": "./assets/img/tickers/amazon.svg",
          "title": 'UK Amazon 100 EUR ecode',
          "subtitle": "United Kingdom • Amazon",
          "quantity" : 10,
          "pricePer" : "97.44$",
          "total" : "974.4 $",
          "cardsDetails" : "BVJ2-GGSK-BQLK-80A1&#10;PQOG-SSA2-GKAQ-9G0A&#10;BVJ2-GGSK-BQLK-80A1&#10;PQOG-SSA2-GKAQ-9G0A",
          "status": "REJECTED",
          "statusIcon": "#ic-close",
          "classn": "pdstatus--rejected",
          "statusInfo": false,
          "msg": [{
                "autor": "<svg><use xlink:href='#ic-user'></use></svg><span>Your Comment</span>",
                "text": "I was given 10 cards as a gift, I want to sell them. Thank you!",
                "imgs": ["./assets/img/content/uplimg1.jpg", "./assets/img/content/uplimg1.jpg"],
                "imgsCaption": "Uploaded images"

          },
          {
            "autor": "<svg><use xlink:href='#ic-support'></use></svg><span>Admin Comment</span>",
            "text": "Checked your cards, 10/10 don't work. We are forced to reject your application.",
            "imgs": ["./assets/img/content/uplimg1.jpg", "./assets/img/content/uplimg1.jpg"],
            "imgsCaption": "Admin images"

                }]
        },
        {
            "img": "./assets/img/tickers/amazon.svg",
            "title": 'UK Amazon 100 EUR ecode',
            "subtitle": "United Kingdom • Amazon",
            "quantity" : 10,
            "pricePer" : "97.44$",
            "total" : "974.4 $",
            "cardsDetails" : "BVJ2-GGSK-BQLK-80A1&#10;PQOG-SSA2-GKAQ-9G0A&#10;BVJ2-GGSK-BQLK-80A1&#10;PQOG-SSA2-GKAQ-9G0A",
            "status": "COMPLETE",
            "statusIcon": "#ic-success",
            "classn": "pdstatus--complete",
            "statusInfo": false,
            "msg": [{
                  "autor": "<svg><use xlink:href='#ic-user'></use></svg><span>Your Comment</span>",
                  "text": "I was given 10 cards as a gift, I want to sell them. Thank you!",
                  "imgs": ["./assets/img/content/uplimg1.jpg", "./assets/img/content/uplimg1.jpg"],
                  "imgsCaption": "Uploaded images"
  
            },
            {
              "autor": "<svg><use xlink:href='#ic-support'></use></svg><span>Admin Comment</span>",
              "text": "Checked your cards, 10/10 don't work. We are forced to reject your application.",
              "imgs": ["./assets/img/content/uplimg1.jpg", "./assets/img/content/uplimg1.jpg"],
              "imgsCaption": "Admin images"
  
                }]
        },
        {
            "img": "./assets/img/tickers/amazon.svg",
            "title": 'UK Amazon 100 EUR ecode',
            "subtitle": "United Kingdom • Amazon",
            "quantity" : 10,
            "pricePer" : "97.44$",
            "total" : "974.4 $",
            "cardsDetails" : "BVJ2-GGSK-BQLK-80A1&#10;PQOG-SSA2-GKAQ-9G0A&#10;BVJ2-GGSK-BQLK-80A1&#10;PQOG-SSA2-GKAQ-9G0A",
            "status": "PROCESSING",
            "statusIcon": "#ic-time",
            "classn": "pdstatus--processing",
            "statusInfo": 'Approximate card verification time is <strong>60 minutes.</strong> In rare cases, verification can take up to 24 hours. <a href="#">Read more</a> about card processing time.',
            "msg": [{
                  "autor": "<svg><use xlink:href='#ic-user'></use></svg><span>Your Comment</span>",
                  "text": "I was given 10 cards as a gift, I want to sell them. Thank you!",
                  "imgs": ["./assets/img/content/uplimg1.jpg", "./assets/img/content/uplimg1.jpg"],
                  "imgsCaption": "Uploaded images"
  
                }]
        }
      ];
    
    const wdrawalData = [
        {
          "img": "./assets/img/currency/btc.svg",
          "title": 'Withdrawal <span class="fw400">Main Balance</span>',
          "subtitle": "24 May 2024, 11:28",
          "amount_1" : "0.00014 BTC",
          "amount_2" : "25.25$",
          "pmethod" : "Bitcoin (BTC)",
          "address" : "bc1qcc7yreqgz3rhx2pltzfs5av27ga8pt8pk7utw7",
          "txid" : "f475f77365015b47dd892d206fdb2692f010f833bbacc678d63a0275bddb9d55",
          "status": "COMPLETE",
          "statusIcon": "#ic-success",
          "classn": "pdstatus--complete",
          "msg": []
        },
        {
            "img": "./assets/img/currency/btc.svg",
            "title": 'Withdrawal <span class="fw400">Main Balance</span>',
            "subtitle": "24 May 2024, 11:28",
            "amount_1" : "0.00014 BTC",
            "amount_2" : "25.25$",
            "pmethod" : "Bitcoin (BTC)",
            "address" : "bc1qcc7yreqgz3rhx2pltzfs5av27ga8pt8pk7utw7",
            "txid" : false,
            "status": "PROCESSING",
            "statusIcon": "#ic-time",
            "classn": "pdstatus--processing",
            "msg": []
          },
        {
            "img": "./assets/img/currency/btc.svg",
            "title": 'Withdrawal <span class="fw400">Main Balance</span>',
            "subtitle": "24 May 2024, 11:28",
            "amount_1" : "0.00014 BTC",
            "amount_2" : "25.25$",
            "pmethod" : "Bitcoin (BTC)",
            "address" : "bc1qcc7yreqgz3rhx2pltzfs5av27ga8pt8pk7utw7",
            "txid" : false,
            "status": "REJECTED",
            "statusIcon": "#ic-close",
            "classn": "pdstatus--rejected",
            "msg": [{
                  "autor": "<svg><use xlink:href='#ic-user'></use></svg><span>Admin Comment</span>",
                  "text": "You have specified an invalid BTC address. Please re-create the request and provide a correct address.",
                  "imgs": [],
                  "imgsCaption": ""
  
                }]
        }
      ];

    if(type == "sell" && sellData[id]) {

        let data = sellData[id];

        html += `<div class="popup__head">
                    <div class="popup__icon">
                        <img src="${data.img}" alt="">
                    </div>
                    <div class="popup__title">${data.title}</div>
                    <div class="popup__subtitle">${data.subtitle}</div>
                </div>`;

        html += `<div class="pdprops">
                    <ul class="pdprops__l">
                        <li>Quantity: <strong>${data.quantity}</strong></li>
                        <li>Price per one: <strong>${data.pricePer}</strong></li>
                    </ul>
                    <ul class="pdprops__r">
                        <li>Total</li>
                        <li class="_price">${data.total}</li>
                    </ul>
                </div>`;

        html += `<div class="pdstatus ${data.classn}">
                        <div class="pdstatus__l">Status:</div>
                        <div class="pdstatus__r">
                            <svg>
                                <use xlink:href="${data.statusIcon}"></use>
                            </svg>
                            <strong>${data.status}</strong>
                        </div>
                    </div>`;      

        if( data.statusInfo ) {
            html += `<div class="pdstatus__info">${data.statusInfo}</div>`;
        }

        html += `<div class="pdmain">`;

            html += `<div class="pdmain__f">
                            <div class="pdmain__label">Cards details</div>
                            <textarea class="inp inp--brd textarea" readonly>${data.cardsDetails}</textarea>
                        </div>`;

            for( let key in data.msg ) {
                html += `<div class="pdmain__g">
                            <div class="pdmain__label">${data.msg[key].autor}</div>
                            <div class="pdmain__msg">${data.msg[key].text}</div>`;

                            if(data.msg[key].imgs) {
                                html += `<div class="pdmain__label">${data.msg[key].imgsCaption}</div>`;
                                html += `<ul class="pdmain__imgs">`;

                                for( let k in data.msg[key].imgs ) {
                                    html += `<li><img src="${data.msg[key].imgs[k]}" alt=""></li>`
                                }

                                html += `</ul>`;
                            }
                html += `</div>`;
            }     

        html += `</div>`;

    }
    //  Withdrawal
    else if(type == "wdrawal" && wdrawalData[id]) {

        let data = wdrawalData[id];

        html += `<div class="popup__head">
                    <div class="popup__icon">
                        <img src="${data.img}" alt="">
                    </div>
                    <div class="popup__title">${data.title}</div>
                    <div class="popup__subtitle">${data.subtitle}</div>
                </div>`;

        html += `<div class="pdstatus ${data.classn}">
                    <div class="pdstatus__l">Status:</div>
                    <div class="pdstatus__r">
                        <svg>
                            <use xlink:href="${data.statusIcon}"></use>
                        </svg>
                        <strong>${data.status}</strong>
                    </div>
                </div>`;  
                
        html += `<div class="pdmain">`;   

            html += `<ul class="pdlist">`;
                html +=     `<li>
                                <span class="pdlist__l">Amount</span>
                                <span class="pdlist__r">
                                    <strong>${data.amount_1}</strong> <span>(${data.amount_2})</span>
                                </span>
                            </li>
                            <li>
                                <span class="pdlist__l">Payment Method</span>
                                <span class="pdlist__r">
                                    <strong>${data.pmethod}</strong>
                                </span>
                            </li>
                            <li>
                                <span class="pdlist__l">Address</span>
                                <span class="pdlist__r">
                                    <strong>${data.address}</strong>
                                </span>
                            </li>`;

                if( data.txid ) {
                    html += `<li>
                                <span class="pdlist__l">TXID</span>
                                <span class="pdlist__r">
                                    <a href="#">${data.txid}</a>
                                </span>
                            </li>`
                }     
            
            html += `</ul>`;

            for( let key in data.msg ) {
                html += `<div class="pdmain__g">
                            <div class="pdmain__label">${data.msg[key].autor}</div>
                            <div class="pdmain__msg">${data.msg[key].text}</div>`;

                            if(data.msg[key].imgs) {
                                html += `<div class="pdmain__label">${data.msg[key].imgsCaption}</div>`;
                                html += `<ul class="pdmain__imgs">`;

                                for( let k in data.msg[key].imgs ) {
                                    html += `<li><img src="${data.msg[key].imgs[k]}" alt=""></li>`
                                }

                                html += `</ul>`;
                            }
                html += `</div>`;
            }  

        html += `</div>`;

    }


    $popup.find('.pdcontent').html(html);
    popup.open('#popup__details');

}


//Copy text
function copyText(input,text,flag=false) {
	// Get the text field
	const copyText = document.querySelector(input);
	let textValue;
  
	// if input element
	if(!flag){
		copyText.select();
		copyText.setSelectionRange(0, 99999); // For mobile devices
		textValue = copyText.value;
	} else {
		textValue = copyText.innerText;
	}
  
	 // Copy the text inside the text field
	navigator.clipboard.writeText(textValue);
  
	// Alert the copied text
	xconfirm(`${text} 👍`, '', 'info');
  }
// Dropdown
class Dropdown {
    constructor(selector, cb){
        this.$el = document.querySelector(selector);
        this.selector = selector;
        this.$btn = this.$el.querySelector('[data-dropdown="caption"]');
        this.$optionsList = this.$el.querySelector('[data-dropdown="list"]');
        this.cb = cb ?? null;

        this._addEvents();
    }

    open() {
        this.$el.classList.add("_open");
    }

    close() {
        this.$el.classList.remove("_open");
    }

    toggle() {
        return this.$el.classList.contains('_open')
		? this.close()
		: this.open();
    }

    _addEvents() {
        const _this = this;

        this.$btn.addEventListener("click", (event) => {
			this.toggle();
		});

        this.$optionsList.querySelectorAll('[data-dropdown="item"]').forEach(item => {
            if(item.tagName.toLowerCase() === 'a') return;

            item.addEventListener("click", function(e){
                _this.selected(this.dataset.value);
            });
        });

        document.addEventListener("click", (e) => {
			if(!e.target.closest(`${this.selector}`)){
				this.close();
			}
		});
    }

    selected(value) {

        this.$optionsList.querySelectorAll('[data-dropdown="item"]').forEach(item => {
			item.classList.remove("_active");
		});

        let activeItem =  this.$optionsList.querySelector(`[data-value="${value}"]`);

        activeItem.classList.add("_active");
        this.$btn.innerHTML = activeItem.innerHTML;

        this.cb ? this.cb(value) : null;

        this.close();
    }
}
class Eselect {
    constructor(selector, options) {
        this.$sel = document.querySelector(selector);	
		this.selector = selector;
        this.selectedVal = this.$sel.value;
        this.options = options;
        this.$sel.style.display = "none";

        this.data = this.optionsToArray;

        this.#render();
        this.#setup();

        if(this.options.search) {
            this.search();
        }
    }

    get optionsToArray() {
        const arr = [];
        const options = this.$sel.querySelectorAll('option');

        options.forEach(option => {
            let selected = (option.getAttribute('value') === this.selectedVal) ? true : false;
            arr.push({
                value: option.getAttribute('value'),
                text:  option.innerHTML,
                logo:  option.getAttribute('data-logo'),
                subtitle:  option.getAttribute('data-subtitle'),
                selected: selected
            });
        });

        return arr;
    }

    get isOpen() {
        return this.$el.classList.contains('exselect--open');
    }

    #getTemplate(data) {
        let current = data.find((obj) => obj.value === this.selectedVal);
        current = current ?? data[0];
        let currentLogo = current.logo ? `<img src="${current.logo}" alt="${current.text}">` : '';
        let listHeight = this.options.height ? ` style="max-height: ${this.options.height}"` : '';

        let search = '';
        let empty  = '';

        if(this.options.search) {
            search = `<div class="exselect__search">
                        <input type="text" class="exselect__input" placeholder="Search...">
                        <svg>
                            <use xlink:href="#ic-search"></use>
                        </svg>
                    </div>`;

            empty = `<li class="exselect__empty">
                        <svg>
                            <use xlink:href="#ic-rock"></use>
                        </svg>
                        <span>Nothing else matters</span>
                    </li>`;
        }

        const items = data.map(item => {
            let selected = (item.value === current.value) ? ' selected' : '';
            let logo = item.logo ? `<img src="${item.logo}" alt="${item.text}">` : '';
            let subtitle = item.subtitle ? `<span class="exselect__opt-sub">${item.subtitle}</span>` : '';
            let text = item.subtitle ? `<strong>${item.text}</strong>` : `<span>${item.text}</span>`;
            return `
                <li class="exselect__opt${selected}" data-value="${item.value}">
                    <span class="exselect__opt-val">
                        ${logo} ${text}
                    </span>
                    ${subtitle}
                </li>
            `
        });

        return `
            <div class="exselect__btn">
                <div class="exselect__caption">
                    ${currentLogo}
                    <span>${current.text}</span>
                </div>
                <svg class="exselect__arrow">
                    <use xlink:href="#ic-sort"></use>
                </svg>
            </div>
            <div class="exselect__dropdown">
                ${search}
                <ul class="exselect__list"${listHeight}>
                    ${items.join('')}
                    ${empty}
                </ul>
            </div>
        `
    }

    #render() {
        const exselect = document.createElement('div');
        exselect.classList.add('exselect');
        if(this.options.border) {
            exselect.classList.add('exselect--border');
        }
        exselect.dataset.build = this.selector;
        exselect.innerHTML = this.#getTemplate(this.data);
        this.$sel.insertAdjacentElement('afterEnd', exselect);

        this.$el = this.$sel.nextSibling;
        this.$search = this.$el.querySelector('.exselect__input');
        this.$optionsList = this.$el.querySelector('.exselect__list');
        this.$btn = this.$el.querySelector('.exselect__btn');
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
    }

    search(){
		this.$search.addEventListener("keyup", (e) => {
			let query = e.target.value;
			let query_ru		= translit(query, 'ru');
			let query_en		= translit(query, 'en');
			let query_lt_r1		= correct_layout(query, false);
			let query_lt_e1		= correct_layout(query, true);
			let query_lt_r2		= translit(query_lt_r1, 'ru');
			let query_lt_e2		= translit(query_lt_e1, 'en');
			let total 			= 0;
			let hasPop 			= 0;
			let hasAll 			= 0;
			let queries			= [query];
			const query_uid 	= [];

			//list of alternative queries
			queries = queries.concat(query_ru);
			queries = queries.concat(query_en);
			queries = queries.concat(query_lt_r1);
			queries = queries.concat(query_lt_e1);
			queries = queries.concat(query_lt_r2);
			queries = queries.concat(query_lt_e2);
						
			//Filter duplicates
			queries = queries.filter(element => { 
				if (!query_uid.includes(element)) {
					query_uid.push(element);
					return true;
				}
				return false;
			});


			this.$optionsList.querySelectorAll(".exselect__opt").forEach((li) => {
				let show = false;

				queries.forEach((q, index) => {
					if(
						li.querySelector("span").innerText.search(new RegExp(q, "i")) >= 0
					){
						show = true;
						return;
					}
				});

				if(show){
					li.style.display = "flex";
					total++;
				} else {
					li.style.display = "none";
				}
			});

			total 
			? this.$optionsList.querySelector(".exselect__empty").style.display = "none"
			: this.$optionsList.querySelector(".exselect__empty").style.display = "flex";

		});
	}

    clickHandler(event) {
        const $target = event.target;

        if($target.closest('.exselect__btn') || $target.classList.contains('exselect__btn')) {
            this.toggle();
        } else if($target.closest('.exselect__opt') || $target.classList.contains('exselect__opt')) {
            let value = $target.dataset.value ?? $target.closest('.exselect__opt').dataset.value;
            this.selected(value);
        }
    }

    documentClick(event) {
        if(!event.target.closest(`[data-build="${this.selector}"]`)){
            this.close();
        }
    }


    selected(value) {
        const selectedObj = this.data.find((obj) => obj.value === value);
        let selectedLogo = selectedObj.logo ? `<img src="${selectedObj.logo}" alt="${selectedObj.text}">` : '';

        this.$btn.querySelector('.exselect__caption').innerHTML = `
            ${selectedLogo}
            <span>${selectedObj.text}</span>
        `;

        this.$optionsList.querySelectorAll(".exselect__opt").forEach((option) => {
			option.classList.remove("selected");
		});
		this.$optionsList.querySelector(`[data-value="${selectedObj.value}"]`).classList.add("selected");


        this.$sel.value = selectedObj.value;
        //this.$sel.onchange();
        this.options.cb ? this.options.cb(selectedObj) : null;
		this.close();
    }

    toggle(){
		return this.isOpen ? this.close() : this.open();
	}

	open(){
		this.$el.classList.add("exselect--open");
        this.documentClick = this.documentClick.bind(this);
        document.addEventListener('click', this.documentClick);
		
        if(this.options.search) {
            this.$search.focus();
        }
	}

	close(){
		this.$el.classList.remove("exselect--open");
        document.removeEventListener('click', this.documentClick);

        if(this.options.search) {
            this.$search.value = "";
            this.$optionsList.querySelectorAll(".exselect__opt").forEach(li => {
                li.style.display = "flex";
            });
            this.$optionsList.querySelector(".exselect__empty").style.display = "none";
        }
	}
}


/* Onload DOM                                        
--------------------------------------------------------*/
$(function () {

    // Home menu
    $(".hamburger").on("click", function (e) {
        e.stopPropagation();
        $(".menu-side").addClass("menu-side--open");
        $('<div class="menu-over"/>').css("opacity", "1").appendTo("body");
    });
    $(".js-menu-close").on("click", function () {
        $(".menu-side").removeClass("menu-side--open");
        $('body').find(".menu-over").remove();
    });


    // Theme change
    const getModeTheme = localStorage.getItem('mode');
    if (getModeTheme && getModeTheme === 'dark') {
        $(".toggle-theme input").prop("checked", true);
        $("html").addClass("theme-dark");
    } else {
        $(".toggle-theme input").prop("checked", false);
        $("html").removeClass("theme-dark");
    }

    $(".toggle-theme__lab").on("click", function () {
        setTimeout(function () {
            $("html").toggleClass("theme-dark");

            if ($("html").hasClass('theme-dark')) {
                $(".toggle-theme input").prop("checked", true);
                return localStorage.setItem('mode', 'dark');
            }

            $(".toggle-theme input").prop("checked", false);
            localStorage.setItem('mode', 'light');
        }, 200);
    });


    // Ticker
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    if (mediaQuery.matches) {
        $('.ticker__list').marquee();
    } else {
        $('.ticker__list').marquee({ direction: 'horizontal', delay: 0, timing: 40 });
    }


    //Copy text
    $("[data-copy]").on("click", function () {
        navigator.clipboard.writeText($($(this).attr("data-copy")).val())
            .then(() => {
                const instance = tippy(this);
                instance.setContent('Copied 👍');
                instance.show();
            });
    });


    // Rates calc
    $('[data-calc]').on('click', function (e) {
        e.preventDefault();
        if ($(window).width() <= 1024) {
            $('.hat__right').toggleClass('hat__right--calc');
            if ($('.hat__right').hasClass('hat__right--calc')) {
                goTo('.hat__right', 300);
            }
            return;
        }

        if ($('.hat__right').hasClass('hat__right--calc')) {
            $('.hat__right .exform').fadeOut('fast', function () {
                $('.hat__right .bg-cap').fadeIn('fast');
                $('.hat__right').removeClass('hat__right--calc');
            });
        } else {
            $('.hat__right .bg-cap').fadeOut('fast', function () {
                $('.hat__right .exform').fadeIn('fast');
                $('.hat__right').addClass('hat__right--calc');
            });
        }
    });

    $(".js-inp-calc").on("keyup", function(){
        let cf_1 = 95;
        let cf_2 = 0.000015;

        $("#cf_1").html( `${parseFloat($(this).val() * cf_1)}` );
        $("#cf_2").html( `${parseFloat($(this).val() * cf_2)}` );
    });


    // Inputs mask
    if (document.querySelector('[data-isnumber]')) {
        const dataNumber = document.querySelectorAll('[data-isnumber]');
        for (let i = 0; i < dataNumber.length; i++) {
            IMask(dataNumber[i], {
                mask: Number
            });
        }
    }
    if (document.querySelector('[data-isnumber-999]')) {
        const dataNumber999 = document.querySelectorAll('[data-isnumber-999]');
        for (let i = 0; i < dataNumber999.length; i++) {
            IMask(dataNumber999[i], {
                mask: Number,
                min: 1,
                max: 999
            });
        }
    }
    if (document.querySelector('[data-isphone]')) {
        const dataPhone = document.querySelectorAll('[data-isphone]');
        for (let i = 0; i < dataPhone.length; i++) {
            IMask(dataPhone[i], {
                mask: '{+}00000000000'
            });
        }
    }
    if (document.querySelector('[data-istg]')) {
        const dataTg= document.querySelectorAll('[data-istg]');
        for (let i = 0; i < dataTg.length; i++) {
            IMask(dataTg[i], {
                mask: '{@}*********************',
                from: 1,
                to: 90
            });
        }
    }


    // Rating stars render
    $(".js-stars").each(function () {
        renderStars.call($(this), $(this).attr("data-val"))
    });

    // Ratings action
    $(".rating__action input").each(function () {
        let val = $(this).val();
        const $wrap = $(this).parent(".rating__action");

        renderStars.call($wrap, val);

        $wrap.on("click", "i", function () {
            renderStars.call($wrap, $(this).index());
        });
    });


    // Rewviews Carousel
    if ($(".rwb-slide")) {
        $(".rwb-slide").addClass("owl-carousel").owlCarousel({
            items: 1,
            autoplay: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            loop: true,
            dots: true,
            dotsEach: true,
            dotsContainer: ".rwb__dots",
            slideBy: 1,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true,
                    loop: false,
                    autoplay: false,
                    navText: [
                        '<svg aria-label="' + 'Previous' + '"><use xlink:href="#ic-left"></use></svg>',
                        '<svg aria-label="' + 'Next' + '"><use xlink:href="#ic-right"></use></svg>'
                    ]
                },
                768: {
                    items: 1
                },
                1200: {
                    items: 2,
                }
            }
        });
    }


    // Question
    $(".question").on("click", ".question__title", function () {

        const item = $(this).parent(".question__item");

        if (item.hasClass("question__item--open")) {
            item.find(".question__txt").slideToggle("fast", function () {
                item.removeClass("question__item--open");
            });
            return;
        }

        $(".question").find(".question__item").removeClass("question__item--open");
        $(".question").find(".question__txt").hide("fast");

        item.find(".question__txt").slideToggle("fast", function () {
            item.addClass("question__item--open");
        });

    });


    // Langs
    const langsDropdown = new Dropdown(".langs");


    // Custom selects
    if ($('#nominal').length) {
        const selectNominal = new Eselect('#nominal', { search: true });
    }
    if ($('#giftCard').length) {
        const selectGiftCard = new Eselect('#giftCard', { search: true });
    }
    if ($('#scurr').length) {
        const selectGiftCard = new Eselect('#scurr', {});
    }
    if ($('.js-sel-card').length) {
        const selectCard = new Eselect('.js-sel-card', { height: '328px' });
    }
    if ($('.js-sel-country').length) {
        const selectCountry = new Eselect('.js-sel-country', { search: true });
    }
    if ($('.js-sel-category').length) {
        const selectCategory = new Eselect('.js-sel-category', { search: true });
    }
    if ($('.js-sel-subcategory').length) {
        const selectSubCategory = new Eselect('.js-sel-subcategory', { search: true });
    }
    if ($('.js-sel-balance').length) {
        const selectBalance = new Eselect('.js-sel-balance', { border: true });
    }
    if ($('.js-sel-paymethod').length) {
        const selectPayMethod = new Eselect('.js-sel-paymethod', { border: true });
    }
    if ($('.js-sel-countries').length) {
        const selectCountries = new Eselect('.js-sel-countries', { search: true });
    }

    // Timer account
    if ($('#atimer').length) {
        xtimer('#atimer', '2024-06-01 00:00:00', () => {
            console.log("end timer");
        });
    }


    // Password hide/show
    $(".sw-eye").on("click", function () {
        const input = $(this).closest("div").find("input");
        const type = input.attr("type");

        if (type == 'password') {
            input.attr("type", "text");
            $(this).find("use").attr("xlink:href", "#ic-eye-1");
        } else {
            input.attr("type", "password");
            $(this).find("use").attr("xlink:href", "#ic-eye-0");
        }
    });


    // Tippy tooltip
    tippy('[data-tippy-content]', {
        allowHTML: true,
        animation: 'scale',
        duration: 200
    });


    // Document outer click
    $(document).on("click", function (e) {
        const $target = $(e.target);

        // Menu
        if (!$target.closest(".menu-side").length && $(".menu-side").is(":visible") && !$target.hasClass("hamburger")) {
            $(".menu-side").removeClass("menu-side--open");
            $('body').find(".menu-over").remove();
        }

    });

    // Document keydown
    $(document).on("keydown", function (e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            // menu
            if ($(".menu-side").hasClass("menu-side--open") && $(".menu-side").is(":visible")) {
                $(".menu-side").removeClass("menu-side--open");
                $('body').find(".menu-over").remove();
            }
            // popups
            if ($(".popup").is(":visible")) {
                popup.close('#' + $(".popup:visible").attr("id"));
            }
        }
    });

});
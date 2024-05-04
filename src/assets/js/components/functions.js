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



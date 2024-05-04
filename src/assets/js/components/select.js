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
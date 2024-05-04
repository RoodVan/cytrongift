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
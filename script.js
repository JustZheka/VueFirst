const Program = {
    data() {
        return {
            sortType: "NumAscending",
            inputValue: '',
            elements: [],
            editMode: [],
            isValid: true
        }
    },
    methods: {
        addElem() {
            this.inputValue = this.inputValue.trim();

            if (this.inputValue == '') {
                this.isValid = false;
                return false;
            }
            this.elements.push({idx: this.elements.length, value: this.inputValue, edit: false, editValue: '', isValid: true});
            this.inputValue = '';
        },
        removeElem(index) {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].idx > this.elements[index].idx) {
                    this.elements[i].idx--;
                }
            }

            this.elements.splice(index, 1);
        },
        editElem(index) {
            this.elements[index].edit = true;
            this.elements[index].editValue = this.elements[index].value;
        },
        okEdit(index) {
            this.elements[index].editValue = this.elements[index].editValue.trim();

            if (this.elements[index].editValue  == '') {
                this.elements[index].isValid = false;
                return false;
            }

            this.elements[index].isValid = true;
            this.elements[index].value = this.elements[index].editValue;
            this.elements[index].editValue = '';
            this.elements[index].edit = false;
        },
        cancelEdit(index) {
            this.elements[index].editValue = '';
            this.elements[index].edit = false;
            this.elements[index].isValid = true;
        },
        comparator(a, b) {
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }
            return 0;
        }
    },
    computed: {
        sortedList() {
            let self = this;
            return this.elements.sort(function(a, b) {
                let A = a.value.toUpperCase();
                let B = b.value.toUpperCase();
                switch (self.sortType) {
                    case "NumAscending":
                        return self.comparator(a.idx, b.idx);
                    case "NumDescending":
                        return self.comparator(b.idx, a.idx);
                    case "AlphAscending":
                        return self.comparator(A, B);
                    case "AlphDescending":
                        return self.comparator(B, A);
                }
            });
        }
    },
    watch: {
        inputValue(newInput) {
            if (!this.isValid && newInput != '') {
                this.isValid = true;
            }
        }
    }
};

Vue.createApp(Program).mount('#program');
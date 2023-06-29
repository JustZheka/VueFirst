const Program = {
    data() {
        return {
            //sortTypes: {"NumAsc": 1, "NumDes": 2, "AlphAsc": 3, "AlphDes": 4},
            sortType: "NumAscending",
            inputValue: '',
            elements: [],
            editMode: []
        }
    },
    methods: {
        addElem() {
            this.inputValue = this.inputValue.trim();

            if (this.inputValue == '') {
                alert("invalid input data");
                return false;
            }

            this.elements.push({idx: this.elements.length, value: this.inputValue, edit: false, editValue: ''});
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
            this.elements[index].editValue = this.elements[index].editValue .trim();

            if (this.elements[index].editValue  == '') {
                alert("invalid input data");
                this.cancelEdit();
                return false;
            }

            this.elements[index].value = this.elements[index].editValue;
            this.elements[index].editValue = '';
            this.elements[index].edit = false;
        },
        cancelEdit(index) {
            this.elements[index].editValue = '';
            this.elements[index].edit = false;
        }
    },
    computed: {
        sortedList() {
            let sType = this.sortType;
            return this.elements.sort(function(a, b) {
                switch (sType) {
                    case "NumAscending":
                        return comparator(a.idx, b.idx);
                    case "NumDescending":
                        return comparator(b.idx, a.idx);
                    case "AlphAscending":
                        return comparator(a.value, b.value);
                    case "AlphDescending":
                        return comparator(b.value, a.value);
                }
            });
        }
    }
};

function comparator(a, b) {
    if (a > b) {
        return 1;
    }
    else if (a < b) {
        return -1;
    }
    return 0;
}

Vue.createApp(Program).mount('#program');
import { observable, computed, autorun, action } from 'mobx';

const TAG = 'FooStore';

class FooStore {

    @observable
    text = '中国';

    @action
    changeText() {
        let value = parseInt(Math.random() * 10);
        let strTemp = "";
        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
                strTemp = "警察";
                break;
            case 4:
            case 5:
            case 6:
                strTemp = "小偷";
                break;
            case 7:
            case 8:
            case 9:
                strTemp = "猎人";
                break;
        }
        console.log(TAG, strTemp, '与上次(' + this.text + ')' + (this.text === strTemp ? '相同' : '不同'));
        this.text = strTemp;
    }

}

const fooStore = new FooStore();

export { fooStore };
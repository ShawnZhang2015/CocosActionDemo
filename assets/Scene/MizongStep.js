let uikiller = require('../Script/uikiller/uikiller');

cc.Class({
    extends: cc.Component,

    properties: {
        _nodePt: null,
        _labelPt: null,
    },

    // use this for initialization
    onLoad: function () {
        uikiller.bindComponent(this);
        this._nodePt = this._cocos.position;
        this._labelPt = this._label.position;
    },

    _onLabelTitleTouchEnd() {
        window.open('http://mp.weixin.qq.com/s?__biz=MzA5MjEwOTI4Ng==&mid=2247483794&idx=1&sn=f174cad17a6d5b2d1b340c42cdcd4736&chksm=9073611ba704e80dfb00dbcfb8b9907798673ed4795a51e6e0ff3ad653fc3a73a09bf36077e9&mpshare=1&scene=23&srcid=1031wmRt3QsZFOEQ8IfCF5ZB#rd')
    },

    _onButtonTouchEnd(sender) {
        let $ = parseInt(sender.$);
        this._cocos.stopAllActions();
        this._label.stopAllActions();
        this._cocos.position = this._nodePt;
        this._label.position = this._labelPt;

        switch ($) {
            case 1: this._spawn(); break;
            case 2: this._sequence(); break;
            case 3: this._mixture(); break;
            case 4: this._clone(); break;
            case 5: this._reverse(); break;
            case 6: this._repeate(); break;
            case 7: this._unhurried(); break;
            case 8: this._ease(); break;
        }
        this._label.$Label.string = `当前舞步：${sender.Label.getComponent(cc.Label).string}`;
    },

    _spawn() {
        let move = cc.moveTo(3, cc.p(200, 0));
        let rotate = cc.rotateBy(3, 360 * 3);
        let spawn = cc.spawn(move, rotate);
        this._cocos.runAction(spawn);
    },

    _sequence() {
        let move = cc.moveTo(3, cc.p(200, 0));
        let rotate = cc.rotateBy(3, 360 * 3);
        let sequence = cc.sequence(move, rotate);
        this._cocos.runAction(sequence);
        return sequence;
    },

    _mixture() {
        let move1 = cc.moveTo(3, cc.p(200, 0));
        let rotate1 = cc.rotateBy(3, 360 * 3);
        let spawn1 = cc.spawn(move1, rotate1);
        
        let move2 = cc.moveTo(3, cc.p(0, 0));
        let rotate2 = cc.rotateBy(3, 360 * 3);
        let spawn2 = cc.spawn(move2, rotate2);
        let sequence = cc.sequence(spawn1, spawn2);
        this._cocos.runAction(sequence);
        return sequence;
    },

    _clone() {
        let sequence = this._mixture();
        let clone = sequence.clone();
        this._label.runAction(clone);
    },

    _reverse() {
        let move = cc.moveBy(1, cc.p(200, 0));
        let rotate = cc.rotateBy(1, 360 * 3);
        let sequence1 = cc.sequence(move, rotate);
        let sequence2 = sequence1.reverse();
        let sequence3 = cc.sequence(sequence1, sequence2);
        this._cocos.runAction(sequence3);
        return sequence3;
    },

    _repeate() {
        let move = cc.moveBy(1, cc.p(200, 0));
        let rotate = cc.rotateBy(1, 360 * 3);
        let sequence1 = cc.sequence(move, rotate);
        let sequence2 = sequence1.reverse();
        let sequence3 = cc.sequence(sequence1, sequence2).repeatForever();
        this._cocos.runAction(sequence3);    
    },

    _unhurried() {
        let move = cc.moveBy(1, cc.p(200, 0));
        let rotate = cc.rotateBy(1, 360 * 3);
        let callFunc = cc.callFunc(() => {
            let sequence2 = cc.sequence(move.clone(), rotate.clone());
            this._label.runAction(sequence2);
        });
        let sequence = cc.sequence(move, rotate, callFunc);
        this._cocos.runAction(sequence);
    },

    _ease() {
        let move = cc.moveTo(3, cc.p(200, 0)).easing(cc.easeElasticInOut(3));
        let rotate = cc.rotateBy(3, 360 * 3).easing(cc.easeElasticInOut(3));
        let sequence = cc.sequence(move, rotate);     
        this._cocos.runAction(sequence);
    },
});

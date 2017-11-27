let uikiller = require('uikiller');
let async = require('async');
let _ = require('lodash');

const WEAPON = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";



cc.Class({
    extends: cc.Component,

    properties: {
        weapon: cc.Prefab,
        _singNum: 2,
        onWeaponEvent: null,
        soundSing: cc.RawAsset,
    },

    // use this for initialization
    onLoad() {
        uikiller.bindComponent(this);
        this.schedule(this._descSingNum, 2);
    },

    sing(text, cb) {
        if (this._isSing) {
            return;
        }
        cc.audioEngine.play(this.soundSing);
        this._isSing = true;
        this._label.$Label.string = text;
        this._label.opacity = 255;
        let pt = this._label.position;
        let moveBy = cc.moveBy(1, cc.p(0, 100)).easing(cc.easeExponentialOut());
        let scaleTo = cc.scaleTo(1, 2);
        let delayTime = cc.delayTime(1);

        let scale = cc.scaleTo(1, 15);
        let fadeOut = cc.fadeOut(1);
        let spawn = cc.spawn(scale, fadeOut);
            
        let sequence = cc.sequence(moveBy, scaleTo, delayTime, spawn, cc.callFunc(() => {
            this._singNum *= 3;
            this._label.position = pt;
            this._label.scale = 1;
            this._isSing = false;
            if (cb) {
                cb();
            }
        }));
        this._label.runAction(sequence);
    },

    _descSingNum(dt) {
        if (this._singNum === 2) {
            return;
        } 
        if (this._singNum < 2) {
            this._singNum = 2;
            return;
        }

        this._singNum--;
    },
    /**
     * 
     * @param {Node} target 
     * @param {Function} cb 
     */
    attack(target, cb) {
        let num = 20;
        let array = [];
        for(let i = 0; i < num; i++) {
            let weapon = cc.instantiate(this.weapon);
            weapon.getComponent(cc.Label).string = _.sample(WEAPON);
            this._weapons.addChild(weapon);
            array.push(weapon);
        }

        async.eachOfLimit(array, 3, (node, i, cb) => {
            this._throwWeapon(target, node, cb);    
        }, cb);
    },

    throwAttack(cb) {
        let num = Math.min(this._singNum, 10);
        let array = [];
        for(let i = 0; i < num; i++) {
            let weapon = cc.instantiate(this.weapon);
            weapon.getComponent(cc.Label).string = _.sample(WEAPON);
            this._weapons.addChild(weapon);
            array.push(weapon);
        }

        let count = _.random(5, num);
        async.eachOfLimit(array, count, (node, i, cb) => {
            this._throwWeapon(null, node, cb);    
        }, cb);
    },

    _throwWeapon(target, weapon, cb) {
        weapon.color = cc.color(_.random(0, 255), _.random(0, 255), _.random(0, 255));
        let p = target ? this.node.convertToNodeSpaceAR(target.parent.convertToWorldSpaceAR(target.position)) : cc.p(_.random(-250, 250), _.random(400, 600));   
        p.x += _.random(-70, 70);
        p.y += _.random(-100, 100);
        let moveTo = cc.moveTo(0.5, p).easing(cc.easeQuadraticActionIn());
        let sequence = cc.sequence(moveTo, cc.callFunc(() => {
           
            let label = weapon.getComponent(cc.Label);
            if (this.onWeaponEvent) {
                let value = parseInt(this._singNum * 10);;
                this.onWeaponEvent(label, value);    
            } else {
                let delay = cc.delayTime(1);
                let fadeOut = cc.fadeOut(3);
                let remove = cc.removeSelf();    
                weapon.runAction(cc.sequence(delay, fadeOut, remove));
            }
        }));

        this.scheduleOnce(() => cb(), _.random(0.05, 0.3));
        weapon.runAction(sequence);
    },
});

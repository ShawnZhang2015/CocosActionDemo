let uikiller = require('uikiller');
let _ = require('lodash');

const HPS = [
    {
        max: 9999,
        hp: 9999,
        color: cc.Color.RED,
    },

    {
        max: 999999,
        hp: 999999,
        color: cc.Color.BLUE,
    },

    {
        max: 99999999,
        hp: 99999999,
        color: cc.Color.GREEN,
    },
];

const SING_TEXT = [
    '白蛇吐芯',
    '海底捞月',
    '二龙戏珠',
    '青龙摆尾',
    '饿虎扑食',
    '白鹤亮翅',
    '美女照镜',
    '渔郎问津',
    '四面埋伏',
    '童子拜佛',
    '如来神掌',
    '凌波微步',
    '猴子摘桃',
    '移花接木',
    '斗转星移',
    '六脉神剑',
    '降龙十八掌',
    '见龙在田',
    '飞龙在天',
    '亢龙有悔',
    '利涉大川',
    '鱼跃于渊',
    '羝羊触潘',
    '损则有孚',
    '屡霜冰至',
    '潜龙勿用',
    '时乘六龙',
    '神龙摆尾',
    '或跃在渊',
    '突如其来',
    '双龙取水',
    '鸿渐于陆',
    '震惊百里',
    '龙战于野',
    '密云不雨',
    '落英神剑掌',
    '旋风扫叶腿',
    '碧波掌',
    '玉萧剑法',
    '弹指神通',
    '灵鳌步',
    '兰花拂穴手',
    '劈空掌',
    '六脉神剑'
];

cc.Class({
    extends: cc.Component,

    properties: {
        font: cc.Font,
        soundHit: cc.RawAsset,
        _now:0,
    },

    // use this for initialization
    onLoad: function () {
        this._index = 0;
        uikiller.bindComponent(this);  
        this._hero.$Hero.onWeaponEvent = this._onWeaponEvent.bind(this);
    },

    _playMonsterHurt() {
        let scale = cc.scaleTo(0.1,  _.random(0.9, 1.1, true));
        let callFunc = cc.callFunc(() => { this._monster.scale = 1; });
        this._monster.runAction(cc.sequence(scale, callFunc));
    },

    _onWeaponEvent(weapon, value) {
        
        let hpConfig = HPS[this._index];
        let delayTime = cc.delayTime(0.2);
        let callFunc = cc.callFunc(() => {
            this._playMonsterHurt();
            weapon.string = value;
            weapon.font = this.font;
            weapon.node.color = hpConfig.color;
        });
        let moveBy = cc.moveBy(1, cc.p(0, 100));
        let fadeOut = cc.fadeOut(1);
        let remove = cc.removeSelf();
        weapon.node.runAction(cc.sequence(delayTime, callFunc, moveBy, fadeOut, remove)); 

      
        hpConfig.hp -= value;
        this._hp.color = hpConfig.color;
        this._hp.$MagicProgress.progress = hpConfig.hp / hpConfig.max; 
        if (hpConfig.hp <= 0) {
            this._index++;
            this._monster.$MagicSprite.index = this._index;
            if (this._index === 3) {
                this._hero.$Hero.onHurtEvent = null;
                this._playAdLabe();
            }
        }
    },

    _playAdLabe() {
        this._hero.$Hero.onHurtEvent = null;
        this._adLabel.active = true;
    },

    _onAttackTouchEnd() {
        let now = Date.now();
        if (now - this._now > 100) {
            cc.audioEngine.play(this.soundHit);
            this._now = now;
        }
        this._hero.$Hero.throwAttack();    
    },

    _onSingTouchEnd() {
        this._descLabel.$Label.string = '吟唱中...';   
        this._hero.$Hero.sing(_.sample(SING_TEXT), () => {
            this._descLabel.$Label.string = '吟唱完毕';    
        });
    }
});

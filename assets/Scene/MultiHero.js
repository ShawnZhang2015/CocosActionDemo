
let uikiller = require('uikiller');
let _ = require('lodash');
let async = require('async');

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
       _boyPt: null,
       _grilPt: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.s = this;
        cc.director.getScheduler().setTimeScale(2);
        uikiller.bindComponent(this);
        this._boyPt = this._boy.position;
        this._grilPt = this._gril.position;
        this.log('');
    },

    log(text) {
        this._log.$Label.string = text;
    },

    _onBtnTouchEnd(sender) {
        this.log('行动开始...');
        this._boy.position = this._boyPt;
        this._gril.position = this._grilPt;

        let $ = parseInt(sender.$);
        switch($) {
            case 1:
                this._moveAndCall(this._boy, cc.p(this._boy.x, 200),'妹妹快过来！', () => {
                    this.log('呼叫妹妹完毕');    
                });
                break;
            case 2:
                this._moveAndCall(this._boy, cc.p(this._boy.x, 200), '妹妹快过来！', () => {
                    this._moveAndCall(this._gril, cc.p(this._gril.x, 200), '喊我做啥子！', () => {
                        this.log('妹子好像，有些不高兴！');     
                    });
                });
                break;
            case 3:
                this._moveAndCall(this._boy, cc.p(this._boy.x, 200), '妹妹快过来！', () => {
                    this._moveAndCall(this._gril, cc.p(this._gril.x, 200), '喊我做啥子！', () => {
                        this._boy.$Hero.sing('我要亲亲！', () => {
                            this.log('孩子呀！你也太直接了吧！');   
                            this._gril.$Hero.sing('流氓，看招', () => {
                                this.log('不好，女孩发怒了...');
                                this._gril.$Hero.sing('大海无量', () => {
                                    this.log('轻点呀，不要闹出人命...，');
                                    this._gril.$Hero.attack(this._boy, () => {
                                        this._boy.runAction(cc.rotateBy(2, 360 * 10));
                                        this._moveAndCall(this._boy, this._boyPt, '不要啊...！', () => {
                                            cc.log('这妹妹脾气也忒大了吧！');
                                        })
                                    });
                                });
                            })
                        });
                    })   
                });

                break;
            case 4:
                this._moveAndCall(this._boy, cc.p(this._boy.x, 200), '妹妹快过来！', () => {
                    this._moveAndCall(this._gril, cc.p(this._gril.x, 200), '喊我做啥子！', () => {
                        this._boy.$Hero.sing('我想与你聊聊人生！', () => {
                            this.log('这会说的像人话了，加油支持你！');   
                            this._gril.$Hero.sing('流氓，看招', () => {
                                this.log('不好，女孩又大怒了！');   
                                this._gril.$Hero.sing('大海无量', () => {
                                    cc.director.getScheduler().setTimeScale(0.3);
                                    this._gril.$Hero.onWeaponEvent = (weapon) => {
                                        let delayTime = cc.delayTime(1);
                                        let pt = cc.p(_.random(-200, 200), _.random(-200, 200));
                                        weapon.string = ";"
                                        weapon.node.color = cc.Color.RED;
                                        let moveTo = cc.moveTo(1, pt).easing(cc.easeCircleActionInOut(0.5));
                                        weapon.node.runAction(cc.sequence(moveTo, delayTime, cc.removeSelf()));                    
                                    };

                                    this.log('男孩这次学了高招，有备而来！'); 
                                    this._boy.$Hero.sing('乾坤大挪移');    
                                    this._gril.$Hero.attack(this._boy, () => {
                                        this.log('全部怼回去了！真牛！'); 
                                        cc.director.getScheduler().setTimeScale(2);
                                        this._moveAndCall(this._gril, this._grilPt, "晕，遇到个疯子！", () => {
                                            this.log('唉！女孩受不了被吓跑了...');
                                        });   
                                    });
                                });
                            })
                        });
                    })   
                });    
                break;   
            case 5:
                async.series([
                    cb => this._moveAndCall(this._boy, cc.p(this._boy.x, 200), '妹妹快过来！', cb),
                    cb => this._moveAndCall(this._gril, cc.p(this._gril.x, 200), '喊我做啥子！', cb),          
                    cb => { 
                        this.log('男孩这次开始吟诗了...');
                        this._boy.$Hero.sing('仿佛兮若轻云之蔽月', cb);
                    },
                    cb => {
                        this.log('女孩，还是同样的暴脾气...');
                        this._gril.$Hero.sing('流氓，看招', cb);
                    },
                    cb => this._gril.$Hero.sing('大海无量', cb),
                    cb => this._grilAttackBoy(cb),

                    cb => {
                        this.log('男孩继续吟诗...');
                        this._boy.$Hero.sing('体迅飞凫，飘忽若神', () => {
                            this._boy.$Hero.sing('凌波微步，罗袜生尘', cb);       
                        });
                    },

                    cb => {
                        this.log('对白....');
                        async.eachSeries([
                            {node: this._gril, text:'啊！「凌波微步」'},
                            {node: this._boy, text:'妹妹也晓得「凌波微步」？'},
                            {node: this._gril, text:'有所耳闻，但未见过...'},
                            {node: this._boy, text:'你想学吗？'},
                            {node: this._gril, text:'好呀！好呀！'},
                            {node: this._boy, text:'请关注『奎特尔星球』微信公众号吧！'},
                        ], (item, cb) => {
                            item.node.$Hero.sing(item.text, cb);
                        }, cb);
                    },

                    (cb) => {
                        this._qr.active = true;
                        this._qr.runAction(cc.sequence(cc.rotateBy(2, 360*6), cc.callFunc(() => cb())));        
                    }

                ], () => {
                    cc.director.getScheduler().setTimeScale(2);
                });      
            default:      
        }
    },

    _grilAttackBoy(cb) {
        this._boy.zIndex = 1;
        this.log('注意慢动作...');
        cc.director.getScheduler().setTimeScale(0.3);
        this._gril.$Hero.onWeaponEvent = (weapon) => {
            this._boy.position = this._boy.parent.convertToNodeSpaceAR(weapon.node.parent.convertToWorldSpaceAR(weapon.node.position));
            weapon.string = ';';
            weapon.node.color = cc.Color.RED;
            let pt = cc.p(_.random(-200, 200), _.random(-200, 200));
            let moveBy = cc.moveBy(2, pt).easing(cc.easeBounceOut());
            
            let delayTime = cc.delayTime(0.3);
            let remove = cc.removeSelf();
            weapon.node.runAction(cc.sequence(moveBy, delayTime, remove));
        }
        this._gril.$Hero.attack(this._boy, () => {
            this.log('所有发出的招数被男孩转换...');
            cc.director.getScheduler().setTimeScale(1);
            cb();
        }); 
    },

    /**
     * 移动后呼叫
     * @param {*} node  要行动的节点
     * @param {*} pt    移动到的坐标位置
     * @param {*} text  呼叫的文本
     * @param {*} cb    动作完毕后的回调
     */
    _moveAndCall(node, pt, text, cb) {
        let moveTo = cc.moveTo(1, pt);
        let callFunc = cc.callFunc(() => {
            node.$Hero.sing(text, cb);
        });

        node.runAction(cc.sequence(moveTo, callFunc));
    }

    // update (dt) {},
});

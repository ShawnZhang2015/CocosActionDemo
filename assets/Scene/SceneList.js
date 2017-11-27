// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
const SCENE_INFO = {
    MizongStep: '步踪步',
    MultiHero: '凌波微步',
    Unhurried: '大战光棍节',
};
let uikiller = require('uikiller');
cc.Class({
    extends: cc.Component,

    properties: {
        listItem: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        uikiller.bindComponent(this);

        let games = cc.game._sceneInfos.map(sceneInfo => {
            let name = cc.path.basename(sceneInfo.url, '.fire');
            return { name, title: SCENE_INFO[name] };      
        }).filter(item => item.name !== 'SceneList');

        games.forEach(item => {
            let listItem = cc.instantiate(this.listItem);
            listItem.on(cc.Node.EventType.TOUCH_END, () => {
                cc.director.loadScene(item.name);
            });
            listItem.getComponent(cc.Label).string = item.title;
            this._content.addChild(listItem);
        });
    },

    start () {
        cc.log('start');
    },

    // update (dt) {},
});

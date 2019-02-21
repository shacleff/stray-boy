// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const gameEvent = require('Event')
const player = require("PlayerManager")
const et = require('Listener')
const Enum = require('Enum')
const Obj = require('Command')
cc.Class({
    extends: cc.Component,
    properties: {
      button: cc.Button,
      content: {
        default: null,
        type: cc.Label
      },
      health: {
        default: null,
        type: cc.Label
      },
      luck: {
        default: null,
        type: cc.Label
      },
      achievement: {
        default: null,
        type: cc.Label
      },
      money: {
        default: null,
        type: cc.Label
      },
      knowledge: {
        default: null,
        type: cc.Label
      },
      sport: {
        default: null,
        type: cc.Label
      },
      charm: {
        default: null,
        type: cc.Label
      },
      game: {
        default: null,
        type: cc.Label
      },
      classRank: {
        default: null,
        type: cc.Label
      },
      date: {
        default: null,
        type: cc.Label
      },
      energy: {
        default: null,
        type: cc.Label
      },
      time: {
        default: null,
        type: cc.Label
      },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
      this.updateLabel()
      this.button.node.on('click', this.goOut, this)
      et.on(Enum.EVENT.NO_ENERGY,() => {
        this.node.getChildByName('Btn_Sleep').active = true
      })
      this.node.getChildByName('Btn_Sleep').active = false

      this.node.getChildByName('Btn_Up').on('click', this.inputUp, this)
      this.node.getChildByName('Btn_Down').on('click', this.inputDown, this)
    },

    inputUp() {
      Obj.input.handleInputUp(Obj.up)
      Obj.input._buttonUp.execute()
    },

    inputDown() {
      Obj.input.handleInputDown(Obj.down)
      Obj.input._buttonDown.execute()
    },

    // 出门按钮事件回调
    goOut() {
      this.button.enabled = false
      this.content.string = ''
      if(player.currentEnergy > 0) {
        var event = gameEvent.getRandomEvent()
        player.Score(event.code)
      }else{
        var event = gameEvent.noEnergy()
      }
      const content = event.content
      let i = content.length - 1
      let index = 0
      this.labelSchedule(i,index,content)
      this.updateLabel()
    },

    labelInfo() {

    },

    // 文字出现
    labelSchedule(i,index,content) {
      this.schedule(() => {
        this.content.string = this.content.string + content[index]
        index++
        if(index>i) {
          this.button.enabled = true
        }
      },0.08,i,0)
    },

    updateLabel() {
      this.health.string = player.health
      this.luck.string = player.luck
      this.achievement.string = player.achievement
      this.money.string = player.money
      this.knowledge.string = player.knowledge
      this.sport.string = player.sport
      this.charm.string = player.charm
      this.game.string = player.game
      this.classRank.string = player.classRank
      this.date.string = player.date
      this.energy.string = player.currentEnergy + '/' + player.energy
      this.time.string = player.time
    },

    start () {

    },

    // update (dt) {},
});
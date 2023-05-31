/**
 * Mirai 事件映射器 | Mirai Event Mapper  
 * 基于 Mirai Http Api 开发的事件型构造函数
 * @copyright © [2023] Aigio1064 All Rights Reserved.
 * @license Apache License 2.0
 */
function MiraiEMP(options = {}) {
    /**
     * 初始化
     */
    const $createTimestamp = new Date().getTime();
    const _mainThis = this;
    const Version = "1.0.0"
    console.info(`%cAigio1064%cMirai Event Mapper%cVersion ${Version}`,"color:#fff;background-color:#ff99aa;padding:3px 3px;","color:#fff;background-color:deepskyblue;padding:3px 3px;","color:#fff;background-color:coral;padding:3px 3px;")
    console.info("初始化...")

    /**
     * 三个设置存储点
     * 以及方法
     */
    const $fixedOptions = {
        location: options.location || undefined,
        verifyKey: options.verifyKey || undefined,
        enabledWebSocket: options.enabledWebSocket || false
    };
    _mainThis.fixedoptions = new Proxy($fixedOptions, {
        get(a, b) {
            let _this = this;
            return (a[b]) instanceof Object ? new Proxy(a[b], _this) : a[b];
        },
        set() {
            throw new Error("很抱歉哦，你不能修改哦！")
        }
    })
    const $account = {};
    const $dynamicOptions = {
        qqNumbers: []
    };
    function createUserProfile(userID) {

    }

    var $agentMonitor = {
        get(a,b){
            return (a[b]) instanceof Object?new Proxy(a[b],$agentMonitor):a[b];
        },
        set(a,b,c){
            return a[b] = c;
        }
    }
    console.info(`%cAigio1064%cMirai Event Mapper%cVersion ${Version}`,"color:#fff;background-color:#ff99aa;padding:3px 3px;","color:#fff;background-color:deepskyblue;padding:3px 3px;","color:#fff;background-color:coral;padding:3px 3px;")
    console.info("模块创建完成 耗时："+(new Date().getTime() - $createTimestamp) / 1000+"s")
    return new Proxy(_mainThis,$agentMonitor)
}
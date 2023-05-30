/**
 * # Audio Player Control [AudioPlayerCtl]
 * @copyright © [2023] Aigio1064 All Rights Reserved.
 * @license Apache License 2.0
 */
function AudioPlayer(options = {
    setup: undefined,
    setupend: undefined,
    onTimeUpdate: undefined,
    onSetSrc: undefined,
    onPrevious: undefined,
    onPositive: undefined,
    onNext: undefined,
    onPlay: undefined,
    onPlayEnd: undefined,
    onPause: undefined,
    onChangeTime: undefined,
    loop: false,
    volume: 1,
    CarouselMode: "positive" || "previous" || "loop" || "random",
    Playing: undefined,
    Detection: undefined
}, urls = undefined || String() || Array()) {
    const _this = this;
    const option = _this.options = options;
    const Version = _this.Version = "1.0.6";
    _this.Audio = new Audio();
    if (option.setup) option.setup(_this);
    _this.Audio.$this = _this;
    _this.Playing = (typeof option.Playing == "number") ? option.Playing : 0;
    _this.TaskLists = [];
    if (typeof urls == "string" || urls instanceof Array) {
        _this.TaskLists.push(...(typeof urls == "string" ? [urls] : urls))
    };
    function setSrc() {
        _this.Audio.src = (typeof option.Detection == "string") ? _this.TaskLists[_this.Playing][option.Detection] : _this.TaskLists[_this.Playing];
        if (option.onSetSrc) option.onSetSrc(_this);
    };
    if (_this.TaskLists.length > 0) setSrc();
    var _$randomCache,
        _$randomOldTask = {
            value: _this.Playing
        };
    _this.Audio.loop = (option.loop) ? true : false;
    _this.Audio.volume = (option.volume) ? option.volume : 1;
    option.CarouselMode = (option.CarouselMode) ? option.CarouselMode : "next";
    _this.loop = (loop) => {
        if (typeof loop == "boolean") _this.Audio.loop = loop;
        return _this.Audio.loop
    };
    _this.volume = (volume) => {
        if (typeof volume == "number") _this.Audio.volume = volume;
        return _this.Audio.volume;
    };
    _this.toggleCarouselMode = () => {
        switch(option.CarouselMode){
            case "next":
                option.CarouselMode = "loop";
                break;
            case "loop":
                option.CarouselMode = "random";
                break;
            case "random":
                option.CarouselMode = "previous";
                break;
            case "previous":
                option.CarouselMode = "next";
                break;
            default:
                option.CarouselMode = "next";
                break;
        }
        return option.CarouselMode
    };
    _this.play = () => {
        if (_this.TaskLists.length <= 0 && _this.Audio.src) return;
        _this.Audio.play();
        if (option.onPlay) option.onPlay(_this);
        return _this;
    };
    _this.play.kernel = _this.play.prototype = {
        setSrc
    };
    _this.pause = () => {
        _this.Audio.pause();
        if (option.onPause) option.onPause(_this);
        return _this;
    };
    _this.currentTime = (s) => {
        if (typeof s == "number") _this.Audio.currentTime = s;
        if (option.onChangeTime && typeof s == "number") option.onChangeTime(_this);
        return _this.Audio.currentTime;
    };
    _this.next = () => {
        switch (option.CarouselMode) {
            case "positive":
                _this.positive();
                break;
            case "previous":
                _this.previous();
                break;
            case "random":
                _this.randomNext();
                break;
            case "loop":
                _this.Audio.play();
        };
        if (option.onNext) option.onNext(_this);
        return _this;
    };
    _this.positive = () => {
        if (_this.Playing == _this.TaskLists.length - 1) {
            _this.Playing = 0;
        } else {
            _this.Playing++;
        };
        setSrc();
        _this.Audio.play();
        if (option.onPositive) option.onPositive(_this);
        return _this;
    };
    _this.previous = () => {
        if (option.CarouselMode == "random" && _$randomOldTask.old) {
            _this.Playing = _$randomOldTask.old.value;
            setSrc();
            _$randomOldTask = new Object(_$randomOldTask.old);
        } else {
            if (_this.Playing == 0) {
                _this.Playing = _this.TaskLists.length - 1;
            } else {
                _this.Playing--;
            };
            setSrc()
        };
        _this.Audio.play();
        if (option.onPrevious) option.onPrevious(_this);
        return _this;
    };
    _this.randomNext = () => {
        _this.Playing = Math.floor(Math.random() * (_this.TaskLists.length - 1));
        for (; _this.Playing == _$randomCache;) {
            _this.Playing = Math.floor(Math.random() * (_this.TaskLists.length - 1));
        };
        _$randomCache = new Number(_this.Playing);
        if (_$randomOldTask) {
            _$randomOldTask = {
                old: _$randomOldTask,
                value: _this.Playing
            };
        } else {
            _$randomOldTask = {
                value: _this.Playing
            }
        };
        setSrc();
        _this.Audio.play();
        if (option.onNext) option.onNext(_this);
        return _this;
    };
    _this.randomNext.kernel = _this.randomNext.prototype = {
        getCache() {
            return _$randomCache;
        },
        getOld() {
            return _$randomOldTask
        }
    };
    _this.Timeboard = () => {
        return {
            currentTime: _this.Audio.currentTime,
            duration: _this.Audio.duration,
            percentage: (_this.Audio.currentTime / _this.Audio.duration * 100).toFixed(3) + "%",
            remainingTime: _this.Audio.duration - _this.Audio.currentTime
        }
    };
    _this.Audio.addEventListener("ended", () => {
        switch (option.CarouselMode) {
            case "positive":
                _this.positive();
                break;
            case "previous":
                _this.previous();
                break;
            case "random":
                _this.randomNext();
                break;
            case "loop":
                _this.Audio.play();
        };
        if (option.onPlayEnd) option.onPlayEnd(_this);
    });
    if (option.onTimeUpdate) _this.Audio.addEventListener("timeupdate", option.onTimeUpdate);
    if (option.setupend) option.setupend(_this)
};

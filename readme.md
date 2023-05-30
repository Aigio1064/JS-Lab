# Audio Player Control [`AudioPlayerCtl`]

\[`中文` | [`English`](readme_en.md)\]

## 介绍

这是一个用于 **现代浏览器** 的 音频 **播放**、**控制** 的库，  
具有较强的扩展和兼容能力，至少我没有新的想法来对它扩展了。

功能有 `播放列表`、`下一首`、`顺序下一首`、`随机下一首`、`上一首` 等音频播放器的基础功能

### 它出现的原因

我需要一个可扩展的音频播放框架，以在我的网站使用，但我没有找到适合我的。  
所以它诞生了。

### 信息
| name | value |
| :--: | :---: |
| 首次保存 | 2023/5/24 12:41 |
| 首次发布 | 2023/5/26 |

## 文档

怎么创建一个`AudioPlayer`？

```javascript
var fn = new AudioPlayer() // 基本

var fn = new AudioPlayer(options) // 带设置

var fn = new AudioPlayer(options[, urls]) // 带设置与音频链接
```

当创建完成后，可以使用 `fn.TaskLists.push(url)` 来添加一个任务链接，  
接下来使用 `fn.play()` 即可播放音频

---

## 已知问题

`Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.`

这个错误通常是由于在用户与页面进行交互之前尝试播放音频或视频导致的

---

## 参数

`options`

**!!!注意大小写!!!**

这个参数不是必须的，但不设置此参数将无法设置`urls`参数，可以用`{}`占位。

| name | value(args) | void | description |
| :--: | :---------: | :--: | :---------: |
| setup | function(this) | - | 在创建好`Audio()`时执行，但未准备好播放 |
| setupend | function(this) | - | 在全部创建流程结束后执行，一般情况下，已经准备好播放了 |
| onTimeUpdate | function() | - | 在触发`Event.timeupdate`事件时执行 |
| onSetSrc | function(this) | - | 在触发`play.kernel.setSrc()`后执行 |
| onPrevious | function(this) | - | 在触发`previous()`后执行 |
| onPositive | function(this) | - | 在触发`positive()`后执行 |
| onNext | function(this) | - | 在触发`next()`后执行 |
| onPlay | function(this) | - | 在触发`play()`后执行 |
| onPlayEnd | function() | - | 在触发`Event.ended`事件时执行 |
| onPause | function(this) | - | 在触发`pause()`后执行 |
| onChangeTime | function(this) | - | 在触发`currentTime(arg)`后执行，需要`currentTime()`有参数 |
| loop | boolean | - | 设置是否循环播放，设置为`true`后，将不会触发`Event.ended`事件 |
| volume | number | - | 设置音量初始值，范围 0-1 |
| CarouselMode | string | - | 设置播放模式，可用的值有`positive`、`previous`、`loop`、`random`，设置为`loop`也能触发`Event.ended`事件 |
| Playing | number | - | 设置要播放的第一首歌曲的索引，默认为 0 即第一首 |
| Detection | string\|number | - | 设置`Audio().src`应该监听的位置，适用于`TaskLists`的值是`array`、`object`的情况 |

---

`urls`

这个参数不是必须的，只能是一段`string`或者`array`，`array`的内容可以是`string`、`array`、`object`，但我想你不会想再设置一个`array`的

```javascript
var fn = new AudioPlayer({},"url")
// Audio.src = ["url"][0]

var fn = AudioPlayer({Detection:0},[["url"]])
// Audio.src = [["url"]][0][0]

var fn = AudioPlayer({Detection:"src"},[{src:"url"}])
// Audio.src = [{src:"url"}][0]["src"]
```
---

## 方法 | 值

`Audio`: `Audio()`对象，用于一系列操作

`Audio.$this`: 自身`AudioPlayer()`对象，用于在元素事件触发时使用`this.$this`来对`AudioPlayer`进行操作，所以理论上你可以`this.$this.Audio.$this.Audio.$this.Audio.$this......`

`Playing`: 当前播放音频的索引，默认为 0

`TaskLists`: 播放任务列表，`TaskLists.push()`相同格式的内容到里面即可添加n项播放任务

`Timeboard()`: 一个函数，输出 `currentTime`已播放时长、`duration`当前音频时长、`percentage`百分比播放进度、`remainingTime`音频剩余时长

`Version`: js的版本

`currentTime(number)`: 修改当前播放时长的函数，无参数时输出已播放时长，有参数时修改时长并触发`onChangeTime`事件函数，然后输出已播放时长

`loop(boolean)`: 用于修改`Audio.loop`的函数，无触发，无论是否传入参数都返回`Audio.loop`的值

`next()`: 播放下一首音频，类似播放结束，不触发`Event.ended`事件和`onPlayEnd`事件函数，但触发`onNext`事件函数，可识别播放模式

`options`: 传入的`options`参数，可以修改，会立即应用

`pause()`: 打个暂停，触发`onPause`事件函数

`play()`: 开始/继续播放，触发`onPlay`事件函数

`play.kernel.setSrc()`: 根据`TaskLists`、`Playing`和`Detection`设置当前应该播放的音频链接

`positive()`: 顺序播放`TaskLists`中的下一首，触发`onPositive`事件函数

`previous()`: 倒序播放`TaskLists`中的上一首，触发`onPrevious`事件函数

`randomNext()`: 倒序播放`TaskLists`中的上一首，触发`onNext`事件函数

`randomNext.kernel.getCache()`: 返回当前的随机索引

`randomNext.kernel.getOld()`: 获取随机播放模式下的播放顺序结构

`toggleCarouselMode()`: 切换播放模式，未知的`CarouselMode`值将被修改为`next`

`volume`: 修改音量，范围 0-1 ，无触发，无论是否传入参数都返回`Audio.volume`的值
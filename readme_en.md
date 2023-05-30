# Audio Player Control [`AudioPlayerCtl`]

\[[`中文`](readme.md) | `English`\]

## Introduction

This is a library for audio **playback**, **control** in **modern browsers**.  
It is highly extensible and compatible, at least I don't have new ideas to extend it anymore.

Functions `playlist`, `next song`, `sequential next song`, `random next song`, `previous song` and other basic functions of audio players

### The reason for its appearance

I needed an extensible audio playback framework to use on my site, but I didn't find one that suited me.  
So it was born.

### Information
| name | value |
| :---: | :---: |
| first saved | 2023/5/24 12:41 |
| first release | 2023/5/26 |

Translated with www.DeepL.com/Translator (free version)

How to create an `AudioPlayer`?

```javascript
var fn = new AudioPlayer() // Basic

var fn = new AudioPlayer(options) // With settings

var fn = new AudioPlayer(options[, urls]) // With settings and audio links
```

Once created, you can use `fn.TaskLists.push(url)` to add a link to the task.  
Next, use `fn.play()` to play the audio.

---

## Known issues

`Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.`

This error is usually caused by trying to play audio or video before the user interacts with the page

---

## Parameters

`options`

**!!! Note the case!!! **

This parameter is not required, but without setting this parameter it will not be possible to set the `urls` parameter, which can be placed with `{}`.

| name | value(args) | void | description |
| :--: | :---------: | :--: | :---------: |
| setup | function(this) | - | Executed when `Audio()` is created, but not ready to play |
| setupend | function(this) | - | Executed at the end of the full creation process, generally ready to play |
| onTimeUpdate | function() | - | Executed when the `Event.timeupdate` event is triggered |
| onSetSrc | function(this) | - | Executed after triggering `play.kernel.setSrc()` |
| onPrevious | function(this) | - | Executed after triggering `previous()` |
| onPositive | function(this) | - | Executed after triggering `positive()` |
| onNext | function(this) | - | Execute after triggering `next()` |
| onPlay | function(this) | - | Execute after triggering `play()` |
| onPlayEnd | function() | - | Executed when the `Event.ended` event is triggered |
| onPause | function(this) | - | Executed after `pause()` is triggered |
| onChangeTime | function(this) | - | Executed after triggering `currentTime(arg)`, requires `currentTime()` with arguments |
| loop | boolean | - | Set whether to loop or not, when set to `true`, the `Event.ended` event will not be triggered |
| volume | number | - | Set the volume initial value, range 0-1 |
| CarouselMode | string | - | Set the playback mode, the available values are `positive`, `previous`, `loop`, `random`, setting to `loop` can also trigger the `Event.ended` event normally |
| Playing | number | - | Set the index of the first audio to be played, default is 0 i.e. the first one |
| Detection | string\|number | - | Set the location where `Audio().src` should be listened to, for cases where the value of `TaskLists` is `array`, `object` |

---

`urls`

This parameter is not required, it can only be a `string` or `array`, the content of `array` can be `string`, `array`, `object`, but I don't think you want to set another `array`

```javascript
var fn = new AudioPlayer({},"url")
// Audio.src = ["url"][0]

var fn = AudioPlayer({Detection:0},[["url"]])
// Audio.src = [["url"]][0][0]

var fn = AudioPlayer({Detection:"src"},[{src:"url"}])
// Audio.src = [{src:"url"}][0]["src"]
```

---

## Method | Value

`Audio`: `Audio()` object for a series of operations

`Audio.$this`: Its own `AudioPlayer()` object for using `this.$this` to operate on `AudioPlayer` when the element event is triggered, so in theory you could `this.$this.Audio. `

`Playing`: Index of the currently playing audio, default is 0

`TaskLists`: Playback task list, `TaskLists.push()` in the same format to add n playback tasks

`Timeboard()`: A function that outputs `currentTime` played duration, `duration` current audio duration, `percentage` percentage playback progress, `remainingTime` remaining audio duration

`Version`: Version of js

`currentTime(number)`: Function to modify the current playback time, output the played time when there is no parameter, modify the time when there is parameter and trigger the `onChangeTime` event function, then output the played time

`loop(boolean)`: function for modifying `Audio.loop`, no trigger, returns the value of `Audio.loop` with or without passed parameters

`next()`: Play the next audio, similar to the end of playback, without triggering the `Event.ended` event and the `onPlayEnd` event function, but triggering the `onNext` event function, which can recognize the playback mode

`options`: The `options` parameter passed in, which can be modified, will be applied immediately

`pause()`: Pause to trigger the `onPause` event function

`play()`: Start/resume playback, trigger the `onPlay` event function

`play.kernel.setSrc()`: Set the current audio link that should be played according to `TaskLists`, `Playing` and `Detection`

`positive()`: Play the next song in `TaskLists` in sequence, triggering the `onPositive` event function

`previous()`: Play the previous song in `TaskLists` in reverse order, triggering the `onPrevious` event function

`randomNext()`: Play the previous song in `TaskLists` in reverse order, triggering the `onNext` event function

`randomNext.kernel.getCache()`: Returns the current random index

`randomNext.kernel.getOld()`: Get the structure of the playback order in random play mode

`toggleCarouselMode()`: Switching the playback mode, the unknown `CarouselMode` value will be modified to `next`

`volume`: Modify volume, range 0-1, no trigger, returns the value of `Audio.volume` regardless of whether the parameter is passed in
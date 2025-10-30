// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck



import gsap from "gsap"

interface HorizontalLoopConfig {
  repeat?: number
  paused?: boolean
  speed?: number
  snap?: number | boolean | ((value: number) => number)
  paddingRight?: number | string
  reversed?: boolean
}

export interface HorizontalLoopTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween
  current: () => number
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween
  times: number[]
}

export function horizontalLoop(
  items: gsap.TweenTarget,
  config?: HorizontalLoopConfig
): HorizontalLoopTimeline {
  const itemsArray = gsap.utils.toArray(items) as HTMLElement[]
  const cfg = config || {}
  
  const tl = gsap.timeline({
    repeat: cfg.repeat,
    paused: cfg.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  }) as HorizontalLoopTimeline

  const length = itemsArray.length
  const startX = itemsArray[0].offsetLeft
  const times: number[] = []
  const widths: number[] = []
  const xPercents: number[] = []
  let curIndex = 0
  const pixelsPerSecond = (cfg.speed || 1) * 100
  
  const snap = 
    cfg.snap === false 
      ? (v: number) => v 
      : gsap.utils.snap(cfg.snap || 1)

  let totalWidth: number
  let curX: number
  let distanceToStart: number
  let distanceToLoop: number
  let item: HTMLElement
  let i: number

  gsap.set(itemsArray, {
    xPercent: (i: number, el: Element) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string))
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
      )
      return xPercents[i]
    },
  })

  gsap.set(itemsArray, { x: 0 })

  // eslint-disable-next-line prefer-const
  totalWidth =
    itemsArray[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    itemsArray[length - 1].offsetWidth *
      (gsap.getProperty(itemsArray[length - 1], "scaleX") as number) +
    (parseFloat(cfg.paddingRight as string) || 0)

  for (i = 0; i < length; i++) {
    item = itemsArray[i]
    curX = (xPercents[i] / 100) * widths[i]
    distanceToStart = item.offsetLeft + curX - startX
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number)
    
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond)
    
    times[i] = distanceToStart / pixelsPerSecond
  }

  function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
    const v = vars || {}
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length)
    
    const newIndex = gsap.utils.wrap(0, length, index)
    let time = times[newIndex]
    
    if (time > tl.time() !== index > curIndex) {
      v.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
      time += tl.duration() * (index > curIndex ? 1 : -1)
    }
    
    curIndex = newIndex
    v.overwrite = true
    return tl.tweenTo(time, v)
  }

  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars)
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars)
  tl.current = () => curIndex
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars)
  tl.times = times
  
  tl.progress(1, true).progress(0, true)
  
  if (cfg.reversed) {
    tl.vars.onReverseComplete()
    tl.reverse()
  }

  return tl
}

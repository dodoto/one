import React, { useState, useRef, MouseEventHandler } from 'react'

const getColor = (index: number) => {
  const multiplier = 255 / (15 - 1);
  const colorVal = index * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
}

const SIZE = 15

type Circle = {
  key: number
  cx: number
  cy: number
  r: typeof SIZE
  fill: string
}

const getCircle = (x: number, y: number, key: number, index: number): Circle => ({
  key,
  cx: x,
  cy: y,
  r: SIZE,
  fill: getColor(index),
})

const getPath = (circles: Circle[]) => {
  return circles.reduce((acc, cur, index) => {
    const next = circles[index + 1]
    if (next) {
      const { cx: curX, cy: curY } = cur
      const { cx: nextX, cy: nextY } = next
      return `${acc}M ${curX}, ${curY} L ${nextX}, ${nextY} `
    } else {
      return acc
    }
  }, '')
}

type DragState = {
  startX: number
  startY: number
  circle: null | Circle
}

const DotLine = () => {
  const [circles, setCircles] = useState<Circle[]>([])
  const path = getPath(circles)
  const dragState = useRef<DragState>({ startX: 0, startY: 0, circle: null })

  const handleRootMouseDown: MouseEventHandler = evt => {
    dragState.current.startX = evt.clientX
    dragState.current.startY = evt.clientY
  }

  const handleRootMouseMove: MouseEventHandler = evt => {
    const { circle } = dragState.current
    if (circle) {
      // console.log('item move')
      const { clientX, clientY } = evt
      circle.cx = clientX
      circle.cy = clientY
      setCircles([...circles])
    }
  }

  const handleRootMouseUp: MouseEventHandler = evt => {
    const { startX, startY, circle } = dragState.current
    const { clientX, clientY, timeStamp } = evt

    const isStatic = Math.abs(startX - clientX) <= 1 && Math.abs(startY - clientY) <= 1

    if (isStatic && circle) {
      // console.log('circle click') remove circle
      setCircles(circles.filter(item => item !== circle))
    }
    else if (isStatic && !circle) {
      // console.log('root click') add circle
      const circle = getCircle(clientX, clientY, timeStamp, circles.length)
      setCircles([...circles, circle])
    }
    else if (!isStatic && circle) {
      // console.log('circle move end') fixed circle
    }
    dragState.current.circle = null
  }

  const handleItemMouseDown = (circle: Circle) => {
    dragState.current.circle = circle
  }


  return (
    <div style={{minHeight: '100vh', background: 'conic-gradient(#eee 25%, white 0deg 50%, #eee 0deg 75%, white 0deg) 0 / 20px 20px'}}>
      <svg style={{display: 'block', width: '100%', minHeight: '100vh'}} onMouseDown={handleRootMouseDown} onMouseMove={handleRootMouseMove} onMouseUp={handleRootMouseUp}>
        <text x="10" y="20">click to create circle and drag circle</text>
        <path d={path} strokeWidth="4" fill="none" stroke="red"/>
        {
          circles.map((circle) => (
            <circle
              style={{cursor: 'pointer'}}
              {...circle}
              onMouseDown={() => handleItemMouseDown(circle)}
            ></circle>
          ))
        }
      </svg>
    </div>
  )
}

export default DotLine

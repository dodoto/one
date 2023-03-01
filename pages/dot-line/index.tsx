import React, { useState, useRef, MouseEventHandler } from 'react'

const getCurvePath = (startX: number, startY: number, endX: number, endY: number) => {
  const cp1x = startX,
    cp1y = startY + (endY - startY) / 2,
    cp2x = endX,
    cp2y = endY - (endY - startY) / 2
  return `M ${startX}, ${startY} C ${cp1x}, ${cp1y} ${cp2x}, ${cp2y} ${endX}, ${endY}`
}

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
      return `${acc}M${getCurvePath(curX, curY, nextX, nextY)}`
      return `${acc}M ${curX}, ${curY} L ${nextX}, ${nextY} `
    } else {
      return acc
    }
  }, '')
}

type DragState = {
  isMouseDown: boolean
  startX: number
  startY: number
  circle: null | Circle
  viewportX: number
  viewportY: number
}

const DotLine = () => {
  const [circles, setCircles] = useState<Circle[]>([])
  const path = getPath(circles)
  const [viewport, setViewport] = useState({ x: 0, y: 0 })
  const dragState = useRef<DragState>({ 
    isMouseDown: false, 
    startX: 0, 
    startY: 0, 
    circle: null,
    viewportX: 0,
    viewportY: 0,
  })

  const handleRootMouseDown: MouseEventHandler = evt => {
    dragState.current.isMouseDown = true
    dragState.current.startX = evt.clientX
    dragState.current.startY = evt.clientY
  }

  const handleRootMouseMove: MouseEventHandler = evt => {
    const { isMouseDown, circle, startX, startY, viewportX, viewportY } = dragState.current
    const { clientX, clientY } = evt
    if (circle) {
      // console.log('item move')
      circle.cx = clientX
      circle.cy = clientY
      setCircles([...circles])
    } else if (isMouseDown) {
      // console.log('root move')
      setViewport({
        x: clientX - startX + viewportX,
        y: clientY - startY + viewportY,
      })
    }
  }

  const handleRootMouseUp: MouseEventHandler = evt => {
    const { isMouseDown, startX, startY, circle } = dragState.current
    const { clientX, clientY, timeStamp } = evt

    const isStatic = Math.abs(startX - clientX) <= 1 && Math.abs(startY - clientY) <= 1

    if (isStatic && circle) {
      // console.log('circle click') remove circle
      setCircles(circles.filter(item => item !== circle))
    }
    else if (isStatic && !circle) {
      // console.log('root click') add circle
      const { x, y } = viewport
      const circle = getCircle(clientX - x, clientY - y, timeStamp, circles.length)
      setCircles([...circles, circle])
    }
    else if (!isStatic && circle) {
      // console.log('circle move end')
    }
    else if (!isStatic && isMouseDown) {
      // console.log('root move end')
    }
    dragState.current.viewportX = viewport.x
    dragState.current.viewportY = viewport.y
    dragState.current.isMouseDown = false
    dragState.current.circle = null
  }

  const handleRootMouseLeave: MouseEventHandler = evt => {
    handleRootMouseUp(evt)
  }

  const handleItemMouseDown = (circle: Circle) => {
    dragState.current.circle = circle
  }


  return (
    <div style={{minHeight: '100vh', background: 'conic-gradient(#eee 25%, white 0deg 50%, #eee 0deg 75%, white 0deg) 0 / 20px 20px'}}>
      <svg 
        style={{display: 'block', width: '100%', minHeight: '100vh'}} 
        onMouseDown={handleRootMouseDown} 
        onMouseMove={handleRootMouseMove} 
        onMouseUp={handleRootMouseUp}
        onMouseLeave={handleRootMouseLeave}>
        <text x="10" y="20">click to create circle and drag circle</text>
        <path d={path} transform={`translate(${viewport.x}, ${viewport.y})`} strokeWidth="4" fill="none" stroke="red"/>
        {
          circles.map((circle) => (
            <circle
              transform={`translate(${viewport.x}, ${viewport.y})`}
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

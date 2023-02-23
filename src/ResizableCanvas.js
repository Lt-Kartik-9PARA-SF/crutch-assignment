import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

const ResizableCanvas = () => {
  const [canvasWidth, setCanvasWidth] = useState(250);
  const [canvasHeight, setCanvasHeight] = useState(250);
  const [backgroundColor, setBackgroundColor] = useState('red');
  const [number, setNumber] = useState(10);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);

  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleResizeStart = (e) => {
    if (e.buttons !== 1) {
      return;
    }
    setIsResizing(!isResizing);
    setResizeDirection(e.target.dataset.direction);
  };

  const handleResizeMove = (e) => {
    if (isResizing) {
      if (resizeDirection === 'horizontal') {
        setCanvasWidth(e.clientX);
      } else if (resizeDirection === 'vertical') {
        setCanvasHeight(e.clientY);
      }
    }
  };

  const handleResizeEnd = (e) => {
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection(null);
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const colorOptionStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '4px',
    padding: '4px',
    alignItems: 'center',
  };
  const colorOptions = [
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
    { label: 'Yellow', value: '#FFFF00' },
    { label: 'Cyan', value: '#00FFFF' },
    { label: 'Magenta', value: '#FF00FF' },
    { label: 'Turquoise', value: '#00C5CD' },
    { label: 'Teal', value: '#05EDFF' }
  ];



  return (
    <div className='cont'>

      <div className='input-container'>

        <div className='up'>
          <label htmlFor='select-tag'>Select a color</label>
          <select value={backgroundColor} onChange={handleColorChange} title={'Select a Color'}>
            {colorOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                style={{ ...colorOptionStyles, backgroundColor: option.value }}
              >
                {option.label}
              </option>
            ))}
          </select>

        </div>

        <div className='up'>
          <label htmlFor='num'>Enter a Number</label>
          <input type="number" min="0" max="99" value={number} onChange={handleNumberChange} title={'Enter a Number'} />

        </div>




      </div>

      <div
        style={{ position: 'relative', width: canvasWidth, height: canvasHeight }}
        onMouseMove={handleResizeMove}
        onMouseUp={handleResizeEnd}
      >
        <CanvasDraw
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          hideGrid={true}
          style={{ backgroundColor }}
        />


        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            backgroundColor: '#FFFF00',
            cursor: 'ew-resize',
            zIndex: 2,
          }}
          data-direction="horizontal"
          onMouseDown={handleResizeStart}
          title={'Click to resize Horizontally '}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            backgroundColor: '#FFFF00',
            cursor: 'ns-resize',
            zIndex: 2,
          }}
          data-direction="vertical"
          onMouseDown={handleResizeStart} title={'Click to resize Vertically'}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          {number < 10 ? <p className='overlay'>0{number}</p> : <p className='overlay'>{number}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResizableCanvas;
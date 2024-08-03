//@ts-nocheck

import Konva from 'konva';
import React, { useEffect, useState } from 'react';
import {
  TbApps,
  TbArrowUp,
  TbBorderCorners,
  TbBucketDroplet,
  TbBurger,
  TbCamera,
  TbChevronUp,
  TbColorPicker,
  TbCursorText,
  TbEraser,
  TbGraph,
  TbMath,
  TbMathFunction,
  TbMenu,
  TbMenu2,
  TbMicrophone,
  TbMinus,
  TbPencil,
  TbPhoneOff,
  TbPlus,
  TbPointer,
  TbRuler2,
  TbSettings,
  TbSquare,
  TbTextSize,
  TbZoomIn,
  TbZoomOut,
} from 'react-icons/tb';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
type Props = {};

const Board = (props: Props) => {
  const [zoom, setZoom] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [isStrokeWidthSelectVisible, setStrokeWidthSelectVisibility] =
    useState(false);

  const [stage, setStage] = useState(null);

  useEffect(() => {
    const stage = new Konva.Stage({
      container: 'board',
      width: window.innerWidth,
      height: window.innerHeight,
    });

    setStage(stage);

    const layer = new Konva.Layer();
    stage.add(layer);

    const rect = new Konva.Rect({
      x: 1000,
      y: 1000,
      width: 100,
      height: 100,
      strokeWidth: 2,
      stroke: 'black',
      hitStrokeWidth: 0,
    });
    layer.add(rect);

    const circle = new Konva.Circle({
      x: -100,
      y: -100,
      radius: 50,
      fill: 'blue',
    });
    layer.add(circle);

    const dot = new Konva.Circle({
      x: 0,
      y: 0,
      radius: 2,
      fill: 'black',
    });
    layer.add(dot);

    let lastMousePos = { x: 0, y: 0 };

    const optimize = () => {
      layer.getChildren().forEach((child) => {
        if (child.attrs.points && child.attrs.points.length > 4) {
          const points = child.attrs.points;
          const uniqPoints = [];

          for (let i = 0; i < points.length - 1; i += 2) {
            const x = points[i];
            const y = points[i + 1];

            let isUniq = true;

            for (let j = 0; j < uniqPoints.length - 1; j += 2) {
              const uX = uniqPoints[j];
              const uY = uniqPoints[j + 1];

              if (x === uX && y === uY) {
                isUniq = false;
              }
            }

            if (isUniq) {
              uniqPoints.push(x, y);
            }
          }
          console.log(points);
          console.log(uniqPoints);
          child.points(uniqPoints);
        }
      });
    };

    const updateView = () => {
      const [x1, y1, x2, y2] = [
        -stage.getPosition().x / stage.scaleX(),
        -stage.getPosition().y / stage.scaleX(),
        (-stage.getPosition().x + stage.width()) / stage.scaleX(),
        (-stage.getPosition().y + stage.height()) / stage.scaleX(),
      ];

      layer.getChildren().forEach((child) => {
        if (child.attrs.points) {
          for (
            let i = 0;
            i < Math.floor(child.attrs.points.length / 100);
            i++
          ) {
            const x = child.attrs.points[i * 100];
            const y = child.attrs.points[i * 100 + 1];

            if (
              x >= x1 - (x2 - x1) &&
              x <= x2 + (x2 - x1) &&
              y >= y1 - (y2 - y1) &&
              y <= y2 + (y2 - y1)
            ) {
              if (!child.isVisible()) child.show();
              break;
              //BUG:КЕШ КРАШИТ КАНВАС
              // if (child.isCached()) {
              //   child.clearCache();
              // }
            } else {
              if (child.isVisible()) {
                child.hide();
              }
            }
          }
        }
      });
    };

    stage.on('mousedown', (e) => {
      if (e.evt.button === 1) {
        lastMousePos = stage.getPointerPosition();
      }
    });

    // for (let x = 1; x < 50; x++) {
    //   for (let y = 1; y < 50; y++) {
    //     const line = new Konva.Line({
    //       stroke: 'black',
    //       strokeWidth: 3,
    //       lineCap: 'round',
    //       lineJoin: 'round',
    //       perfectDrawEnabled: false,
    //       hitStrokeWidth: 0,
    //       points: [
    //         1199, 586, 1199, 586, 1200, 585, 1201, 585, 1202, 584, 1203, 583,
    //         1204, 582, 1205, 582, 1206, 582, 1207, 581, 1208, 580, 1209, 580,
    //         1210, 579, 1211, 579, 1212, 578, 1214, 578, 1215, 577, 1216, 576,
    //         1217, 576, 1218, 575, 1220, 575, 1221, 574, 1223, 574, 1224, 573,
    //         1226, 573, 1227, 572, 1229, 571, 1230, 571, 1232, 570, 1234, 570,
    //         1235, 569, 1237, 569, 1239, 568, 1241, 567, 1243, 567, 1245, 566,
    //         1247, 566, 1249, 565, 1251, 565, 1253, 564, 1255, 564, 1257, 563,
    //         1260, 563, 1262, 562, 1264, 562, 1267, 561, 1269, 561, 1272, 560,
    //         1274, 560, 1277, 560, 1279, 559, 1282, 559, 1285, 559, 1287, 558,
    //         1290, 558,
    //       ].map((i, ind) => {
    //         if (ind % 2 === 0) {
    //           return i + 50 * x;
    //         }
    //         return i + 50 * y;
    //       }),
    //     });
    //     layer.add(line);
    //     // line.cache({ pixelRatio: 0.1 });
    //     // line.cache({ pixelRatio: 0.2 });
    //   }
    // }

    const history = [];

    function downloadURI(uri, name) {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    stage.on('mouseup', (e) => {
      if (e.evt.button === 1) updateView();
    });

    stage.on('mousemove', (e) => {
      if (e.evt.buttons === 4) {
        const newPos = stage.getPointerPosition();
        // console.log(newPos);
        const dx = lastMousePos.x - newPos.x;
        const dy = lastMousePos.y - newPos.y;
        const newX = stage.x() - dx;
        const newY = stage.y() - dy;

        stage.position({ x: newX, y: newY });
        // stage.batchDraw();
        lastMousePos = newPos;
        // console.log(layer.children);

        // const [x1, y1, x2, y2] = [
        //   -newX / stage.scaleX(),
        //   -newY / stage.scaleX(),
        //   (-newX + stage.width()) / stage.scaleX(),
        //   (-newY + stage.height()) / stage.scaleX(),
        // ];

        // layer.getChildren().forEach((child) => {
        //   // if(child.)
        //   if (child.attrs.points) {
        //     const x = child.attrs.points[0];
        //     const y = child.attrs.points[1];
        //     console.log(x1, y1, x2, y2);
        //     console.log(x, y);
        //     if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        //       // child.show();
        //     } else {
        //       child.hide();
        //     }
        //   }
        // });
      }
    });

    const pointerMoveHandler = (e) => {
      e.evt.preventDefault();
      if (lastLine) {
        const pos = stage.getPointerPosition();
        pos.x = Math.round((pos.x - stage.x()) / stage.scaleX());
        pos.y = Math.round((pos.y - stage.y()) / stage.scaleY());
        lastLine.points(lastLine.points().concat([pos.x, pos.y]));
        layer.add(lastLine);
      }
    };

    stage.on('touchend', (e) => {
      if (e.evt.touches.length === 1) updateView();
      stage.off('pointermove', pointerMoveHandler);
    });

    stage.on('touchmove', (e) => {
      if (e.evt.touches.length === 2) {
        const newPos = stage.getPointerPosition();
        const dx = lastMousePos.x - newPos.x;
        const dy = lastMousePos.y - newPos.y;
        const newX = stage.x() - dx * 1.4;
        const newY = stage.y() - dy * 1.4;
        // console.log(`Камера X - ${-newX} | Y = ${-newY}`);
        stage.position({ x: newX, y: newY });
        lastMousePos = newPos;
        lastLine = null;

        // const [touch1X, touch1Y, touch2X, touch2Y] = [
        //   e.evt.touches[0].clientX,
        //   e.evt.touches[0].clientY,
        //   e.evt.touches[1].clientX,
        //   e.evt.touches[1].clientY,
        // ];

        // console.log(
        //   Math.sqrt((touch2X - touch1X) ** 2 + (touch2Y - touch1Y) ** 2)
        // );
      }
    });

    let lastLine;

    stage.on('pointerdown', (e) => {});

    stage.on('mousedown', (e) => {
      if (e.evt.button === 4) {
        // layer.getChildren().forEach((i) => i.hide());

        // history.at(-1).destroy();
        // history.pop();
        var dataURL = stage.toDataURL({
          pixelRatio: 3,
          x: -500,
          y: -500,
          width: 5000,
          height: 5000,
        });
        downloadURI(dataURL, 'stage.png');
        // console.log(stage.toJSON());
      }
      if (e.evt.button === 3) {
        optimize();
        // console.log(layer.getChildren().at(-1));
        // layer.getChildren().forEach((i) => i.show());
        // history.at(-1).destroy();
        // history.pop();
        // const json = stage.toJSON();
        // console.log(json);
      }
      if (e.evt.button === 0) {
        const pos = stage.getPointerPosition();

        pos.x = Math.round((pos.x - stage.x()) / stage.scaleX());
        pos.y = Math.round((pos.y - stage.y()) / stage.scaleY());

        lastLine = new Konva.Line({
          stroke: 'black',
          strokeWidth: 5,
          lineCap: 'round',
          lineJoin: 'round',

          // closed: true,
          // fill: 'red',

          hitStrokeWidth: 0,
          points: [pos.x, pos.y, pos.x, pos.y],
        });
        layer.add(lastLine);
      }
    });

    stage.on('touchstart', (e) => {
      if (e.evt.touches.length === 2) {
        layer.getChildren().at(-1)?.destroy();
        stage.off('pointermove', pointerMoveHandler);
      }
      lastMousePos = stage.getPointerPosition();
      if (e.evt.touches.length === 1) {
        const pos = stage.getPointerPosition();
        pos.x = (pos.x - stage.x()) / stage.scaleX();
        pos.y = (pos.y - stage.y()) / stage.scaleY();
        lastLine = new Konva.Line({
          stroke: 'black',
          strokeWidth: 2,
          lineCap: 'round',
          lineJoin: 'round',
          points: [pos.x, pos.y, pos.x, pos.y],
        });
        layer.add(lastLine);
        stage.on('pointermove', pointerMoveHandler);
      }
    });

    // stage.on('touchmove', (e) => {
    //   console.log('asd');
    //   e.evt.preventDefault();
    //   e.evt.stopPropagation();
    //   if (lastLine && e.evt.touches.length === 1) {
    //     const pos = stage.getPointerPosition();
    //     pos.x = Math.round((pos.x - stage.x()) / stage.scaleX());
    //     pos.y = Math.round((pos.y - stage.y()) / stage.scaleY());
    //     lastLine.points(lastLine.points().concat([pos.x, pos.y]));
    //     layer.add(lastLine);
    //   }
    // });

    stage.on('mousemove', (e) => {
      if (e.evt.buttons === 1 && lastLine) {
        const pos = stage.getPointerPosition();
        pos.x = Math.trunc(((pos.x - stage.x()) / stage.scaleX()) * 2e1) / 2e1;
        pos.y = Math.trunc(((pos.y - stage.y()) / stage.scaleY()) * 2e1) / 2e1;
        lastLine.points(lastLine.points().concat([pos.x, pos.y]));

        // lastLine.points().push(pos.x, pos.y);
        // stage.batchDraw();
      }
    });

    let zoomIntervalId = null;
    let scl = null;
    let position = null;

    stage.on('wheel', (e) => {
      if (zoomIntervalId) {
        clearInterval(zoomIntervalId);

        if (position && scl) {
          stage.scale({ x: scl, y: scl });
          stage.position(position);
        }

        zoomIntervalId = null;
      }

      e.evt.preventDefault();

      const oldScale = stage.scaleX();
      const pointerPosition = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerPosition.x - stage.x()) / oldScale,
        y: (pointerPosition.y - stage.y()) / oldScale,
      };

      // console.log(oldScale, pointerPosition, mousePointTo);
      let newScale =
        Math.round(
          (e.evt.deltaY < 0 ? oldScale * 1.15 : oldScale / 1.15) * 1e2
        ) / 1e2;

      if (newScale > 8) newScale = 8;
      if (newScale < 0.1) newScale = 0.1;
      if (!newScale) return;

      setZoom(Math.round(newScale * 100));
      scl = newScale;
      position = {
        x: pointerPosition.x - Math.round(mousePointTo.x * newScale),
        y: pointerPosition.y - Math.round(mousePointTo.y * newScale),
      };
      // stage.scale({ x: newScale, y: newScale });
      let i = 1;
      zoomIntervalId = setInterval(() => {
        if (i <= 1) {
          const offset = (newScale - oldScale) / 1;

          stage.scale({ x: oldScale + offset * i, y: oldScale + offset * i });
          const pos = {
            x:
              pointerPosition.x -
              Math.round(mousePointTo.x * (oldScale + offset * i)),
            y:
              pointerPosition.y -
              Math.round(mousePointTo.y * (oldScale + offset * i)),
          };
          stage.position(pos);
          i++;
        } else {
          clearInterval(zoomIntervalId);
          zoomIntervalId = null;
          updateView();
        }
      });
    });

    window.addEventListener('resize', () => {
      stage.setSize({ height: window.innerHeight, width: window.innerWidth });
    });
  }, []);

  const zoomInHandler = () => {
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: (window.innerWidth / 2 - stage.x()) / oldScale,
      y: (window.innerHeight / 2 - stage.y()) / oldScale,
    };

    let newScale = oldScale * 1.15;
    if (newScale > 8) newScale = 8;
    if (newScale < 0.1) newScale = 0.1;
    const pos = {
      x: window.innerWidth / 2 - Math.round(mousePointTo.x * newScale),
      y: window.innerHeight / 2 - Math.round(mousePointTo.y * newScale),
    };

    stage.scale({ x: newScale, y: newScale });
    setZoom(Math.round(newScale * 100));
    stage.position(pos);
  };

  const zoomOutHandler = () => {
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: (window.innerWidth / 2 - stage.x()) / oldScale,
      y: (window.innerHeight / 2 - stage.y()) / oldScale,
    };

    let newScale = oldScale / 1.15;
    if (newScale > 8) newScale = 8;
    if (newScale < 0.1) newScale = 0.1;

    const pos = {
      x: window.innerWidth / 2 - Math.round(mousePointTo.x * newScale),
      y: window.innerHeight / 2 - Math.round(mousePointTo.y * newScale),
    };

    stage.scale({ x: newScale, y: newScale });
    setZoom(Math.round(newScale * 100));
    stage.position(pos);
  };

  const zoomResetHandler = () => {
    stage.scale({ x: 1, y: 1 });
    setZoom(100);
  };

  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <div className='w-full h-full flex flex-col items-center'>
        <div id='board' className='w-full h-full bg-stone-100'></div>

        <div className='fixed left-0 bottom-0 w-auto h-12 flex-shrink-0 flex justify-center items-center bg-white rounded-md border-indigo-200 shadow-md shadow-slate-200 m-2 px-1 bg-opacity-70 backdrop-blur-sm'>
          <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
            <TbMenu2 className='text-slate-700 text-2xl' />
          </div>
          <div className='w-[1px] mx-2 h-6 bg-slate-300 rounded-lg'></div>
          <div
            onClick={zoomOutHandler}
            className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'
          >
            <TbZoomOut className='text-slate-700 text-2xl' />
          </div>
          <div
            onClick={zoomResetHandler}
            className='w-16 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'
          >
            <span className='text-slate-700 leading-none font-medium text-lg'>
              {zoom}%
            </span>
          </div>
          <div
            onClick={zoomInHandler}
            className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'
          >
            <TbZoomIn className='text-slate-700 text-2xl' />
          </div>
        </div>

        <div className='w-auto h-12 fixed bottom-0 bg-white rounded-md border-indigo-200 shadow-md shadow-slate-200 m-2 flex justify-center items-center bg-opacity-70 backdrop-blur-sm'>
          <div className='w-fit px-1 flex items-center'>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 hover:text-indigo-500 cursor-pointer'>
              <TbPointer className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 hover:text-indigo-500 cursor-pointer'>
              <TbBorderCorners className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer relative'>
              <TbPencil className='text-slate-700 text-2xl' />
              {isStrokeWidthSelectVisible ? (
                <div className='absolute w-8 h-32 bg-white rounded-t-md border-x-2 border-t-2 -top-32 border-stone-100 flex justify-center'>
                  <input
                    type='range'
                    orient='vertical'
                    className='my-2'
                    min='1'
                    max='11'
                    step='2'
                  />
                </div>
              ) : (
                // <div className='absolute w-8 h-5 bg-white rounded-t-md border-x-2 border-t-2 -top-5 border-stone-100 flex justify-center items-center hover:bg-stone-200'>
                //   <TbChevronUp className='text-slate-700 text-2xl' />
                // </div>
                <></>
              )}
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 hover:text-indigo-500 cursor-pointer'>
              <TbEraser className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 hover:text-indigo-500 cursor-pointer'>
              <TbColorPicker className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbCursorText className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbBucketDroplet className='text-slate-700 text-2xl' />
            </div>
            <div className='w-[1px] mx-2 h-6 bg-slate-300 rounded-lg'></div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbSquare className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbMath className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbMathFunction className='text-slate-700 text-2xl' />
            </div>
            <div className='w-[1px] mx-2 h-6 bg-slate-300 rounded-lg'></div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbApps className='text-slate-700 text-2xl' />
            </div>
            <div
              onClick={handle.enter}
              className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'
            >
              <TbSettings className='text-slate-700 text-2xl' />
            </div>
          </div>
        </div>
        <div className='fixed right-0 bottom-0 w-auto h-12 flex-shrink-0 flex justify-center items-center bg-white rounded-md border-indigo-200 shadow-md shadow-slate-200 m-2 bg-opacity-70 backdrop-blur-sm'>
          <div className='w-fit h-10 p-1 flex-shrink-0 flex items-center'>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbMicrophone className='text-slate-700 text-2xl' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 cursor-pointer'>
              <TbCamera className='text-slate-700 text-2xl' />
            </div>
            <div className='w-[1px] mx-2 h-6 bg-slate-300 rounded-lg'></div>
            <div className='w-10 h-10 flex items-center justify-center rounded-[3px] hover:bg-stone-100 lg:w-auto lg:px-2 cursor-pointer'>
              <TbPhoneOff className='text-red-400 text-2xl lg:mr-1' />
              <span className='text-red-400 leading-none font-medium hidden lg:inline select-none'>
                Завершить урок
              </span>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default Board;

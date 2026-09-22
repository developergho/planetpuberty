import React, { useState, useEffect } from "react";
import Iprivate from '../assets/images/private.svg'
import Ipublic from '../assets/images/public.svg'
import RoundImage from '../assets/images/illustration.png'
import Card from '../assets/images/character-card.png'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { isEmpty } from 'lodash';
import { Modal } from 'react-bootstrap'
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

const onDragEnd = (result, columns, setColumns, setStatus) => {
  const { source, destination, draggableId } = result;
  const dataDrag = columns.list1.items.filter(item => item.id === draggableId);
  if (!result.destination) return;
  const checkData = dataDrag[0].status_image;
  if(destination.droppableId !== 'list1' && destination.droppableId !== checkData) {
    return setStatus({
      type: 'error',
      content: ''
    });
  }
  if (source.droppableId !== destination.droppableId) {
    setStatus({
      type: 'correct',
      content: dataDrag[0]
    });
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    return setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  }
};

const ModalCorrect = (props) => {
  const {content, setStatus, playerName, columns, setModalShow, textButton} = props;
  const lastNextPlace = () => {
    if((isEmpty(columns?.list1?.items) && !isEmpty(columns?.private?.items)) || (isEmpty(columns?.list1?.items) && !isEmpty(columns?.public?.items))) {
      setModalShow(true);
    }
    setStatus({ type: 'normal', content: '' });
    
  }
  return (
    <div className="noti-correct">
      <div className="noti-correct__img" style={{ backgroundImage: `url(${Card})`}}>
        <img src={Card} alt="character card" />
      </div>
      <h4 className="title-block noti-correct__title">{content?.content?.correct_title_popup?.value || "Superb"} {playerName}!</h4>
      <p className="title-block noti-correct__subtitle">{content?.content?.detail_image}</p>
      <div className="noti-correct__content" dangerouslySetInnerHTML={{__html: content?.content?.description_for_popup_correct}} />
      <div className="block-action">
        <button onClick={() => lastNextPlace()} className="gho-btn-action gho-icon-btn gho-btn-action__correct">{textButton || "Next place"}</button>
      </div>
    </div>
  )
}

const checkContent = (columnId, column, status, setStatus, playerName, columns, setModalShow, checkHeight) => {
  
  function checkRotatePrivate(number) {
    if(number === 0) {
      return '-4deg';
    }
    return `${number * (-8) - 4}deg`;
  }

  function checkRotatePublic(number) {
    if(number === 0) {
      return '4deg';
    }
    return `${number * 8 + 4}deg`;
  }

  const checkCurrentTransformMatch = (dataX) => {
    if (dataX < 0) {
      return -dataX;
    }
    return dataX;
  }

  const checkScale = (scale) => {
    if (scale >= 1) {
      return 1;
    }
    return scale;
  }

  const checkRotate = (rotate) => {
    if (rotate === 1) {
      return '0deg';
    }
    if (rotate > 1) {
      return '4deg';
    }
    return '-4deg';
  }

  const switchTransitonY = (yTransform) => {
    if (checkHeight.ipadTabletMini) {
      return yTransform + 20;
    }
    if (checkHeight.ipadPro) {
      return yTransform + 80;
    }
    return yTransform;
  }

  const switchTransitonX = (xTransform) => {
    if(xTransform > 0) {
      return xTransform * 60 / 100;
    }
    return xTransform * 90 / 100;
  }

  const getStyle = (style, snapshot) => {
    let overrideStyles = {
      transition: "opacity 0.2s cubic-bezier(0.2, 0, 0, 1) 0s visibility 0.3s"
    };
    const currentTransformMatch = style && style?.transform &&
      style?.transform.match(/translate\((-?[.\d]+)px,\s+(-?[.\d]+)px\)/);
    if (currentTransformMatch) {
      const yTransform = parseInt(currentTransformMatch[2]);
      const xTransform = parseInt(currentTransformMatch[1]);
      overrideStyles.transform = `translate(${xTransform}px, ${yTransform}px) scale(${checkScale((style.width / parseInt(checkCurrentTransformMatch(xTransform)) + 2) / 10)}) rotate(${checkRotate(xTransform)}`;
      if(snapshot) {
        overrideStyles.transform = `translate(${switchTransitonX(xTransform)}px, ${switchTransitonY(yTransform)}px) scale(${checkScale((style.width / parseInt(checkCurrentTransformMatch(xTransform)) + 2) / 10)}) rotate(${checkRotate(xTransform)}`;
      }
    }
    return {
      ...style,
      ...overrideStyles
    };
  };

  if(columnId === 'private') {
    return (
      <div className="private-item">
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="box-result-item"
              >
                <div className="box-result-item__img" style={{backgroundImage: `url(${Iprivate})`}}>
                  <img src={Iprivate} alt="" />
                </div>
                {column.items.map((item, index) => {
                  const rotate = checkRotatePrivate(index);
                  return (
                    <div className="result-item" key={index} style={{
                      backgroundImage: `url(${item.detail_image_item.url})`,
                      transform: `rotate(${rotate})`,
                      zIndex: column.items.length - index,
                      bottom: index * 20 + 10,
                    }}>
                      <span>{item.detail_image}</span>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Droppable>
      </div>
    );
  }

  if(columnId === 'public') {
    return (
      <div className="public-item">
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="box-result-item"
              >
                <div className="box-result-item__img" style={{backgroundImage: `url(${Ipublic})`}}>
                  <img src={Ipublic} alt="" />
                </div>
                {column.items.map((item, index) => {
                  const rotate = checkRotatePublic(index);
                  return (
                    <div className="result-item" key={index} style={{
                      backgroundImage: `url(${item.detail_image_item.url})`,
                      transform: `rotate(${rotate})`,
                      zIndex: column.items.length - index,
                      bottom: index * 20 + 10,
                    }}>
                      <span>{item.detail_image}</span>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Droppable>
      </div>
    );
  }

  const checkEmpty = (dataItem) => {
    if(!isEmpty(dataItem)) {
      return dataItem.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            isDragDisabled={(status.type === 'error' || status.type === 'correct') ? true : false}
            draggableId={item.id}
            index={index}
          >
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={classNames("box-drag-default__item" , {
                    'box-drag-default__item--error': status.type === 'error',
                    'box-drag-default__item--correct': status.type === 'correct'
                  })}
                  style={getStyle(provided.draggableProps?.style, provided.draggableProps?.onTransitionEnd)}
                >
                  <div className="box-drag-default__img" style={{backgroundImage: `url(${item.detail_image_item.url})`}}>
                    <img src={item.detail_image_item.url} alt={item.detail_image_item.alt} />
                  </div>
                  <p className="box-drag-default__title">{item.detail_image}</p>
                  {
                    status.type === 'error' && (
                      <>
                        <p className="box-drag-default__note">{item.description_for_popup_incorrect}</p>
                        <div className="block-action">
                          <button onClick={() => setStatus({ type: 'normal', content: {} })} className="gho-btn-action gho-icon-btn gho-btn-action__tryagain">Try again</button>
                        </div>
                      </>
                    )
                  }
                  {
                    status.type === 'correct' && (
                      <ModalCorrect
                        content={status}
                        setStatus={setStatus}
                        playerName={playerName}
                        columns={columns}
                        setModalShow={setModalShow}
                      />
                    )
                  }
                </div>
              );
            }}
          </Draggable>
        );
      });
    }
    return (
      <div
        className={classNames("box-drag-default__item" , {
          'box-drag-default__item--error': status.type === 'error',
          'box-drag-default__item--correct': status.type === 'correct'
        })}
      >
        {
          status.type === 'correct' && (
            <ModalCorrect
              content={status}
              setStatus={setStatus}
              playerName={playerName}
              columns={columns}
              setModalShow={setModalShow}
              textButton="Done"
            />
          )
        }
      </div>
    )
  }
  
  return (
    <div style={{ margin: 8 }}>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          const checkOpacity = () => {
            if (column.items.length === 1 && snapshot.draggingFromThisWith) {
              return true;
            }
            return false;
          }
          return (
            <>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="box-drag-default"
                className={classNames("box-drag-default" , {
                  'opacity-check': checkOpacity() === true,
                })}
              >
                { checkEmpty(column.items) }
              </div>
            </>
          );
        }}
      </Droppable>
    </div>
  )
}

function DragItem(props) {
  let navigate = useNavigate();
  const { handleSetPage, currentPage, columns, setColumns } = props;
  const [status, setStatus] = useState({
    type: 'normal',
    content: {}
  });
  const [modalShow, setModalShow] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const ModalContent = (props) => {
    const handleExit = () => {
      localStorage.removeItem('playerName');
      setPlayerName('')
      setModalShow(false);
      navigate("/");
    }
    const handleNextRound = () => {
      setModalShow(false);
      handleSetPage(currentPage + 1);
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        keyboard={false}
        className="custom-modal-center"
      >
        <Modal.Body className="text-center">
          <h4 className="title-block title-block__black title-block__full">You have completed</h4>
          <div className="modal-content__media">
            <img src={RoundImage} alt="" />
          </div>
          <p className="modal-content__description">
            {props?.playerName}, great job! In the next round we will look at what is OK to do in different places.
          </p>
          <div className="block-action">
            <button onClick={() => handleExit()} className="gho-btn-action gho-btn-action__exit gho-icon-btn gho-icon-btn__exit f-20">Exit</button>
            <button onClick={() => handleNextRound()} className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right f-20">Play next round</button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  const ipadPro = useMediaQuery({ minHeight: 600 })
  const ipadTabletMini = useMediaQuery({ minHeight: 350 })
  const checkHeight = {
    ipadPro,
    ipadTabletMini
  }

  useEffect(() => {
    const playerName = localStorage.getItem('playerName') || '';
    setPlayerName(playerName);
  }, [currentPage]);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns, setStatus)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              key={columnId}
            >
              {checkContent(columnId, column, status, setStatus, playerName, columns, setModalShow, checkHeight)}
            </div>
          );
        })}
      </DragDropContext>
      <ModalContent
        show={modalShow}
        onHide={() => setModalShow(false)}
        playerName={playerName}
      />
      {modalShow && (
        <img
          className="pointer-events-none absolute custom-position-mobile top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
          src="/game-orbit/common/firework.gif"
          alt=""
        />
      )}
    </div>
  );
}

export default DragItem;

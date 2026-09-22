import React, { useState, useEffect } from "react";
import Card from '../assets/images/character-card.png'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { isEmpty } from 'lodash';
import { Modal } from 'react-bootstrap'
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";

const onDragEnd = async (result, columns, setColumns, setStatus, index, columnsAll) => {
  const { source, destination } = result;
  if (!result.destination) return;
  const checkData = columns.list1.items.set_position_correct_value;
  if(destination.droppableId !== 'list1' && destination.droppableId !== checkData) {
    return setStatus({
      type: 'error',
      content: ''
    });
  }
  if (source.droppableId !== destination.droppableId) {
    setStatus({
      type: 'correct',
      content: columns?.[source.droppableId]?.items
    });
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    columnsAll[index - 1] = await {
      ...columnsAll[index - 1],
      [source.droppableId]: {
        ...sourceColumn,
        items: {}
      },
      [destination.droppableId]: {
        ...destColumn,
        items: columns?.[source.droppableId]?.items
      }
    }
    setColumns(columnsAll);
  }
};

function ModalCorrect(props) {
  const {content, setStatus, playerName, setCountActive, countActive, columns, handleSetPage } = props;
  const nextPlace = () => {
    setStatus({ type: 'normal', content: '' });
    setCountActive(countActive+1);
  }
  return (
    <div className="noti-correct">
      <div className="noti-correct__img" style={{backgroundImage: `url(${Card})`}}>
        <img src={Card} alt="character card" />
      </div>
      <h4 className="title-block noti-correct__title">{content?.correct_title_popup_round_2?.value || "Superb"} {playerName}!</h4>
      <p className="title-block noti-correct__subtitle">{content?.detail_image}</p>
      <div className="noti-correct__content" dangerouslySetInnerHTML={{__html: content?.description_for_popup_correct}} />
      <div className="block-action">
        <button onClick={() => nextPlace()} className="gho-btn-action gho-icon-btn gho-btn-action__correct">{(columns.length - 1) !== countActive ? "Next" : "Done"}</button>
      </div>
    </div>
  )
}

const checkContent = (columnId, column, status, setStatus, playerName, setCountActive, countActive, columns, handleSetPage) => {
  const sticky = status.content;

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

  const checkCurrentTransformMatch = (dataX) => {
    if (dataX < 0) {
      return -dataX;
    }
    return dataX;
  }
  
  const getStyle = (style, snapshot) => {
    const overrideStyles = {
      transition: "opacity 0.2s cubic-bezier(0.2, 0, 0, 1) 0s visibility 0.3s"
    };
    const currentTransformMatch = style && style.transform &&
      style?.transform.match(/translate\((-?[.\d]+)px,\s+(-?[.\d]+)px\)/);
    if (currentTransformMatch) {
      const yTransform = parseInt(currentTransformMatch[2]);
      const xTransform = parseInt(currentTransformMatch[1]);
      overrideStyles.transform = `translate(${xTransform}px, ${yTransform}px) scale(${checkScale((style.width / parseInt(checkCurrentTransformMatch(xTransform)) + 2) / 10)}) rotate(${checkRotate(xTransform)}`;
      if(snapshot) {
        overrideStyles.transform = `translate(${xTransform - 180}px, ${yTransform - 180}px) scale(${checkScale((style.width / parseInt(checkCurrentTransformMatch(xTransform)) + 2) / 10)}) rotate(${checkRotate(xTransform)}`;
      }
    }
    return {
      ...style,
      ...overrideStyles
    };
  };

  if(columnId === 'left') {
    return (
      <div className="private-item private-item-v2">
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="box-result-item"
              >
                <div className="box-result-item__img" style={{ backgroundImage: `url(${column?.dataDrag?.image_false_value?.url || column?.dataDrag?.image_true_value?.url})` }}>
                  <img src={column?.dataDrag?.image_false_value?.url || column?.dataDrag?.image_true_value?.url} alt="" />
                </div>
                <h4 className="result-item-title">{column?.dataDrag?.title_false_value || column?.dataDrag?.title_true_value}</h4>
                {sticky && !isEmpty(sticky) && sticky.set_position_correct_value === 'left' && (
                    <div className="result-item result-item-v2" key={sticky.id} style={{
                      backgroundImage: `url(${sticky?.detail_image_item?.url})`,
                    }}>
                      <span>{sticky?.detail_image}</span>
                    </div>
                )}
              </div>
            );
          }}
        </Droppable>
      </div>
    );
  }
  if(columnId === 'right') {
    return (
      <div className="public-item public-item-v2">
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="box-result-item"
              >
                <div className="box-result-item__img" style={{ backgroundImage: `url(${column?.dataDrag?.image_true_value?.url || column?.dataDrag?.image_false_value?.url})` }}>
                  <img src={column?.dataDrag?.image_true_value?.url || column?.dataDrag?.image_false_value?.url} alt="" />
                </div>
                <h4 className="result-item-title">{column?.dataDrag?.title_true_value || column?.dataDrag?.title_false_value}</h4>
                {sticky && !isEmpty(sticky) && sticky.set_position_correct_value === 'right' && (
                    <div className="result-item result-item-v2" key={sticky.id} style={{
                      backgroundImage: `url(${sticky?.detail_image_item?.url})`,
                    }}>
                      <span>{sticky?.detail_image}</span>
                    </div>
                )}
              </div>
            );
          }}
        </Droppable>
      </div>
    );
  }
  return (
    <div style={{ margin: 8 }}>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          const item = column.items;
          const keyId = snapshot.draggingFromThisWith?.split('-')[1] ? parseInt(snapshot.draggingFromThisWith?.split('-')[1]) : null ;
          const nextItem = columns[keyId + 1]?.list1?.items;
          return (
            <>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classNames("box-drag-default" , {
                  'opacity-check': !nextItem,
                })}
              >
                <Draggable
                  key={item.id}
                  isDragDisabled={(status.type === 'error' || status.type === 'correct') ? true : false}
                  isUsingPlaceholder={false}
                  draggableId={item.id}
                  index={countActive}
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
                              <div className="box-drag-default__note" dangerouslySetInnerHTML={{__html: item.description_for_popup_incorrect}}></div>
                              <div className="block-action">
                                <button onClick={() => setStatus({ type: 'normal', content: {} })} className="gho-btn-action gho-icon-btn gho-btn-action__tryagain">Try again</button>
                              </div>
                            </>
                          )
                        }
                        {
                          status.type === 'correct' && (
                            <ModalCorrect
                              content={sticky}
                              setStatus={setStatus}
                              playerName={playerName}
                              setCountActive={setCountActive}
                              countActive={countActive}
                              columns={columns}
                              handleSetPage={handleSetPage}
                            />
                          )
                        }
                      </div>
                    );
                  }}
                </Draggable>
                {
                  nextItem && (
                    <div
                      className={classNames("box-drag-default__item opacity-check" , {
                        'non-opacity-check': nextItem !== null
                      })}
                    >
                      <div className="box-drag-default__img" style={{backgroundImage: `url(${nextItem?.detail_image_item?.url})`}}>
                        <img src={nextItem?.detail_image_item?.url} alt={nextItem?.detail_image_item?.alt} />
                      </div>
                      <p className="box-drag-default__title">{nextItem?.detail_image}</p>
                    </div>
                  )
                }
              </div>
            </>
          );
        }}
      </Droppable>
    </div>
  )
}

function DragItemV2(props) {

  let navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [countActive, setCountActive] = useState(0);
  const [status, setStatus] = useState({
    type: 'normal',
    content: {}
  });
  const [modalShow, setModalShow] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const { handleSetPage, currentPage, desGameOver, dataGameOther, setActive } = props;

  const ModalContent = (props) => {
    const handleExit = () => {
      localStorage.removeItem('playerName');
      setPlayerName('')
      setModalShow(false);
      navigate("/");
    }
    const handleNextRound = () => {
      setModalShow(false);
      setActive(0);
      handleSetPage(1);
    }

    const redirectUrl = (link) => {
      window.location = link;
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
          <h4 className="title-block title-block__black title-block__full">You did it {props?.playerName}!</h4>
          <p className="modal-content__description modal-content__description--v2">
            {desGameOver}
          </p>
          {!isEmpty(dataGameOther) && (
            <div className="modal-content__list">
              {
                dataGameOther.map((item, index) => (
                  <div key={index} className="modal-content__list--item">
                    <div className="modal-content__media">
                      <div className="cursor-pointer" onClick={() => redirectUrl(item?.link_item_play_game)}>
                        <img src={item?.image_item_play_game?.url} alt={item?.image_item_play_game?.title} />
                      </div>
                      <h4>
                        {item?.title_item_play_game}
                      </h4>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
          <div className="block-action">
            <button onClick={() => handleExit()} className="gho-btn-action gho-btn-action__exit gho-icon-btn gho-icon-btn__exit f-20">Exit</button>
            <button onClick={() => handleNextRound()} className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right f-20">Play again</button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    function convertData(data, index) {
      return {
        ...data,
        id: `img-${index}`
      }
    }

    let newColumns = [];
    if(props?.data) {
      props?.data?.map((item, index) => {
        let itemColumn = {};
        if (item.set_position_correct_value === 'right') {
          itemColumn = {
            list1: {
              name: "List img",
              items: convertData(item, index)
            },
            right: {
              name: "Public",
              items: [],
              dataDrag: item.set_correct_value[0]
            },
            left: {
              name: "Private",
              items: [],
              dataDrag: item.set_incorrect_value[0]
            }
          };
        } else {
          itemColumn = {
            list1: {
              name: "List img",
              items: convertData(item, index)
            },
            left: {
              name: "Public",
              items: [],
              dataDrag: item.set_correct_value[0]
            },
            right: {
              name: "Private",
              items: [],
              dataDrag: item.set_incorrect_value[0]
            }
          };
        }
        return newColumns = [
          ...newColumns,
          itemColumn
        ]
      })
    }
    setColumns(newColumns);
    
  }, [props]);

  useEffect(() => {
    const playerName = localStorage.getItem('playerName') || '';
    setPlayerName(playerName);
  }, [currentPage]);

  useEffect(() => {
    if(countActive === columns.length && !isEmpty(columns)) {
      setModalShow(true);
    }
  }, [countActive]);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      {!isEmpty(columns) && columns.map((itemColumn, index) => {
        if(index === countActive) {
          return (
            <DragDropContext
              onDragEnd={result => onDragEnd(result, itemColumn, setColumns, setStatus, index, columns)}
              key={index}
            >
              {Object.entries(columns[countActive]).map(([columnId, column], index) => {
                return (
                  <div
                    key={columnId}
                  >
                    {checkContent(columnId, column, status, setStatus, playerName, setCountActive, countActive, columns, handleSetPage)}
                  </div>
                );
              })}
            </DragDropContext>
          )
        }
      })}
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

export default DragItemV2;

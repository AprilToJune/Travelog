/* eslint-disable */
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
`;

const FileInput = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
`;

const PreviewImageContainer = styled.div`
  width: 83vw;
  /* overflow: scroll; */
  /* overflow-y: hidden; */
  display: flex;
  row-gap: 1vw;
`;

const Error = styled.div`
  color: #fc1111;
`;

const ImageUploadButton = () => {
  const {
    images,
    previewURL,
    onChangeFileInput,
    error,
    setImages,
    setPreviewURL,
  } = useUploadContext();

  const onEndDrag = (result) => {
    if (!result.destination) return;

    const tempImages = [...images];
    const tempPreview = [...previewURL];

    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;
    const removedImages = tempImages.splice(draggingItemIndex, 1);
    const removedPreviewURL = tempPreview.splice(draggingItemIndex, 1);

    tempImages.splice(afterDragItemIndex, 0, removedImages[0]);
    tempPreview.splice(afterDragItemIndex, 0, removedPreviewURL[0]);

    console.log(tempImages);

    setImages([...tempImages]);
    setPreviewURL([...tempPreview]);
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onEndDrag}>
        <Droppable droppableId="droppableImages" direction="horizontal">
          {(provided) => {
            let portal = document.createElement('div');
            document.body.appendChild(portal);
            return (
              <PreviewImageContainer
                className="droppableImages"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {previewURL.map((previewItem, idx) => {
                  return (
                    <Draggable
                      key={previewItem.id}
                      draggableId={`dragbleImage_${previewItem.id}`}
                      index={idx}
                    >
                      {(provided, snapshot) => {
                        let result = (
                          <PreviewImage
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            src={previewItem.url}
                            alt="preview_image"
                          />
                        );

                        if (snapshot.isDragging) {
                          return ReactDOM.createPortal(result, portal);
                        }
                        return result;
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </PreviewImageContainer>
            );
          }}
        </Droppable>
      </DragDropContext>
      <FileInput
        accept="image/jpg,image/png,image/jpeg,image/gif"
        multiple
        type="file"
        onChange={onChangeFileInput}
      />
      <Error>{error ? error : ''}</Error>
    </Container>
  );
};

export default ImageUploadButton;

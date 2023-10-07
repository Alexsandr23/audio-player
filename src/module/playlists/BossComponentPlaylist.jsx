import React from "react";
import {useEffect, useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, useDroppable
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, rectSortingStrategy, SortableContext, useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {arrayMoveImmutable} from 'array-move';
import "../../App.css"
import TracksCard from "../../components/tracks/TracksCard";
import MyInput from "../../ui/input/MyInput"
import MyButton from "../../ui/button/MyButton";
import { Basic } from "../Dropzone/Basic";



const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    //width: 110,
    //height: 30,
    //display: "flex",
    //alignItems: "center",
    //paddingLeft: 5,
    //border: "1px solid gray",
    //borderRadius: 5,
    //marginBottom: 5,
    //userSelect: "none",
    cursor: "grab",
    //boxSizing: "border-box"
  };
    
    const Render = props.render

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      <Render {...{[props.itemProp]:props.item}}/>
    </div>
  );
};


const Droppable = ({ id, items, itemProp, keyField, render }) => {
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = {
    //padding: "20px 10px",
    //border: "1px solid black",
    //borderRadius: "5px",
    //minWidth: 110
  };

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        {items.map((item) => (
          <SortableItem render={render} key={item[keyField]} id={item} 
                        itemProp={itemProp} item={item}/>
        ))}
    </SortableContext>
  );
};


function Dnd({items:startItems, render, itemProp, keyField, onChange, horizontal}) {
    const [items, setItems] = useState(startItems)

    useEffect(() => setItems(startItems), [startItems])

    useEffect(() => {
        if (typeof onChange === 'function'){
            onChange(items)
        }
    }, [items])

    const sensors = useSensors(
        useSensor(PointerSensor,  { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = ({ active, over }) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;

        setItems((items) => {
            return arrayMoveImmutable( items, activeIndex, overIndex)
        });
    }

    const containerStyle = { display: horizontal ? "flex" : '' };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div style={containerStyle}>
          <Droppable id="aaa" 
                     items={items} 
                     itemProp={itemProp} 
                     keyField={keyField} 
                     render={render}/>
      </div>
    </DndContext>
  );
}

// const getRandomItemFromArr = arr => arr[Math.floor(Math.random() * arr.length)]

const TrackFromPlaylist = ({track, onDelete}) => <TracksCard key={track._id} track={track} onClick={() => onDelete(track)}></TracksCard>
{/* <img src={track.url} key={track._id} onClick={() => onDelete(track)}/> */}

const EditPlaylist = ({onSave, initialPlaylist}) => { 
    const [playlist, setplaylist] = useState(initialPlaylist || {name: "", description: "", tracks: []})
    const [uploadResult, setUploadResult] = useState([])

    const getuploadResult = (result) => {
        setUploadResult((prevResults) => [...prevResults, result])
        addTrackToState()
    }
    console.log(uploadResult)

    const addTrackToState = () => setplaylist({...playlist, 
                                          tracks: [...playlist.tracks, ...uploadResult]})
    const deletetrack = track => setplaylist({...playlist, tracks: playlist.tracks.filter(i => i !== track)})

    const localplaylisttrack  = ({track}) => <TrackFromPlaylist track={track} 
                                                   onDelete={trackToDelete => deletetrack(trackToDelete)}/>
    console.log(playlist)
    return (
        <div>
            <div>
                <p>Назва плейліста: {playlist.name}</p>
                <MyInput type='text' value={playlist.name} placeholder="Зміти назву"
                        onChange = {e => setplaylist({...playlist, name: e.target.value})}/>
                <p>Опис: {playlist.description}</p>
                <MyInput type='text' value={playlist.description || ""} placeholder="Змити опис"
                        onChange = {e => setplaylist({...playlist, description: e.target.value})}/> 
            </div>
            <div>
                <Basic texInsideBlock={"Додати треки"} uploadResult={getuploadResult}></Basic>
                <MyButton onClick={addTrackToState}>+</MyButton>
            </div>

            <div>
                <Dnd items={playlist.tracks} render={localplaylisttrack} itemProp="track" keyField="_id"
                     onChange={tracks => setplaylist({...playlist, tracks})} 
                    />
                
            </div>
            <MyButton onClick = {() => onSave(playlist)}>Save</MyButton>
        </div>
    )
}

// const data = [{name: 'aaa', _id: 'a1'},{name: 'bbb', _id: 'b2'}, {name: 'ccc', _id: 'c3'},
//               {name: 'ddd', _id: 'd4'},
//               {name: 'eee', _id: 'e4'}
//              ]


// const Item = ({track:{id3}}) => <TracksCard track={id3}></TracksCard>

// const Item = ({item:{name}}) =>
// <div style={{backgroundColor: 'green', fontSize: '2em', padding: '20px', borderRadius: '20px', margin: '10px'}}>
//     {name}
// </div>

const BossComponentPlaylist = ({initialPlaylist}) => {
    
    return (
        <div >
            <EditPlaylist onSave={playlist => console.log(playlist)} initialPlaylist={initialPlaylist} />
            {/* <Dnd items={data.PlaylistFindOne.tracks} render={Item} itemProp="track" keyField="_id"
                 onChange={newArray => console.log('new array', newArray)} 
                /> */}
        </div>

    )
}

export default BossComponentPlaylist
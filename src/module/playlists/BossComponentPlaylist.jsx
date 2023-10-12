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
import SearchContainer from "../../components/searchDiv/SearchContainer";
import { useDeletePlaylistMutation, useSearchTrackQuery } from "../../storeCreate/api";
import {history} from "../../App"
import "../../App.css"
import { useDispatch } from 'react-redux';
import { addAndPlayTrack } from "../../storeCreate/playerThunk";
import {useUpsertPlaylistMutation} from "../../storeCreate/api"



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
    cursor: "grab",
   
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
  console.log(setNodeRef)

  // const droppableStyle = {
  //   //padding: "20px 10px",
  //   //border: "1px solid black",
  //   //borderRadius: "5px",
  //   //minWidth: 110
  // };

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
     // eslint-disable-next-line 
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

const TrackFromPlaylist = ({track, onDelete}) => {
    const dispatch = useDispatch()
    const playTrack = (track) => {
        dispatch(addAndPlayTrack(track))
    }
    return (
        <TracksCard key={track._id} track={track} clickDelete={() => {onDelete(track)}} playTrack={playTrack}></TracksCard>
    )
} 
const EditPlaylist = ({onSave, initialPlaylist}) => { 
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchTracks, setSearchTracks] = useState([])
    const { isLoading, refetch } = useSearchTrackQuery({ title: searchQuery },{skip: !searchQuery})
    const [deletePlaylist, {isLoading: loadingDelete}] = useDeletePlaylistMutation()
    console.log( loadingDelete)

    const goBackPlaylist = () => history.push(`/`)

    useEffect(() => {
        if (searchQuery) {
            refetch({ title: searchQuery }).then(result => {
                if (result.data) {
                    const newSearchResults = result.data.TrackFind
                    console.log(newSearchResults)
                    setSearchTracks(newSearchResults)
                }
          })
        }
      }, [searchQuery, refetch, isLoading, searchTracks])

    const searchTrack = (nameTrack) => {
        console.log(nameTrack)
        setSearchQuery(nameTrack)
    }
    const playTrack = (track) => {
        dispatch(addAndPlayTrack(track))
    }

    const [playlist, setplaylist] = useState(initialPlaylist || {name: "", description: "", tracks: []})

    const getuploadResult = (result) => {
        setplaylist((prevPlaylist) => ({
          ...prevPlaylist,
          tracks: [...prevPlaylist.tracks, result]
        }));
      }
  
    const deletetrack = track => {
      console.log("Удаляю трек:", track)
      setplaylist({...playlist, tracks: playlist.tracks.filter(i => i !== track)})}

    const localplaylisttrack  = ({track}) => <TrackFromPlaylist track={track} 
                                                   onDelete={trackToDelete => deletetrack(trackToDelete)}/>
    return (
        <>
            <h3>Редагування плейліста</h3>
            <div style={{display: "flex", gap: "10px", padding: "10px"}}>
                <div style={{flex: "1"}}>
                    <p>Назва плейліста:</p>
                    <MyInput type='text' value={playlist.name} placeholder="Додати назву"
                                onChange = {e => setplaylist({...playlist, name: e.target.value})}/>
                </div>
                <div style={{flex: "2"}}>
                    <p>Опис:</p>
                    <textarea rows="5" cols="50" value={playlist.description || ""} placeholder="Додати опис"
                            onChange = {e => setplaylist({...playlist, description: e.target.value})}></textarea>
                </div>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
                <div style={{flex: "1"}}>
                    <div>
                        <Basic texInsideBlock={"Завантажити треки"} uploadResult={getuploadResult}></Basic>
                    </div>
                    <div className="bgElement scrolStyle" style={{ height: "293px", padding: "20px", margin: "15px 0 0 0 "}}>
                        <div>
                            <SearchContainer onSearch={searchTrack}></SearchContainer>
                        </div>
                        <div>
                            {searchTracks ?
                                searchTracks.map( track => (
                                    <TracksCard key={track._id} track={track} showBtn={true} playTrack={playTrack} addTrackInPlaylist={getuploadResult}></TracksCard>
                                )) : null 
                            }
                        </div>
                    </div>
                </div>
                <div className="bgElement scrolStyle" style={{flex: "1", height: "450px", padding: "20px"}}>
                    <Dnd items={playlist.tracks} render={localplaylisttrack} itemProp="track" keyField="_id"
                        onChange={tracks => setplaylist({...playlist, tracks})} 
                        />
                    
                </div>
            </div>
            <MyButton onClick = {() => {
                onSave(playlist)
                goBackPlaylist()                    
              }}>Зберегти редагування</MyButton>
            <MyButton onClick={() => deletePlaylist({playlistId: playlist._id})}>Видалити плейліст</MyButton>
        </>
    )
}


const BossComponentPlaylist = ({initialPlaylist}) => {
    const [upsertPlaylist, {isLoading, isError}] = useUpsertPlaylistMutation()
    console.log(isLoading, isError)
    return (
        <div >
            <EditPlaylist onSave={playlist => {
                upsertPlaylist({playlistId: playlist._id, namePls: playlist.name, descriptionPls: playlist.description, tracksId: playlist.tracks.map(track => ({_id: track._id }))})
            } } initialPlaylist={initialPlaylist} />

        </div>

    )
}

export default BossComponentPlaylist
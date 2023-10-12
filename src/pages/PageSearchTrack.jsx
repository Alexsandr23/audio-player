import React, {useEffect, useState}from "react";
import "../App.css"
import TracksCard from "../components/tracks/TracksCard";
import { useDispatch } from 'react-redux';
import { addAndPlayTrack } from "../storeCreate/playerThunk";
import Spiner from "../ui/Spiner";

const PageSearchTrack = ({results, loading}) => {
    const [res, setRes] = useState()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const playTrack = (track) => {
        dispatch(addAndPlayTrack(track))
    }
    useEffect(() => {
        
        if (results && results.length > 0) {
            setRes(results)
        }
        setIsLoading(loading)
    }, [results, loading]);
    return (
        <div className="stylePage">
            <h3>Результат пошуку</h3>
            <div>
                {isLoading ? 
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Spiner></Spiner>
                    </div> :
                    <div>
                        {(res && res.length > 0) ? 
                            res.map( track =>(
                            <TracksCard key={track._id} track={track} playTrack={playTrack} ></TracksCard>
                            )) :
                        <p>Треки не знайдено </p>}
                    </div>}

            </div>

        </div>
    )
}

export default PageSearchTrack
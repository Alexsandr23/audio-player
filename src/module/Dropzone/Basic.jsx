import React from 'react';
import {useDropzone} from 'react-dropzone';
import './dropzone.css'
import {uploadFile} from "../../storeCreate/helpers/uploadFile"
import { useSelector, useDispatch } from "react-redux"
import { useSetAvatarMutation} from '../../storeCreate/api';
import { actionAboutMe } from "../../storeCreate/helpers/actionAboutMe"
import { actionGetTrackId } from '../../storeCreate/helpers/actionGetTrackId';

export function Basic({texInsideBlock, uploadResult}) {
    const stateAuth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [avatarMutation, {isLoading, data}]  = useSetAvatarMutation()
    console.log(isLoading,data)

    
    const { getRootProps, getInputProps} = useDropzone({
        onDrop: async (acceptedFiles) => {
            for( const file of acceptedFiles) {
                if (file.type.startsWith("image/")){
                    try {
                        const result = await uploadFile('photo', file, 'upload', stateAuth.token)
                        if (result) {
                            const newImg = await avatarMutation({idUser: stateAuth.payload.sub.id, idImg: result._id})
                            if (newImg) {
                            dispatch(actionAboutMe())  
                            }
                        
                        }
                        
                    } catch (error) {
                        console.error(error);
                    }
                } else if (file.type.startsWith("audio/")) {
                    try {
                        const res = await uploadFile('track', file, 'track', stateAuth.token)
                            if (res) {
                                const trackSearch = await dispatch(actionGetTrackId(res._id))
                                if (trackSearch) {
                                    uploadResult(trackSearch)
                                }
                                
                            }
                        
                        
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    console.log(`Тип файла ${file.type}`)
                }
            }   
        },
        accept: 'image/*, audio/*',
    })

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>{texInsideBlock}</p>
            </div>
        </section>
    )
}

<Basic />
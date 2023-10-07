import React from 'react';
import {useDropzone} from 'react-dropzone';
import './dropzone.css'
import {uploadFile} from "../../storeCreate/helpers/uploadFile"
import { useSelector, useDispatch } from "react-redux"
import { useSetAvatarMutation, useGetTrackIdQuery} from '../../storeCreate/api';
import { actionAboutMe } from "../../storeCreate/helpers/actionAboutMe"

export function Basic({texInsideBlock, uploadResult}) {
    const stateAuth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [avatarMutation, {isLoading, data}]  = useSetAvatarMutation()

    
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        onDrop: async (acceptedFiles) => {
            for( const file of acceptedFiles) {
                if (file.type.startsWith("image/")){
                    try {
                        const result = await uploadFile('photo', file, 'upload', stateAuth.token)
                        if (result) {
                        await avatarMutation({idUser: stateAuth.payload.sub.id, idImg: result._id})
                        dispatch(actionAboutMe())
                        }
                        
                    } catch (error) {
                        console.error(error);
                    }
                } else if (file.type.startsWith("audio/")) {
                    try {
                        const res = await uploadFile('track', file, 'track', stateAuth.token)
                        console.log(res)
                            if (res) {
                              
                            }
                        await uploadResult(res)
                        
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
    const files = acceptedFiles.map(file => (
        <div key={file.path}>
          {file.path}
        </div>
      ))
    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>{texInsideBlock}</p>
            </div>
            <div>
                <div>{files}</div>
            </div>
        </section>
    )
}

<Basic />
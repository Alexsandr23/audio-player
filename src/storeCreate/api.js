
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { backendUrl } from './playerSlice'

export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: `${backendUrl}graphql`,
        prepareHeaders(headers, {getState}){
            const { token } = getState().auth
            if (token){ 
                headers.set('Authorization', "Bearer " + token) 
            }
            return headers
        }
    }), 
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({login, password}) => ({
                document: `
                    query login($login: String!, $password: String!) {
                        login(login: $login, password: $password) 
                    }
                    `,
                variables: {login, password}})
        }),
        registration: builder.mutation({
            query: ({login, password}) => ({
                document: `
                    mutation registration ($login: String!, $password: String!) {
                        createUser(login: $login, password: $password){
                        _id
                        login
                        } 
                    }
                    `,
                variables: {login, password}})
        }),
        getUserById: builder.query({
            query: ({_id}) => ({ 
                document: 
                `query oneUser($query: String){
                    UserFindOne(query: $query){
                        _id login nick avatar{ url }
                    }
                }`,
                variables: {query: JSON.stringify([{_id}])}
            }),
            providesTags: (result, error, {_id}) => { 
                return ([{ type: 'User', id: _id}])
            }
        }),
        passwordChange: builder.mutation({
            mutation: ({login, password, newPassord}) => ({
                document: `
                    mutation passwordChange ($login: String!, $password: String!, $newPassword: String!) {
                        changePassword(login:$login, password:$password, newPassword: $newPassword){
                        _id
                        login
                        } 
                    }
                `,
                variables: {login, password, newPassord}})
        }),
        setUserNick: builder.mutation({
            query: ({_id, nick}) => ({
                document: `
                    mutation setNick($_id:String, $nick:String) {
                        UserUpsert(user: {_id: $_id, nick: $nick}){
                            _id nick
                        }
                    }
                    `,
                variables: {_id, nick}}),
            invalidatesTags: (result, error, arg) => ([{type: 'User', id: arg._id}]) 
        }),
        setAvatar: builder.mutation({
            query: ({idUser, idImg}) => ({
                document: `
                    mutation setAvatar ($idUser: String!, $idImg: ID!) {
                        UserUpsert(user:{_id: $idUser, avatar: {_id: $idImg}}){
                            _id, avatar{
                                _id
                                url
                            }
                        }
                    }
                    `,
                variables: {idUser, idImg}})
        }),
        getTracks: builder.query ({
            query:() => ({
                document: `
                    query trackFull {
                        TrackFind (query:"[{}]"){
                        _id url 
                        id3 {
                            title
                            artist
                            album
                            }
                        }
                    }
                    `
            })
        }),
        getTrackId: builder.query ({
            query:({id}) => ({
                document: `
                query trackOneId ($idTrack: String) {
                    TrackFindOne (query: $idTrack){
                      _id url 
                      id3 {
                        title
                        artist
                        album
                        }
                    }
                  }
                `,
                variables: {id: JSON.stringify([{id}])}})
        }), 
        getPlaylists: builder.query ({
            query:() => ({
                document: `
                    query plsFull {
                        PlaylistFind (query: "[{}]") {
                        _id name description tracks {
                            _id
                            url
                            id3 {title artist album}
                        }
                        }
                    }
                    `
            })
        }), 
        getPlaylistId: builder.query ({
            query:({_id}) => ({
                document: `
                    query plsOne ($_id: String) {
                        PlaylistFindOne (query: $_id){
                        _id name description tracks {
                            _id
                            url
                            id3 {title artist album}
                        }
                        }
                    }
                    `,
                    variables: {_id: JSON.stringify([{_id}])}})
        }),
        upsertPlaylist: builder.mutation({
            query: ({playlistId, namePls, descriptionPls, trackIds}) => ({
                document: `
                            mutation UpsertPlaylist(
                                $playlistId: ID
                                $namePls: String!
                                $descriptionPls: String!
                                $trackIds: [TrackInput]
                            ) {
                                PlaylistUpsert(playlist: {
                                _id: $playlistId
                                name: $namePls
                                description: $descriptionPls
                                tracks: $trackIds
                                }) {
                                _id
                                }
                            }
                        `,
                        variables: {playlistId, namePls, descriptionPls, trackIds}})
        }),
        
    })
})

export const {
    useLoginMutation,
    useGetTracksQuery,
    useGetTrackIdQuery,
    useLazyGetTracksQuery,
    usePasswordChangeMutation,
    usePrefetch,
    useGetUserByIdQuery,
    useGetPlaylistsQuery,
    useRegistrationMutation,
    useSetUserNickMutation,
    useSetAvatarMutation,
    useGetPlaylistIdQuery,
    useUpsertPlaylistMutation

            } = api

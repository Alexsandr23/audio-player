import { backendUrl } from "../playerSlice"

export const uploadFile = async (fileName, file, fetchUrl, authToken) => {
    return new Promise(async (resolve, reject) => {
        const formData = new FormData()
        formData.append(fileName, file)

        const headers = authToken
          ? { Authorization: 'Bearer ' + authToken }
          : {}

        try {
            const response = await fetch(`${backendUrl}` + fetchUrl, {
                method: "POST",
                headers: headers,
                body: formData
            })

            if (!response.ok) {
                throw new Error("ошибка в uploadFile: " + response.status)
            }

            const data = await response.json()
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
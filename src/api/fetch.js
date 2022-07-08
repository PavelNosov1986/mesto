const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-44/";

export const fetchApi = (url, method = 'GET', data = null) => fetch(baseUrl + url, {
    headers: {
        'Content-Type': "application/json",
        'accept': "text/plain",
        'authorization': "1258d110-8ca8-495c-a7c0-b616ac51df70",
    },
    method,
    body: data ? JSON.stringify(data) : null
})

    .then(async response => {

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : "";

        if (!response.ok) {
            const error = (data && data.massage) || response.status;
            return Promise.reject(error);
        }
        return data;
    })
    .catch(error => {
        console.error("There was an error!", error);
        return null;
    });
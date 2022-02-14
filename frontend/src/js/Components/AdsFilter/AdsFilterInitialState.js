export const InitialFilterParamsState = {
    city:
    {
        type: 'array',
        value: [],
        label: 'город',
        items: [],
        placeholder: 'Не выбрано',
        fetchServer: true,
        getItems: function () {
            return (data) => {
                return [...Array.from(new Set(data.map(item => item.city)))]
            }
        }
    },
    breed:
    {
        type: 'array',
        value: [],
        label: 'Порода',
        items: [],
        placeholder: 'Не выбрано',
        fetchServer: true,
        getItems: function () {
            return (data) => {
                return [...Array.from(new Set(data.map(item => item.breed)))]
            }
        },
    },
    sex:
    {
        type: 'array',
        value: [],
        label: 'Пол',
        items: ['Male', 'Female'],
        placeholder: 'Не выбрано',
        fetchServer: false,
        getItems: function () {
            return (data) => {
                return ['Male', 'Female']
            }
        },
        filterCallback: function () {
            return (data, value) => {
                if (value.length > 0) {
                    return data.filter((item) => {
                        if (value.includes("Male") && item.male_count > 0) {
                            return true
                        }
                        if (value.includes("Female") && item.female_count > 0) {
                            return true
                        }
                        return false
                    })
                } else {
                    return data
                }
            }
        },
    },
    withDocs:
    {
        type: 'boolean',
        value: false,
        label: 'Только с документами',
        fetchServer: false,
        filterCallback: function () {
            return (data, value) => {
                if (value) {
                    return data.filter((item) => {
                        return item.with_documents == value
                    })
                } else {
                    return data
                }
            }
        },
    },
}



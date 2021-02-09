import React, { useState, useEffect } from "react";

const convertDatesToMatchups = (dates) => {
    let matchups = dates.reduce((acc, current) => {
        if (acc[current.matchup]) acc[current.matchup] = [...acc[current.matchup], current]
        else acc[current.matchup] = [current]
        return acc
    }, {})
    return Object.values(matchups)
}

export const useDates = () => {
    const [dates, setDates] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        try {
            let res = await fetch(`/api/dates`)
            let parsed = await res.json()
            let result = parsed.map(date => ({ ...date, time: new Date(date.time) }))
            let converted = convertDatesToMatchups(result)
            if (result) {
                setDates(converted)
                setLoading(false)
            }
        } catch (error) {
            setError(error)
            setLoading(false)
        }
        return () => {
        }
    }, [])

    return [dates, loading, error]
}

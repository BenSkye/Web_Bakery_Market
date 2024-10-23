import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ViewCustomCake from './ViewCustomCake';

export default function OrderCustomCakeDetail() {
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        console.log('id', id)
    }, [id])
    return (
        <ViewCustomCake />
    )
}

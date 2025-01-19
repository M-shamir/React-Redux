import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../counterSlice'

function counter() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const count =  useSelector((state)=>state.counter.count)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={dispatch(increment())}>increment</button>
      <button onClick={dispatch(decrement())}>Decremenet</button>
    </div>
  )
}

export default counter

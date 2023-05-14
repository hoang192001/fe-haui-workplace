import { arrayMoveImmutable } from 'array-move'
export const reorderQuoteMap = ({ quoteMap, source, destination }) => {

  const current = [...quoteMap[source.droppableId]]
  const next = [...quoteMap[destination.droppableId]]
  const target = current[source.index]

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = arrayMoveImmutable(current, source.index, destination.index)
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered,
    }
    return {
      quoteMap: result,
      [source.droppableId]: reordered,
    }
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1)
  // insert into next
  next.splice(destination.index, 0, target)

  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }

  return {
    quoteMap: result,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }
}

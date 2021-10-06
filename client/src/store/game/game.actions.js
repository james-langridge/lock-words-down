export const setGameTitle = title => {
  return {
    type: 'game/setGameTitle',
    payload: title
  }
}

export const toggleScrolling = () => {
  return {
    type: 'game/toggleScrolling',
  }
}

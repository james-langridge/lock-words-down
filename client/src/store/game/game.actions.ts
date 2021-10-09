export const setGameTitle = (title: string) => {
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

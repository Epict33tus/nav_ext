document.onload = () => {
  const buttons = Array.from(document.querySelectorAll('button'))
  const index = Math.random() * buttons.length | 0
  buttons[index].click()
}
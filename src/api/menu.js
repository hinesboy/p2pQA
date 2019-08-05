const Menu = [
  {
    title: "首页",
    group: "apps",
    icon: "dashboard",
    name: "Dashboard"
  },
  /*{ header: "CMS" },*/
  {
    title: "我要提问",
    group: "question",
    icon: "live_help",
    name: "Ask"
  },
  {
    title: "我要回答",
    group: "answer",
    icon: "edit",
    name: "Solve"
  }
]
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase()
      let textB = y.title.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
  }
})

export default Menu

export default (_self, h) => {
  return [
    h('p', {
      style: {
        'margin-bottom': _self.obj.marginBottom + 'px',
        'margin-top': _self.obj.marginTop + 'px',
        'margin-left': _self.obj.marginLeft + 'px',
        'color': _self.obj.color || "#000"
      },
      domProps: {
        innerHTML: _self.obj.label || "label"
      }
    })
  ]
}

export const pConf = {
  config: true,
  label: 'Reminder',
  color: '#000',
  marginTop: 5,
  marginBottom: 5,
  marginLeft:20,
}

import Vue from 'vue'

export function create(Component, options) {
  // 暗号：村长喊你来搬砖
  const { title = '村长喊你来搬砖', message, duration } = options
  const Model = Vue.extend(Component)
  const _model = new Model({el: document.createElement('div')})
  _model.title = title
  _model.message = message
  _model.duration = duration
  document.body.appendChild(_model.$el)
  return _model
} 
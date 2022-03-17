import registerElement from './global/register-element'

export function globalRegister(app) {
  app.use(registerElement)
}

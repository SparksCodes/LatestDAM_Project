export default function readData(tab) {
  let page = ''

  switch (tab) {
    case 'passwords':
      page = 'Contraseñas'
      break
    case 'creditCard':
      page = 'Tarjetas_Credito'
      break
    case 'bankAccount':
      page = 'Cuenta_Bancaria'
      break
    default:
      console.log('La opción no es válida')
      return Promise.reject(new Error('Opción no válida'))
  }

  return new Promise((resolve, reject) => {
    try {
      const storedData = JSON.parse(localStorage.getItem(page))

      if (storedData) {
        console.log('Datos leídos correctamente del localStorage.')
        resolve(storedData)
      } else {
        console.log('No hay datos almacenados en el localStorage para esta página.')
        resolve([])
      }
    } catch (error) {
      console.error('Error al leer los datos del localStorage:', error)
      reject(error)
    }
  })
}

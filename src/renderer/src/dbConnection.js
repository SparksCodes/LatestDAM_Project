export default function connection(tab, data) {
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
      return
  }

  try {
    let existingData = JSON.parse(localStorage.getItem(page)) || []

    existingData.push(data)

    localStorage.setItem(page, JSON.stringify(existingData))

    console.log('Datos guardados correctamente en localStorage.')
  } catch (error) {
    console.error('Error al guardar los datos en localStorage:', error)
  }
}

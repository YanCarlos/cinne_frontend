import * as Yup from 'yup'

export const FormValidator = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido.'),
  identification: Yup.string()
    .required('La cedula es requerida.'),
  phone: Yup.string()
    .required('El telefono es requerido.'),
  email: Yup.string()
	  .required('El email es requerido.')
    .email('Debe ser un email valido.')
})

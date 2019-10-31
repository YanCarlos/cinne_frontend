import * as Yup from 'yup'

export const FormValidator = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido.'),
  description: Yup.string()
    .required('La descripción es requerida.'),
  image_url: Yup.string()
    .required('La url de la imagen es requerida')
    .url('Esto debe ser una URL valida'),
  schedules_attributes: Yup.array()
	  .min(1,'Debes seleccionar por lo menos una fecha.')
	  .required('Nos gustaría saber que te interesa')
})

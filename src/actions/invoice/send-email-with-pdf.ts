export async function sendEmailWithPdf({ id }: { id: string | number }) {
  try {
    const res = await fetch(`/api/mail/invoice/${id}`)
    if (!res.ok) {
      if (res.status === 400) {
        return {
          ok: false,
          message: 'El cliente no tiene un email registrado.'
        }
      }
      throw new Error('Error al enviar el email')
    }
    const data = (await res.json()) as { ok: boolean; message: string }
    return data
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al enviar el email'
    }
  }
}

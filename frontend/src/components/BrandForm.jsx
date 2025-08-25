import React, { useState } from 'react'

export default function BrandForm({ initialValues, onSubmit, onCancel, isEditing }) {
  const [values, setValues] = useState(initialValues)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!values.name?.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    setSaving(true)
    try {
      await onSubmit({ name: values.name.trim(), owner: values.owner || '' })
      setValues({ name: '', owner: '' })
    } catch (e) {
      setError('No se pudo guardar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 12 }}>
        <label>Nombre</label>
        <input name="name" value={values.name} onChange={handleChange} placeholder="Ej: Mi Marca" />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Descripción</label>
        <textarea rows={4} name="owner" value={values.owner || ''} onChange={handleChange} placeholder="Opcional" />
      </div>
      {error && <p style={{ color: '#fca5a5', marginTop: 0 }}>{error}</p>}
      <div className="actions">
        <button className="btn" type="submit" disabled={saving}>{saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}</button>
        {isEditing && <button className="btn secondary" type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}

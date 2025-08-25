import React from 'react'

export default function BrandTable({ items, onEdit, onDelete }) {
  if (!items?.length) return <p>No hay registros.</p>

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Creado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map(b => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.name}</td>
            <td style={{maxWidth: 380, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={b.owner || ''}>
              {b.owner}
            </td>
            <td>{new Date(b.created_at).toLocaleString()}</td>
            <td>
              <div className="actions">
                <button className="btn secondary" onClick={() => onEdit(b)}>Editar</button>
                <button className="btn danger" onClick={() => onDelete(b.id)}>Eliminar</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

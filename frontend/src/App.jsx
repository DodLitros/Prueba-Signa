import React, { useState, useEffect } from 'react'
import BrandForm from './components/BrandForm'
import BrandTable from './components/BrandTable'
import BrandWizard from "./components/BrandWizard";
import { listBrands, createBrand, updateBrand, deleteBrand } from './api'

export default function App() {
  const [brands, setBrands] = useState([])
  const [editing, setEditing] = useState(null)
  const [view, setView] = useState('form') // "form" o "list"
  const [loading, setLoading] = useState(false)

  async function reload() {
    setLoading(true)
    const data = await listBrands()
    setBrands(data)
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  async function onCreate(values) {
    await createBrand(values)
    setEditing(null)
    await reload()
    setView('list')
  }

  async function onUpdate(values) {
    await updateBrand(editing.id, values)
    setEditing(null)
    await reload()
    setView('list')
  }

  async function onDelete(id) {
    if (!confirm('¿Eliminar este registro?')) return
    await deleteBrand(id)
    await reload()
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Menú lateral */}
      <aside style={{
        width: "20%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px",
        height: "100vh" 
      }}>
        <h2 style={{ fontSize: '48px', marginBottom: '20px', textAlign: "center" }}>Menú</h2>
        <button className="btn secondary" style={{ width: '100%', marginBottom: '10px' }} onClick={() => setView('form')}>
          Registrar Marca
        </button>
        <button className="btn secondary" style={{ width: '100%' }} onClick={() => setView('list')}>
          Registros
        </button>
        <img
          src="https://www.signa.com.co/wp-content/uploads/2023/02/5e3d8107454613a49e48605d_SIGNA_Logo.png"
          alt="Signa Logo"
          style={{
            width: "50vh",
            height: "100%",
            objectFit: "contain",
            transform: "rotate(-90deg)",
            opacity: 0.25,
          }}
        />
      </aside>
      <main style={{ flex: 1, padding: '24px' }}>
        {view === 'form' && (
          <div className="card">
            <h2>{editing ? 'Editar marca' : 'Registrar nueva marca'}</h2>
            <div style={{ height: "80vh" }}>
              <BrandWizard onConfirm={onCreate} />
            </div>
          </div>
        )}

        {view === 'list' && (
          <div className="card">
            <h2>Listado de Marcas</h2>
            {loading ? <p>Cargando...</p> : (
              <BrandTable items={brands} onEdit={(b) => { setEditing(b); setView('form') }} onDelete={onDelete} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

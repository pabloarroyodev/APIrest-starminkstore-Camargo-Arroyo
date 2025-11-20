import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000/products';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(API_URL);
      const data = await res.json();
      // La API devuelve { message, count, data }
      setProducts(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price != null ? String(product.price) : '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', description: '', price: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.message && data.message.toLowerCase().includes('no encontrado')) {
        setError(data.message);
      }
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
        }),
      });
      const data = await res.json();

      // Si tu API devuelve un mensaje de error sin id, lo mostramos
      if (data.message && !data.id) {
        setError(data.message);
      } else {
        setForm({ name: '', description: '', price: '' });
        setEditingId(null);
        fetchProducts();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        background: 'radial-gradient(circle at top, #f9a8d4 0, #0f172a 55%)',
        color: '#fee2e2',
      }}
    >
      <h1
        style={{
          marginBottom: '0.5rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontSize: '1.4rem',
        }}
      >
        Starmink Store
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '1rem',
          borderRadius: '0.5rem',
          background: 'rgba(15, 23, 42, 0.9)',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(244, 114, 182, 0.35)',
        }}
      >
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid rgba(248, 113, 113, 0.5)',
            background: '#020617',
            color: '#ffe4e6',
          }}
        />
        <input
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #334155',
            background: '#020617',
            color: '#e5e7eb',
          }}
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid rgba(248, 113, 113, 0.35)',
            background: '#020617',
            color: '#ffe4e6',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: 'none',
            background: editingId
              ? 'linear-gradient(to right, #fb7185, #ec4899)'
              : 'linear-gradient(to right, #f9a8d4, #fb7185)',
            color: '#111827',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          {loading
            ? 'Guardando...'
            : editingId
            ? 'Guardar cambios'
            : 'Crear producto'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{
              marginTop: '0.25rem',
              padding: '0.4rem',
              borderRadius: '0.25rem',
              border: '1px solid rgba(248, 113, 113, 0.4)',
              background: 'transparent',
              color: '#fecaca',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>

      {error && (
        <p style={{ color: '#f97316', marginBottom: '1rem' }}>
          Error: {error}
        </p>
      )}

      <button
        onClick={fetchProducts}
        style={{
          marginBottom: '1rem',
          padding: '0.4rem 0.8rem',
          borderRadius: '0.25rem',
          border: '1px solid rgba(248, 113, 113, 0.5)',
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#ffe4e6',
          cursor: 'pointer',
        }}
      >
        Recargar lista
      </button>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {products.map((p) => (
          <li
            key={p.id}
            style={{
              marginBottom: '0.5rem',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(248, 113, 113, 0.35)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.25rem',
              }}
            >
              <div>
                <strong>{p.name}</strong>
                <span style={{ opacity: 0.8 }}> — ${p.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => handleEdit(p)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'rgba(244, 114, 182, 0.9)',
                    color: '#111827',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'rgba(248, 113, 113, 0.9)',
                    color: '#111827',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                  }}
                >
                  Borrar
                </button>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#fecaca' }}>
              {p.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface Categoria {
    id: number;
    nombre: string;
}

interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    categoria_id: number;
    descripcion: string | null;
    precio_compra: string;
    precio_venta: string;
    stock: number;
    fecha_vencimiento: string | null;
    estado: boolean;
    categoria?: Categoria;
}

interface Props {
    productos: Producto[];
    categorias: Categoria[];
}

export default function Index({ productos, categorias }: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [productoSeleccionado, setProductoSeleccionado] =
        useState<Producto | null>(null);

   const { data, setData, post, put, processing, errors, reset } = useForm({
        codigo: '',
        nombre: '',
        categoria_id: '',
        descripcion: '',
        precio_compra: '',
        precio_venta: '',
        stock: '',
        fecha_vencimiento: '',
        estado: true,
    });

    const guardarProducto = (e: React.FormEvent) => {
        e.preventDefault();

       post('/productos', {
    onSuccess: () => {
        reset();
        setIsModalOpen(false);
        router.reload();
    },
});
    };
    const editarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);

    setData({
        codigo: producto.codigo,
        nombre: producto.nombre,
        categoria_id: String(producto.categoria_id),
        descripcion: producto.descripcion || '',
        precio_compra: String(producto.precio_compra),
        precio_venta: String(producto.precio_venta),
        stock: String(producto.stock),
        fecha_vencimiento: producto.fecha_vencimiento || '',
        estado: producto.estado,
    });

    setIsEditModalOpen(true);
};
const actualizarProducto = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productoSeleccionado) return;

    put(`/productos/${productoSeleccionado.id}`, {
        onSuccess: () => {
            setIsEditModalOpen(false);
            setProductoSeleccionado(null);
        },
        
    });
};
const eliminarProducto = (id: number) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        router.delete(`/productos/${id}`);
    }
};
    return (
        <>
            <Head title="Productos" />

            <AppLayout>
                <div className="bg-[#1e293b] min-h-screen text-white">

                    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 rounded-3xl p-8 mb-8 shadow-2xl">

    <h1 className="text-5xl font-bold text-white mb-3">
        VoltStore
    </h1>

    <h2 className="text-2xl text-emerald-300 mb-2">
        Catálogo de Productos
    </h2>

    <p className="text-slate-300">
        Gestiona tu inventario de forma rápida, moderna y profesional.
    </p>

</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-emerald-500 transition">
        <p className="text-slate-400 uppercase text-sm tracking-wider">
    Productos
</p>

        <h3 className="text-4xl font-bold text-white">
            {productos.length}
        </h3>
    </div>

    <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 hover:border-emerald-500 transition">
        <p className="text-slate-400 uppercase text-sm tracking-wider">
    Categorias
</p>

        <h3 className="text-4xl font-bold text-white">
            {categorias.length}
        </h3>
    </div>

    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <p className="text-slate-400 uppercase text-sm tracking-wider">
    Estado
</p>
        <h3 className="text-4xl font-bold text-emerald-400">
            Activo
        </h3>
    </div>

</div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg transition"
                    >
                        + Añadir nuevo
                    </button>
                    <a
    href="/productos/reporte-pdf"
    target="_blank"
   className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl shadow-lg transition"
>
    Generar PDF Productos
</a>

                    <div className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
                        <table className="w-full text-left text-white">

                            <thead>
                               <tr className="bg-emerald-700 text-white">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Código</th>
                                    <th className="p-4">Producto</th>
                                    <th className="p-4">Categoría</th>
                                    <th className="p-4">Precio</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4">Vencimiento</th>
                                    <th className="p-4">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {productos.length > 0 ? (
                                    productos.map((producto) => (
                                        <tr
    key={producto.id}
    className="border-b border-slate-700 hover:bg-slate-700 transition"
>
                                            <td className="p-4">
                                                {producto.id}
                                            </td>

                                            <td className="p-4">
                                                {producto.codigo}
                                            </td>

                                            <td className="p-4 font-bold text-white">
    {producto.nombre}
</td>

                                            <td className="p-4">
    <span className="bg-violet-600 px-3 py-1 rounded-full text-sm">
        {producto.categoria?.nombre || 'Sin categoría'}
    </span>
</td>

                                            <td className="p-4">
                                                ${producto.precio_venta}
                                            </td>

<td className="p-4 text-slate-300">
    {producto.stock}
</td>

<td className="p-4 text-slate-300">
    {producto.fecha_vencimiento || 'Sin fecha'}
</td>
                                               <td className="p-4 flex gap-2">
    <button
        onClick={() => editarProducto(producto)}
        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
    >
        Editar
    </button>

    <button
        onClick={() => eliminarProducto(producto.id)}
        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
    >
        Eliminar
    </button>
</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="p-6 text-center"
                                        >
                                            No hay productos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                           <div className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow">

                                <h2 className="text-xl font-bold mb-4">
                                    Nuevo Producto
                                </h2>

                                <form onSubmit={guardarProducto}>

                                    <div className="mb-3">
                                        <label className="block mb-1">
                                            Código
                                        </label>

                                        <input
                                            type="text"
                                            value={data.codigo}
                                            onChange={(e) =>
                                                setData(
                                                    'codigo',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded p-2"
                                        />

                                        {errors.codigo && (
                                            <p className="text-red-500 text-sm">
                                                {errors.codigo}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="block mb-1">
                                            Nombre
                                        </label>

                                        <input
                                            type="text"
                                            value={data.nombre}
                                            onChange={(e) =>
                                                setData(
                                                    'nombre',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded p-2"
                                        />

                                        {errors.nombre && (
                                            <p className="text-red-500 text-sm">
                                                {errors.nombre}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="block mb-1">
                                            Categoría
                                        </label>

                                        <select
                                            value={data.categoria_id}
                                            onChange={(e) =>
                                                setData(
                                                    'categoria_id',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded p-2"
                                        >
                                            <option value="">
                                                Selecciona una categoría
                                            </option>

                                            {categorias.map((categoria) => (
                                                <option
                                                    key={categoria.id}
                                                    value={categoria.id}
                                                >
                                                    {categoria.nombre}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.categoria_id && (
                                            <p className="text-red-500 text-sm">
                                                {errors.categoria_id}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="block mb-1">
                                            Descripción
                                        </label>

                                        <textarea
                                            value={data.descripcion}
                                            onChange={(e) =>
                                                setData(
                                                    'descripcion',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded p-2"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">

                                        <div>
                                            <label className="block mb-1">
                                                Precio de compra
                                            </label>

                                            <input
                                                type="number"
                                                step="0.01"
                                                value={data.precio_compra}
                                                onChange={(e) =>
                                                    setData(
                                                        'precio_compra',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border rounded p-2"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-1">
                                                Precio de venta
                                            </label>

                                            <input
                                                type="number"
                                                step="0.01"
                                                value={data.precio_venta}
                                                onChange={(e) =>
                                                    setData(
                                                        'precio_venta',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border rounded p-2"
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-3">
                                        <label className="block mb-1">
                                            Stock
                                        </label>

                                        <input
                                            type="number"
                                            value={data.stock}
                                            onChange={(e) =>
                                                setData(
                                                    'stock',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded p-2"
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <label className="block mb-1">
                                            Fecha de vencimiento
                                        </label>

                                        <input
                                            type="date"
                                            value={data.fecha_vencimiento}
                                            onChange={(e) =>
                                                setData(
                                                    'fecha_vencimiento',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded p-2"
                                        />
                      <thead></thead> 
                                   </div>

                                    <div className="mt-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.estado}
                                                onChange={(e) =>
                                                    setData(
                                                        'estado',
                                                        e.target.checked
                                                    )
                                                }
                                            />

                                            Producto activo
                                        </label>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-5">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            className="px-4 py-2 bg-gray-300 rounded"
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                        
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-blue-500 text-white rounded"
                                        >
                                            {processing
                                                ? 'Guardando...'
                                                : 'Guardar'}
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>
                    )}
                    {isEditModalOpen && productoSeleccionado && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-slate-800 text-white p-8 rounded-2xl w-96 shadow-2xl border border-slate-700">

            <h2 className="text-xl font-bold mb-4">
                Editar Producto
            </h2>

           <form onSubmit={actualizarProducto}>

                <div className="mb-3">
                    <label className="block mb-1">
                        Código
                    </label>

                   <input
    type="text"
    value={data.codigo}
    onChange={(e) => setData('codigo', e.target.value)}
    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white"
/>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Nombre
                    </label> 

                    <input
    type="text"
    value={data.nombre}
    onChange={(e) => setData('nombre', e.target.value)}
    className="w-full border rounded p-2"
/>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Descripción
                    </label>

                   <textarea
    value={data.descripcion}
    onChange={(e) => setData('descripcion', e.target.value)}
    className="w-full border rounded p-2"
/>
                </div>

                <div className="grid grid-cols-2 gap-3">

                    <div>
                        <label className="block mb-1">
                            Precio de compra
                        </label>

                       <input
    type="number"
    step="0.01"
    value={data.precio_compra}
    onChange={(e) => setData('precio_compra', e.target.value)}
    className="w-full border rounded p-2"
/>
                    </div>

                    <div>
                        <label className="block mb-1">
                            Precio de venta
                        </label>

                       <input
    type="number"
    step="0.01"
    value={data.precio_venta}
    onChange={(e) => setData('precio_venta', e.target.value)}
    className="w-full border rounded p-2"
/>
                    </div>

                </div>

                <div className="mt-3">
                    <label className="block mb-1">
                        Stock
                    </label>

                 <input
    type="number"
    value={data.stock}
    onChange={(e) => setData('stock', e.target.value)}
    className="w-full border rounded p-2"
/>
                </div>

                <div className="mt-3">
                    <label className="block mb-1">
                        Fecha de vencimiento
                    </label>

                  <input
    type="date"
    value={data.fecha_vencimiento}
    onChange={(e) => setData('fecha_vencimiento', e.target.value)}
    className="w-full border rounded p-2"
/>
                </div>

                <div className="flex justify-end gap-2 mt-5">

                    <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                    >
                        Actualizar
                    </button>

                </div>

            </form>

        </div>
    </div>
)}

                </div>
            </AppLayout>


        </>
    );
}
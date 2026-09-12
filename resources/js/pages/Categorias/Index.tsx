import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
         

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string | null;
    productos_count?: number;
}

interface Props {
    categorias: Categoria[];
}

export default function Index({ categorias }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editando, setEditando] = useState<Categoria | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        descripcion: '',
    });
    const guardarCategoria = (e: React.FormEvent) => {
    e.preventDefault();
post('/categorias', {
    onSuccess: () => {
        reset();
        setIsModalOpen(false);
        router.reload();
    },
});
};
const editarCategoria = (categoria: Categoria) => {
    setEditando(categoria);

    setData({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion || '',
    });

    setIsModalOpen(true);
};


const eliminarCategoria = (id: number) => {
    if (confirm('¿Eliminar esta categoría?')) {
        router.delete(`/categorias/${id}`, {
            onSuccess: () => {
                router.reload();
            },
        });
    }
};

const actualizarCategoria = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editando) return;

    router.put(
        `/categorias/${editando.id}`,
        {
            nombre: data.nombre,
            descripcion: data.descripcion,
        },
        {
onSuccess: () => {
    reset();
    setEditando(null);
    setIsModalOpen(false);
    router.reload();
},
        }
    );
};

    return (
        <>
            <Head title="Categorías" />

            <AppLayout>
                <div className="max-w-7xl mx-auto p-6 bg-slate-900 min-h-screen">
                    <h1 className="text-4xl font-bold text-white mb-2">
    Catálogo de Categorías
</h1>

<p className="text-slate-400 mb-6">
    Organiza y administra todas las categorías de tu tienda.
</p>
<div className="bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 rounded-3xl p-8 mb-8 shadow-2xl">

    <h1 className="text-5xl font-bold text-white mb-3">
        VoltStore
    </h1>

    <h2 className="text-2xl text-violet-300 mb-2">
        Catálogo de Categorías
    </h2>

    <p className="text-slate-300">
        Organiza y administra todas las categorías de tu tienda.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <p className="text-slate-400 uppercase text-sm">
            Categorías
        </p>

        <h3 className="text-4xl font-bold text-white">
            {categorias.length}
        </h3>
    </div>

    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <p className="text-slate-400 uppercase text-sm">
            Productos
        </p>

        <h3 className="text-4xl font-bold text-white">
            {categorias.reduce((t,c)=>t+(c.productos_count ?? 0),0)}
        </h3>
    </div>

    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <p className="text-slate-400 uppercase text-sm">
            Estado
        </p>

        <h3 className="text-4xl font-bold text-emerald-400">
            Activo
        </h3>
    </div>

</div>

</div>
                    <button
    onClick={() => setIsModalOpen(true)}
    className="mb-6 px-5 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg transition"
>
    + Añadir nuevo
</button>
                    

                    <div className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-emerald-700 text-white">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Categoría</th>
                                    <th className="p-4">Productos</th>
                                    <th className="p-4">Descripción</th>
                                    <th className="p-4">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categorias.length > 0 ? (
                                    categorias.map((categoria) => (
                                        <tr
    key={categoria.id}
    className="border-b border-slate-700 hover:bg-slate-700 transition"
>
                                            <td className="p-4 text-slate-300">
    {categoria.id}
</td>

                                            <td className="p-4 font-bold text-white">
                                                {categoria.nombre}
                                            </td>

                                           <td className="p-4">
    <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
        {categoria.productos_count ?? 0} Productos
    </span>
</td>

<td className="p-4 text-slate-300">
    {categoria.descripcion || 'Sin descripción'}
</td>
                                            <td className="p-4">
    <div className="flex gap-2">
        <button
            onClick={() => editarCategoria(categoria)}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
        >
            Editar
        </button>

        <button
            onClick={() => eliminarCategoria(categoria.id)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
            Eliminar
        </button>
    </div>
</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="p-6 text-center"
                                        >
                                            No hay categorías.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {isModalOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-slate-800 text-white p-8 rounded-2xl w-96 shadow-2xl border border-slate-700">

            <h2 className="text-xl font-bold mb-4">
    {editando ? 'Editar Categoría' : 'Nueva Categoría'}
</h2>

            <form
    onSubmit={
        editando
            ? actualizarCategoria
            : guardarCategoria
    }
>
    
                <div className="mb-4">
                    <label className="block mb-1">
                        Categoría
                    </label>

                    <input
                        type="text"
                        value={data.nombre}
                        onChange={(e) =>
                            setData('nombre', e.target.value)
                        }
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white"
                    />

                    {errors.nombre && (
                        <p className="text-red-500 text-sm">
                            {errors.nombre}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">
                        Descripción
                    </label>

                    <textarea
                        value={data.descripcion}
                        onChange={(e) =>
                            setData('descripcion', e.target.value)
                        }
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white"
                    />

                    {errors.descripcion && (
                        <p className="text-red-500 text-sm">
                            {errors.descripcion}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-2">

                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
                    >
                        {processing
    ? 'Guardando...'
    : editando
    ? 'Actualizar'
    : 'Guardar'}
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
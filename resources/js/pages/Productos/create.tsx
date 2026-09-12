import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Categoria {
    id: number;
    nombre: string;
}

interface Props {
    categorias: Categoria[];
}

export default function Create({ categorias }: Props) {
    const { data, setData, post, processing, errors } = useForm({
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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/productos');
    };

    return (
        <>
            <Head title="Nuevo Producto" />

            <AppLayout>
                <div className="max-w-3xl mx-auto p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Nuevo Producto
                    </h1>

                    <form
                        onSubmit={submit}
                        className="bg-white p-6 rounded-lg shadow space-y-5"
                    >

                        {/* Código */}
                        <div>
                            <label className="block font-medium mb-1">
                                Código
                            </label>

                            <input
                                type="text"
                                value={data.codigo}
                                onChange={(e) =>
                                    setData('codigo', e.target.value)
                                }
                                className="w-full border rounded-lg p-2"
                                placeholder="Ej: P001"
                            />

                            {errors.codigo && (
                                <p className="text-red-500 text-sm">
                                    {errors.codigo}
                                </p>
                            )}
                        </div>

                        {/* Nombre */}
                        <div>
                            <label className="block font-medium mb-1">
                                Nombre
                            </label>

                            <input
                                type="text"
                                value={data.nombre}
                                onChange={(e) =>
                                    setData('nombre', e.target.value)
                                }
                                className="w-full border rounded-lg p-2"
                                placeholder="Nombre del producto"
                            />

                            {errors.nombre && (
                                <p className="text-red-500 text-sm">
                                    {errors.nombre}
                                </p>
                            )}
                        </div>

                        {/* Categoría */}
                        <div>
                            <label className="block font-medium mb-1">
                                Categoría
                            </label>

                            <select
                                value={data.categoria_id}
                                onChange={(e) =>
                                    setData('categoria_id', e.target.value)
                                }
                                className="w-full border rounded-lg p-2"
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

                        {/* Descripción */}
                        <div>
                            <label className="block font-medium mb-1">
                                Descripción
                            </label>

                            <textarea
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData('descripcion', e.target.value)
                                }
                                className="w-full border rounded-lg p-2"
                                placeholder="Descripción del producto"
                                rows={3}
                            />
                        </div>

                        {/* Precio compra */}
                        <div>
                            <label className="block font-medium mb-1">
                                Precio de compra
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.precio_compra}
                                onChange={(e) =>
                                    setData('precio_compra', e.target.value)
                                }
                                className="w-full border rounded-lg p-2"
                                placeholder="0.00"
                            />

                            {errors.precio_compra && (
                                <p className="text-red-500 text-sm">
                                    {errors.precio_compra}
                                </p>
                            )}
                        </div>

                        {/* Precio venta */}
                        <div>
                            <label className="block font-medium mb-1">
                                Precio de venta
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.precio_venta}
                                onChange={(e) =>
                                    setData('precio_venta', e.target.value)
                                }
                                className="w-full border rounded-lg p-2"
                                placeholder="0.00"
                            />

                            {errors.precio_venta && (
                                <p className="text-red-500 text-sm">
                                    {errors.precio_venta}
                                </p>
                            )}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block font-medium mb-1">
                                Stock
                            </label>

                            <input
                                type="number"
                                value={data.stock}
                                onChange={(e) =>
                                    setData('stock', e.target.value)
                                }
                                className="w-full border rounded-lg p-2"
                                placeholder="0"
                            />

                            {errors.stock && (
                                <p className="text-red-500 text-sm">
                                    {errors.stock}
                                </p>
                            )}
                        </div>

                        {/* Fecha de vencimiento */}
                        <div>
                            <label className="block font-medium mb-1">
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
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        {/* Estado */}
                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.estado}
                                    onChange={(e) =>
                                        setData('estado', e.target.checked)
                                    }
                                />

                                <span>Producto activo</span>
                            </label>
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            {processing
                                ? 'Guardando...'
                                : 'Guardar producto'}
                        </button>

                    </form>
                </div>
            </AppLayout>
        </>
    );
}
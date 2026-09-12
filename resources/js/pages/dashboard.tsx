import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

interface Props {
    totalProductos: number;
    totalCategorias: number;
}

export default function Dashboard({
    totalProductos,
    totalCategorias,
}: Props) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="p-6">

                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 rounded-3xl p-8 text-white shadow-xl mb-6">
                    <h1 className="text-5xl font-bold mb-2">
                        VoltStore
                    </h1>

                    <p className="text-slate-300">
                        Sistema de gestión de productos y categorías.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
                        <h2 className="text-slate-400 text-sm uppercase">
                            Productos
                        </h2>

                        <p className="text-4xl font-bold text-white mt-2">
                            {totalProductos}
                        </p>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
                        <h2 className="text-slate-400 text-sm uppercase">
                            Categorías
                        </h2>

                        <p className="text-4xl font-bold text-white mt-2">
                            {totalCategorias}
                        </p>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
                        <h2 className="text-slate-400 text-sm uppercase">
                            Inventario
                        </h2>

                        <p className="text-4xl font-bold text-emerald-400 mt-2">
                            Activo
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

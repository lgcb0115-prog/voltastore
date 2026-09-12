<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ProductoController extends Controller
{
    public function index()
    {
           $productos = Producto::with('categoria')->get();
$categorias = Categoria::all();

return Inertia::render('Productos/Index', [
    'productos' => $productos,
    'categorias' => $categorias,
]);
    }

    public function create()
    {
        $categorias = Categoria::all();

        return Inertia::render('Productos/Create', [
            'categorias' => $categorias,
        ]);
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'codigo' => 'required|string|max:255|unique:productos,codigo',
            'nombre' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'descripcion' => 'nullable|string',
            'precio_compra' => 'required|numeric|min:0',
            'precio_venta' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'fecha_vencimiento' => 'nullable|date',
            'estado' => 'required|boolean',
        ]);

        Producto::create($datos);

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto creado correctamente.');
    }

    public function show(Producto $producto)
    {
        $producto->load('categoria');

        return Inertia::render('Productos/Show', [
            'producto' => $producto,
        ]);
    }

    public function edit(Producto $producto)
    {
        $categorias = Categoria::all();

        return Inertia::render('Productos/Edit', [
            'producto' => $producto,
            'categorias' => $categorias,
        ]);
    }

    public function update(Request $request, Producto $producto)
    {
        $datos = $request->validate([
            'codigo' => 'required|string|max:255|unique:productos,codigo,' . $producto->id,
            'nombre' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'descripcion' => 'nullable|string',
            'precio_compra' => 'required|numeric|min:0',
            'precio_venta' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'fecha_vencimiento' => 'nullable|date',
            'estado' => 'required|boolean',
        ]);

        $producto->update($datos);

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto actualizado correctamente.');
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto eliminado correctamente.');
    }
    public function generarPdf()
{
    $productos = Producto::with('categoria')->get();

    $totalProductos = $productos->count();

    $precioPromedio = $productos->avg('precio_venta');

    $pdf = Pdf::loadView('pdf.productos', compact(
        'productos',
        'totalProductos',
        'precioPromedio'
    ));

    return $pdf->stream(
    'reporte_productos_' . date('Y-m-d') . '.pdf'
);
}
}
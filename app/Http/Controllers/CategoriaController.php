<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use Inertia\Inertia;


class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::withCount('productos')
    ->with('productos')
    ->get();
        return Inertia::render('Categorias/Index', [
            'categorias' => $categorias
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
{
    $datos = $request->validate([
        'nombre' => 'required|string|max:255',
        'descripcion' => 'nullable|string',
    ]);

    Categoria::create($datos);

    return redirect()
        ->route('categorias.index')
        ->with('success', 'Categoría creada correctamente.');
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $categoria = Categoria::findOrFail($id);

    $datos = $request->validate([
        'nombre' => 'required|string|max:255',
        'descripcion' => 'nullable|string',
    ]);

    $categoria->update($datos);

    return redirect()->route('categorias.index');
}

public function destroy(string $id)
{
    $categoria = Categoria::findOrFail($id);

    $categoria->delete();

    return redirect()->route('categorias.index');
}
}
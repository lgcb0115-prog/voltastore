<?php
use App\Models\Producto;
use App\Models\Categoria;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;

Route::inertia('/', 'welcome')->name('home');

Route::resource('categorias', CategoriaController::class);
Route::get('/productos/reporte-pdf', [ProductoController::class, 'generarPdf'])
    ->name('productos.pdf');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {

    return Inertia::render('dashboard', [
        'totalProductos' => Producto::count(),
        'totalCategorias' => Categoria::count(),
    ]);

})->name('dashboard');
    



Route::resource('productos', ProductoController::class);
});


require __DIR__.'/settings.php';

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();

            $table->string('codigo')->unique();
            $table->string('nombre');

            $table->foreignId('categoria_id')
                ->constrained('categorias')
                ->onDelete('cascade');

            $table->text('descripcion')->nullable();

            $table->decimal('precio_compra', 10, 2);
            $table->decimal('precio_venta', 10, 2);

            $table->integer('stock')->default(0);

            $table->date('fecha_vencimiento')->nullable();

            $table->boolean('estado')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Productos</title>

    <style>
        body {
            font-family: sans-serif;
            font-size: 11px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            margin: 0;
            color: #047857;
            font-size: 18px;
        }

        .stats {
            margin-bottom: 15px;
            background: #f3f4f6;
            padding: 10px;
            border-radius: 4px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #d1d5db;
            padding: 7px 10px;
            text-align: left;
        }

        th {
            background-color: #059669;
            color: white;
        }

        .badge {
            background: #e0e7ff;
            color: #3730a3;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
        }
    </style>
</head>

<body>

    <div class="header">
        <h1>Catálogo General de Productos</h1>
        <p>Generado el: {{ date('d/m/Y H:i') }}</p>
    </div>

    <div class="stats">
        <strong>Total Registros:</strong> {{ $totalProductos }}
        |
        <strong>Precio Promedio:</strong>
        ${{ number_format($precioPromedio, 2) }}
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio Venta</th>
            </tr>
        </thead>

        <tbody>
            @foreach($productos as $producto)
                <tr>
                    <td>{{ $producto->id }}</td>

                    <td>
                        {{ $producto->nombre }}
                    </td>

                    <td>
                        <span class="badge">
                            {{ $producto->categoria->nombre ?? 'Sin Categoría' }}
                        </span>
                    </td>

                    <td>
                        ${{ number_format($producto->precio_venta, 2) }}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
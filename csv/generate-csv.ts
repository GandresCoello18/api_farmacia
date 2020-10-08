const createCsvWriter = require("csv-writer").createObjectCsvWriter;
export const csvWriter = createCsvWriter({
  path: "public/reporte-productos.csv",
  header: [
    { id: "id_producto", title: "id_producto" },
    { id: "cantidad", title: "cantidad" },
    { id: "cantidad_disponible", title: "cantidad_disponible" },
    { id: "presentacion", title: "presentacion" },
    { id: "estado", title: "estado" },
    { id: "lote", title: "lote" },
    { id: "pvp", title: "pvp" },
    { id: "pvf", title: "pvf" },
    { id: "registro_sanitario", title: "registro_sanitario" },
    { id: "medida", title: "medida" },
    { id: "tipo_medida", title: "tipo_medidad" },
    { id: "fecha_elaboracion", title: "fecha_elaboracion" },
    { id: "fecha_caducidad", title: "fecha_caducidad" },
    { id: "product_name", title: "product_name" },
    { id: "nombre_laboratorio", title: "nombre_laboratorio" },
    { id: "principio_activo", title: "principio_activo" },
  ],
});

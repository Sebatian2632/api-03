const express = require("express");
const app = express();
const puerto = process.env.PORT || 3000;
//Midlware
app.use(express.json());

//Control + C para detener el servidor
//Areglo de objetos de categoria
let categorias = [
    {id:1,nombre:"Cocina",descripcion:"Elementos para cocinar"},
    {id:2,nombre:"Limpieza",descripcion:"Elementos para la limpieza"},
    {id:3,nombre:"Electronica",descripcion:"Elementos que ocupan electricidad"},
    {id:4,nombre:"Ropa bebe",descripcion:"Elementos para la vestimenta de un bebe"},
    {id:5,nombre:"Linea blanca",descripcion:"Elementos para la linea blanca"},
    {id:6,nombre:"Jardineria",descripcion:"Elementos para el cuidado del jardin"},
    {id:7,nombre:"Salud",descripcion:"Elementos para el cuidado de la salud"},
    {id:8,nombre:"Muebles",descripcion:"Elementos para adornar una casa"},
    {id:9,nombre:"Lacteos",descripcion:"Elementos que provienen de la leche"},
    {id:10,nombre:"Licores",descripcion:"Elementos para beber"}
];

app.get('/socios/v1/categorias', (req,res)=>{
    //Todas las categorias
    //1.- Verificar si existen categorias
    if(categorias.length > 0)
    {
        //2.- Mostrarlas con un estado y mensaje
        res.status(200).json({
            estado:1,
            mensaje:"Existen categorias",
            categorias: categorias
        })
    }
    else
    {
        //3.- No existe, mostrar estado y mensaje
        res.status(404).json({
            estado:0,
            mensaje:"No se encontron categorias",
            categorias: categorias
        })
    }
    
    //En formato JSON
    //Mostrar mensaje de estado del servidor
})

app.get('/socios/v1/categorias/:id', (req,res)=>{
    //Solo una categoria
    const id = req.params.id;
    const categoria = categorias.find(categoria=>categoria.id==id)
    //Otra dorma de hacerlo
    /*for(let i=0;i<array.length; i++)
    {
        const element = array[i];
    }*/
    //Sí se encontro una categoría
    if(categoria)
    {
        res.status(200).json({
            estado:1,
            mensaje:"Categoria encontrada",
            categoria:categoria
        })
    }
    //No se encontro una categoria
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Categoria no encontrada"
        })
    }
    //res.send('Mostrar una categoria por su id')
})

app.post('/socios/v1/categorias', (req,res)=>{
    //Crea un recurso - Crear una categoria
    const {nombre, descripcion} = req.body
    const id = Math.round(Math.random()*1000);
    //Comparar que el cliente (chrome, edfe, insmonia,postman, etc) que el cliente envie algo
    if(nombre==undefined || descripcion==undefined)
    {
        //Hay un error en la solicitud por parte del usuario de la api
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }
    else
    {
        //En javascript como agregar un nuevo elemento a un arreglo
        const categoria = {id:id,nombre:nombre,descripcion:descripcion};
        const logitInicial = categorias.length;
        categorias.push(categoria)
        if(categorias.length>logitInicial)
        {
            //Todo Ok por parte del cliente
            res.status(201).json({
                estado:1,
                mensaje:"Categoria creada con exito",
                categoria:categoria
            })
        }
        else
        {
            ///Error del servidor - Creador de la api, base de datos, quien configure el servidor
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un error desconocido",
            })
        }
    }
    //res.send('Crear una categoria');
})

app.put('/socios/v1/categorias/:id', (req,res)=>{
    //Actualizar un recurso - Actualizar una categoria
    const {id} = req.params;
    const {nombre,descripcion} = req.body;
    if(nombre==undefined || descripcion==undefined)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }
    else
    {
        const posActualizar = categorias.findIndex(categoria => categoria.id==id)
        if(posActualizar!= -1)
        {
            //Si encontro la categoria con el id buscado
            //Actualizar la categoria
            categorias[posActualizar].nombre=nombre;
            categorias[posActualizar].descripcion=descripcion;
            res.status(200).json({
                estado: 1,
                mensaje: "Categoria actualizada",
                categoria: categorias[posActualizar]
            })            
        }
        else
        {
            //No se encontro la categoria del id buscado
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada"
            })
        }
    }

     res.send('Actualizar una categoria por su id');
})

app.delete('/socios/v1/categorias/:id', (req,res)=>{
    const {id} = req.params;        //Forma más usada
    //const {id} = res.params.id      //Otra forma de usarlo
    const indiceEliminar = categorias.findIndex(categoria => categoria.id == id)
    if(indiceEliminar != -1)
    {
        //Se borra la categoria
        categorias.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Categoria eliminada con exito"
        })
    }
    else
    {
        //Categoria no encontrada
        res.status(404).json({
            estado:0,
            mensaje:"Categoria no encontrada"
        })
    }
    //Eliminar un recurso del servidor - Eliminar una categoria
    res.send('Eliminar una categoria por su id');
})

app.listen(puerto,()=>{
    console.log('Servidor corriendo en el pierto: ', puerto);
})
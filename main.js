// Se importan los módulos
const http = require('http');
const fs = require('fs');
const url = require('url');
const axios = require('axios').default;



function getProveedores(callback){
    axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json')
    .then(response => response.data).then((result)=>{
        callback(result);
    });
}

function getClientes(callback){
    axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json')
    .then(response => response.data).then((result)=>{
        callback(result);
    });
}

const server = http.createServer((req, res)=>{
    const path = req.url;

    if(path==='/api/proveedores'){

        getProveedores((datos)=>{
            let html = '';
            for (let i = 0; i < datos.length; i++) {
                const element = datos[i];
                html += '<tr><td>'+element.idproveedor+'</td> \
                <td>'+element.nombrecompania+'</td> \
                <td>'+element.nombrecontacto+'</td></tr>';
            }

            fs.readFile('tabla.html', 'utf8', (err, data)=>{
                if(err){
                    throw err;
                }
                data = data.toString();
                data = data.replace('%', 'proveedores');
                data = data.replace('*', html);
                
    
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
                res.write(data);
                res.end();
            });
        });

    }
    else if(path==='/api/clientes'){

        getClientes((datos)=>{
            let html = '';
            for (let i = 0; i < datos.length; i++) {
                const element = datos[i];
                html += '<tr><td>'+element.idCliente+'</td> \
                <td>'+element.NombreCompania+'</td> \
                <td>'+element.NombreContacto+'</td></tr>';
            }

            fs.readFile('tabla.html', 'utf8', (err, data)=>{
                if(err){
                    throw err;
                }
                data = data.toString();
                data = data.replace('%', 'clientes');
                data = data.replace('*', html);
                
    
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
                res.write(data);
                res.end();
            });
        });

    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html;charset=UTF-8'});
        res.write('Página no encontrada');
        res.end();
    }

})
.listen(8081)

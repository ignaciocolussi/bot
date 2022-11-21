let entidades = entidadesHelper.obtenerPais(message);
console.log(entidades);
if (entidades) {

    sesionHelper.setEntidades(ws, entidadesHelper.obtenerPais(message))
}
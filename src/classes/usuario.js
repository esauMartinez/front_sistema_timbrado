class Usuario {
    constructor(id = '', nombre = '', paterno = '', materno = '', email = '', password= '', user_rol = '', cliente = null, empresa = null) {
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.email = email;
        this.password = password;
        this.user_rol = user_rol;
        this.cliente = cliente;
        this.empresa = empresa;
    }
}

export default Usuario;
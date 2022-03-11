import Swal from "sweetalert2";

class Messages {

    statusMessage({ status, data}) {
        switch (status) {
            case 200:
                this.success(data.msg);
                break;
            case 202:
                this.warning(data.msg);
                break;
            case 404:
                this.notFound(data.msg);
                break;
            case 500:
                this.error(data.msg);
                break;
        }
    }
    
    question() {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Estas seguro ?',
                text: "No podras revertir esta accion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        });
    }
    
    success(msg) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500
        })
    }

    warning(msg) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: msg,
        })
    }
    
    error(msg) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        })
    }
    
    notFound(msg) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: msg,
        })
    }
}

export const messages = new Messages();
<template>
    <form action="">
        <div class="row">
            <div class="col-lg-12 mb-3">
                <label for="formFile" class="form-label">Archivo .CER</label>
                <input class="form-control" type="file">
            </div>
            <div class="col-lg-12 mb-3">
                <label for="formFile" class="form-label">Archivo .KEY</label>
                <input class="form-control" type="file">
            </div>
            <div class="col-lg-12 mb-3">
                <label for="formFile" class="form-label">Password</label>
                <input class="form-control" type="password">
            </div>
            <div class="col-lg-12 d-flex justify-content-end">
                <button class="btn btn-primary w-25">Guardar</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'Certificados'    
}
</script>


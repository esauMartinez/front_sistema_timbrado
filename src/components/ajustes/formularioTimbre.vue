<template>
    <form action="">
        <div class="row">
            <div class="col-lg-12 mb-3">
                <label for="">Timbres</label>    
                <input type="text" class="form-control" v-model="timbres.timbres" required>
            </div>    
            <div class="col-lg-12 mb-3">
                <label for="">Comentarios</label>    
                <input type="text" class="form-control" v-model="timbres.comentarios" required>
            </div>
        </div>    
    </form>    
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'formularioTimbre',
    computed: {
        ...mapState('empresaModule', ['timbres'])
    }
}
</script>



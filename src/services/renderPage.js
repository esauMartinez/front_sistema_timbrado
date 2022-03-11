import router from "../router";



export const render_page = ({  data: { token }, data: { data: { user_rol } }, data: { data: user_data } }) => {

    return new Promise((resolve, reject) => {
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(user_data));

        if (user_rol === 'USER_CLIENTE_SYSTEM') {
            router.push('/cotizacion');
        } else if (user_rol === 'USER_ONLY_TIMBRE') {
            router.push('/timbre');
        } else if (user_rol === 'USER_ROOT_SYSTEM') {
            router.push('/root');
        } else {
            router.push('/home');
        }

        resolve();
    });
}
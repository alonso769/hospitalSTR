import { environment as ENV } from 'src/environments/environment'

export const API_COLITAS = {
    SEGURIDAD: `${ENV.apiColitas}auth/`,
    MAIL: `${ENV.apiColitas}mail/`,
    ADOPCIONES: `${ENV.apiColitas}adopciones/`,
    PUBLICACIONES: `${ENV.apiColitas}publicaciones/`,
    PUBLIC: 'public/',
    IMAGENES: `${ENV.apiColitas}imagenes/`,
}

export const API_COLITAS_ROUTES = {
    SEGURIDAD: {
        CREAR_USUARIO: `${API_COLITAS.SEGURIDAD}crear`,
        INICIAR_SESION: `${API_COLITAS.SEGURIDAD}iniciarsesion`,
        RECUPERAR_CONTRASENIA: `${API_COLITAS.SEGURIDAD}recuperarContrasenia`,
        CAMBIAR_CONTRASENIA: `${API_COLITAS.SEGURIDAD}modificarContrasenia`,
        CERRAR_SESION: `${API_COLITAS.SEGURIDAD}cerrarSesion`,

        OBTENER_USUARIOS: `${API_COLITAS.SEGURIDAD}obtenerTodosLosUsuarios`,   
        BUSCAR_USUARIO_ID_BODY: `${API_COLITAS.SEGURIDAD}buscarUsuarioPorIDbody`,
        BUSCAR_USUARIO_ID: `${API_COLITAS.SEGURIDAD}buscarUsuarioPorID`,
        BUSCAR_USUARIO_EMAIL: `${API_COLITAS.SEGURIDAD}buscarUsuarioPorEmail`,
        MODIFICAR_USUARIOS: `${API_COLITAS.SEGURIDAD}modificarUsuario`,
        MODIFICAR_USUARIOS_ID: `${API_COLITAS.SEGURIDAD}modificarUsuarioID`,
        ELIMINAR_USUARIO: `${API_COLITAS.SEGURIDAD}eliminar`,

        MODIFICAR_USUARIOS_ROL: `${API_COLITAS.SEGURIDAD}modificarUsuarioIdRol`,

        
    },
    MAIL: {
        CAMBIAR_CONTRASENIA: `${API_COLITAS.MAIL}cambiarcontrasenia`
    },
    PUBLICACIONES: {
        OBTENER_PUBLICACIONES: `${API_COLITAS.PUBLICACIONES}buscar`,
        INSERTAR_PUBLICACION: `${API_COLITAS.PUBLICACIONES}registrar`,
        ELIMINAR_PUBLICACION: `${API_COLITAS.PUBLICACIONES}eliminar`,
    },

    ADOPCIONES: {
        OBTENER_ADOPCIONES: `${API_COLITAS.ADOPCIONES}buscar`,
        OBTENER_ADOPCIONESID: `${API_COLITAS.ADOPCIONES}buscarAdopcionID`,
        INSERTAR_ADOPCION: `${API_COLITAS.ADOPCIONES}registrar`,
        MODIFICAR_ADOPCION: `${API_COLITAS.ADOPCIONES}modificar`,
        MODIFICAR_ADOPCIONID: `${API_COLITAS.ADOPCIONES}modificarID`,
        ELIMINAR_ADOPCION: `${API_COLITAS.ADOPCIONES}eliminar`,

        //Log
        OBTENER_MASCOTAS_ADOPTADAS: `${API_COLITAS.ADOPCIONES}obtenerAdoptados`,
        ELIMINAR_ADOPCION_LOG: `${API_COLITAS.ADOPCIONES}eliminarLog`,
        DESHACER_MASCOTA_LOG: `${API_COLITAS.ADOPCIONES}deshacerCambios`,
        ELIMINAR_DEFINITIVO_LOG: `${API_COLITAS.ADOPCIONES}eliminarDefinitivoLog`,

        

    },

    IMAGENES:{
        CARGAR_IMAGENES: `${API_COLITAS.IMAGENES}cargarImagen`,
    }
}
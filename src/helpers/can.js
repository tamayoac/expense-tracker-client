import store from '../store'

export default(permission) => {


    const userPermissions = store.getters.userpermissions;

    if(Array.isArray(permission)) {
        return permission.map(item => 
            userPermissions.includes(item)).includes(true);
    } 
    return userPermissions.includes(permission);
 
}
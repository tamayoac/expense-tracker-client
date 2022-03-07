import store from '../store'

export default(permission) => {
    const userPermissions = store.getters['userpermissions'];
   
    return userPermissions.includes(permission);
 
}
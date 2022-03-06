import can from '../helpers/can'
export default {
    methods: {
        checkGate: function (permission) {
            if(Array.isArray(permission)) {
                return permission.map(item => can(item)).includes(true);
            } 
            return can(permission);
        },
    },
}
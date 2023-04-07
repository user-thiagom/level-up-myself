import { Alert, Platform } from 'react-native'

const server = 'http://10.0.2.2:3000'

function showError(err) {
    if(err.response && err.response.data){
        Alert.alert('Ops! Ocorreu um problema!', `Messagem: ${err.response.data}`)
    } else{
        Alert.alert('Ops! Ocorreu um problema!', `Messagem: ${err}`)
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!')
}

export {server,showError,showSuccess}
import {cryptoAssets, cryptoData} from './data'

export function fakeFetchCrypto() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData);
        }, 2)
    })
}
export function fakeFetchAssests() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 2)
    })
}
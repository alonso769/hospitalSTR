import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})

export class CryptoService {
    private secretKey: string = 'bO14efXtJrU7ySY2qjyQ6jvz63mQ8H/sPWTdIbXL1QAAiU4p5S0pr.jpEwLvO';

    encrypt(value: string): string {
        const encryptedValue = CryptoJS.AES.encrypt(value, this.secretKey).toString();
        return encryptedValue;
    }

    decrypt(encryptedValue: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
        const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedValue;
    }
}

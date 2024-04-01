function randomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const UnicodeString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
const length_UnicodeString = UnicodeString.length;
class OneTimePad {
    // public generatePad(length: number): string { 
    //   let pad: string = "";
    //   for(let i=0; i<length; i++) {
    //     const index = randomIntInRange(0, length_UnicodeString-1);
    //     pad += UnicodeString[index];
    //   }
    //   return pad; 
    // }
    getPad() {
        return this.pad;
    }
    encrypt(plainText, key) {
        // const pad = this.generatePad(plainText.length);
        if (key.length < plainText.length) {
            let lengthRestText = plainText.length - key.length;
            for (let i = 0; i < lengthRestText; i++) {
                key += plainText[i];
            }
        }
        this.pad = key;
        let cipher = '';
        for (let i = 0; i < plainText.length; i++) {
            const indexCipher = UnicodeString.indexOf(plainText[i]) + UnicodeString.indexOf(key[i]);
            cipher += indexCipher >= length_UnicodeString ? UnicodeString[indexCipher - length_UnicodeString] : UnicodeString[indexCipher];
        }
        return cipher;
    }
    decrypt(cipher, pad) {
        let plainText = '';
        for (let i = 0; i < cipher.length; i++) {
            const indexPlainText = UnicodeString.indexOf(cipher[i]) - UnicodeString.indexOf(pad[i]);
            plainText += indexPlainText < 0 ? UnicodeString[indexPlainText + length_UnicodeString] : UnicodeString[indexPlainText];
        }
        return plainText;
    }
}
const result = document.querySelector(".result");
const btn_encrypt = document.querySelector(".encrypt");
const btn_decrypt = document.querySelector(".decrypt");
const content_title = document.querySelector(".content-title");
const inputEncrypt = document.querySelector(".inputEncrypt");
const inputDecrypt = document.querySelector(".inputDecrypt");
const inputKey = document.querySelector(".inputKey");
const inputkeyEncrypt = document.querySelector(".inputKeyEncrypt");
const array_result = [];
var plainText;
var cipherText;
var keyEncrypt;
var keyDecrypt;
inputEncrypt.addEventListener("change", (e) => {
    var _a;
    plainText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value.trim();
});
inputDecrypt.addEventListener("change", (e) => {
    var _a;
    cipherText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
inputKey.addEventListener("change", (e) => {
    var _a;
    keyDecrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
inputkeyEncrypt.addEventListener("change", (e) => {
    var _a;
    keyEncrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
btn_encrypt.addEventListener("click", () => {
    content_title.style.display = "block";
    const OTP = new OneTimePad();
    const cipher = OTP.encrypt(plainText, keyEncrypt);
    const card_result = `<div class="card-result">
          <div class="card-result-header">Mã Hóa " ${plainText} "</div>
          <div class="card-result-body">
                <h5>Thông tin mã hóa</h5>
                <p>Key: "${OTP.getPad()}"</p>
                <p>Bản mã: "${cipher}"</p>
                <p>Bản rõ: ${plainText}</p>
          </div>
       </div>`;
    array_result.push(card_result);
    result.innerHTML = array_result.map((value) => {
        return value;
    }).join('');
});
btn_decrypt.addEventListener("click", () => {
    content_title.style.display = "block";
    const OTP = new OneTimePad();
    const decryptText = OTP.decrypt(cipherText, keyDecrypt);
    const card_result = `<div class="card-result">
        <div class="card-result-header">Giải Mã " ${cipherText} "</div>
        <div class="card-result-body">
              <h5>Thông tin Giải mã</h5>
              <p>Bản rõ: ${decryptText}</p>
        </div>
     </div>`;
    array_result.push(card_result);
    result.innerHTML = array_result.map((value) => {
        return value;
    }).join('');
});

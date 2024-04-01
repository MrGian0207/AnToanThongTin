class CaesarCipher {
    encode(plainText, k) {
        let plainTextLowerCase = plainText.toLowerCase();
        let cipherText = "";
        let charInt;
        let charDecoded;
        for (let i = 0; i < plainTextLowerCase.length; i++) {
            if (plainTextLowerCase[i].match(/[a-z]/i)) {
                charInt = (plainTextLowerCase.charCodeAt(i) + k - 'a'.charCodeAt(0)) % 26 + 'a'.charCodeAt(0);
                charDecoded = String.fromCharCode(charInt);
                if (plainText[i] === plainText[i].toUpperCase()) {
                    charDecoded = charDecoded.toUpperCase();
                }
                cipherText += charDecoded;
            }
            else {
                cipherText += plainText[i];
            }
        }
        return cipherText;
    }
    decode(cipherText, k) {
        let plainTextLowerCase = cipherText.toLowerCase();
        let plainText = "";
        let charInt;
        let charDecoded;
        for (let i = 0; i < plainTextLowerCase.length; i++) {
            if (plainTextLowerCase[i].match(/[a-z]/i)) {
                charInt = (plainTextLowerCase.charCodeAt(i) + 26 - k - 'a'.charCodeAt(0)) % 26 + 'a'.charCodeAt(0);
                charDecoded = String.fromCharCode(charInt);
                if (cipherText[i] === cipherText[i].toUpperCase()) {
                    charDecoded = charDecoded.toUpperCase();
                }
                plainText += charDecoded;
            }
            else {
                plainText += cipherText[i];
            }
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
const inputkeyEncrypt = document.querySelector(".inputKeyEncrypt");
const inputKeyDecrypt = document.querySelector(".inputKeyDecrypt");
const array_result = [];
var plainText;
var cipherText;
var keyEncrypt;
var keyDecrypt;
const caesarCipher = new CaesarCipher();
inputEncrypt.addEventListener("change", (e) => {
    var _a;
    plainText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value.trim();
});
inputDecrypt.addEventListener("change", (e) => {
    var _a;
    cipherText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
inputKeyDecrypt.addEventListener("change", (e) => {
    var _a;
    keyDecrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
inputkeyEncrypt.addEventListener("change", (e) => {
    var _a;
    keyEncrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
btn_encrypt.addEventListener("click", () => {
    content_title.style.display = "block";
    const cipher = caesarCipher.encode(plainText, parseInt(keyEncrypt));
    const card_result = `<div class="card-result">
          <div class="card-result-header">Mã Hóa " ${plainText} "</div>
          <div class="card-result-body">
                <h5>Thông tin mã hóa</h5>
                <p>Key: "${keyEncrypt}"</p>
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
    const decryptText = caesarCipher.decode(cipherText, parseInt(keyDecrypt));
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

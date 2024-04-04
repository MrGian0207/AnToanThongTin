class SingleTableCipher {
    generatePlain() {
        let plain = "a";
        for (let i = 1; i < 26; i++) {
            plain += String.fromCharCode(plain.charCodeAt(0) + i);
        }
        return plain;
    }
    generateCipher() {
        let cipherInt = new Array(26);
        let cipher = "";
        for (let i = 0; i < 26; i++) {
            cipherInt[i] = i;
        }
        for (let i = 0; i < 26; i++) {
            let r = i + Math.floor(Math.random() * (26 - i));
            let temp = cipherInt[i];
            cipherInt[i] = cipherInt[r];
            cipherInt[r] = temp;
        }
        for (let i = 0; i < 26; i++) {
            cipher += String.fromCharCode(cipherInt[i] + "a".charCodeAt(0));
        }
        return cipher;
    }
    encode(plainText, cipher) {
        let plainTextLower = plainText.toLowerCase();
        let encodedChar;
        let charInt;
        let cipherText = "";
        for (let i = 0; i < plainTextLower.length; i++) {
            if (plainTextLower[i].match(/[a-z]/i)) {
                charInt = plainTextLower.charCodeAt(i) - "a".charCodeAt(0);
                encodedChar = cipher[charInt];
                if (plainText[i] === plainText[i].toUpperCase()) {
                    encodedChar = encodedChar.toUpperCase();
                }
                cipherText += encodedChar;
            }
            else {
                cipherText += plainText[i];
            }
        }
        return cipherText;
    }
    decode(cipherText, plain, cipher) {
        let cipherTextLower = cipherText.toLowerCase();
        let encodedChar;
        let charInt = 0;
        let plainText = "";
        for (let i = 0; i < cipherTextLower.length; i++) {
            if (cipherTextLower[i].match(/[a-z]/i)) {
                for (let j = 0; j < 26; j++) {
                    if (cipherTextLower[i] === cipher[j]) {
                        charInt = j;
                        break;
                    }
                }
                encodedChar = plain[charInt];
                if (cipherText[i] === cipherText[i].toUpperCase()) {
                    encodedChar = encodedChar.toUpperCase();
                }
                plainText += encodedChar;
            }
            else {
                plainText += cipherText[i];
            }
        }
        return plainText;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const result = document.querySelector(".result");
    const btn_encrypt = document.querySelector(".encrypt");
    const btn_decrypt = document.querySelector(".decrypt");
    const btn_generateKey = document.querySelector(".generateKey");
    const content_title = document.querySelector(".content-title");
    const inputEncrypt = document.querySelector(".inputEncrypt");
    const inputDecrypt = document.querySelector(".inputDecrypt");
    const inputKeyDecrypt = document.querySelector(".inputKey");
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
    inputkeyEncrypt.addEventListener("change", (e) => {
        var _a;
        keyEncrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
    });
    inputKeyDecrypt.addEventListener("change", (e) => {
        var _a;
        keyDecrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
    });
    const singleTableCipher = new SingleTableCipher();
    btn_generateKey.addEventListener("click", () => {
        // Generate cipher
        keyEncrypt = singleTableCipher.generateCipher();
        inputkeyEncrypt.setAttribute("value", keyEncrypt);
    });
    btn_encrypt.addEventListener("click", () => {
        content_title.style.display = "block";
        const cipher = singleTableCipher.encode(plainText, keyEncrypt);
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
        result.innerHTML = array_result
            .map((value) => {
            return value;
        })
            .join("");
    });
    btn_decrypt.addEventListener("click", () => {
        content_title.style.display = "block";
        const decryptText = singleTableCipher.decode(cipherText, singleTableCipher.generatePlain(), keyDecrypt);
        const card_result = `<div class="card-result">
                  <div class="card-result-header">Giải Mã " ${cipherText} "</div>
                  <div class="card-result-body">
                        <h5>Thông tin Giải mã</h5>
                        <p>Bản rõ: ${decryptText}</p>
                  </div>
               </div>`;
        array_result.push(card_result);
        result.innerHTML = array_result
            .map((value) => {
            return value;
        })
            .join("");
    });
});

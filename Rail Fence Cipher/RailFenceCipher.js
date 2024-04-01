class RailFenceCipher {
    getKey() {
        return this.key;
    }
    encryptRailFence(text, key) {
        this.key = key;
        let rail = [];
        for (let i = 0; i < key; i++) {
            rail.push([]);
        }
        let rows = 0;
        let columns = 0;
        let indexStart = 0;
        let indexStop = key - 1;
        while (indexStart < text.length) {
            rail[rows][columns++] = text[indexStart];
            indexStart = indexStart + 1;
            if (indexStart > indexStop) {
                indexStop = indexStop + key;
                columns = 0;
                rows++;
            }
            if (indexStart === text.length && indexStop > indexStart) {
                for (let j = indexStart; j <= indexStop; j++) {
                    rail[rows][columns++] = "*";
                }
            }
        }
        let result = "";
        let indexColumn = 0;
        while (indexColumn < key) {
            for (let row = 0; row <= rows; row++) {
                result += rail[row][indexColumn];
            }
            indexColumn++;
        }
        return result;
    }
    decryptRailFence(cipher, key) {
        let rail = [];
        for (let i = 0; i < key; i++) {
            rail.push([]);
        }
        let countRows = 0;
        let row = 0;
        while (row < cipher.length) {
            countRows++;
            row += key;
        }
        let index = 0;
        let column = 0;
        while (column < key) {
            for (let row = 0; row < countRows; row++) {
                rail[row][column] = cipher[index++];
            }
            column++;
        }
        let result = "";
        for (let row = 0; row < countRows; row++) {
            for (let column = 0; column < key; column++) {
                result += rail[row][column];
            }
        }
        let plaintText = "";
        for (let i = 0; i < result.length; i++) {
            if (result[i] !== "*") {
                plaintText += result[i];
            }
        }
        return plaintText;
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
btn_encrypt.addEventListener("click", () => {
    content_title.style.display = "block";
    const railFenceCipher = new RailFenceCipher();
    const cipher = railFenceCipher.encryptRailFence("attackpostponeduntilthisnoon", parseInt(keyEncrypt));
    const card_result = `<div class="card-result">
      <div class="card-result-header">Mã Hóa " ${plainText} "</div>
      <div class="card-result-body">
            <h5>Thông tin mã hóa</h5>
            <p>Key: "${railFenceCipher.getKey()}"</p>
            <p>Bản mã: "${cipher}"</p>
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
    const railFenceCipher = new RailFenceCipher();
    const decryptText = railFenceCipher.decryptRailFence(cipherText, parseInt(keyDecrypt));
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

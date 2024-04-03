class RailFenceCipher {
    getKey() {
        return this.key;
    }
    encryptRailFence(text, key) {
        this.key = key;
        // Tính số lượng hàng cần thiết
        let countRows = text.length % key !== 0
            ? Math.floor(text.length / key + 1)
            : text.length / key;
        // Tạo ma trận với số lượng hàng và key cột
        let rail = [];
        for (let i = 0; i < countRows; i++) {
            rail.push(new Array(key).fill("*"));
        }
        // Thực hiện việc điền ký tự vào ma trận
        let index = 0;
        for (let row = 0; row < countRows; row++) {
            for (let column = 0; column < key; column++) {
                if (index < text.length) {
                    rail[row][column] = text[index++];
                }
                else {
                    break;
                }
            }
        }
        // Tạo chuỗi kết quả từ ma trận theo cột
        let result = "";
        for (let column = 0; column < key; column++) {
            for (let row = 0; row < countRows; row++) {
                result += rail[row][column];
            }
        }
        console.log(rail);
        return result;
    }
    decryptRailFence(cipher, key) {
        let countRows = cipher.length % key !== 0
            ? Math.floor(cipher.length / key + 1)
            : cipher.length / key;
        // Tạo ma trận với số lượng hàng và key cột
        let rail = [];
        for (let i = 0; i < countRows; i++) {
            rail.push(new Array(key).fill(" "));
        }
        // Điền các ký tự của chuỗi mã hóa vào ma trận theo từng cột
        let index = 0;
        for (let column = 0; column < key; column++) {
            for (let row = 0; row < countRows; row++) {
                if (index < cipher.length) {
                    rail[row][column] = cipher[index++];
                }
                else {
                    break;
                }
            }
        }
        let plaintText = "";
        for (let row = 0; row < countRows; row++) {
            for (let column = 0; column < key; column++) {
                if (rail[row][column] !== "*") {
                    plaintText += rail[row][column];
                }
                else
                    break;
            }
        }
        console.log(rail);
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
    const cipher = railFenceCipher.encryptRailFence(plainText, parseInt(keyEncrypt));
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
    result.innerHTML = array_result
        .map((value) => {
        return value;
    })
        .join("");
});

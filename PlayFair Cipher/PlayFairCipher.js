class PlayfairCipher {
    getNextCharacter(usedChars) {
        let index = 'a'.charCodeAt(0);
        while (usedChars.includes(String.fromCharCode(index))) {
            index++;
        }
        return String.fromCharCode(index);
    }
    getKeyTable(key) {
        key = this.normaliseKey(key);
        const usedCharacters = ['j'];
        const table = new Array(5).fill(null).map(() => new Array(5));
        let count = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (count < key.length) {
                    const keyCharacter = key[count] === 'j' ? 'i' : key[count];
                    table[i][j] = keyCharacter;
                    usedCharacters.push(keyCharacter);
                    count++;
                }
                else {
                    table[i][j] = this.getNextCharacter(usedCharacters);
                    usedCharacters.push(table[i][j]);
                }
            }
        }
        return table;
    }
    getCharsPosition(table) {
        const dict = new Map();
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                dict.set(table[i][j], { x: i, y: j });
            }
        }
        return dict;
    }
    normaliseText(text) {
        let result = "";
        for (const c of text) {
            if (/[a-zA-Z]/.test(c)) {
                result += c === 'j' ? 'i' : c.toLowerCase();
            }
        }
        return result;
    }
    normaliseKey(key) {
        key = this.normaliseText(key);
        let result = "";
        const usedChars = [];
        for (const c of key) {
            if (!usedChars.includes(c)) {
                result += c;
            }
            usedChars.push(c);
        }
        return result;
    }
    normaliseOriginalText(text) {
        text = this.normaliseText(text);
        let chars = "";
        let i = 0;
        while (i < text.length) {
            chars += text[i];
            if (i + 1 < text.length) {
                if (text[i] === text[i + 1]) {
                    chars += text[i] === 'x' ? "z" : "x";
                    i++;
                }
                else {
                    chars += text[i + 1];
                    i += 2;
                }
            }
            else {
                i++;
            }
        }
        if (chars.length % 2 !== 0) {
            chars += chars[chars.length - 1] === 'x' ? "z" : "x";
        }
        return chars;
    }
    mod5(num) {
        return num < 0 ? 5 + num % 5 : num % 5;
    }
    encrypt(text, key) {
        const table = this.getKeyTable(key);
        const positions = this.getCharsPosition(table);
        text = this.normaliseOriginalText(text);
        console.log(text);
        let encryptedText = "";
        for (let i = 0; i < text.length; i += 2) {
            const coor1 = positions.get(text[i]);
            const coor2 = positions.get(text[i + 1]);
            console.log(text[i + 1]);
            let pair = "";
            if (coor1 && coor2) {
                /* Same row */
                if (coor1.x === coor2.x) {
                    pair = table[coor1.x][this.mod5(coor1.y + 1)] + table[coor2.x][this.mod5(coor2.y + 1)];
                }
                /* Same column */
                else if (coor1.y === coor2.y) {
                    pair = table[this.mod5(coor1.x + 1)][coor1.y] + table[this.mod5(coor2.x + 1)][coor2.y];
                }
                else {
                    pair = table[coor1.x][coor2.y] + table[coor2.x][coor1.y];
                }
                encryptedText += pair;
            }
        }
        return encryptedText;
    }
    decrypt(text, key) {
        const table = this.getKeyTable(key);
        const positions = this.getCharsPosition(table);
        text = this.normaliseOriginalText(text);
        let decryptedText = "";
        for (let i = 0; i < text.length; i += 2) {
            const coor1 = positions.get(text[i]);
            const coor2 = positions.get(text[i + 1]);
            let pair = "";
            if (coor1 && coor2) {
                /* Same row */
                if (coor1.x === coor2.x) {
                    pair = table[coor1.x][this.mod5(coor1.y - 1)] + table[coor2.x][this.mod5(coor2.y - 1)];
                }
                /* Same column */
                else if (coor1.y === coor2.y) {
                    pair = table[this.mod5(coor1.x - 1)][coor1.y] + table[this.mod5(coor2.x - 1)][coor2.y];
                }
                else {
                    pair = table[coor1.x][coor2.y] + table[coor2.x][coor1.y];
                }
                decryptedText += pair;
            }
        }
        return decryptedText;
    }
}
// Test data
// const plaintext = "instruments";
// const key = "monarchy";
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
inputKeyDecrypt.addEventListener("change", (e) => {
    var _a;
    keyDecrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
inputkeyEncrypt.addEventListener("change", (e) => {
    var _a;
    keyEncrypt = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
});
const playfairCipher = new PlayfairCipher();
btn_encrypt.addEventListener("click", () => {
    content_title.style.display = "block";
    const cipher = playfairCipher.encrypt(plainText, keyEncrypt);
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
    const decryptText = playfairCipher.decrypt(cipherText, keyDecrypt);
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

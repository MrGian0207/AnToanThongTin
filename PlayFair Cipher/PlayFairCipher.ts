interface Coors {
    x: number;
    y: number;
}

class PlayfairCipher {
    getNextCharacter(usedChars: string[]): string {
        let index = 'a'.charCodeAt(0);
        while (usedChars.includes(String.fromCharCode(index))) {
            index++;
        }
        return String.fromCharCode(index);
    }

    getKeyTable(key: string): string[][] {
        key = this.normaliseKey(key);
        const usedCharacters: string[] = ['j'];
        const table: string[][] = new Array(5).fill(null).map(() => new Array(5));
        let count = 0;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (count < key.length) {
                    const keyCharacter = key[count] === 'j' ? 'i' : key[count];
                    table[i][j] = keyCharacter;
                    usedCharacters.push(keyCharacter);
                    count++;
                } else {
                    table[i][j] = this.getNextCharacter(usedCharacters);
                    usedCharacters.push(table[i][j]);
                }
            }
        }
        return table;
    }

    getCharsPosition(table: string[][]): Map<string, Coors> {
        const dict = new Map<string, Coors>();
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                dict.set(table[i][j], { x: i, y: j });
            }
        }
        return dict;
    }

    normaliseText(text: string): string {
        let result = "";
        for (const c of text) {
            if (/[a-zA-Z]/.test(c)) {
                result += c.toLowerCase() === 'j' ? 'i' : c.toLowerCase();
            }
        }
        return result;
    }

    normaliseKey(key: string): string {
        key = this.normaliseText(key);
        let result = "";
        const usedChars: string[] = [];
        for (const c of key) {
            if (!usedChars.includes(c)) {
                result += c;
                usedChars.push(c);
            }
        }
        return result;
    }

    normaliseOriginalText(text: string): string {
        text = this.normaliseText(text);
        let chars = "";
        let i = 0;
        while (i < text.length) {
            chars += text[i];
            if (i + 1 < text.length) {
                if (text[i] === text[i + 1]) {
                    chars += text[i] === 'x' ? "z" : "x";
                    i++;
                } else {
                    chars += text[i + 1];
                    i += 2;
                }
            } else {
                i++;
            }
        }
        if (chars.length % 2 !== 0) {
            chars += chars[chars.length - 1] === 'x' ? "z" : "x";
        }
        return chars;
    }

    mod5(num: number): number {
        return num < 0 ? (5 + num) % 5 : num % 5;
    }

    encrypt(text: string, key: string): string {
        const table = this.getKeyTable(key);
        const positions = this.getCharsPosition(table);
        text = this.normaliseOriginalText(text); 
        let encryptedText = "";
        for (let i = 0; i < text.length; i += 2) {
            const coor1 = positions.get(text[i]);
            const coor2 = positions.get(text[i + 1]);
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

    decrypt(text: string, key: string): string {
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
                } else {
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

const array_result: Array<string> = [];
var plainText: string;
var cipherText: string;
var keyEncrypt: string;
var keyDecrypt: string;

inputEncrypt.addEventListener("change", (e) => {
  plainText = (e.target as HTMLInputElement)?.value.trim();
})

inputDecrypt.addEventListener("change", (e) => {
  cipherText = (e.target as HTMLInputElement)?.value;
})

inputKeyDecrypt.addEventListener("change", (e) => {
  keyDecrypt = (e.target as HTMLInputElement)?.value;
})

inputkeyEncrypt.addEventListener("change", (e) => {
  keyEncrypt = (e.target as HTMLInputElement)?.value;
})

const playfairCipher = new PlayfairCipher();


btn_encrypt.addEventListener("click", () => { 
      (content_title as HTMLElement).style.display = "block";
      const cipher = playfairCipher.encrypt(plainText, keyEncrypt); 
      const card_result = 
      `<div class="card-result">
          <div class="card-result-header">Mã Hóa " ${plainText} "</div>
          <div class="card-result-body">
                <h5>Thông tin mã hóa</h5>
                <p>Key: "${keyEncrypt}"</p>
                <p>Bản mã: "${cipher}"</p>
                <p>Bản rõ: ${plainText}</p>
          </div>
       </div>`
      array_result.push(card_result);
      result.innerHTML = array_result.map((value: string) => {
        return value;
      }).join('');
})

btn_decrypt.addEventListener("click", () => { 
    (content_title as HTMLElement).style.display = "block";

    const decryptText = playfairCipher.decrypt(cipherText, keyDecrypt); 
    const card_result = 
    `<div class="card-result">
        <div class="card-result-header">Giải Mã " ${cipherText} "</div>
        <div class="card-result-body">
              <h5>Thông tin Giải mã</h5>
              <p>Bản rõ: ${decryptText}</p>
        </div>
     </div>`
    
    array_result.push(card_result);

    result.innerHTML = array_result.map((value: string) => {
      return value;
    }).join('');
})
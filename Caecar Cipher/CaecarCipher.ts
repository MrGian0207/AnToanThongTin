class CaesarCipher {
    encode(plainText: string, k: number): string {
        let plainTextLowerCase: string = plainText.toLowerCase();
        let cipherText: string = "";
        let charInt: number;
        let charDecoded: string;

        for (let i = 0; i < plainTextLowerCase.length; i++) {
            if (plainTextLowerCase[i].match(/[a-z]/i)) {
                charInt = (plainTextLowerCase.charCodeAt(i) + k - 'a'.charCodeAt(0)) % 26 + 'a'.charCodeAt(0);
                charDecoded = String.fromCharCode(charInt);
                if (plainText[i] === plainText[i].toUpperCase()) {
                    charDecoded = charDecoded.toUpperCase();
                }
                cipherText += charDecoded;
            } else {
                cipherText += plainText[i];
            }
        }
        return cipherText;
    }

    decode(cipherText: string, k: number): string {
        let plainTextLowerCase: string = cipherText.toLowerCase();
        let plainText: string = "";
        let charInt: number;
        let charDecoded: string;

        for (let i = 0; i < plainTextLowerCase.length; i++) {
            if (plainTextLowerCase[i].match(/[a-z]/i)) {
                charInt = (plainTextLowerCase.charCodeAt(i) + 26 - k - 'a'.charCodeAt(0)) % 26 + 'a'.charCodeAt(0);
                charDecoded = String.fromCharCode(charInt);
                if (cipherText[i] === cipherText[i].toUpperCase()) {
                    charDecoded = charDecoded.toUpperCase();
                }
                plainText += charDecoded;
            } else {
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

const array_result: Array<string> = [];
var plainText: string;
var cipherText: string;
var keyEncrypt: string;
var keyDecrypt: string;

const caesarCipher = new CaesarCipher();

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

btn_encrypt.addEventListener("click", () => { 
      (content_title as HTMLElement).style.display = "block";
      const cipher = caesarCipher.encode(plainText, parseInt(keyEncrypt)); 
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

    const decryptText = caesarCipher.decode(cipherText, parseInt(keyDecrypt)); 
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
function randomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const UnicodeString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
const length_UnicodeString = UnicodeString.length;

class OneTimePad {

  private pad: string; 

  public getPad(): string {
    return this.pad;
  }

  public encrypt(plainText: string, key: string): string {
    // const pad = this.generatePad(plainText.length);
    if (key.length < plainText.length) {
      let lengthRestText: number = plainText.length - key.length;
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

  public decrypt(cipher: string, pad: string): string { 
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

inputKey.addEventListener("change", (e) => {
  keyDecrypt = (e.target as HTMLInputElement)?.value;
})

inputkeyEncrypt.addEventListener("change", (e) => {
  keyEncrypt = (e.target as HTMLInputElement)?.value;
})

btn_encrypt.addEventListener("click", () => { 
      (content_title as HTMLElement).style.display = "block";
      const OTP = new OneTimePad();
      const cipher = OTP.encrypt(plainText, keyEncrypt); 
      const card_result = 
      `<div class="card-result">
          <div class="card-result-header">Mã Hóa " ${plainText} "</div>
          <div class="card-result-body">
                <h5>Thông tin mã hóa</h5>
                <p>Key: "${OTP.getPad()}"</p>
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


    const OTP = new OneTimePad();
    const decryptText = OTP.decrypt(cipherText, keyDecrypt); 
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





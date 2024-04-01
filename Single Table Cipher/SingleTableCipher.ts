class SingleTableCipher {
    
  generatePlain(): string {
    let plain: string = "a";
    for (let i: number = 1; i < 26; i++) {
      plain += String.fromCharCode(plain.charCodeAt(0) + i);
    }
    return plain;
  }

  generateCipher(): string {
    let cipherInt: number[] = new Array(26);
    let cipher: string = "";

    for (let i: number = 0; i < 26; i++) {
      cipherInt[i] = i;
    }
    for (let i: number = 0; i < 26; i++) {
      let r: number = i + Math.floor(Math.random() * (26 - i));

      let temp: number = cipherInt[i];
      cipherInt[i] = cipherInt[r];
      cipherInt[r] = temp;
    }
    for (let i: number = 0; i < 26; i++) {
      cipher += String.fromCharCode(cipherInt[i] + "a".charCodeAt(0));
    }
    return cipher;
  }

  encode(plainText: string, cipher: string): string {
    let plainTextLower: string = plainText.toLowerCase();
    let encodedChar: string;
    let charInt: number;
    let cipherText: string = "";

    for (let i: number = 0; i < plainTextLower.length; i++) {
      if (plainTextLower[i].match(/[a-z]/i)) {
        charInt = plainTextLower.charCodeAt(i) - "a".charCodeAt(0);
        encodedChar = cipher[charInt];
        if (plainText[i] === plainText[i].toUpperCase()) {
          encodedChar = encodedChar.toUpperCase();
        }
        cipherText += encodedChar;
      } else {
        cipherText += plainText[i];
      }
    }
    return cipherText;
  }

  decode(cipherText: string, plain: string, cipher: string): string {
    let cipherTextLower: string = cipherText.toLowerCase();
    let encodedChar: string;
    let charInt: number = 0;
    let plainText: string = "";

    for (let i: number = 0; i < cipherTextLower.length; i++) {
      if (cipherTextLower[i].match(/[a-z]/i)) {
        for (let j: number = 0; j < 26; j++) {
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
      } else {
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

  const array_result: Array<string> = [];
  var plainText: string;
  var cipherText: string;
  var keyEncrypt: string;
  var keyDecrypt: string;

  inputEncrypt.addEventListener("change", (e) => {
    plainText = (e.target as HTMLInputElement)?.value.trim();
  });

  inputDecrypt.addEventListener("change", (e) => {
    cipherText = (e.target as HTMLInputElement)?.value;
  });

  inputkeyEncrypt.addEventListener("change", (e) => {
    keyEncrypt = (e.target as HTMLInputElement)?.value;
  });

  inputKeyDecrypt.addEventListener("change", (e) => {
    keyDecrypt = (e.target as HTMLInputElement)?.value;
  });

  const singleTableCipher = new SingleTableCipher();
  // const plaintext = "Hello, World!";

  btn_generateKey.addEventListener("click", () => {
    // Generate cipher
    keyEncrypt = singleTableCipher.generateCipher();

    (inputkeyEncrypt as HTMLInputElement).setAttribute("value", keyEncrypt);
  });

  btn_encrypt.addEventListener("click", () => {
    (content_title as HTMLElement).style.display = "block";
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
      .map((value: string) => {
        return value;
      })
      .join("");
  });

  btn_decrypt.addEventListener("click", () => {
    (content_title as HTMLElement).style.display = "block";

    const decryptText = singleTableCipher.decode(
      cipherText,
      singleTableCipher?.generatePlain(),
      keyDecrypt
    );
    const card_result = `<div class="card-result">
                <div class="card-result-header">Giải Mã " ${cipherText} "</div>
                <div class="card-result-body">
                      <h5>Thông tin Giải mã</h5>
                      <p>Bản rõ: ${decryptText}</p>
                </div>
             </div>`;

    array_result.push(card_result);

    result.innerHTML = array_result
      .map((value: string) => {
        return value;
      })
      .join("");
  });
});

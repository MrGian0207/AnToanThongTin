class VigenereCipher2 {
  getNumericValue(character: string): number {
    return character.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
  }

  encryptCharacter(textChar: string, keyChar: string): string {
    const result =
      (this.getNumericValue(textChar) + this.getNumericValue(keyChar)) % 26;
    const baseChar =
      /[a-z]/.test(textChar) || /[a-z]/.test(keyChar)
        ? "a".charCodeAt(0)
        : "A".charCodeAt(0);
    return String.fromCharCode(baseChar + result);
  }

  decryptCharacter(textChar: string, keyChar: string): string {
    let result = this.getNumericValue(textChar) - this.getNumericValue(keyChar);
    if (result < 0) {
      result = 26 + result;
    }
    const baseChar =
      /[a-z]/.test(textChar) || /[a-z]/.test(keyChar)
        ? "a".charCodeAt(0)
        : "A".charCodeAt(0);
    return String.fromCharCode(baseChar + result);
  }



  removeAllSpaces(text: string): string {
    let result = "";
    for (const c of text) {
      if (c !== " ") {
        result += c;
      }
    }
    return result;
  }

  getKeySequence2(text: string, key: string)
  {
    let keySequence = "";
    text = this.removeAllSpaces(text);
    key = this.removeAllSpaces(key);
    if (text.length < key.length)
    {
      keySequence = key.substring(0, text.length);
    }
    else if (text.length >= key.length)
    {
      keySequence += key;
    }
    if (keySequence.length < text.length)
    {
      keySequence += text.substring(0, text.length - keySequence.length);
    }
    return keySequence;
  }

  encrypt2(text: string, key: string): string {
    let encryptedText = "";
    const keySequence = this.getKeySequence2(text, key);
    let spaces = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        encryptedText += " ";
        spaces++;
      } else {
        encryptedText += this.encryptCharacter(
          text[i],
          keySequence[i - spaces]
        );
      }
    }
    return encryptedText;
  }

  // public static string Encrypt2(string text, string key)
  // {
  //     string encryptedText = "";
  //     string keySequence = GetKeySequence2(text, key);

  //     int spaces = 0;
  //     for (int i = 0; i < text.Length; i++)
  //     {
  //         if (text[i] == ' ')
  //         {
  //             encryptedText += ' ';
  //             spaces++;
  //         }
  //         else
  //         {
  //             encryptedText += EncryptCharacter(text[i], keySequence[i - spaces]);
  //         }
  //     }
  //     return encryptedText;
  // }

  decrypt2(text: string, key: string): string {
    let decryptedText = "";
    const keySequence = this.getKeySequence2(text, key);
    let spaces = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        decryptedText += " ";
        spaces++;
      } else {
        decryptedText += this.decryptCharacter(
          text[i],
          keySequence[i - spaces]
        );
      }
    }
    return decryptedText;
  }

  // public static string Decrypt2(string text, string key)
  // {
  //     string decryptedText = "";
  //     string keySequence = GetKeySequence2(text, key);
  //     int spaces = 0;
  //     for (int i = 0; i < text.Length; i++)
  //     {
  //         if (text[i] == ' ')
  //         {
  //             decryptedText += ' ';
  //             spaces++;
  //         }
  //         else
  //         {
  //             decryptedText += DecryptCharacter(text[i], keySequence[i - spaces]);

  //         }
  //     }
  //     return decryptedText;
  // }
}



const vigenereCipher2 = new VigenereCipher2();

// // Test encrypt
// console.log("Encrypt test:");
// const plaintext = "ATTACK AT DAWN";
// const key = "LEMON";
// const encryptedText = vigenereCipher.encrypt(plaintext, key);
// console.log("Plaintext:", plaintext);
// console.log("Key:", key);
// console.log("Encrypted text:", encryptedText);

// // Test decrypt
// console.log("\nDecrypt test:");
// const decryptedText = vigenereCipher.decrypt(encryptedText, key);
// console.log("Encrypted text:", encryptedText);
// console.log("Key:", key);
// console.log("Decrypted text:", decryptedText);


const result = document.querySelector(".result");
const btn_encrypt = document.querySelector(".encrypt");
const btn_decrypt = document.querySelector(".decrypt");
const content_title = document.querySelector(".content-title");
const inputEncrypt = document.querySelector(".inputEncrypt");
const inputDecrypt = document.querySelector(".inputDecrypt");

const inputkeyEncrypt = document.querySelector(".inputKeyEncrypt");
const inputsAutoKey = document.getElementsByClassName("autoKey");
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


inputkeyEncrypt.addEventListener("change", (e) => {
  keyEncrypt = (e.target as HTMLInputElement)?.value;
})

btn_encrypt.addEventListener("click", () => { 
      (content_title as HTMLElement).style.display = "block";
      for (let i = 0; i < inputsAutoKey.length; i++)
      {
        (inputsAutoKey[i] as HTMLInputElement).value = vigenereCipher2.getKeySequence2(plainText, keyEncrypt);
      }
      const cipher = vigenereCipher2.encrypt2(plainText, keyEncrypt); 
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
    keyDecrypt = (inputsAutoKey[0] as HTMLInputElement).value;
    const decryptText = vigenereCipher2.decrypt2(cipherText, keyDecrypt); 
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